import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signup } from "../utils/api";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";

export default function OnboardingNotification() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // location.state에 email, password, industry, careerYears, surveyAnswers, preferences가 모두 누적됩니다.
  const userData = location.state || {};

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async (allowNotification) => {
    setShowModal(false);
    setIsLoading(true);

    try {
      // 1. [수정] 백엔드 SignUpRequest DTO와 일치하는 데이터 객체 생성
      const signupData = {
        email: userData.email, // from SignupStep1
        password: userData.password, // from SignupStep1
        industry: userData.industry, // from OnboardingProfile
        careerYears: userData.careerYears, // from OnboardingProfile
        surveyAnswers: userData.surveyAnswers, // from OnboardingSurvey
        preferences: userData.preferences, // from OnboardingPreferences
        allowNotification: allowNotification, // from this page
      };

      // 2. [수정] 위에서 만든 signupData 객체로 API 호출
      const response = await signup(signupData);

      // 3. 백엔드가 토큰을 반환합니다. (AuthController 수정됨)
      const { accessToken } = response.data;

      localStorage.setItem("accessToken", accessToken);

      // 4. 회원가입과 동시에 로그인 처리
      dispatch(
        setCredentials({ user: { email: userData.email }, token: accessToken })
      );

      setIsLoading(false);
      navigate("/"); // 홈으로 이동
    } catch (error) {
      console.error("Signup failed:", error);
      // 5. [수정] 에러 메시지 개선
      alert(
        "회원가입에 실패했습니다: " + (error.response?.data || "서버 오류")
      );
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">회원가입 중...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white px-6 py-8 flex flex-col items-center justify-center">
        <div className="text-6xl mb-8">🔔</div>
        <h2 className="text-2xl font-bold mb-4 text-center">
          푸시 알림을 허용하시겠습니까?
        </h2>
        <p className="text-gray-600 text-center mb-12 px-4">
          스트레스 관리 알림을 받아보세요
        </p>

        <div className="w-full max-w-md space-y-4">
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-4 bg-gray-300 text-black font-bold rounded-xl text-lg hover:bg-gray-400 transition"
          >
            완료
          </button>
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-6 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full">
            <h3 className="text-xl font-bold text-center mb-8">설명 내용</h3>
            <div className="flex gap-3">
              <button
                onClick={() => handleComplete(false)}
                className="flex-1 py-3 bg-gray-300 text-black font-bold rounded-xl hover:bg-gray-400 transition"
              >
                아니오
              </button>
              <button
                onClick={() => handleComplete(true)}
                className="flex-1 py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 transition"
              >
                예
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
