import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContentCard from "../components/ContentCard";

export default function SavedContentsPage() {
  const navigate = useNavigate();
  
  const [savedContents, setSavedContents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedContents();
  }, []);

  async function fetchSavedContents() {
    setLoading(true);
    // TODO: GET /contents/saved API 호출
    
    setTimeout(() => {
      const mockContents = [
        {
          id: 1,
          title: "5분 명상으로 마음 챙기기",
          description: "바쁜 일상 속 짧은 휴식",
          contentType: "VIDEO",
          duration: "5분",
          thumbnailUrl: "🧘",
          savedAt: "2025-11-14",
          isViewed: true,
        },
        {
          id: 2,
          title: "박스 호흡법 가이드",
          description: "즉각적인 스트레스 완화",
          contentType: "AUDIO",
          duration: "8분",
          thumbnailUrl: "🌬️",
          savedAt: "2025-11-13",
          isViewed: true,
        },
        {
          id: 3,
          title: "스트레스 관리 7가지 팁",
          description: "일상에서 실천하는 방법",
          contentType: "TEXT",
          duration: "3분",
          thumbnailUrl: "📖",
          savedAt: "2025-11-12",
          isViewed: false,
        },
      ];
      
      setSavedContents(mockContents);
      setLoading(false);
    }, 500);
  }

  async function handleUnsave(contentId) {
    if (!confirm("저장을 취소하시겠습니까?")) return;
    
    // TODO: DELETE /contents/{contentId}/save API 호출
    setSavedContents((prev) => prev.filter((content) => content.id !== contentId));
  }

  const filteredContents = savedContents.filter((content) => {
    if (filter === "all") return true;
    return content.contentType.toLowerCase() === filter;
  });

  const filterButtons = [
    { value: "all", label: "전체", icon: "📚" },
    { value: "video", label: "영상", icon: "🎥" },
    { value: "audio", label: "오디오", icon: "🎧" },
    { value: "text", label: "글", icon: "📖" },
  ];

  if (loading) {
    return (
      <main className="flex-grow w-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">저장된 콘텐츠를 불러오는 중...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow w-full bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-purple-600 hover:text-purple-700 font-medium mb-4 inline-flex items-center gap-2"
          >
            <span>←</span>
            <span>홈으로 돌아가기</span>
          </button>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">저장된 콘텐츠 ❤️</h1>
              <p className="text-lg text-gray-600">나중에 볼 콘텐츠 ({savedContents.length}개)</p>
            </div>
          </div>
        </div>

        {/* 필터 버튼 */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                filter === btn.value
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300"
              }`}
            >
              <span>{btn.icon}</span>
              <span>{btn.label}</span>
            </button>
          ))}
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {savedContents.length}
            </div>
            <div className="text-sm text-gray-600">전체 저장</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {savedContents.filter((c) => c.isViewed).length}
            </div>
            <div className="text-sm text-gray-600">시청 완료</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {savedContents.filter((c) => !c.isViewed).length}
            </div>
            <div className="text-sm text-gray-600">미시청</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {savedContents.length > 0 
                ? Math.round((savedContents.filter((c) => c.isViewed).length / savedContents.length) * 100)
                : 0}%
            </div>
            <div className="text-sm text-gray-600">완료율</div>
          </div>
        </div>

        {/* 콘텐츠 목록 */}
        {filteredContents.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">저장된 콘텐츠가 없습니다</h3>
            <p className="text-gray-600 mb-6">마음에 드는 콘텐츠를 저장해보세요</p>
            <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              콘텐츠 둘러보기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContents.map((content) => (
              <div key={content.id} className="relative group">
                <ContentCard content={content} />
                
                {/* 시청 완료 뱃지 */}
                {content.isViewed && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <span>✓</span>
                    <span>시청완료</span>
                  </div>
                )}
                
                {/* 삭제 버튼 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnsave(content.id);
                  }}
                  className="absolute top-4 left-4 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                >
                  ✕
                </button>
                
                {/* 저장 날짜 */}
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs">
                  {content.savedAt}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 안내 메시지 */}
        {savedContents.length > 0 && (
          <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-start gap-4">
              <div className="text-3xl">💡</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">팁</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 저장한 콘텐츠는 언제든지 다시 볼 수 있어요</li>
                  <li>• 시청 완료한 콘텐츠는 통계에 반영됩니다</li>
                  <li>• 필요없는 콘텐츠는 저장을 취소할 수 있어요</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
