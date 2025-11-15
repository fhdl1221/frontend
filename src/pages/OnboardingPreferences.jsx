import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function OnboardingPreferences() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state || {};

  const [preferences, setPreferences] = useState({
    video: false,
    text: false,
    audio: false,
  });

  const togglePreference = (type) => {
    setPreferences((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleNext = () => {
    if (!preferences.video && !preferences.text && !preferences.audio) {
      alert("최소 하나의 콘텐츠 타입을 선택해주세요");
      return;
    }
    navigate("/onboarding/notification", {
      state: { ...userData, preferences },
    });
  };

  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8 flex flex-col">
      {/* 진행바 */}
      <div className="flex gap-2 mb-8">
        <div className="flex-1 h-1 bg-gray-300 rounded"></div>
        <div className="flex-1 h-1 bg-gray-300 rounded"></div>
        <div className="flex-1 h-1 bg-black rounded"></div>
      </div>

      {/* 제목 */}
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-4">마지막 질문!</h2>
        <p className="text-lg text-gray-600 mb-12">
          선호하는 콘텐츠 타입은 무엇인가요?
        </p>

        {/* 선택 옵션 */}
        <div className="w-full max-w-md space-y-4">
          <button
            onClick={() => togglePreference("video")}
            className={`w-full px-6 py-4 rounded-xl text-lg font-semibold flex items-center gap-4 transition ${
              preferences.video
                ? "bg-gray-400 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <div
              className={`w-6 h-6 rounded flex items-center justify-center ${
                preferences.video ? "bg-white" : "bg-white border-2 border-gray-300"
              }`}
            >
              {preferences.video && <span className="text-gray-600">✓</span>}
            </div>
            <span className="text-2xl">📹</span>
            <span>영상</span>
          </button>

          <button
            onClick={() => togglePreference("text")}
            className={`w-full px-6 py-4 rounded-xl text-lg font-semibold flex items-center gap-4 transition ${
              preferences.text
                ? "bg-gray-400 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <div
              className={`w-6 h-6 rounded flex items-center justify-center ${
                preferences.text ? "bg-white" : "bg-white border-2 border-gray-300"
              }`}
            >
              {preferences.text && <span className="text-gray-600">✓</span>}
            </div>
            <span className="text-2xl">📄</span>
            <span>텍스트</span>
          </button>

          <button
            onClick={() => togglePreference("audio")}
            className={`w-full px-6 py-4 rounded-xl text-lg font-semibold flex items-center gap-4 transition ${
              preferences.audio
                ? "bg-gray-400 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <div
              className={`w-6 h-6 rounded flex items-center justify-center ${
                preferences.audio ? "bg-white" : "bg-white border-2 border-gray-300"
              }`}
            >
              {preferences.audio && <span className="text-gray-600">✓</span>}
            </div>
            <span className="text-2xl">🎧</span>
            <span>음성</span>
          </button>
        </div>
      </div>

      {/* 버튼 */}
      <div className="space-y-3 mt-8">
        <button
          onClick={handleNext}
          className="w-full py-4 bg-gray-300 text-black font-bold rounded-xl text-lg hover:bg-gray-400 transition"
        >
          다음
        </button>
        <button
          onClick={handlePrev}
          className="w-full py-4 bg-gray-200 text-black font-bold rounded-xl text-lg hover:bg-gray-300 transition"
        >
          이전
        </button>
      </div>
    </div>
  );
}