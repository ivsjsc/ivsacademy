/**
 * @fileoverview Firebase Initialization Script for IVS JSC Applications.
 * This script initializes Firebase services (App, Auth, Firestore) and handles
 * user authentication using custom tokens provided by the Canvas environment.
 * @version 1.1 - Integrated Firebase config from user-provided image,
 * ensured proper initialization and authentication.
 * @author IVS-Technical-Team
 */

'use strict';

// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Ensure componentLog utility is available
if (typeof window.componentLog !== 'function') {
    console.error("[Firebase Init] window.componentLog is not defined. Please ensure utils.js is loaded before firebase-init.js.");
    window.componentLog = (msg, level = 'error') => console[level](msg); // Fallback
}

// Your web app's Firebase configuration (from the provided image)
// IMPORTANT: Leave apiKey as an empty string. Canvas will provide it at runtime.
const firebaseConfig = {
    apiKey: "", // Canvas will automatically provide this at runtime
    authDomain: "gemini-chat-m48mq.firebaseapp.com",
    projectId: "gemini-chat-m48mq",
    storageBucket: "gemini-chat-m48mq.appspot.com",
    messagingSenderId: "503895668514",
    appId: "1:503895668514:web:16ccacd60f9a420becd77b"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
window.firebaseApp = app; // Expose app globally if needed by other scripts

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);
window.firebaseAuth = auth; // Expose auth globally
window.firebaseDb = db;     // Expose db globally

// Firebase Authentication Listener and Custom Token Sign-in
// This ensures the user is authenticated when the app loads.
async function initializeFirebaseAuth() {
    window.componentLog("[Firebase Init] Bắt đầu khởi tạo xác thực Firebase.", "info");

    // Check if __initial_auth_token is provided by the Canvas environment
    if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        try {
            await signInWithCustomToken(auth, __initial_auth_token);
            window.componentLog("[Firebase Init] Đăng nhập thành công bằng Custom Token.", "info");
        } catch (error) {
            window.componentLog(`[Firebase Init] Lỗi đăng nhập bằng Custom Token: ${error.message}. Thử đăng nhập ẩn danh.`, "error");
            try {
                await signInAnonymously(auth);
                window.componentLog("[Firebase Init] Đăng nhập ẩn danh thành công.", "info");
            } catch (anonError) {
                window.componentLog(`[Firebase Init] Lỗi đăng nhập ẩn danh: ${anonError.message}`, "error");
            }
        }
    } else {
        // If no custom token, sign in anonymously
        try {
            await signInAnonymously(auth);
            window.componentLog("[Firebase Init] Đăng nhập ẩn danh thành công (không có Custom Token).", "info");
        } catch (error) {
            window.componentLog(`[Firebase Init] Lỗi đăng nhập ẩn danh: ${error.message}`, "error");
        }
    }

    // Set up an auth state change listener (optional, but good practice)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            window.componentLog(`[Firebase Init] Trạng thái xác thực thay đổi: Người dùng đã đăng nhập (${user.uid}).`, "info");
            window.currentUserId = user.uid; // Store user ID globally
        } else {
            window.componentLog("[Firebase Init] Trạng thái xác thực thay đổi: Người dùng đã đăng xuất.", "info");
            window.currentUserId = null;
        }
    });

    window.componentLog("[Firebase Init] Khởi tạo xác thực Firebase hoàn tất.", "info");
}

// Call the initialization function when the DOM is ready
document.addEventListener('DOMContentLoaded', initializeFirebaseAuth);
