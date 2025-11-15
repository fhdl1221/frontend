import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StressChart from "../components/StressChart";

export default function StatisticsPage() {
  const navigate = useNavigate();
  
  const [period, setPeriod] = useState(7); // 7, 30, 90일
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [period]);

  async function fetchDashboardData() {
    setLoading(true);
    // TODO: GET /analytics/dashboard?period={period} API 호출
    
    setTimeout(() => {
      const mockData = {
        averageStress: 3.2,
        comparisonPercentage: -8, // 지난 기간 대비 8% 감소
        checkInCount: period === 7 ? 6 : period === 30 ? 24 : 78,
        totalDays: period === 7 ? 7 : period === 30 ? 30 : 90,
        dailyStress: generateMockDailyData(period),
        weeklyStress: [
          { day: "월", value: 3.5 },
          { day: "화", value: 3.2 },
          { day: "수", value: 2.8 },
          { day: "목", value: 3.7 },
          { day: "금", value: 4.1 },
          { day: "토", value: 2.5 },
          { day: "일", value: 2.3 },
        ],
        stressCauses: [
          { name: "업무 과다", value: 35, color: "#F59E0B" },
          { name: "회의", value: 25, color: "#EF4444" },
          { name: "마감일", value: 20, color: "#8B5CF6" },
          { name: "소통 문제", value: 12, color: "#3B82F6" },
          { name: "기타", value: 8, color: "#10B981" },
        ],
        contentViews: [
          { title: "5분 명상", date: "2025-11-14", completed: true },
          { title: "박스 호흡법", date: "2025-11-13", completed: true },
          { title: "스트레스 관리 팁", date: "2025-11-12", completed: false },
        ],
      };
      
      setDashboardData(mockData);
      setLoading(false);
    }, 800);
  }

  function generateMockDailyData(days) {
    const data = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
        value: Math.floor(Math.random() * 3) + 2, // 2-5 사이 랜덤
      });
    }
    return data;
  }

  if (loading) {
    return (
      <main className="flex-grow w-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">통계를 불러오는 중...</p>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">내 통계 📊</h1>
          <p className="text-lg text-gray-600">스트레스 패턴을 분석해보세요</p>
        </div>

        {/* 기간 선택 */}
        <div className="flex gap-3 mb-8">
          {[7, 30, 90].map((days) => (
            <button
              key={days}
              onClick={() => setPeriod(days)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                period === days
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300"
              }`}
            >
              {days}일
            </button>
          ))}
        </div>

        {/* 요약 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm opacity-90 mb-2">평균 스트레스 레벨</div>
            <div className="text-4xl font-bold mb-2">{dashboardData.averageStress}/5</div>
            <div className="flex items-center gap-2 text-sm">
              <span className={dashboardData.comparisonPercentage < 0 ? "text-green-200" : "text-red-200"}>
                {dashboardData.comparisonPercentage < 0 ? "📉" : "📈"}
              </span>
              <span>
                지난 기간 대비 {Math.abs(dashboardData.comparisonPercentage)}% 
                {dashboardData.comparisonPercentage < 0 ? " 감소" : " 증가"}
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm opacity-90 mb-2">체크인 완료</div>
            <div className="text-4xl font-bold mb-2">
              {dashboardData.checkInCount}/{dashboardData.totalDays}
            </div>
            <div className="text-sm">
              {((dashboardData.checkInCount / dashboardData.totalDays) * 100).toFixed(0)}% 완료율
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm opacity-90 mb-2">콘텐츠 시청</div>
            <div className="text-4xl font-bold mb-2">{dashboardData.contentViews.length}</div>
            <div className="text-sm">마음챙김 활동 횟수</div>
          </div>
        </div>

        {/* 일별 스트레스 추이 차트 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">일별 스트레스 추이</h2>
          <StressChart data={dashboardData.dailyStress} type="line" />
        </div>

        {/* 요일별 평균 스트레스 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">요일별 평균 스트레스</h2>
          <StressChart data={dashboardData.weeklyStress} type="bar" />
        </div>

        {/* 스트레스 원인 분석 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">주요 스트레스 원인</h2>
            <div className="space-y-4">
              {dashboardData.stressCauses.map((cause, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium">{cause.name}</span>
                    <span className="text-gray-900 font-bold">{cause.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{
                        width: `${cause.value}%`,
                        backgroundColor: cause.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 최근 시청 콘텐츠 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">최근 시청한 콘텐츠</h2>
            <div className="space-y-3">
              {dashboardData.contentViews.map((view, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
                >
                  <div>
                    <div className="font-semibold text-gray-900">{view.title}</div>
                    <div className="text-sm text-gray-600">{view.date}</div>
                  </div>
                  <div>
                    {view.completed ? (
                      <span className="text-green-600 text-xl">✓</span>
                    ) : (
                      <span className="text-gray-400 text-xl">○</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 인사이트 */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI 인사이트</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 금요일에 스트레스가 가장 높은 경향이 있어요</li>
                <li>• 업무 과다가 주요 원인이에요. 업무 시간 관리를 개선해보세요</li>
                <li>• 이번 주 체크인 완료율이 우수해요! 계속 유지하세요</li>
                <li>• 명상 콘텐츠를 시청한 날 스트레스가 평균 15% 낮았어요</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
