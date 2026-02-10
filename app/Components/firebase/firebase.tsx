"use client"


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCRawEpNCSwEsglanJm2PvxwVCuqqlamvY",
  authDomain: "summarist-4aab6.firebaseapp.com",
  projectId: "summarist-4aab6",
  storageBucket: "summarist-4aab6.firebasestorage.app",
  messagingSenderId: "817962683682",
  appId: "1:817962683682:web:332702f0d9bdc3058de97b",
  measurementId: "G-93JYWZVS89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Only initialize analytics in browser environments
if (typeof window !== "undefined") {
  try {
    // getAnalytics may throw if analytics isn't supported in the environment
    getAnalytics(app);
  } catch {
    // ignore analytics initialization errors on server or unsupported envs
  }
}

export const initFirebase = () => {
  return app;
}