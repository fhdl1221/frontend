import React from "react";
import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function RootLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  const navItems = [
    { path: "/", icon: "🏠", label: "홈" },
    { path: "/check-in", icon: "✅", label: "체크인" },
    { path: "/chatbot", icon: "💬", label: "챗봇" },
    { path: "/statistics", icon: "📈", label: "통계" },
    { path: "/routine", icon: "🎯", label: "루틴" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg flex-shrink-0">
        <nav className="w-full px-4 sm:px-10 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold flex items-center gap-2">
              <span className="text-3xl">🧘</span>
              <span>SoftDay</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    location.pathname === item.path
                      ? "bg-white/20 font-semibold"
                      : "hover:bg-white/10"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <>
                <Link
                  to="/settings"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-lg transition-all"
                >
                  <span>⚙️</span>
                  <span>{user?.username || "사용자"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white/20 backdrop-blur-md border border-white/30 px-6 py-2 rounded-lg hover:bg-white/30 transition-all font-medium"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="hover:text-purple-200 transition-colors font-medium"
                >
                  회원가입
                </Link>
                <Link
                  to="/login"
                  className="bg-white text-purple-600 px-6 py-2 rounded-lg hover:bg-purple-50 transition-all font-medium shadow-lg"
                >
                  로그인
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-indigo-700 border-t border-white/20">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-white/20">
              <div className="px-4 space-y-2">
                {token ? (
                  <>
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-xl">⚙️</span>
                      <span>설정</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10"
                    >
                      <span className="text-xl">🚪</span>
                      <span>로그아웃</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="block px-4 py-3 rounded-lg text-white hover:bg-white/10"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      회원가입
                    </Link>
                    <Link
                      to="/login"
                      className="block px-4 py-3 rounded-lg bg-white text-purple-600 hover:bg-purple-50 text-center font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      로그인
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex-grow flex">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧘</span>
              <span className="text-xl font-bold text-white">SoftDay</span>
            </div>
            <p className="text-sm text-gray-500">© 2025 SoftDay. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">이용약관</a>
              <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
              <a href="#" className="hover:text-white transition-colors">고객지원</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
