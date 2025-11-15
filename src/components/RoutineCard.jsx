import React from "react";
export default function RoutineCard({ routine, onToggle, onComplete }) {
  function getCompletionColor(rate) {
    if (rate >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (rate >= 60) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-red-600 bg-red-50 border-red-200";
  }

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all ${
      routine.isActive ? "border-purple-300 shadow-purple-100" : "border-gray-200"
    }`}>
      <div className="flex items-start gap-4">
        {/* 아이콘 */}
        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl">
          {routine.icon}
        </div>

        {/* 정보 */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {routine.title}
              </h3>
              <p className="text-sm text-gray-600">
                {routine.description}
              </p>
            </div>

            {/* 토글 스위치 */}
            <button
              onClick={() => onToggle(routine.id, routine.isActive)}
              className="relative flex-shrink-0"
            >
              <div className={`w-14 h-8 rounded-full transition-all ${
                routine.isActive ? "bg-purple-600" : "bg-gray-300"
              }`}>
                <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  routine.isActive ? "translate-x-6" : ""
                }`}></div>
              </div>
            </button>
          </div>

          {/* 메타 정보 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
            <span className="flex items-center gap-1">
              <span>🕐</span>
              <span>{routine.scheduledTime}</span>
            </span>
            <span className="flex items-center gap-1">
              <span>⏱️</span>
              <span>{routine.duration}</span>
            </span>
            <span className="flex items-center gap-1">
              <span>📅</span>
              <span>{routine.frequency}</span>
            </span>
          </div>

          {/* 통계 */}
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getCompletionColor(routine.completionRate)}`}>
              <span className="text-xl font-bold">{routine.completionRate}%</span>
              <span className="text-xs font-medium">완료율</span>
            </div>

            {routine.streak > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-50 text-orange-600 border border-orange-200">
                <span>🔥</span>
                <span className="text-sm font-semibold">{routine.streak}일 연속</span>
              </div>
            )}
          </div>

          {/* 완료 버튼 */}
          {routine.isActive && (
            <button
              onClick={() => onComplete(routine.id)}
              className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              ✓ 오늘 완료하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
