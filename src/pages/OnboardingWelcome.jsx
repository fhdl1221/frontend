import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OnboardingWelcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      {/* 로고 */}
      <div className="mb-16">
        <div className="text-8xl mb-6">🍦</div>
      </div>

      {/* 버튼 */}
      <div className="w-full max-w-md space-y-4">
        <button
          onClick={() => navigate("/signup")}
          className="w-full py-4 bg-gray-300 text-black font-bold rounded-lg text-lg hover:bg-gray-400 transition"
        >
          이메일로 가입
        </button>
        <button
          onClick={() => navigate("/login")}
          className="w-full py-4 bg-gray-300 text-black font-bold rounded-lg text-lg hover:bg-gray-400 transition"
        >
          이메일로 로그인
        </button>
      </div>
    </div>
  );
}