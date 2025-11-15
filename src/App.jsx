import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import CheckInPage from "./pages/CheckInPage";
import ChatBotPage from "./pages/ChatBotPage";
import StatisticsPage from "./pages/StatisticsPage";
import RecoveryRoutinePage from "./pages/RecoveryRoutinePage";
import ContentDetailPage from "./pages/ContentDetailPage";
import ContentPlayerPage from "./pages/ContentPlayerPage";
import SavedContentsPage from "./pages/SavedContentsPage";
import SettingsPage from "./pages/SettingsPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// 보호된 라우트 컴포넌트
function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route element={<RootLayout />}>
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/check-in" element={
            <ProtectedRoute>
              <CheckInPage />
            </ProtectedRoute>
          } />
          <Route path="/chatbot" element={
            <ProtectedRoute>
              <ChatBotPage />
            </ProtectedRoute>
          } />
          <Route path="/statistics" element={
            <ProtectedRoute>
              <StatisticsPage />
            </ProtectedRoute>
          } />
          <Route path="/routine" element={
            <ProtectedRoute>
              <RecoveryRoutinePage />
            </ProtectedRoute>
          } />
          <Route path="/contents/:id" element={
            <ProtectedRoute>
              <ContentDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/contents/:id/player" element={
            <ProtectedRoute>
              <ContentPlayerPage />
            </ProtectedRoute>
          } />
          <Route path="/saved-contents" element={
            <ProtectedRoute>
              <SavedContentsPage />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
