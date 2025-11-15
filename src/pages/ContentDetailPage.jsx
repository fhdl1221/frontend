import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ContentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [content, setContent] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContentDetail();
  }, [id]);

  async function fetchContentDetail() {
    setLoading(true);
    // TODO: GET /contents/{id} API 호출
    
    setTimeout(() => {
      const mockContent = {
        id: parseInt(id),
        title: "5분 명상으로 마음 챙기기",
        description: "바쁜 일상 속에서 짧은 시간 동안 마음의 평화를 찾아보세요. 이 명상 세션은 호흡에 집중하여 현재 순간에 머무르는 연습을 도와줍니다.",
        contentType: "VIDEO",
        duration: "5분",
        thumbnailUrl: "🧘",
        url: "https://example.com/video/meditation-5min.mp4",
        targetPosition: "전 직원",
        targetStressCause: "업무 과다, 회의",
        rating: 4.8,
        viewCount: 1234,
        benefits: [
          "스트레스 감소",
          "집중력 향상",
          "마음의 평화",
          "감정 조절 능력 향상",
        ],
        instructor: "김명상 코치",
        tags: ["명상", "호흡", "마음챙김", "초보자"],
      };
      
      setContent(mockContent);
      setIsSaved(false);
      setLoading(false);
    }, 500);
  }

  async function handleSaveContent() {
    // TODO: POST /contents/{id}/save API 호출
    setIsSaved(!isSaved);
    alert(isSaved ? "저장이 취소되었습니다" : "저장되었습니다!");
  }

  async function handleStartContent() {
    // TODO: POST /contents/{id}/views API 호출
    navigate(`/contents/${id}/player`);
  }

  if (loading) {
    return (
      <main className="flex-grow w-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">콘텐츠를 불러오는 중...</p>
        </div>
      </main>
    );
  }

  const getContentTypeIcon = (type) => {
    const icons = {
      VIDEO: "🎥",
      AUDIO: "🎧",
      TEXT: "📖",
    };
    return icons[type] || "📄";
  };

  const getContentTypeName = (type) => {
    const names = {
      VIDEO: "영상",
      AUDIO: "오디오",
      TEXT: "글",
    };
    return names[type] || "콘텐츠";
  };

  return (
    <main className="flex-grow w-full bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 뒤로가기 */}
        <button
          onClick={() => navigate(-1)}
          className="text-purple-600 hover:text-purple-700 font-medium mb-6 inline-flex items-center gap-2"
        >
          <span>←</span>
          <span>뒤로가기</span>
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* 썸네일 영역 */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-80 flex items-center justify-center relative">
            <div className="text-9xl">{content.thumbnailUrl}</div>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold text-gray-900">
              {getContentTypeIcon(content.contentType)} {getContentTypeName(content.contentType)}
            </div>
          </div>

          {/* 콘텐츠 정보 */}
          <div className="p-8">
            {/* 제목 & 메타 */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {content.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  ⏱️ {content.duration}
                </span>
                <span className="flex items-center gap-1">
                  ⭐ {content.rating}
                </span>
                <span className="flex items-center gap-1">
                  👁️ {content.viewCount.toLocaleString()} 조회
                </span>
                <span className="flex items-center gap-1">
                  👤 {content.instructor}
                </span>
              </div>
            </div>

            {/* 설명 */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">콘텐츠 소개</h2>
              <p className="text-gray-700 leading-relaxed">{content.description}</p>
            </div>

            {/* 효과 */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">기대 효과</h2>
              <div className="grid grid-cols-2 gap-3">
                {content.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-green-50 px-4 py-3 rounded-xl border border-green-100"
                  >
                    <span className="text-green-600">✓</span>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 추천 대상 */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">추천 대상</h2>
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-purple-600">👥</span>
                  <span className="font-semibold text-gray-900">직급:</span>
                  <span className="text-gray-700">{content.targetPosition}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-600">🎯</span>
                  <span className="font-semibold text-gray-900">스트레스 원인:</span>
                  <span className="text-gray-700">{content.targetStressCause}</span>
                </div>
              </div>
            </div>

            {/* 태그 */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleStartContent}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl text-lg font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>▶</span>
                <span>재생하기</span>
              </button>
              <button
                onClick={handleSaveContent}
                className={`flex-1 sm:flex-initial sm:w-auto px-8 py-4 rounded-xl text-lg font-bold transition-all border-2 ${
                  isSaved
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-purple-600 border-purple-600 hover:bg-purple-50"
                }`}
              >
                {isSaved ? "❤️ 저장됨" : "🤍 저장"}
              </button>
            </div>
          </div>
        </div>

        {/* 관련 콘텐츠 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">비슷한 콘텐츠</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all"
                onClick={() => navigate(`/contents/${i + 10}`)}
              >
                <div className="bg-gradient-to-br from-blue-400 to-cyan-500 h-32 rounded-xl flex items-center justify-center text-5xl mb-3">
                  🌬️
                </div>
                <h3 className="font-bold text-gray-900 mb-1">호흡 운동 {i}</h3>
                <p className="text-sm text-gray-600 mb-2">스트레스 완화</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>⏱️ 8분</span>
                  <span>⭐ 4.9</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
