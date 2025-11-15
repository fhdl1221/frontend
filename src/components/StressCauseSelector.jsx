import React from "react";
export default function StressCauseSelector({ selectedCauses, onSelect }) {
  const causes = [
    { id: "work_overload", label: "업무 과다", icon: "💼" },
    { id: "meeting", label: "회의", icon: "👥" },
    { id: "deadline", label: "마감일", icon: "📅" },
    { id: "communication", label: "소통 문제", icon: "💬" },
    { id: "conflict", label: "갈등", icon: "⚡" },
    { id: "change", label: "변화/불확실성", icon: "🔄" },
    { id: "personal", label: "개인 문제", icon: "👤" },
    { id: "health", label: "건강 문제", icon: "🏥" },
    { id: "financial", label: "금전 문제", icon: "💰" },
    { id: "other", label: "기타", icon: "📝" },
  ];

  function handleToggle(causeId) {
    if (selectedCauses.includes(causeId)) {
      onSelect(selectedCauses.filter((id) => id !== causeId));
    } else {
      if (selectedCauses.length >= 3) {
        alert("최대 3개까지 선택할 수 있습니다");
        return;
      }
      onSelect([...selectedCauses, causeId]);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {causes.map((cause) => (
          <button
            key={cause.id}
            type="button"
            onClick={() => handleToggle(cause.id)}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
              selectedCauses.includes(cause.id)
                ? "border-purple-500 bg-purple-50 shadow-lg"
                : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-md"
            }`}
          >
            <span className="text-2xl">{cause.icon}</span>
            <span className={`font-semibold text-sm ${
              selectedCauses.includes(cause.id) ? "text-purple-700" : "text-gray-700"
            }`}>
              {cause.label}
            </span>
          </button>
        ))}
      </div>
      
      <div className="text-sm text-gray-600 text-center">
        {selectedCauses.length}/3 선택됨
      </div>
    </div>
  );
}
