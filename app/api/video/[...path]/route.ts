import { NextRequest, NextResponse } from 'next/server';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';

// VIDEO_ROOT를 환경 변수에서 불러오기
const VIDEO_ROOT = process.env.VIDEO_ROOT || '/Users/moon/JnJ-soft/video_'; // 기본값 설정

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    if (!VIDEO_ROOT) {
      throw new Error('VIDEO_ROOT 환경 변수가 설정되지 않았습니다.');
    }

    const path = await Promise.resolve(params.path);
    const filePath = join(VIDEO_ROOT, ...path);
    console.log('요청된 파일 경로:', filePath);
    
    const stat = statSync(filePath);
    const fileSize = stat.size;
    const range = request.headers.get('range');

    // 자막 파일인 경우 (.vtt)
    if (filePath.endsWith('.vtt')) {
      const subtitleStream = createReadStream(filePath);
      return new NextResponse(subtitleStream as any, {
        headers: {
          'Content-Type': 'text/vtt',
          'Content-Length': fileSize.toString(),
        },
      });
    }

    // 비디오 스트리밍 처리 (mp4, mkv)
    if (range) {
      // 범위 요청 처리 (비디오 스트리밍)
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;
      const videoStream = createReadStream(filePath, { start, end });

      return new NextResponse(videoStream as any, {
        status: 206,
        headers: {
          'Content-Type': filePath.endsWith('.mp4') ? 'video/mp4' : 'video/x-matroska',
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize.toString(),
        },
      });
    } else {
      // 전체 파일 요청 처리
      const videoStream = createReadStream(filePath);
      return new NextResponse(videoStream as any, {
        headers: {
          'Content-Type': filePath.endsWith('.mp4') ? 'video/mp4' : 'video/x-matroska',
          'Content-Length': fileSize.toString(),
        },
      });
    }
  } catch (error) {
    console.error('상세 오류:', error);
    return NextResponse.json(
      { error: '파일을 찾을 수 없습니다.' },
      { status: 404 }
    );
  }
} 