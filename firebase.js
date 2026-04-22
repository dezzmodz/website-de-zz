import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "API_KEY_KAMU",
  authDomain: "DOMAIN.firebaseapp.com",
  projectId: "PROJECT_ID",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const db = getFirestore(app);

export async function initNotif(){
  const permission = await Notification.requestPermission();

  if(permission === "granted"){
    const token = await getToken(messaging, {
      vapidKey: "VAPID_KEY_KAMU"
    });

    console.log("TOKEN:", token);

    // simpan ke Firestore
    await addDoc(collection(db, "tokens"), {
      token: token
    });
  }
}