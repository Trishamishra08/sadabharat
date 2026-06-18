import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBCbd4bNuYJ3XXdZleyBzlMIA-M1YIsXFc",
  authDomain: "sadabharat-65670.firebaseapp.com",
  projectId: "sadabharat-65670",
  storageBucket: "sadabharat-65670.firebasestorage.app",
  messagingSenderId: "751373581927",
  appId: "1:751373581927:web:b8c1f7b3765d5d1a355ec2",
  measurementId: "G-NSDT53M6Q9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
