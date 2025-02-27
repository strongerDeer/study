import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// firebase 초기화
// [기존] const app = initializeApp(firebaseConfig);

// Next.js SSR 렌더링. window 객체 접근시 에러 발생
// 초기화된 앱이 있다면  초기화된 getApp 호출 / 없다면 초기화 시키기
const app: FirebaseApp =
  getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

// analytics는 클라이언트 사이드에서만 초기화
let analytics = null;

if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
const auth: Auth = getAuth(app); // firebase auth 사용(구글 로그인)
const db: Firestore = getFirestore(app);
const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
export { analytics, auth, db, googleProvider };
