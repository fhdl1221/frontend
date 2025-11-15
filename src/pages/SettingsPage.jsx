import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function SettingsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    position: "",
    department: "",
    jobRole: "",
    preferenceContentType: [],
    pushNotificationEnabled: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  async function fetchUserProfile() {
    // TODO: GET /user/profile API 호출
    setTimeout(() => {
      const mockUser = {
        username: user?.username || "홍길동",
        email: "hong@example.com",
        position: "대리",
        department: "개발팀",
        jobRole: "백엔드 개발자",
        preferenceContentType: ["VIDEO", "AUDIO"],
        pushNotificationEnabled: true,
      };
      setFormData(mockUser);
    }, 300);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleContentTypeChange(type) {
    setFormData((prev) => ({
      ...prev,
      preferenceContentType: prev.preferenceContentType.includes(type)
        ? prev.preferenceContentType.filter((t) => t !== type)
        : [...prev.preferenceContentType, type],
    }));
  }

  async function handleSave() {
    setIsSaving(true);
    // TODO: PATCH /user/profile API 호출
    
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      alert("프로필이 업데이트되었습니다!");
    }, 1000);
  }

  function handleLogout() {
    if (confirm("로그아웃 하시겠습니까?")) {
      dispatch(logout());
      navigate("/login");
    }
  }

  function handleDeleteAccount() {
    if (confirm("정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      // TODO: DELETE /user/account API 호출
      alert("계정이 삭제되었습니다.");
      dispatch(logout());
      navigate("/login");
    }
  }

  const contentTypes = [
    { value: "VIDEO", label: "영상 콘텐츠", icon: "🎥" },
    { value: "AUDIO", label: "오디오 콘텐츠", icon: "🎧" },
    { value: "TEXT", label: "텍스트 콘텐츠", icon: "📖" },
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
            {/* 사용자 이름 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                사용자 이름
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* 이메일 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                이메일
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* 직급 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                직급
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">선택하세요</option>
                <option value="사원">사원</option>
                <option value="대리">대리</option>
                <option value="과장">과장</option>
                <option value="차장">차장</option>
                <option value="부장">부장</option>
                <option value="임원">임원</option>
              </select>
            </div>

            {/* 부서 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                부서
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="예: 개발팀"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* 직무 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                직무
              </label>
              <input
                type="text"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="예: 백엔드 개발자"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* 콘텐츠 선호도 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">콘텐츠 선호도</h2>
          <p className="text-gray-600 mb-6">선호하는 콘텐츠 유형을 선택하세요 (복수 선택 가능)</p>
          
          <div className="space-y-3">
            {contentTypes.map((type) => (
              <label
                key={type.value}
                className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  formData.preferenceContentType.includes(type.value)
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-purple-300"
                } ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={formData.preferenceContentType.includes(type.value)}
                  onChange={() => handleContentTypeChange(type.value)}
                  disabled={!isEditing}
                  className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-2xl">{type.icon}</span>
                <span className="font-semibold text-gray-900">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 알림 설정 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">알림 설정</h2>
          
          <label className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-purple-300 transition-all">
            <div className="flex items-center gap-4">
              <span className="text-2xl">🔔</span>
              <div>
                <div className="font-semibold text-gray-900">푸시 알림</div>
                <div className="text-sm text-gray-600">루틴 알림 및 체크인 리마인더</div>
              </div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                name="pushNotificationEnabled"
                checked={formData.pushNotificationEnabled}
                onChange={handleChange}
                disabled={!isEditing}
                className="sr-only peer"
              />
              <div className={`w-14 h-8 rounded-full transition-all ${
                formData.pushNotificationEnabled ? "bg-purple-600" : "bg-gray-300"
              } ${!isEditing ? "opacity-50" : ""}`}>
                <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  formData.pushNotificationEnabled ? "translate-x-6" : ""
                }`}></div>
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
