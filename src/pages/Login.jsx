import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setCredentials } from "../store/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // TODO: POST /auth/login API 호출
      // const response = await login({ username, password });
      // const { accessToken, user } = response.data;
      
      // Mock 로그인
      setTimeout(() => {
        const mockToken = "mock_jwt_token_" + Date.now();
        const mockUser = { username };
        
        dispatch(setCredentials({ user: mockUser, token: mockToken }));
        setIsLoading(false);
        navigate("/");
      }, 1000);
      
    } catch (err) {
      console.error("Login failed:", err);
      setError("로그인에 실패했습니다. 사용자 이름 또는 비밀번호를 확인하세요.");
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
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              사용자 이름
            </label>
            <input
              type="text"
              id="username"
              value={username}
              placeholder="your-username"
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
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
