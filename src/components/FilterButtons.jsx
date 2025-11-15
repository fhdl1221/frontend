import React from "react";
export default function FilterButtons({ filter, setFilter }) {
  const buttons = [
    { label: "전체", value: "all" },
    { label: "완료", value: "completed" },
    { label: "미완료", value: "incomplete" },
  ];

  return (
    <div className="flex gap-4">
      {buttons.map((btn) => (
        <button
          key={btn.value}
          onClick={() => setFilter(btn.value)}
          className={`px-3 py-1 ${
            filter === btn.value
              ? "border-b-2 border-blue-500 text-blue-700"
              : "border-none"
          }`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}
