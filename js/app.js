// This script may be included on pages as a non-module. Use dynamic import and
// the window.initializeFirebase helper to obtain Firebase instances safely.

async function withFirebase(fn) {
  try {
    const env = await window.initializeFirebase();
    const auth = env.auth;
    const db = env.db;
    if (!auth || !db) {
      window.componentLog('Firebase not initialized (auth/db missing). Skipping firebase-backed app features.', 'warn');
      return null;
    }
    // Load firestore/auth helpers dynamically
    const [{ signInWithEmailAndPassword, onAuthStateChanged }, { collection, addDoc, getDocs }] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js'),
      import('https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js')
    ]);
    return { auth, db, signInWithEmailAndPassword, onAuthStateChanged, collection, addDoc, getDocs };
  } catch (err) {
    window.componentLog('withFirebase error: ' + err.message, 'error');
    return null;
  }
}

// Example usage: Only run firebase-dependent code when available
withFirebase().then(env => {
  if (!env) return;
  const { auth, db, signInWithEmailAndPassword, onAuthStateChanged, collection, addDoc, getDocs } = env;

  async function login(email, password) { await signInWithEmailAndPassword(auth, email, password); }
  async function saveData(data) { await addDoc(collection(db, "kinderlink_data"), data); }
  async function loadData() { const querySnapshot = await getDocs(collection(db, "kinderlink_data")); return querySnapshot.docs.map(doc => doc.data()); }

  onAuthStateChanged(auth, user => {
    if (user) {
      window.componentLog('App: user signed in ' + user.uid, 'info');
    } else {
      window.componentLog('App: user signed out', 'info');
    }
  });

  // expose for debugging
  window.appLogin = login;
  window.appSaveData = saveData;
  window.appLoadData = loadData;
});