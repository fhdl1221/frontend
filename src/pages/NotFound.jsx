import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700">
      <div className="text-center text-white px-4">
        <div className="text-9xl mb-4">😵</div>
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">페이지를 찾을 수 없습니다</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
          >
            홈으로
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-white/20 backdrop-blur-md text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all"
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}
