import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatMessage from "../components/ChatMessage";
import ContentCard from "../components/ContentCard";

export default function ChatBotPage() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "AI",
      message: "안녕하세요! 👋 SoftDay 어시스턴트입니다. 오늘은 어떤 기분이신가요?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedContents, setRecommendedContents] = useState([]);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  async function handleSendMessage(e) {
    e.preventDefault();

    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      sender: "USER",
      message: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // TODO: POST /chat/message API 호출
    const requestData = {
      conversationId,
      message: inputMessage,
    };

    console.log("챗봇 요청:", requestData);

    // Mock AI 응답
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        sender: "AI",
        message: "그 마음 충분히 이해합니다. 스트레스를 받고 계시는군요. 즉시 도움이 될 수 있는 몇 가지를 추천해드릴게요:\n\n1. 🧘 5분 명상\n2. 🌬️ 박스 호흡법\n3. 🚶 짧은 산책\n\n어떤 것이 좋을까요?",
        timestamp: new Date().toISOString(),
        emotion: "stressed",
        stressCause: "업무 과다",
      };

      const mockContents = [
        {
          id: 1,
          title: "5분 명상으로 마음 챙기기",
          description: "바쁜 일상 속 짧은 휴식",
          contentType: "VIDEO",
          duration: "5분",
          thumbnailUrl: "🧘",
        },
        {
          id: 2,
          title: "박스 호흡법 가이드",
          description: "즉각적인 스트레스 완화",
          contentType: "AUDIO",
          duration: "8분",
          thumbnailUrl: "🌬️",
        },
      ];

      setMessages((prev) => [...prev, aiMessage]);
      setRecommendedContents(mockContents);
      setConversationId(conversationId || "conv_" + Date.now());
      setIsLoading(false);
    }, 1500);
  }

  function handleQuickReply(text) {
    setInputMessage(text);
  }

  const quickReplies = [
    "스트레스 받고 있어요",
    "불안한 기분이에요",
    "피곤해요",
    "명상하고 싶어요",
  ];

  return (
    <main className="flex-grow w-full flex flex-col bg-gray-50">
      <div className="flex-grow flex flex-col max-w-5xl w-full mx-auto">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 sm:px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="hover:bg-white/10 p-2 rounded-lg transition-all"
              >
                <span className="text-xl">←</span>
              </button>
              <div>
                <h1 className="text-xl font-bold">SoftDay 어시스턴트 🤖</h1>
                <p className="text-sm text-purple-100">당신의 개인 스트레스 관리 동반자</p>
              </div>
            </div>
            <button
              onClick={() => {
                if (confirm("대화를 초기화하시겠습니까?")) {
                  setMessages([messages[0]]);
                  setRecommendedContents([]);
                  setConversationId(null);
                }
              }}
              className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all"
            >
              새 대화
            </button>
          </div>
        </div>

        {/* 메시지 영역 */}
        <div className="flex-grow overflow-y-auto px-4 sm:px-6 py-6 space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                🤖
              </div>
              <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            </div>
          )}

          {/* 추천 콘텐츠 */}
          {recommendedContents.length > 0 && (
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>✨</span>
                <span>추천 콘텐츠</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedContents.map((content) => (
                  <ContentCard key={content.id} content={content} compact />
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 빠른 답장 버튼 */}
        {messages.length <= 2 && !isLoading && (
          <div className="px-4 sm:px-6 pb-2">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="px-4 py-2 bg-white border-2 border-purple-200 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-50 hover:border-purple-300 transition-all"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 입력 영역 */}
        <form onSubmit={handleSendMessage} className="bg-white border-t border-gray-200 px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              전송
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
