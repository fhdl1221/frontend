import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setCredentials } from "../store/authSlice";
import { login } from "../utils/api";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // TODO: POST /auth/login API 호출
      const response = await login({ email, password });
      const { accessToken } = response.data;

      // Mock 로그인
      // setTimeout(() => {
      //   const mockToken = "mock_jwt_token_" + Date.now();
      //   const mockUser = { username };

      //   dispatch(setCredentials({ user: mockUser, token: mockToken }));
      //   setIsLoading(false);
      //   navigate("/");
      // }, 1000);

      // 3. [중요] 토큰을 localStorage에 저장 (apiClient 인터셉터가 사용)
      localStorage.setItem("accessToken", accessToken);

      // 4. Redux 스토어 및 localStorage에도 사용자 정보 저장
      const user = { email }; // 백엔드는 토큰만 반환하므로 email 저장
      //localStorage.setItem("user", JSON.stringify(user));

      dispatch(setCredentials({ user: { email }, token: accessToken }));

      setIsLoading(false);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      // 백엔드에서 401 (Unauthorized) 응답을 보낼 경우
      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 400)
      ) {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else {
        setError("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 sm:p-10">
        {/* 로고 */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🧘</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SoftDay</h1>
          <p className="text-gray-600">스트레스 관리, 더 건강한 하루</p>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="email@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                로그인 중...
              </span>
            ) : (
              "로그인"
            )}
          </button>
        </form>

        {/* 링크 */}
        <div className="mt-8 text-center space-y-3">
          <Link
            to="/signup"
            className="block text-purple-600 hover:text-purple-700 font-semibold transition-colors"
          >
            계정이 없으신가요? 회원가입
          </Link>
          <Link
            to="/"
            className="block text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
}
