import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ContentCard from "../components/ContentCard";
import StressAlertModal from "../components/StressAlertModal";

export default function HomePage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  
  const [todayCheckIn, setTodayCheckIn] = useState(null);
  const [recommendedContents, setRecommendedContents] = useState([]);
  const [showStressAlert, setShowStressAlert] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodayCheckIn();
    fetchRecommendedContents();
  }, []);

  // Mock 데이터 - 실제로는 API 호출
  async function fetchTodayCheckIn() {
    setLoading(true);
    // TODO: GET /check-in/today API 호출
    setTimeout(() => {
      const mockData = {
        stressLevel: 3,
        emoji: "😐",
        createdAt: new Date().toISOString(),
      };
      setTodayCheckIn(mockData);
      setLoading(false);
    }, 500);
  }

  async function fetchRecommendedContents() {
    // TODO: GET /recommendations API 호출
    setTimeout(() => {
      const mockContents = [
        {
          id: 1,
          title: "5분 명상으로 마음 챙기기",
          description: "바쁜 일상 속 짧은 휴식",
          contentType: "VIDEO",
          duration: "5분",
          thumbnailUrl: "🧘",
          targetStressCause: "업무 과다",
        },
        {
          id: 2,
          title: "박스 호흡법 가이드",
          description: "즉각적인 스트레스 완화",
          contentType: "AUDIO",
          duration: "8분",
          thumbnailUrl: "🌬️",
          targetStressCause: "회의",
        },
        {
          id: 3,
          title: "스트레스 관리 7가지 팁",
          description: "일상에서 실천하는 방법",
          contentType: "TEXT",
          duration: "3분",
          thumbnailUrl: "📖",
          targetStressCause: "마감일",
        },
      ];
      setRecommendedContents(mockContents);
    }, 300);
  }

  const getStressEmoji = (level) => {
    const emojis = ["", "😊", "🙂", "😐", "😟", "😢"];
    return emojis[level] || "😐";
  };

  const getStressLevel = (level) => {
    const levels = ["", "매우 좋음", "좋음", "보통", "나쁨", "매우 나쁨"];
    return levels[level] || "보통";
  };

  const getStressColor = (level) => {
    if (level <= 2) return "from-green-400 to-emerald-500";
    if (level === 3) return "from-yellow-400 to-orange-400";
    return "from-orange-500 to-red-500";
  };

  return (
    <main className="flex-grow w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 환영 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            안녕하세요, {user?.username || "사용자"}님! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            오늘도 마음 건강을 챙기는 하루 되세요
          </p>
        </div>

        {/* 체크인 상태 카드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 오늘의 체크인 */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">오늘의 컨디션</h2>
              <button
                onClick={() => navigate("/check-in")}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                {todayCheckIn ? "수정하기" : "체크인하기"} →
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            ) : todayCheckIn ? (
              <div className={`bg-gradient-to-br ${getStressColor(todayCheckIn.stressLevel)} rounded-xl p-6 text-white`}>
                <div className="flex items-center gap-6">
                  <div className="text-6xl">{getStressEmoji(todayCheckIn.stressLevel)}</div>
                  <div className="flex-1">
                    <div className="text-sm opacity-90 mb-1">현재 스트레스 레벨</div>
                    <div className="text-3xl font-bold mb-2">
                      {getStressLevel(todayCheckIn.stressLevel)}
                    </div>
                    <div className="text-sm opacity-80">
                      {new Date(todayCheckIn.createdAt).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })} 체크인 완료
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold">{todayCheckIn.stressLevel}</div>
                    <div className="text-sm opacity-90">/5</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-8 text-white text-center">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="text-xl font-semibold mb-2">아직 체크인하지 않았어요</h3>
                <p className="text-purple-100 mb-6">오늘의 컨디션을 기록해보세요</p>
                <button
                  onClick={() => navigate("/check-in")}
                  className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all"
                >
                  지금 체크인하기
                </button>
              </div>
            )}
          </div>

          {/* 빠른 액션 */}
          <div className="space-y-4">
            <div
              onClick={() => navigate("/chatbot")}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-3xl">
                  💬
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">AI 상담</h3>
                  <p className="text-sm text-gray-600">챗봇과 대화하기</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => navigate("/statistics")}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-3xl">
                  📈
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">내 통계</h3>
                  <p className="text-sm text-gray-600">스트레스 분석</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => navigate("/routine")}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-3xl">
                  🎯
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">회복 루틴</h3>
                  <p className="text-sm text-gray-600">맞춤 루틴 보기</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 추천 콘텐츠 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">추천 콘텐츠</h2>
              <p className="text-gray-600">당신을 위한 맞춤 마음챙김 콘텐츠</p>
            </div>
            <button
              onClick={() => navigate("/saved-contents")}
              className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
            >
              <span>저장된 콘텐츠</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedContents.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        </div>

        {/* 주간 요약 */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
              📊
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">이번 주 요약</h3>
              <p className="text-gray-600">지난 7일간의 기록</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-1">6/7</div>
              <div className="text-sm text-gray-600">체크인 완료</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">3.2</div>
              <div className="text-sm text-gray-600">평균 스트레스</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">8↓</div>
              <div className="text-sm text-gray-600">지난주 대비</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">12</div>
              <div className="text-sm text-gray-600">콘텐츠 시청</div>
            </div>
          </div>

          <button
            onClick={() => navigate("/statistics")}
            className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            자세한 통계 보기
          </button>
        </div>
      </div>

      {/* 스트레스 알림 모달 */}
      <StressAlertModal
        isOpen={showStressAlert}
        onClose={() => setShowStressAlert(false)}
        onAccept={() => {
          setShowStressAlert(false);
          navigate("/chatbot");
        }}
      />
    </main>
  );
}
