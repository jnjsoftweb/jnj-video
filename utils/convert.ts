import iconv from 'iconv-lite';
import fs from 'fs';
import path from 'path';

// 밀리초를 VTT 타임스탬프 형식으로 변환
function formatTime(ms: number): string {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;
  
  return `${String(hours).padStart(2, '0')}:${
    String(minutes).padStart(2, '0')}:${
    String(seconds).padStart(2, '0')}.${
    String(milliseconds).padStart(3, '0')}`;
}

// SMI를 VTT로 변환하는 함수
export function smiToVtt(smiContent: string): string {
  console.error('Starting SMI to VTT conversion');
  
  // 기본 VTT 헤더
  let vtt = 'WEBVTT\n\n';
  
  try {
    // Buffer로 변환 후 EUC-KR로 디코딩
    const buffer = Buffer.from(smiContent, 'binary');
    smiContent = iconv.decode(buffer, 'euc-kr');

    console.error('Decoded content preview:', smiContent.substring(0, 200));

    // SYNC 블록 추출 (정규식 수정)
    const syncBlocks = smiContent.match(/<SYNC\s+Start=(\d+)>[^>]*<P[^>]*Class=["']?KRCC["']?[^>]*>(.*?)(?=<SYNC|$)/gsi);
    
    console.error(`Found ${syncBlocks?.length || 0} subtitle blocks`);
    
    if (!syncBlocks) {
      throw new Error('No subtitle blocks found');
    }

    syncBlocks.forEach((block, index) => {
      // 시작 시간과 텍스트 추출을 위한 정규식
      const timeMatch = block.match(/<SYNC\s+Start=(\d+)>/i);
      const textMatch = block.match(/<P[^>]*Class=["']?KRCC["']?[^>]*>(.*?)(?=<SYNC|$)/si);
      
      if (!timeMatch || !textMatch) return;
      
      const startMs = parseInt(timeMatch[1]);
      let endMs;
      
      // 다음 블록의 시작 시간을 현재 블록의 종료 시간으로 사용
      if (index < syncBlocks.length - 1) {
        const nextTimeMatch = syncBlocks[index + 1].match(/<SYNC\s+Start=(\d+)>/i);
        endMs = nextTimeMatch ? parseInt(nextTimeMatch[1]) : startMs + 3000;
      } else {
        endMs = startMs + 3000; // 마지막 자막은 3초 지속
      }
      
      let text = textMatch[1]
        .replace(/<br\s*\/?>/gi, '\n')  // <br> 태그를 줄바꿈으로
        .replace(/<[^>]+>/g, '')        // 나머지 HTML 태그 제거
        .replace(/&nbsp;/g, ' ')        // HTML 엔티티 변환
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .trim();
      
      // 빈 자막이 아닌 경우만 추가
      if (text) {
        const startTime = formatTime(startMs);
        const endTime = formatTime(endMs);
        
        console.error(`Converting: ${startTime} --> ${endTime}: ${text}`);
        
        vtt += `${startTime} --> ${endTime}\n${text}\n\n`;
      }
    });
    
    console.error('SMI to VTT conversion completed');
    return vtt;
    
  } catch (error) {
    console.error('Error in SMI conversion:', error);
    throw error;
  }
}

// SRT를 VTT로 변환하는 함수
export function srtToVtt(srtContent: string): string {
  // SRT는 형식이 VTT와 매우 유사하므로 간단한 변환만 필요
  let vtt = 'WEBVTT\n\n';
  
  // 타임스탬프 형식 변환
  const converted = srtContent
    .replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2')
    .split('\n\n')
    .slice(1) // 첫 번째 숫자 제거
    .join('\n\n');
  
  return vtt + converted;
}


// folder 폴더 내의 모든 파일(srt, smi)을 vtt로 변환하는 함수
export function convertAllFilesInFolder(folderPath: string): void {
  const files = fs.readdirSync(folderPath);
  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const convertedContent = filePath.endsWith('.smi') 
      ? smiToVtt(fileContent)
      : filePath.endsWith('.srt') 
        ? srtToVtt(fileContent) 
        : fileContent;
    const vttPath = filePath.replace(/\.(smi|srt)$/, '.vtt');
    fs.writeFileSync(vttPath, convertedContent);
  });
}