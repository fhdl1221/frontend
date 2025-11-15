import React from "react";
export default function ChatForm({ prompt, setPrompt, onSubmit, isLoading }) {
  return (
    <form onSubmit={onSubmit} className="flex-shrink-0 flex gap-3 p-4 justify-center">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={
          isLoading ? "답변을 생성하고 있습니다..." : "메시지를 입력하세요..."
        }
        disabled={isLoading}
        className="w-full md:w-[60%] px-4 py-3 bg-gray-200 rounded-2xl"
      />
      <input
        type="submit"
        value="전송"
        disabled={isLoading || !prompt.trim()}
        className="px-4 py-3 bg-blue-400 text-white rounded-2xl cursor-pointer"
      />
    </form>
  );
}
