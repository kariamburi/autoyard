// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, onMessage, getToken } from "firebase/messaging"; // Import FCM
import { auth } from "@clerk/nextjs"; // Use client-side auth
import { updateUserToken } from "@/lib/actions/user.actions"; // Import your updateUserToken function

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

// Initialize Firebase Cloud Messaging (FCM)
const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

// Request permission for notifications
export const requestPermission = async () => {
  try {
    const userId = auth()?.user?.id; // Use Clerk's client-side auth to get the userId

    if (!userId) {
      console.log("User not authenticated.");
      return;
    }
    console.log("userId."+userId);
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    if (token) {
      console.log("FCM token:", token);

      const user = {
        fcmToken: token,
      };

      // Update the user's FCM token in the database
      await updateUserToken(userId, user);

    } else {
      console.log("No registration token available.");
    }
  } catch (error) {
    console.error("An error occurred while retrieving the FCM token.", error);
  }
};

// Listen for incoming messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    if (messaging) {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    }
  });

export { app, db, storage, messaging };
