// public/sw.js

// 1. 푸시 알림 수신 이벤트
self.addEventListener("push", (event) => {
  console.log("[Service Worker] 푸시 알림 수신.");

  // 백엔드(스케줄러)가 보낸 payloadJson을 파싱
  const data = event.data.json();
  const title = data.title || "SoftDay 알림";
  const options = {
    body: data.body,
    icon: "/logo.png", // public 폴더에 아이콘 이미지 필요
    badge: "/badge.png", // public 폴더에 뱃지 이미지 필요
    data: {
      url: data.url || "/", // 알림 클릭 시 이동할 URL
    },
  };

  // 알림 표시
  event.waitUntil(self.registration.showNotification(title, options));
});

// 2. 알림 클릭 이벤트
self.addEventListener("notificationclick", (event) => {
  console.log("[Service Worker] 알림 클릭됨.");

  event.notification.close(); // 알림 닫기

  const urlToOpen = new URL(event.notification.data.url, self.location.origin)
    .href;

  // 알림 클릭 시 저장된 URL(예: /statistics)로 브라우저 탭 열기/이동
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // 이미 탭이 열려있으면 그 탭으로 포커스
        for (const client of clientList) {
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }
        // 새 탭 열기
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
