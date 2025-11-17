import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/index";
import { RouterProvider } from "react-router-dom";
import router from "./router/index";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/index.js";

// [추가] Service Worker 등록 로직
if ("serviceWorker" in navigator && "PushManager" in window) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js") // public/sw.js 파일을 등록
      .then((registration) => {
        console.log("Service Worker 등록 성공:", registration.scope);
      })
      .catch((err) => {
        console.error("Service Worker 등록 실패:", err);
      });
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
