import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from '../utils/api';
import { setCredentials } from '../store/authSlice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
        const response = await login({ username, password });
        const { accessToken } = response.data;
        
        // 토큰과 사용자 정보를 Redux 스토어와 localStorage에 저장
        dispatch(setCredentials({ user: { username }, token: accessToken }));
        
        navigate('/'); // 로그인 성공 후 홈으로 이동
    } catch (err) {
        console.error('Login failed:', err);
        setError('로그인에 실패했습니다. 사용자 이름 또는 비밀번호를 확인하세요.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          로그인
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-900 text-sm mb-2">
              사용자 이름
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              placeholder="your-username"
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-900 text-sm mb-2"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-gray-100"
            />
          </div>
          {error && (
            <p className="text-red-500 text-xs italic mb-4">{error}</p>
          )}
          <div className="flex flex-col items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline transition-colors"
            >
              로그인
            </button>
            <Link
              to="/signup"
              className="inline-block align-baseline font-bold text-xs text-blue-500 hover:text-blue-800 mt-6"
            >
              계정이 없으신가요? 회원가입
            </Link>
            <Link
              to="/"
              className="inline-block align-baseline font-bold text-xs text-gray-500 hover:text-blue-800 mt-4"
            >
              처음으로
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
