import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import CheckInPage from "../pages/CheckInPage";
import ChatBotPage from "../pages/ChatBotPage";
import StatisticsPage from "../pages/StatisticsPage";
import RecoveryRoutinePage from "../pages/RecoveryRoutinePage";
import ContentDetailPage from "../pages/ContentDetailPage";
import ContentPlayerPage from "../pages/ContentPlayerPage";
import SavedContentsPage from "../pages/SavedContentsPage";
import SettingsPage from "../pages/SettingsPage";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import OnboardingWelcome from "../pages/OnboardingWelcome";
import SignupStep1 from "../pages/SignupStep1";
import OnboardingProfile from "../pages/OnboardingProfile";
import OnboardingSurvey from "../pages/OnboardingSurvey";
import OnboardingPreferences from "../pages/OnboardingPreferences";
import OnboardingNotification from "../pages/OnboardingNotification";

const router = createBrowserRouter([
  {
    path: "/welcome",
    element: <OnboardingWelcome />,
  },
  {
    path: "/signup",
    element: <SignupStep1 />,
  },
  {
    path: "/onboarding/profile",
    element: <OnboardingProfile />,
  },
  {
    path: "/onboarding/survey",
    element: <OnboardingSurvey />,
  },
  {
    path: "/onboarding/preferences",
    element: <OnboardingPreferences />,
  },
  {
    path: "/onboarding/notification",
    element: <OnboardingNotification />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "check-in",
        element: (
          <ProtectedRoute>
            <CheckInPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "chatbot",
        element: (
          <ProtectedRoute>
            <ChatBotPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "statistics",
        element: (
          <ProtectedRoute>
            <StatisticsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "routine",
        element: (
          <ProtectedRoute>
            <RecoveryRoutinePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "contents/:id",
        element: (
          <ProtectedRoute>
            <ContentDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "contents/:id/player",
        element: (
          <ProtectedRoute>
            <ContentPlayerPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "saved-contents",
        element: (
          <ProtectedRoute>
            <SavedContentsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;