'use client'
import { use } from 'react';
import { useState, useRef, useEffect } from 'react';

export default function VideoPlayer({ params }: { params: { path: string[] } }) {
  const unwrappedParams = use(params);
  const videoPath = unwrappedParams.path.join('/');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [subtitleTracks, setSubtitleTracks] = useState<string[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>('');

  // 여러 자막 파일 경로 생성
  const basePathWithoutExt = videoPath.replace(/\.[^/.]+$/, "");
  const possibleSubtitlePaths = {
    vtt: `${basePathWithoutExt}.vtt`,
  };

  // 사용 가능한 자막 파일 확인
  useEffect(() => {
    const checkSubtitleAvailability = async () => {
      const availableTracks = [];
      for (const [format, path] of Object.entries(possibleSubtitlePaths)) {
        try {
          const response = await fetch(`/api/video/${path}`);
          if (response.ok) {
            availableTracks.push(path);
          }
        } catch (error) {
          console.log(`${format} 자막 파일 없음:`, path);
        }
      }
      setSubtitleTracks(availableTracks);
      if (availableTracks.length > 0) {
        setCurrentSubtitle(availableTracks[0]);
      }
    };

    checkSubtitleAvailability();
  }, [videoPath]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleSubtitles = () => {
    if (videoRef.current && videoRef.current.textTracks.length > 0) {
      videoRef.current.textTracks[0].mode = showSubtitles ? 'hidden' : 'showing';
      setShowSubtitles(!showSubtitles);
    }
  };

  const changeSubtitle = (trackPath: string) => {
    setCurrentSubtitle(trackPath);
    // 자막 변경 시 자막 표시 상태 유지
    if (videoRef.current && videoRef.current.textTracks.length > 0) {
      setTimeout(() => {
        if (videoRef.current && videoRef.current.textTracks.length > 0) {
          videoRef.current.textTracks[0].mode = showSubtitles ? 'showing' : 'hidden';
        }
      }, 100);
    }
  };

  return (
    <div className="container mx-auto p-4 w-full">
      <div className="aspect-video w-full">
        <video 
          ref={videoRef}
          controls 
          className="w-full h-full object-fill"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={`/api/video/${videoPath}`} type="video/mp4" />
          {currentSubtitle && (
            <track 
              kind="subtitles" 
              src={`/api/video/${currentSubtitle}`} 
              label="한국어" 
              srcLang="ko" 
              default={showSubtitles}
            />
          )}
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}