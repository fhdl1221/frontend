import React from "react";
export default function StressEmojiSelector({ selectedLevel, onSelect }) {
  const emojis = [
    { level: 1, emoji: "😊", label: "매우 좋음", color: "from-green-400 to-emerald-500" },
    { level: 2, emoji: "🙂", label: "좋음", color: "from-green-300 to-green-400" },
    { level: 3, emoji: "😐", label: "보통", color: "from-yellow-400 to-orange-400" },
    { level: 4, emoji: "😟", label: "나쁨", color: "from-orange-500 to-red-400" },
    { level: 5, emoji: "😢", label: "매우 나쁨", color: "from-red-500 to-red-600" },
  ];

  return (
    <div className="grid grid-cols-5 gap-3">
      {emojis.map((item) => (
        <button
          key={item.level}
          type="button"
          onClick={() => onSelect(item.level)}
          className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-3 transition-all ${
            selectedLevel === item.level
              ? `bg-gradient-to-br ${item.color} border-transparent text-white shadow-xl scale-110`
              : "bg-white border-gray-200 hover:border-purple-300 hover:shadow-lg"
          }`}
        >
          <span className="text-4xl sm:text-5xl">{item.emoji}</span>
          <span className={`text-xs sm:text-sm font-semibold ${
            selectedLevel === item.level ? "text-white" : "text-gray-700"
          }`}>
            {item.label}
          </span>
          <span className={`text-xl font-bold ${
            selectedLevel === item.level ? "text-white" : "text-gray-400"
          }`}>
            {item.level}
          </span>
        </button>
      ))}
    </div>
  );
}
