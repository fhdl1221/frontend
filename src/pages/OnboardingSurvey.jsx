import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const questions = [
  "Q1. 일 또는 여가 활동을 하는데 흥미나 즐거움을 느끼지 못함",
  "Q2. 기분이 가라앉거나 우울하거나 희망이 없음",
  "Q3. 잠들기 어렵거나 자주 깨어남 또는 너무 많이 잠",
  "Q4. 피곤함 또는 기력이 거의 없음",
  "Q5. 식욕이 줄었거나 과식을 함",
];

export default function OnboardingSurvey() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state || {};

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(5).fill(null));

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 설문 완료 -> 선호 콘텐츠 선택으로
      navigate("/onboarding/preferences", {
        state: { ...userData, surveyAnswers: newAnswers },
      });
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8 flex flex-col">
      {/* 진행바 */}
      <div className="flex gap-2 mb-8">
        <div className="flex-1 h-1 bg-gray-300 rounded"></div>
        <div className="flex-1 h-1 bg-black rounded"></div>
        <div className="flex-1 h-1 bg-gray-300 rounded"></div>
      </div>

      {/* 질문 */}
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <div className="text-6xl mb-8">😐</div>
        <h2 className="text-xl font-bold mb-12 px-4">
          {questions[currentQuestion]}
        </h2>

        {/* 선택 버튼 */}
        <div className="flex gap-4 w-full max-w-md">
          <button
            onClick={() => handleAnswer("yes")}
            className="flex-1 py-4 bg-gray-300 text-black font-bold rounded-xl text-lg hover:bg-gray-400 transition"
          >
            예
          </button>
          <button
            onClick={() => handleAnswer("no")}
            className="flex-1 py-4 bg-gray-300 text-black font-bold rounded-xl text-lg hover:bg-gray-400 transition"
          >
            아니오
          </button>
        </div>
      </div>

      {/* 이전 버튼 */}
      <div className="mt-8">
        <button
          onClick={handlePrev}
          disabled={currentQuestion === 0}
          className={`w-full py-4 font-bold rounded-xl text-lg transition ${
            currentQuestion === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-300 text-black hover:bg-gray-400"
          }`}
        >
          이전
        </button>
      </div>
    </div>
  );
}
