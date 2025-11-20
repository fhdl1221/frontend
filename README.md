# 🍦 SoftDay - Frontend

**소프트데이**는 신입 직장인이 안정적으로 정착할 수 있고 개인 케어를 넘어 조직적으로 스트레스를 관리할 수 있는 문화를 만들고자 **신입 직장인의 하루를 지켜주는 AI 스트레스 케어 서비스**입니다.

---

## 📦 배포 (Deployment)
이 프로젝트는 Vercel을 통해 배포되었습니다.
#### 👉 **[서비스 바로가기 (Vercel)](https://softday.vercel.app)**
*(누구나 접속하여 바로 사용해보실 수 있습니다.)*

---

## ✨ 주요 기능 (Key Features)
* **📝 온보딩:** 사용자 맞춤형 설문조사를 통해 초기 데이터를 수집합니다.
* **😊 마음클릭(일일 체크인):** 이모지로 간편하게 오늘의 기분과 스트레스 원인을 기록합니다.
* **🤖 위톡(AI 챗봇 서비스):** Google Gemini AI가 대화 맥락을 파악하여 위로와 조언을 건넵니다.
* **📊 마음지수(스트레스 대시보드):** 주간/월간 통계를 통해 나의 스트레스 패턴을 시각화합니다.
* **🔔 스마트 푸시 알림:** 관리가 필요한 순간, 브라우저 알림으로 마음 챙김을 도와줍니다.

---

## 🛠 기술 스택 (Tech Stack)

* **Framework:** React (Vite)
* **Language:** JavaScript (ES6+)
* **Styling:** Tailwind CSS
* **State Management:** Redux Toolkit, Redux Persist
* **Routing:** React Router DOM
* **HTTP Client:** Axios
* **Deployment:** Vercel

---

## 📂 Folder Structure

```bash
src/
├── components/     # 재사용 가능한 UI 컴포넌트 (Button, Charts, Cards 등)
├── layouts/        # 페이지 레이아웃 (RootLayout, PrivateLayout 등)
├── pages/          # 주요 페이지 (Login, Home, CheckIn, Statistics 등)
├── store/          # Redux 상태 관리 설정 (Auth, User)
├── utils/          # API 호출 함수 및 유틸리티 (api.js)
└── App.jsx         # 메인 앱 컴포넌트
```

---

## 💻 로컬에서 실행하기 (For Developers)

이 프로젝트를 로컬 환경에서 실행해보고 싶다면 아래 절차를 따르세요.

### 1. 설치
```bash
npm install
```

### 2. 환경 변수 설정 (src/utils/api.js)
로컬 백엔드 서버와 연결하려면 baseURL을 변경해야 합니다.

```javascript
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api", // 로컬 서버 주소
});
```

### 3. 실행
```bash
npm run dev
```
