import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupStep1() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = () => {
    const newErrors = {};

    // 이메일 검증
    if (!email) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!validateEmail(email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }

    // 비밀번호 검증
    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다";
    }

    // 비밀번호 확인 검증
    if (!passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호 확인을 입력해주세요";
    } else if (password !== passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다";
    }

    // 에러가 있으면 표시하고 중단
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 에러가 없으면 다음 단계로
    setErrors({});
    navigate("/onboarding/profile", { state: { email, password } });
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      {/* 뒤로가기 */}
      <button onClick={() => navigate(-1)} className="mb-8">
        <span className="text-2xl">←</span>
      </button>

      {/* 제목 */}
      <h1 className="text-3xl font-bold text-center mb-12">회원가입</h1>

      {/* 입력 폼 */}
      <div className="space-y-4 max-w-md mx-auto">
        {/* 이메일 */}
        <div>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors({ ...errors, email: null });
              }
            }}
            className={`w-full px-6 py-4 rounded-xl text-lg ${
              errors.email
                ? "bg-red-50 border-2 border-red-500"
                : "bg-gray-100"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2 px-2">{errors.email}</p>
          )}
        </div>

        {/* 비밀번호 */}
        <div>
          <input
            type="password"
            placeholder="비밀번호 (8자 이상)"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                setErrors({ ...errors, password: null });
              }
            }}
            className={`w-full px-6 py-4 rounded-xl text-lg ${
              errors.password
                ? "bg-red-50 border-2 border-red-500"
                : "bg-gray-100"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2 px-2">{errors.password}</p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <input
            type="password"
            placeholder="비밀번호 재입력"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
              if (errors.passwordConfirm) {
                setErrors({ ...errors, passwordConfirm: null });
              }
            }}
            className={`w-full px-6 py-4 rounded-xl text-lg ${
              errors.passwordConfirm
                ? "bg-red-50 border-2 border-red-500"
                : "bg-gray-100"
            }`}
          />
          {errors.passwordConfirm && (
            <p className="text-red-500 text-sm mt-2 px-2">
              {errors.passwordConfirm}
            </p>
          )}
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="fixed bottom-8 left-6 right-6">
        <button
          onClick={handleNext}
          className="w-full py-4 bg-gray-300 text-black font-bold rounded-xl text-lg hover:bg-gray-400 transition"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}