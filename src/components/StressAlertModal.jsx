import React from "react";
export default function StressAlertModal({ isOpen, onClose, onAccept }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          스트레스 경고!
        </h2>
        <p className="text-center mb-6">
          스트레스 지수가 높습니다. AI 상담을 받아보시겠습니까?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            취소
          </button>
          <button
            onClick={onAccept}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            상담 받기
          </button>
        </div>
      </div>
    </div>
  );
}