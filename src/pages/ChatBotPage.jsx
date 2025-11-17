import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// 1. Redux 훅 import
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice"; // authSlice 경로에 맞게 수정하세요

import ChatMessage from "../components/ChatMessage";
import ContentCard from "../components/ContentCard";

// [변경] fetch 대신 api.js의 함수를 import
import { sendChatMessage } from "../utils/api";

export default function ChatBotPage() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // 2. Redux에서 토큰과 dispatch 함수 가져오기
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Redux 스토어의 토큰 경로

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "AI",
      message:
        "안녕하세요! 👋 SoftDay 어시스턴트입니다. 오늘은 어떤 기분이신가요?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedContents, setRecommendedContents] = useState([]);
  const [conversationId, setConversationId] = useState(null); // 백엔드와 연동

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (!storedToken && !token) {
      // 둘 다 없으면 확실히 로그아웃 상태
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [token, navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 4. handleSendMessage 함수를 실제 API 호출로 수정
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
    setRecommendedContents([]); // 새 메시지 전송 시 이전 추천 콘텐츠 숨김

    // 백엔드 ChatRequest DTO와 동일한 형식
    const requestData = {
      conversationId: conversationId, // null이거나, 이전 대화 ID
      message: inputMessage,
    };

    console.log("챗봇 요청:", requestData);

    // --- Mock API 제거 ---
    // setTimeout(() => { ... }, 1500);

    // 5. 실제 API 호출 (try-catch-finally)
    try {
      // [변경] fetch 대신 api.js의 sendChatMessage 사용
      // (토큰은 api.js의 인터셉터가 자동으로 헤더에 추가해줍니다)
      const response = await sendChatMessage(requestData);

      // [변경] axios 응답은 response.data에 담겨 있습니다.
      const data = response.data;

      if (!data) {
        throw new Error("API 응답에 데이터가 없습니다.");
      }

      // ChatResponse DTO를 프론트엔드 state 형식으로 변환
      const aiMessage = {
        id: Date.now() + 1,
        sender: "AI",
        message: data.message,
        timestamp: data.timestamp, // 백엔드 타임스탬프
        emotion: data.emotion,
        stressCause: data.stressCause,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setConversationId(data.conversationId); // [중요] 백엔드에서 받은 대화 ID로 업데이트
      setRecommendedContents(data.recommendedContents || []);
    } catch (error) {
      console.error("채팅 메시지 전송 실패:", error);

      // 사용자에게 에러 메시지 표시
      const errorMessage = {
        id: Date.now() + 1,
        sender: "AI",
        message: `죄송합니다, 응답을 가져오는 중 오류가 발생했습니다.\n(${error.message})`,
        timestamp: new Date().toISOString(),
        emotion: "error",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false); // 7. 성공/실패 여부와 관계없이 로딩 종료
    }
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
                <p className="text-sm text-purple-100">
                  당신의 개인 스트레스 관리 동반자
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                if (confirm("대화를 초기화하시겠습니까?")) {
                  setMessages([messages[0]]); // 첫 번째 AI 인사 메시지만 남김
                  setRecommendedContents([]);
                  setConversationId(null); // 8. 대화 ID 초기화
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

          {/* 로딩 인디케이터 (변경 없음) */}
          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                🤖
              </div>
              <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></span>
                </div>
              </div>
            </div>
          )}

          {/* 추천 콘텐츠 (변경 없음) */}
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

        {/* 빠른 답장 버튼 (변경 없음) */}
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

        {/* 입력 영역 (변경 없음) */}
        <form
          onSubmit={handleSendMessage}
          className="bg-white border-t border-gray-200 px-4 sm:px-6 py-4"
        >
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
