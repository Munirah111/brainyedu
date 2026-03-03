import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCbd5jiptHKzl0kdbLGIHroOkMU_ouj9uE",
  authDomain: "brainyedu-8d692.firebaseapp.com",
  projectId: "brainyedu-8d692",
  storageBucket: "brainyedu-8d692.firebasestorage.app",
  messagingSenderId: "61521342160",
  appId: "1:61521342160:web:2eb0db6cc0175f3848f8d5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);