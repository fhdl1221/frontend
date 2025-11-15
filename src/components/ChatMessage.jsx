import React from "react";
export default function ChatMessage({ message }) {
  const isAI = message.sender === "AI";

  return (
    <div className={`flex items-start gap-3 ${isAI ? "" : "flex-row-reverse"}`}>
      {/* 아바타 */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white ${
        isAI
          ? "bg-gradient-to-br from-indigo-500 to-purple-600"
          : "bg-gradient-to-br from-green-500 to-emerald-600"
      }`}>
        {isAI ? "🤖" : "👤"}
      </div>

      {/* 메시지 버블 */}
      <div className={`max-w-[70%] ${isAI ? "" : "text-right"}`}>
        <div className={`inline-block px-4 py-3 rounded-2xl shadow-md ${
          isAI
            ? "bg-white text-gray-800"
            : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
        } ${isAI ? "rounded-tl-none" : "rounded-tr-none"}`}>
          <p className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
            {message.message}
          </p>
        </div>
        
        {/* 타임스탬프 */}
        <div className={`text-xs text-gray-500 mt-1 px-2 ${isAI ? "text-left" : "text-right"}`}>
          {new Date(message.timestamp).toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>

        {/* 감정/원인 태그 (AI 메시지에만) */}
        {isAI && (message.emotion || message.stressCause) && (
          <div className="flex gap-2 mt-2">
            {message.emotion && (
              <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                {message.emotion}
              </span>
            )}
            {message.stressCause && (
              <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
                {message.stressCause}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
