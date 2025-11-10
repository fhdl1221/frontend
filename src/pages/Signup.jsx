import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from '../utils/api';

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
        setError('비밀번호가 일치하지 않습니다.');
        return;
    }
    try {
        await signup({ username, email, password });
        alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/login'); // 회원가입 성공 후 로그인 페이지로 이동
    } catch (err) {
        console.error('Signup failed:', err);
        setError('회원가입에 실패했습니다. 다른 사용자 이름이나 이메일을 사용해주세요.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          회원가입
        </h2>
        <form onSubmit={handleSignup}>
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
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-900 text-sm mb-2">
              이메일 주소
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="signup@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
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
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-gray-100"
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
              회원가입
            </button>
            <Link
              to="/login"
              className="inline-block align-baseline font-bold text-xs text-blue-500 hover:text-blue-800 mt-6"
            >
              이미 계정이 있으신가요? 로그인
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
