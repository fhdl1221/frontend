import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SavedContentsPage() {
  const navigate = useNavigate();

  return (
    <main className="flex-grow w-full bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/")}
          className="text-purple-600 hover:text-purple-700 font-medium mb-4 inline-flex items-center gap-2"
        >
          <span>←</span>
          <span>홈으로 돌아가기</span>
        </button>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-8">저장된 콘텐츠 ❤️</h1>
        
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
      </div>
    </main>
  );
}
