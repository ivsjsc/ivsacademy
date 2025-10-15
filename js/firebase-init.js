/**
 * @fileoverview Firebase Initialization Script for IVS JSC Applications.
 * This script initializes Firebase services (App, Auth, Firestore) and handles
 * user authentication using custom tokens provided by the Canvas environment.
 * ensured proper initialization and authentication.
 */

"use strict";

// This file is designed to be tolerant to both module and non-module script inclusion.
// If included in a non-module page, dynamic import will be used to load Firebase SDKs only when needed.

if (typeof window.componentLog !== 'function') {
    console.error("[Firebase Init] window.componentLog is not defined. Please ensure utils.js is loaded before firebase-init.js.");
    window.componentLog = (msg, level = 'error') => console[level](msg); // Fallback
}

// Firebase configuration skeleton. apiKey intentionally left empty for environments
// where it will be injected at runtime. Do NOT initialize Auth if apiKey is missing.
const firebaseConfig = {
    apiKey: "", // may be provided at runtime by hosting environment
    authDomain: "gemini-chat-m48mq.firebaseapp.com",
    projectId: "gemini-chat-m48mq",
    storageBucket: "gemini-chat-m48mq.appspot.com",
    messagingSenderId: "503895668514",
    appId: "1:503895668514:web:16ccacd60f9a420becd77b"
};

// Expose a safe initializer on window. Consumers should call initializeFirebase() and
// check for returned objects rather than relying on global variables.
window.initializeFirebase = async function() {
    // If apiKey is empty, do not attempt to initialize Firebase Auth; return nulls
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey.trim().length === 0) {
        window.componentLog('[Firebase Init] apiKey is empty; skipping Firebase SDK initialization.');
        return { app: null, auth: null, db: null };
    }

    // Load Firebase SDK modules dynamically as ESM to avoid import errors when this file
    // is included as a regular script tag.
    try {
        const [{ initializeApp }, { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged }, { getFirestore }] = await Promise.all([
            import('https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js'),
            import('https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js'),
            import('https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js')
        ]);

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);

        window.componentLog('[Firebase Init] Firebase SDKs loaded and initialized.');

        // Authentication flow (custom token or anonymous fallback)
        async function initializeFirebaseAuth() {
            window.componentLog('[Firebase Init] Starting Firebase auth initialization.', 'info');
            if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                try {
                    await signInWithCustomToken(auth, __initial_auth_token);
                    window.componentLog('[Firebase Init] Signed in with custom token.', 'info');
                } catch (err) {
                    window.componentLog('[Firebase Init] Custom token sign-in failed: ' + err.message, 'warn');
                    try { await signInAnonymously(auth); window.componentLog('[Firebase Init] Anonymous sign-in succeeded.', 'info'); } catch (e) { window.componentLog('[Firebase Init] Anonymous sign-in failed: ' + e.message, 'error'); }
                }
            } else {
                try { await signInAnonymously(auth); window.componentLog('[Firebase Init] Anonymous sign-in succeeded.', 'info'); } catch (e) { window.componentLog('[Firebase Init] Anonymous sign-in failed: ' + e.message, 'error'); }
            }

            onAuthStateChanged(auth, user => {
                if (user) { window.currentUserId = user.uid; window.componentLog('[Firebase Init] Auth state: signed in ' + user.uid, 'info'); }
                else { window.currentUserId = null; window.componentLog('[Firebase Init] Auth state: signed out', 'info'); }
            });
        }

        // Run auth init but don't block the initializer on it.
        initializeFirebaseAuth().catch(e => window.componentLog('[Firebase Init] Auth init error: ' + e.message, 'error'));

        return { app, auth, db };
    } catch (err) {
        window.componentLog('[Firebase Init] Error loading Firebase SDKs: ' + err.message, 'error');
        return { app: null, auth: null, db: null };
    }
};

// For convenience, attempt to auto-initialize if apiKey is present on the window
// (some hosting environments inject it before scripts run).
if (window.__firebaseApiKeyProvided) {
    firebaseConfig.apiKey = window.__firebaseApiKeyProvided;
    window.initializeFirebase();
}
