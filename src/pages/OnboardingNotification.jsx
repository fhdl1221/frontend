import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signup } from "../utils/api";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";

export default function OnboardingNotification() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = location.state || {};

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async (allowNotification) => {
    setShowModal(false);
    setIsLoading(true);

    try {
      // 회원가입 API 호출
      const response = await signup({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        position: userData.position,
        department: userData.department,
        role: userData.role,
        surveyAnswers: userData.surveyAnswers,
        preferences: userData.preferences,
        allowNotification,
      });

      const { accessToken } = response.data;
      dispatch(setCredentials({ user: { email: userData.email }, token: accessToken }));
      
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("회원가입에 실패했습니다");
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
