import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ContentPlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  
  const [content, setContent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
    recordViewStart();
  }, [id]);

  async function fetchContent() {
    setLoading(true);
    // TODO: GET /contents/{id} API 호출
    
    setTimeout(() => {
      const mockContent = {
        id: parseInt(id),
        title: "5분 명상으로 마음 챙기기",
        contentType: "VIDEO",
        url: "https://example.com/video.mp4", // 실제로는 비디오 URL
      };
      
      setContent(mockContent);
      setDuration(300); // 5분 = 300초
      setLoading(false);
    }, 500);
  }

  async function recordViewStart() {
    // TODO: POST /contents/{id}/views API 호출
    console.log("콘텐츠 시청 시작:", id);
  }

  async function recordViewComplete() {
    // TODO: POST /contents/{id}/views/complete API 호출
    console.log("콘텐츠 시청 완료:", id);
  }

  function handlePlayPause() {
    setIsPlaying(!isPlaying);
    // 실제 비디오 재생/일시정지 처리
  }

  function handleSeek(e) {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    // 실제 비디오 시간 변경
  }

  function handleVolumeChange(e) {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    // 실제 비디오 볼륨 변경
  }

  function handleFullscreen() {
    setIsFullscreen(!isFullscreen);
    // 실제 전체화면 처리
  }

  function handleComplete() {
    recordViewComplete();
    alert("콘텐츠 시청을 완료했습니다! 🎉");
    navigate("/");
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  if (loading) {
    return (
      <main className="flex-grow w-full bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
          <p>콘텐츠를 불러오는 중...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow w-full bg-black flex flex-col">
      {/* 플레이어 영역 */}
      <div className="flex-grow flex items-center justify-center relative">
        {/* Mock 비디오 플레이어 */}
        <div className="w-full h-full max-w-6xl mx-auto bg-gray-900 flex items-center justify-center relative">
          <div className="text-white text-center">
            <div className="text-9xl mb-8">🧘</div>
            <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
            <p className="text-lg text-gray-300 mb-8">
              {isPlaying ? "재생 중..." : "일시정지"}
            </p>
            
            {/* 실제로는 react-player 또는 video 태그 사용 */}
            {/* <ReactPlayer
              ref={videoRef}
              url={content.url}
              playing={isPlaying}
              volume={volume}
              onProgress={(state) => setCurrentTime(state.playedSeconds)}
              onDuration={(duration) => setDuration(duration)}
              onEnded={handleComplete}
              width="100%"
              height="100%"
            /> */}
          </div>

          {/* 닫기 버튼 */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white text-2xl transition-all"
          >
            ✕
          </button>
        </div>
      </div>

      {/* 컨트롤 바 */}
      <div className="bg-gray-900 border-t border-gray-700 px-6 py-4">
        {/* 진행 바 */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* 컨트롤 버튼 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* 재생/일시정지 */}
            <button
              onClick={handlePlayPause}
              className="w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center text-white text-xl transition-all"
            >
              {isPlaying ? "⏸" : "▶"}
            </button>

            {/* 시간 표시 */}
            <span className="text-white font-medium">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* 볼륨 */}
            <div className="flex items-center gap-2">
              <span className="text-white text-xl">
                {volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* 전체화면 */}
            <button
              onClick={handleFullscreen}
              className="text-white text-2xl hover:text-purple-400 transition-colors"
            >
              {isFullscreen ? "⛶" : "⛶"}
            </button>

            {/* 완료 버튼 */}
            <button
              onClick={handleComplete}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
            >
              완료
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #8B5CF6;
          border-radius: 50%;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #8B5CF6;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </main>
  );
}
