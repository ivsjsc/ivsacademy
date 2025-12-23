'use strict';

/**
 * Firebase Authentication Service
 * @version 1.0
 * Handles Google OAuth login, token management, and user state
 */

class AuthService {
  constructor() {
    this.currentUser = null;
    this.idToken = null;
    this.unsubscribe = null;
    this.config = null;
  }

  /**
   * Initialize Firebase Auth
   */
  async init(config) {
    try {
      this.config = config;
      
      // Initialize Firebase
      firebase.initializeApp(config.firebase);
      
      // Setup auth state listener
      this.setupAuthStateListener();
      
      componentLog('AuthService', 'Firebase initialized');
      return true;
    } catch (error) {
      console.error('AuthService init error:', error);
      return false;
    }
  }

  /**
   * Setup Firebase Auth state change listener
   */
  setupAuthStateListener() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.currentUser = user;
        this.idToken = await user.getIdToken();
        sessionStorage.setItem('firebaseIdToken', this.idToken);
        sessionStorage.setItem('currentUserId', user.uid);
        
        window.dispatchEvent(new CustomEvent('authStateChanged', { 
          detail: { user, isSignedIn: true } 
        }));
        
        componentLog('AuthService', `User signed in: ${user.email}`);
      } else {
        this.currentUser = null;
        this.idToken = null;
        sessionStorage.removeItem('firebaseIdToken');
        sessionStorage.removeItem('currentUserId');
        
        window.dispatchEvent(new CustomEvent('authStateChanged', { 
          detail: { user: null, isSignedIn: false } 
        }));
      }
    });
  }

  /**
   * Sign in with Google
   */
  async signInWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      this.currentUser = result.user;
      this.idToken = await result.user.getIdToken();
      
      sessionStorage.setItem('firebaseIdToken', this.idToken);
      sessionStorage.setItem('currentUserId', result.user.uid);
      
      componentLog('AuthService', 'Google sign-in successful');
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Google sign-in error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Sign out
   */
  async signOut() {
    try {
      await firebase.auth().signOut();
      sessionStorage.removeItem('firebaseIdToken');
      sessionStorage.removeItem('currentUserId');
      componentLog('AuthService', 'Sign out successful');
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get current user
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Get ID token for API calls
   */
  getIdToken() {
    return this.idToken;
  }

  /**
   * Check if user is signed in
   */
  isSignedIn() {
    return !!this.currentUser;
  }

  /**
   * Check if current user is admin
   */
  isAdmin() {
    if (!this.currentUser || !this.config) return false;
    return this.config.app.adminEmails.includes(this.currentUser.email);
  }

  /**
   * Destroy service
   */
  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}

// Global instance
const authService = new AuthService();
