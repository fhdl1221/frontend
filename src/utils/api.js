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

// 응답 인터셉터: 에러 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 시 로그아웃
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ========== 인증 API ==========
export const signup = (userData) => apiClient.post("/auth/signup", userData);
export const login = (credentials) => apiClient.post("/auth/login", credentials);

// ========== 체크인 API (메모 API 활용) ==========
// 백엔드에서 /memos 엔드포인트를 /check-in으로 변경하거나
// 프론트에서 메모 API를 체크인 데이터로 활용
export const createCheckIn = (checkInData) => {
  // checkInData를 메모 형식으로 변환
  const memoData = {
    title: `체크인 ${new Date().toLocaleDateString()}`,
    content: JSON.stringify(checkInData), // 체크인 데이터를 JSON 문자열로 저장
    state: "incomplete",
    priority: checkInData.stressLevel >= 4 ? "high" : checkInData.stressLevel >= 3 ? "normal" : "low"
  };
  return apiClient.post("/memos", memoData);
};

export const getTodayCheckIn = () => {
  // 오늘 날짜의 체크인 데이터 조회
  return apiClient.get("/memos").then(response => {
    const today = new Date().toLocaleDateString();
    const todayCheckIn = response.data.find(memo => 
      memo.title.includes(today) && memo.title.includes("체크인")
    );
    
    if (todayCheckIn) {
      // content를 파싱하여 체크인 데이터로 변환
      try {
        const checkInData = JSON.parse(todayCheckIn.content);
        return {
          data: {
            ...checkInData,
            id: todayCheckIn.id,
            createdAt: todayCheckIn.createdAt
          }
        };
      } catch (e) {
        return { data: null };
      }
    }
    return { data: null };
  });
};

// ========== 챗봇 API (임시 구현) ==========
// 실제 챗봇 API가 구현되기 전까지 임시 데이터 반환
export const sendChatMessage = (data) => {
  // TODO: 백엔드에 /chat/message 엔드포인트 추가 필요
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          aiMessage: "안녕하세요! 무엇을 도와드릴까요?",
          recommendedContents: [],
          emotion: null,
          stressCause: null
        }
      });
    }, 1000);
  });
};

// ========== 콘텐츠 API (메모 API 활용) ==========
export const getRecommendedContents = () => {
  // TODO: 백엔드에 /recommendations 엔드포인트 추가 필요
  // 임시로 빈 배열 반환
  return Promise.resolve({ data: [] });
};

export const getContentDetail = (contentId) => {
  // TODO: 백엔드에 /contents/:id 엔드포인트 추가 필요
  return Promise.resolve({ 
    data: {
      id: contentId,
      title: "콘텐츠 제목",
      description: "콘텐츠 설명",
      contentType: "VIDEO",
      duration: "5분"
    }
  });
};

export const recordContentView = (contentId) => {
  // TODO: 백엔드에 콘텐츠 시청 기록 API 추가 필요
  return Promise.resolve({ data: { success: true } });
};

export const completeContentView = (contentId) => {
  // TODO: 백엔드에 콘텐츠 완료 API 추가 필요
  return Promise.resolve({ data: { success: true } });
};

export const getSavedContents = () => {
  // TODO: 백엔드에 저장된 콘텐츠 API 추가 필요
  return Promise.resolve({ data: [] });
};

export const saveContent = (contentId) => {
  // TODO: 백엔드에 콘텐츠 저장 API 추가 필요
  return Promise.resolve({ data: { success: true } });
};

export const unsaveContent = (contentId) => {
  // TODO: 백엔드에 콘텐츠 삭제 API 추가 필요
  return Promise.resolve({ data: { success: true } });
};

// ========== 루틴 API (메모 API 활용) ==========
export const getWeeklyRoutines = () => {
  // 루틴 데이터를 메모에서 조회
  return apiClient.get("/memos").then(response => {
    const routines = response.data.filter(memo => 
      memo.title.includes("루틴")
    );
    return { data: routines };
  });
};

export const updateRoutine = (routineId, data) => {
  return apiClient.patch(`/memos/${routineId}`, data);
};

export const completeRoutine = (routineId) => {
  // 루틴 완료를 메모의 state를 completed로 변경
  return apiClient.patch(`/memos/${routineId}`, { state: "completed" });
};

// ========== 통계 API (메모 API 활용) ==========
export const getDashboardData = (period = 7) => {
  // 메모 데이터를 기반으로 통계 생성
  return apiClient.get("/memos").then(response => {
    const memos = response.data;
    const checkIns = memos.filter(memo => memo.title.includes("체크인"));
    
    // 통계 데이터 생성
    const stats = {
      averageStress: 3.2,
      comparisonPercentage: -8,
      checkInCount: checkIns.length,
      totalDays: period,
      dailyStress: [],
      weeklyStress: [],
      stressCauses: [],
      contentViews: []
    };
    
    return { data: stats };
  });
};

export const getWeeklyAnalytics = () => {
  // 주간 분석 데이터
  return Promise.resolve({
    data: {
      averageStress: 3.5,
      peakTime: "오후 3시 ~ 5시",
      mainCause: "업무 과다 (60%)",
      checkInRate: 85
    }
  });
};

// ========== 사용자 API ==========
export const getUserProfile = () => {
  // TODO: 백엔드에 사용자 프로필 API 추가 필요
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return Promise.resolve({
    data: {
      username: user.username || "",
      email: user.email || "",
      position: "",
      department: "",
      jobRole: "",
      preferenceContentType: ["VIDEO"],
      pushNotificationEnabled: true
    }
  });
};

export const updateUserProfile = (data) => {
  // TODO: 백엔드에 사용자 프로필 업데이트 API 추가 필요
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const updatedUser = { ...user, ...data };
  localStorage.setItem("user", JSON.stringify(updatedUser));
  return Promise.resolve({ data: updatedUser });
};

export const deleteUserAccount = () => {
  // TODO: 백엔드에 계정 삭제 API 추가 필요
  return Promise.resolve({ data: { success: true } });
};

// ========== 기존 메모 API (유지) ==========
export const getMemos = () => apiClient.get("/memos");
export const createMemo = (memoData) => apiClient.post("/memos", memoData);
export const updateMemo = (id, memoData) => apiClient.patch(`/memos/${id}`, memoData);
export const deleteMemo = (id) => apiClient.delete(`/memos/${id}`);

export default apiClient;