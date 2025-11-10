import axios from "axios";

// 백엔드 API의 기본 URL
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
});

// 요청 인터셉터: 모든 요청에 JWT 토큰을 포함시킵니다.
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- 인증 API ---
export const signup = (userData) => apiClient.post("/auth/signup", userData);
export const login = (credentials) =>
  apiClient.post("/auth/login", credentials);

// --- 메모 API ---
export const getMemos = () => apiClient.get("/memos");
export const createMemo = (memoData) => apiClient.post("/memos", memoData);
export const updateMemo = (id, memoData) =>
  apiClient.patch(`/memos/${id}`, memoData);
export const deleteMemo = (id) => apiClient.delete(`/memos/${id}`);

export default apiClient;
