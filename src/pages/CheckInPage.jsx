import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StressEmojiSelector from "../components/StressEmojiSelector";
import StressCauseSelector from "../components/StressCauseSelector";
import StressAlertModal from "../components/StressAlertModal";
import { getTodayCheckIn, createCheckIn } from "../utils/api";

export default function CheckInPage() {
  const navigate = useNavigate();

  const [stressLevel, setStressLevel] = useState(null);
  const [stressCauses, setStressCauses] = useState([]);
  const [memo, setMemo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todayCheckIn, setTodayCheckIn] = useState(null);

  useEffect(() => {
    checkTodayCheckIn();
  }, []);

  async function checkTodayCheckIn() {
    // TODO: GET /check-in/today API 호출
    // 이미 체크인했으면 데이터 불러오기
    // setTimeout(() => {
    //   // Mock: 오늘 체크인 안함
    //   setTodayCheckIn(null);
    // }, 300);
    setIsSubmitting(true);
    try {
      const response = await getTodayCheckIn();

      if (response.data) {
        const data = response.data;
        setTodayCheckIn(data);

        setStressLevel(data.stressLevel);
        setStressCauses(data.stressCauses);
        setMemo(data.memo);
      } else {
        setTodayCheckIn(null);
      }
    } catch (error) {
      console.error("오늘 체크인 정보 조회 실패:", error);
      setTodayCheckIn(null);
    } finally {
      setIsSubmitting(false); // 로딩 완료
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (todayCheckIn) {
      alert("오늘은 이미 체크인했습니다.");
      return;
    }

    if (!stressLevel) {
      alert("스트레스 레벨을 선택해주세요");
      return;
    }

    if (stressCauses.length === 0) {
      alert("스트레스 원인을 최소 1개 선택해주세요");
      return;
    }

    setIsSubmitting(true);

    // TODO: POST /check-in API 호출
    const checkInData = {
      stressLevel,
      stressCauses,
      memo,
    };

    console.log("체크인 데이터:", checkInData);

    try {
      // 요구사항 1: 데이터 저장
      const response = await createCheckIn(checkInData);
      console.log("체크인 성공:", response.data);

      setIsSubmitting(false);

      if (stressLevel >= 4) {
        setShowAlert(true);
      } else {
        alert("체크인이 완료되었습니다!");
        navigate("/");
      }
    } catch (error) {
      setIsSubmitting(false);
      // 요구사항 2: 하루 한 번 제한 (409 Conflict)
      if (error.response?.status === 409) {
        alert("오늘은 이미 체크인했습니다. 홈으로 이동합니다.");
        navigate("/");
      } else {
        console.error("체크인 실패:", error);
        alert("체크인 중 오류가 발생했습니다.");
      }
    }
  }

  return (
    <main className="flex-grow w-full bg-gradient-to-br from-indigo-50 to-purple-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-purple-600 hover:text-purple-700 font-medium mb-4 inline-flex items-center gap-2"
          >
            <span>←</span>
            <span>홈으로 돌아가기</span>
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">일일 체크인</h1>
          <p className="text-lg text-gray-600">오늘의 컨디션을 기록해보세요</p>
        </div>

        {/* 체크인 폼 */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
        >
          {/* [추가] 이미 체크인한 경우 안내 메시지 */}
          {todayCheckIn && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
              <strong>오늘은 이미 체크인을 완료했습니다.</strong>
              <p className="text-sm">
                (기록 시간: {new Date(todayCheckIn.createdAt).toLocaleString()})
              </p>
            </div>
          )}

          {/* 1. 스트레스 레벨 선택 */}
          <div className="mb-10">
            <label className="block text-lg font-bold text-gray-900 mb-4">
              1. 오늘의 스트레스 레벨은 어떤가요?
            </label>
            <StressEmojiSelector
              selectedLevel={stressLevel}
              onSelect={setStressLevel}
              disabled={todayCheckIn != null}
            />
          </div>

          {/* 2. 스트레스 원인 선택 */}
          {/* [수정] 스트레스 레벨이 있거나, 이미 체크인한 경우 표시 */}
          {(stressLevel || todayCheckIn) && (
            <div className="mb-10 animate-fadeIn">
              <label className="block text-lg font-bold text-gray-900 mb-4">
                2. 스트레스의 주요 원인은 무엇인가요?
              </label>
              <StressCauseSelector
                selectedCauses={stressCauses}
                onSelect={setStressCauses}
                disabled={todayCheckIn != null} // [수정] 조회 모드 시 비활성화
              />
            </div>
          )}

          {/* 3. 메모 입력 */}
          {/* [수정] 스트레스 원인이 있거나, 이미 체크인한 경우 표시 */}
          {(stressCauses.length > 0 || todayCheckIn) && (
            <div className="mb-8 animate-fadeIn">
              <label className="block text-lg font-bold text-gray-900 mb-4">
                3. 추가로 기록하고 싶은 내용이 있나요? (선택)
              </label>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder={
                  todayCheckIn
                    ? "(저장된 메모)"
                    : "예: 오늘은 회의가 많아서 힘들었어요..."
                }
                className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none text-gray-700 disabled:bg-gray-50 disabled:text-gray-600"
                disabled={todayCheckIn != null} // [수정] 조회 모드 시 비활성화
              />
              <p className="text-sm text-gray-500 mt-2">{memo.length} / 500</p>
            </div>
          )}

          {/* 제출 버튼 */}
          {/* [수정] 오늘 체크인을 안 했고, 원인을 선택한 경우에만 표시 */}
          {!todayCheckIn && stressCauses.length > 0 && (
            <div className="animate-fadeIn">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl text-lg font-bold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    {todayCheckIn ? "로딩 중..." : "저장 중..."}
                  </span>
                ) : (
                  "체크인 완료"
                )}
              </button>
            </div>
          )}
        </form>

        {/* 안내 문구 */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="text-3xl">💡</div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">체크인 팁</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 하루에 한 번만 체크인할 수 있어요</li>
                <li>• 솔직하게 작성할수록 더 정확한 분석을 받을 수 있어요</li>
                <li>• 스트레스가 높으면 맞춤 콘텐츠를 추천해드려요</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 스트레스 알림 모달 */}
      <StressAlertModal
        isOpen={showAlert}
        onClose={() => {
          setShowAlert(false);
          navigate("/");
        }}
        onAccept={() => {
          setShowAlert(false);
          navigate("/chatbot");
        }}
      />
    </main>
  );
}
