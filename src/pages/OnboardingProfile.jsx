import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const industries = [
  { id: "", name: "선택하세요", icon: "" },
  { id: "tech", name: "IT/기술", icon: "💻" },
  { id: "finance", name: "금융/보험", icon: "💰" },
  { id: "education", name: "교육", icon: "📚" },
  { id: "healthcare", name: "의료/제약", icon: "🏥" },
  { id: "manufacturing", name: "제조/생산", icon: "🏭" },
  { id: "retail", name: "유통/판매", icon: "🛒" },
  { id: "service", name: "서비스", icon: "🍽️" },
  { id: "media", name: "미디어/광고", icon: "📺" },
  { id: "construction", name: "건설/건축", icon: "🏗️" },
  { id: "public", name: "공공기관", icon: "🏛️" },
  { id: "other", name: "기타", icon: "📦" },
];

const careerYears = [
  { id: "", label: "선택하세요" },
  { id: "0-1", label: "1년 미만" },
  { id: "1-3", label: "1~3년차" },
  { id: "3-5", label: "3~5년차" },
  { id: "5-10", label: "5~10년차" },
  { id: "10-15", label: "10~15년차" },
  { id: "15+", label: "15년 이상" },
];

export default function OnboardingProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state || {};

  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedCareer, setSelectedCareer] = useState("");
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [showCareerDropdown, setShowCareerDropdown] = useState(false);

  const selectedIndustryData = industries.find((i) => i.id === selectedIndustry);
  const selectedCareerData = careerYears.find((c) => c.id === selectedCareer);

  const handleNext = () => {
    if (!selectedIndustry) {
      alert("산업 분야를 선택해주세요");
      return;
    }
    if (!selectedCareer) {
      alert("경력을 선택해주세요");
      return;
    }

    navigate("/onboarding/survey", {
      state: {
        email,
        password,
        industry: selectedIndustry,
        careerYears: selectedCareer,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      {/* 진행바 */}
      <div className="flex gap-2 mb-8">
        <div className="flex-1 h-1 bg-black rounded"></div>
        <div className="flex-1 h-1 bg-gray-300 rounded"></div>
        <div className="flex-1 h-1 bg-gray-300 rounded"></div>
      </div>

      {/* 제목 */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold mb-2">당신에 대해 알려주세요</h1>
        <p className="text-gray-600">맞춤형 콘텐츠 추천을 위한 정보입니다</p>
      </div>

      <div className="max-w-md mx-auto space-y-8">
        {/* 산업 선택 */}
        <div>
          <label className="block text-lg font-bold mb-3">
            어떤 산업에서 일하시나요?
          </label>
          <div className="relative">
            <button
              onClick={() => {
                setShowIndustryDropdown(!showIndustryDropdown);
                setShowCareerDropdown(false);
              }}
              className="w-full px-6 py-4 bg-gray-100 rounded-xl text-left flex items-center justify-between hover:bg-gray-200 transition"
            >
              <span className="flex items-center gap-3">
                {selectedIndustryData?.icon && (
                  <span className="text-2xl">{selectedIndustryData.icon}</span>
                )}
                <span className={selectedIndustry ? "text-black" : "text-gray-400"}>
                  {selectedIndustryData?.name || "선택하세요"}
                </span>
              </span>
              <span className="text-xl">{showIndustryDropdown ? "▲" : "▼"}</span>
            </button>

            {/* 드롭다운 */}
            {showIndustryDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-80 overflow-y-auto">
                {industries.slice(1).map((industry) => (
                  <button
                    key={industry.id}
                    onClick={() => {
                      setSelectedIndustry(industry.id);
                      setShowIndustryDropdown(false);
                    }}
                    className="w-full px-6 py-4 text-left hover:bg-purple-50 transition flex items-center gap-3 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-2xl">{industry.icon}</span>
                    <span className="font-medium">{industry.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 경력 선택 */}
        <div>
          <label className="block text-lg font-bold mb-3">
            경력은 몇 년차이신가요?
          </label>
          <div className="relative">
            <button
              onClick={() => {
                setShowCareerDropdown(!showCareerDropdown);
                setShowIndustryDropdown(false);
              }}
              className="w-full px-6 py-4 bg-gray-100 rounded-xl text-left flex items-center justify-between hover:bg-gray-200 transition"
            >
              <span className={selectedCareer ? "text-black" : "text-gray-400"}>
                {selectedCareerData?.label || "선택하세요"}
              </span>
              <span className="text-xl">{showCareerDropdown ? "▲" : "▼"}</span>
            </button>

            {/* 드롭다운 */}
            {showCareerDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl">
                {careerYears.slice(1).map((career) => (
                  <button
                    key={career.id}
                    onClick={() => {
                      setSelectedCareer(career.id);
                      setShowCareerDropdown(false);
                    }}
                    className="w-full px-6 py-4 text-left hover:bg-purple-50 transition font-medium border-b border-gray-100 last:border-0"
                  >
                    {career.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 선택된 내용 미리보기 */}
        {(selectedIndustry || selectedCareer) && (
          <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
            <h3 className="font-bold text-purple-900 mb-3">선택하신 정보</h3>
            <div className="space-y-2 text-sm">
              {selectedIndustry && (
                <div className="flex items-center gap-2">
                  <span className="text-lg">{selectedIndustryData?.icon}</span>
                  <span className="text-gray-700">
                    <strong>산업:</strong> {selectedIndustryData?.name}
                  </span>
                </div>
              )}
              {selectedCareer && (
                <div className="flex items-center gap-2">
                  <span className="text-lg">💼</span>
                  <span className="text-gray-700">
                    <strong>경력:</strong> {selectedCareerData?.label}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 다음 버튼 */}
      <div className="fixed bottom-8 left-6 right-6">
        <button
          onClick={handleNext}
          disabled={!selectedIndustry || !selectedCareer}
          className={`w-full py-4 font-bold rounded-xl text-lg transition ${
            selectedIndustry && selectedCareer
              ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
}