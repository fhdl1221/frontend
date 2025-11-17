import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoutineCard from "../components/RoutineCard";
import { getWeeklyAnalytics } from "../utils/api";

export default function RecoveryRoutinePage() {
  const navigate = useNavigate();

  const [weeklyAnalysis, setWeeklyAnalysis] = useState(null);
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiMessage, setAiMessage] = useState("");

  useEffect(() => {
    fetchWeeklyData();
  }, []);

  async function fetchWeeklyData() {
    setLoading(true);
    // TODO: GET /analytics/weekly API 호출
    // TODO: GET /routines API 호출

    try {
      const response = await getWeeklyAnalytics();
      const data = response.data;

      setWeeklyAnalysis({
        averageStress: data.averageStress,
        peakTime: data.peakTime,
        mainCause: data.mainCause,
        checkInRate: data.checkInRate,
      });

      setAiMessage(data.analysisBasis);
      setRoutines(data.recommendedRoutines);
    } catch (error) {
      console.error("주간 분석 데이터 로드 실패:", error);
      // 에러 발생 시 Mock 데이터와 유사한 기본값 설정
      setWeeklyAnalysis({
        averageStress: 0,
        peakTime: "N/A",
        mainCause: "오류 발생",
        checkInRate: 0,
      });
      setAiMessage("데이터를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleRoutine(routineId, currentState) {
    // TODO: PATCH /routines/{routineId} API 호출
    setRoutines((prev) =>
      prev.map((routine) =>
        routine.id === routineId
          ? { ...routine, isActive: !currentState }
          : routine
      )
    );
  }

  async function handleCompleteRoutine(routineId) {
    // TODO: POST /routines/{routineId}/complete API 호출
    alert("루틴 완료! 🎉");
  }

  async function handleApplyRoutines() {
    const activeRoutines = routines.filter((r) => r.isActive);
    if (activeRoutines.length === 0) {
      alert("최소 1개의 루틴을 활성화해주세요");
      return;
    }

    // TODO: 루틴 적용 API 호출
    alert(`${activeRoutines.length}개의 루틴이 적용되었습니다!`);
    navigate("/");
  }

  if (loading) {
    return (
      <main className="flex-grow w-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">루틴을 불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (!weeklyAnalysis) {
    return (
      <main className="flex-grow w-full bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">데이터를 불러오지 못했습니다.</p>
      </main>
    );
  }

  return (
    <main className="flex-grow w-full bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-purple-600 hover:text-purple-700 font-medium mb-4 inline-flex items-center gap-2"
          >
            <span>←</span>
            <span>홈으로 돌아가기</span>
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            회복 루틴 🎯
          </h1>
          <p className="text-lg text-gray-600">당신을 위한 맞춤형 일상 루틴</p>
        </div>

        {/* 지난주 분석 */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 mb-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl font-bold">지난주 분석 결과</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <div className="text-sm opacity-90 mb-1">평균 스트레스</div>
              <div className="text-3xl font-bold">
                {weeklyAnalysis.averageStress}/5
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <div className="text-sm opacity-90 mb-1">피크 시간</div>
              <div className="text-lg font-bold">{weeklyAnalysis.peakTime}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <div className="text-sm opacity-90 mb-1">주요 원인</div>
              <div className="text-lg font-bold">
                {weeklyAnalysis.mainCause}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <div className="text-sm opacity-90 mb-1">체크인 완료율</div>
              <div className="text-3xl font-bold">
                {weeklyAnalysis.checkInRate}%
              </div>
            </div>
          </div>
        </div>

        {/* 추천 메시지 */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-100">
          <div className="flex items-start gap-4">
            <span className="text-3xl">💡</span>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">AI 추천</h3>
              <p className="text-gray-700 leading-relaxed">
                지난주 데이터를 분석한 결과, <strong>오후 시간대</strong>에
                스트레스가 높았어요. 이 시간대 전후로 루틴을 실천하면 효과적으로
                스트레스를 관리할 수 있습니다. 특히 <strong>짧은 산책</strong>과{" "}
                <strong>호흡 운동</strong>이 도움이 될 거예요!
              </p>
            </div>
          </div>
        </div>

        {/* 이번 주 루틴 목록 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            이번 주 추천 루틴
          </h2>
          <div className="space-y-4">
            {routines.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                onToggle={handleToggleRoutine}
                onComplete={handleCompleteRoutine}
              />
            ))}
          </div>
        </div>

        {/* 루틴 통계 */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-8 border border-green-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span>🏆</span>
            <span>이번 주 성과</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {routines.filter((r) => r.isActive).length}
              </div>
              <div className="text-sm text-gray-600">활성 루틴</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {Math.max(...routines.map((r) => r.streak))}
              </div>
              <div className="text-sm text-gray-600">최고 연속 일수</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {Math.round(
                  routines.reduce((acc, r) => acc + r.completionRate, 0) /
                    routines.length
                )}
                %
              </div>
              <div className="text-sm text-gray-600">평균 완료율</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {routines.filter((r) => r.completionRate >= 80).length}
              </div>
              <div className="text-sm text-gray-600">우수 루틴</div>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleApplyRoutines}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl text-lg font-bold hover:shadow-xl transition-all"
          >
            루틴 적용하기
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-white text-gray-700 border-2 border-gray-300 py-4 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all"
          >
            나중에 하기
          </button>
        </div>

        {/* 안내 */}
        <div className="mt-6 text-center text-sm text-gray-500">
          루틴은 언제든지 설정에서 수정할 수 있습니다
        </div>
      </div>
    </main>
  );
}
