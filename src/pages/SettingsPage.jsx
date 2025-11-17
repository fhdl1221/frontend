import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import {
  getUserProfile,
  updateUserProfile,
  getVapidPublicKey,
  subscribeWebPush,
} from "../utils/api";

// OnboardingProfile.js에서 복사해 온 데이터
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

// [추가] VAPID 공개키를 변환하는 헬퍼 함수
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.user);

  // [수정] formData의 구조를 UserProfileResponse DTO와 일치시킵니다.
  const [formData, setFormData] = useState({
    email: "",
    industry: "",
    careerYears: "",
    surveyAnswers: [], // surveyAnswers는 보통 수정하지 않음
    preferences: {
      video: false,
      text: false,
      audio: false,
    },
    allowNotification: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isPushEnabled, setIsPushEnabled] = useState(false); // 현재 구독 상태

  // [수정] industries, careerYears 룩업용
  const selectedIndustryData = industries.find(
    (i) => i.id === formData.industry
  );
  const selectedCareerData = careerYears.find(
    (c) => c.id === formData.careerYears
  );

  useEffect(() => {
    fetchUserProfile();

    // [추가] 페이지 로드 시 현재 푸시 구독 상태 확인
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager.getSubscription().then((subscription) => {
          setIsPushEnabled(subscription !== null);
        });
      });
    }
  }, []);

  // [수정] 실제 API를 호출하도록 변경
  async function fetchUserProfile() {
    try {
      const response = await getUserProfile();
      const profile = response.data;
      setFormData({
        email: profile.email || "",
        industry: profile.industry || "",
        careerYears: profile.careerYears || "",
        surveyAnswers: profile.surveyAnswers || [],
        preferences: profile.preferences || {
          video: false,
          text: false,
          audio: false,
        },
        allowNotification: profile.allowNotification,
      });
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      alert("프로필 로딩 실패");
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // [수정] preferences 객체를 다루도록 변경
  function handleContentTypeChange(type) {
    // type은 'video', 'audio', 'text'
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [type]: !prev.preferences[type],
      },
    }));
  }

  async function handleSave() {
    setIsSaving(true);

    // TODO: 백엔드에 프로필 '업데이트' API (예: PATCH /api/user/me)를 만들어야 합니다.
    //       (현재는 api.js의 updateUserProfile이 Mock 함수입니다)

    // 업데이트 DTO (백엔드와 협의 필요)
    const updateData = {
      industry: formData.industry,
      careerYears: formData.careerYears,
      preferences: formData.preferences,
      allowNotification: formData.allowNotification,
    };
    console.log("Saving (Mock):", updateData);

    try {
      // await updateUserProfile(updateData); // Mock API 호출
      // setTimeout(() => {
      //   // Mock API 대신 임시 지연
      //   setIsSaving(false);
      //   setIsEditing(false);
      //   alert("프로필이 업데이트되었습니다!");
      // }, 1000);
      const response = await updateUserProfile(updateData);
      setFormData(response.data);

      setIsSaving(false);
      setIsEditing(false);
      alert("프로필이 업데이트되었습니다!");
    } catch (error) {
      console.error("Failed to save profile:", error);
      alert("저장 실패");
      setIsSaving(false);
    }
  }

  function handleLogout() {
    if (confirm("로그아웃 하시겠습니까?")) {
      dispatch(logout());
      navigate("/login");
    }
  }

  function handleDeleteAccount() {
    if (
      confirm("정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")
    ) {
      // TODO: DELETE /user/account API 호출
      alert("계정이 삭제되었습니다.");
      dispatch(logout());
      navigate("/login");
    }
  }

  // [신규] 알림 구독 버튼 클릭 핸들러
  async function handleSubscribe() {
    if (isPushEnabled) {
      // TODO: 구독 취소 로직 (unscubscribe)
      alert("구독 취소 기능은 아직 구현되지 않았습니다.");
      return;
    }

    // 1. 브라우저가 알림을 지원하는지 확인
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      alert("이 브라우저는 푸시 알림을 지원하지 않습니다.");
      return;
    }

    setIsSubscribing(true);
    try {
      // 2. Service Worker 등록 확인
      const registration = await navigator.serviceWorker.ready;

      // 3. 백엔드에서 VAPID 공개키 가져오기
      const response = await getVapidPublicKey();
      const vapidPublicKey = response.data.publicKey; // {publicKey: "..."}
      const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);

      // 4. 브라우저에게 구독 요청 (사용자에게 "알림 허용?" 팝업 표시)
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true, // 항상 사용자에게 알림 표시
        applicationServerKey: applicationServerKey,
      });

      // 5. 생성된 구독 정보를 백엔드로 전송
      await subscribeWebPush(subscription);

      alert("알림이 성공적으로 구독되었습니다!");
      setIsPushEnabled(true);
    } catch (error) {
      console.error("웹 푸시 구독 실패:", error);
      alert(
        "알림 구독에 실패했습니다. 브라우저의 알림 설정(차단 여부)을 확인해주세요."
      );
    } finally {
      setIsSubscribing(false);
    }
  }

  const contentTypes = [
    { value: "video", label: "영상 콘텐츠", icon: "🎥" },
    { value: "audio", label: "오디오 콘텐츠", icon: "🎧" },
    { value: "text", label: "텍스트 콘텐츠", icon: "📖" },
  ];

  return (
    <main className="flex-grow w-full bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-purple-600 hover:text-purple-700 font-medium mb-4 inline-flex items-center gap-2"
          >
            <span>←</span>
            <span>홈으로 돌아가기</span>
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">설정 ⚙️</h1>
          <p className="text-lg text-gray-600">프로필 및 환경 설정</p>
        </div>

        {/* 프로필 정보 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">프로필 정보</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
              >
                수정
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold transition-all"
                >
                  취소
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all disabled:opacity-50"
                >
                  {isSaving ? "저장 중..." : "저장"}
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* 이메일 (수정 불가) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                이메일 (ID)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled // 이메일은 수정 불가
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* 산업 (Industry) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                산업 분야
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                {industries.map((industry) => (
                  <option key={industry.id} value={industry.id}>
                    {industry.icon} {industry.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 경력 (CareerYears) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                경력
              </label>
              <select
                name="careerYears"
                value={formData.careerYears}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                {careerYears.map((career) => (
                  <option key={career.id} value={career.id}>
                    {career.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 콘텐츠 선호도 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            콘텐츠 선호도
          </h2>
          <p className="text-gray-600 mb-6">
            선호하는 콘텐츠 유형을 선택하세요 (복수 선택 가능)
          </p>

          <div className="space-y-3">
            {/* [수정] preferences 객체와 연동 */}
            {contentTypes.map((type) => (
              <label
                key={type.value}
                className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  formData.preferences[type.value] // 'preferenceContentType.includes' 대신 객체 키로 확인
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-purple-300"
                } ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={formData.preferences[type.value]}
                  onChange={() => handleContentTypeChange(type.value)} // 'value' (video, audio, text) 전달
                  disabled={!isEditing}
                  className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-2xl">{type.icon}</span>
                <span className="font-semibold text-gray-900">
                  {type.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* 알림 설정 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">알림 설정</h2>

          {/* [신규] 웹 푸시 알림 버튼 */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              브라우저 푸시 알림
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              웹사이트에 접속하지 않아도 스트레스 알림을 받습니다. (PC/모바일
              브라우저)
            </p>
            <button
              onClick={handleSubscribe}
              disabled={isSubscribing || isPushEnabled} // 이미 구독했으면 비활성화
              className={`w-full max-w-xs px-6 py-3 rounded-lg font-semibold transition-all ${
                isPushEnabled
                  ? "bg-green-600 text-white"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubscribing
                ? "구독 중..."
                : isPushEnabled
                ? "✓ 브라우저 알림 구독됨"
                : "브라우저 알림 켜기"}
            </button>
          </div>

          {/* [수정] pushNotificationEnabled -> allowNotification */}
          <label className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-purple-300 transition-all">
            {/* ... (라벨 텍스트 동일) ... */}
            <div className="relative">
              <input
                type="checkbox"
                name="allowNotification" // name 변경
                checked={formData.allowNotification} // checked 변경
                onChange={handleChange}
                disabled={!isEditing}
                className="sr-only peer"
              />
              <div
                className={`w-14 h-8 rounded-full transition-all ${
                  formData.allowNotification ? "bg-purple-600" : "bg-gray-300"
                } ${!isEditing ? "opacity-50" : ""}`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    formData.allowNotification ? "translate-x-6" : ""
                  }`}
                ></div>
              </div>
            </div>
          </label>
        </div>

        {/* 계정 관리 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">계정 관리</h2>

          <div className="space-y-4">
            <button
              onClick={handleLogout}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <span>🚪</span>
              <span>로그아웃</span>
            </button>

            <button
              onClick={handleDeleteAccount}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <span>⚠️</span>
              <span>계정 삭제</span>
            </button>
          </div>
        </div>

        {/* 앱 정보 */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>SoftDay v1.0.0</p>
          <p className="mt-1">© 2025 SoftDay. All rights reserved.</p>
        </div>
      </div>
    </main>
  );
}
