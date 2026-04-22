// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging.js";

// CONFIG (ganti punyamu)
const firebaseConfig = {
  apiKey: "API_KEY_KAMU",
  authDomain: "DOMAIN.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// minta izin notif
export async function initNotif(){
  const permission = await Notification.requestPermission();
  if(permission === "granted"){
    const token = await getToken(messaging, {
      vapidKey: "VAPID_KEY_KAMU"
    });
    console.log("TOKEN:", token);
  }
}

// notif saat web dibuka
onMessage(messaging, (payload) => {
  alert(payload.notification.title + "\n" + payload.notification.body);
});