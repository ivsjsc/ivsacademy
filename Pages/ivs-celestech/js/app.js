'use strict';

/**
 * IVS Celestech - Main Application
 * @version 1.0
 */

let appConfig = null;

/**
 * Attach Google sign-in handlers to all elements marked with [data-google-sign-in].
 */
function bindGoogleSignInButtons() {
  const handler = async (event) => {
    event.preventDefault();
    const result = await authService.signInWithGoogle();
    if (!result.success) {
      uiController.showStatus(`Sign-in failed: ${result.error}`, 'error');
    }
  };

  document.querySelectorAll('[data-google-sign-in]').forEach((btn) => {
    if (btn.dataset.googleSignInBound) return;
    btn.addEventListener('click', handler);
    btn.dataset.googleSignInBound = '1';
  });
}

/**
 * Initialize application
 */
async function initApp() {
  try {
    componentLog('App', 'Initializing application...');

    // Load config
    const response = await fetch('/Pages/ivs-celestech/config.json');
    if (!response.ok) throw new Error('Failed to load config');
    appConfig = await response.json();

    // Initialize Firebase Auth
    const authInitialized = await authService.init(appConfig);
    if (!authInitialized) throw new Error('Firebase initialization failed');

    // Initialize Firestore
    const firestoreInitialized = firestoreService.init();
    if (!firestoreInitialized) throw new Error('Firestore initialization failed');

    // Initialize API service
    apiService = new APIService(appConfig.api.baseUrl);
    requestService.api = apiService;
    approvalController.api = apiService;

    // Setup event listeners
    setupEventListeners();

    componentLog('App', '✅ Application initialized successfully');
  } catch (error) {
    console.error('App initialization error:', error);
    alert(`Failed to initialize app: ${error.message}`);
  }
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
  bindGoogleSignInButtons();

  (function preserveComponentsCallback() {
    const previousCallback = window.onPageComponentsLoadedCallback;
    window.onPageComponentsLoadedCallback = function() {
      if (typeof previousCallback === 'function') {
        previousCallback();
      }
      bindGoogleSignInButtons();
    };
  })();

  // Auth state change event
  window.addEventListener('authStateChanged', (e) => {
    const { isSignedIn, user } = e.detail;
    
    uiController.updateAuthView(isSignedIn, user);

    // Show admin tab only for admins
    const adminTab = document.getElementById('tab-admin');
    if (adminTab) {
      adminTab.style.display = isSignedIn && authService.isAdmin() ? 'block' : 'none';
    }

    if (isSignedIn) {
      componentLog('App', `User signed in: ${user.email}`);
    } else {
      componentLog('App', 'User signed out');
    }
  });

  document.getElementById('sign-out-btn')?.addEventListener('click', async () => {
    if (confirm('Sign out?')) {
      await authService.signOut();
    }
  });

  // Create Request Form submission
  document.getElementById('create-request-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = authService.getCurrentUser();
    if (!user) {
      uiController.showStatus('Please sign in first', 'error');
      return;
    }

    const formData = {
      title: document.getElementById('req-title').value,
      description: document.getElementById('req-description').value,
      type: document.getElementById('req-type').value,
      content: document.getElementById('req-content').value,
      targetLanguage: document.getElementById('req-target-language').value
    };

    // Show loading state
    uiController.setButtonLoading('btn-submit-request', true);

    try {
      const result = await requestService.createRequest(formData, user.uid, user.email);

      if (result.success) {
        uiController.showStatus(result.message, 'success');
        uiController.clearForm();
      } else {
        const errorMsg = result.errors?.join(', ') || result.error;
        uiController.showStatus(`Error: ${errorMsg}`, 'error');
      }
    } catch (error) {
      uiController.showStatus(`Unexpected error: ${error.message}`, 'error');
    } finally {
      uiController.setButtonLoading('btn-submit-request', false, '<i class="fas fa-paper-plane"></i> Submit Request');
    }
  });

  // Tab navigation
  document.getElementById('tab-create-request')?.addEventListener('click', () => {
    uiController.showTab('create-request');
  });

  document.getElementById('tab-my-requests')?.addEventListener('click', async () => {
    uiController.showTab('my-requests');
    await uiController.loadMyRequests();
  });

  document.getElementById('tab-admin')?.addEventListener('click', async () => {
    uiController.showTab('admin');
    await approvalController.loadPendingRequests();
  });

  // Show target language field only for translate task
  document.getElementById('req-type')?.addEventListener('change', (e) => {
    const field = document.getElementById('field-target-lang');
    if (field) {
      field.classList.toggle('hidden', e.target.value !== 'translate');
    }
  });
}

/**
 * Initialize when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
