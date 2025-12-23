'use strict';

/**
 * UI Controller - handles DOM interactions and rendering
 * @version 1.0
 */

class UIController {
  constructor(authService, requestService) {
    this.auth = authService;
    this.requestService = requestService;
  }

  /**
   * Update auth view visibility
   */
  updateAuthView(isSignedIn, user) {
    const notAuthView = document.getElementById('not-auth-view');
    const authView = document.getElementById('auth-view');
    const userEmail = document.getElementById('user-email');

    if (isSignedIn && user) {
      notAuthView?.classList.add('hidden');
      authView?.classList.remove('hidden');
      if (userEmail) userEmail.textContent = user.email;
    } else {
      notAuthView?.classList.remove('hidden');
      authView?.classList.add('hidden');
    }
  }

  /**
   * Show status message
   */
  showStatus(message, type = 'info') {
    const statusEl = document.getElementById('form-status');
    if (!statusEl) return;

    const bgColor = {
      'success': 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200',
      'error': 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200',
      'info': 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200',
      'warning': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200'
    }[type] || 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200';

    statusEl.className = `mt-4 p-4 rounded-lg ${bgColor}`;
    statusEl.innerHTML = `<i class="fas fa-info-circle mr-2"></i>${this.escapeHtml(message)}`;
    statusEl.classList.remove('hidden');
  }

  /**
   * Clear form
   */
  clearForm() {
    const form = document.getElementById('create-request-form');
    if (form) {
      form.reset();
      document.getElementById('field-target-lang')?.classList.add('hidden');
    }
  }

  /**
   * Show specific tab
   */
  showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('[id^="content-"]').forEach(el => {
      el.classList.add('hidden');
    });

    // Show selected tab
    const tabEl = document.getElementById(`content-${tabName}`);
    if (tabEl) {
      tabEl.classList.remove('hidden');
    }

    // Update tab buttons
    document.querySelectorAll('[id^="tab-"]').forEach(btn => {
      btn.classList.remove('border-blue-600', 'text-blue-600');
      btn.classList.add('border-transparent', 'text-gray-600', 'dark:text-gray-300');
    });

    const activeBtn = document.getElementById(`tab-${tabName}`);
    if (activeBtn) {
      activeBtn.classList.remove('border-transparent', 'text-gray-600', 'dark:text-gray-300');
      activeBtn.classList.add('border-blue-600', 'text-blue-600');
    }
  }

  /**
   * Render single request item
   */
  renderRequestItem(request) {
    const statusInfo = this.requestService.getStatusDisplay(request.status);
    const createdDate = this.requestService.formatDate(request.createdAt);

    return `
      <div class="bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition animate-slide-down">
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-bold text-lg">${this.escapeHtml(request.title)}</h3>
          <span class="px-3 py-1 rounded-full text-sm font-semibold status-badge ${request.status}">
            <i class="fas fa-${statusInfo.icon} mr-1"></i>${statusInfo.label}
          </span>
        </div>
        <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">${this.escapeHtml(request.description)}</p>
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-3 pb-3 border-b dark:border-gray-600">
          <span><i class="fas fa-tag mr-1"></i>Type: <strong>${request.type}</strong></span>
          <span><i class="fas fa-calendar mr-1"></i>${createdDate}</span>
        </div>
        ${request.adminNotes ? `
          <div class="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900 rounded text-sm border-l-2 border-yellow-400">
            <strong><i class="fas fa-sticky-note mr-1"></i>Admin Notes:</strong>
            <p class="mt-1">${this.escapeHtml(request.adminNotes)}</p>
          </div>
        ` : ''}
        ${request.genaiResult ? `
          <div class="mt-3 p-3 bg-green-50 dark:bg-green-900 rounded text-sm border-l-2 border-green-400">
            <strong><i class="fas fa-check-circle mr-1"></i>Result:</strong>
            <p class="mt-1 whitespace-pre-wrap font-mono text-xs">${this.escapeHtml(JSON.stringify(request.genaiResult, null, 2).substring(0, 200))}</p>
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Load and display user's requests
   */
  async loadMyRequests() {
    const userId = sessionStorage.getItem('currentUserId');
    if (!userId) {
      this.showStatus('User ID not found', 'error');
      return;
    }

    const listEl = document.getElementById('requests-list');
    if (!listEl) return;

    // Show loading
    listEl.innerHTML = '<p class="text-gray-500"><i class="fas fa-spinner fa-spin mr-2"></i>Loading requests...</p>';

    try {
      const requests = await firestoreService.getUserRequests(userId);
      
      if (requests.length === 0) {
        listEl.innerHTML = '<p class="text-gray-500"><i class="fas fa-inbox mr-2"></i>No requests yet</p>';
        return;
      }

      listEl.innerHTML = requests.map(req => this.renderRequestItem(req)).join('');
    } catch (error) {
      console.error('Load requests error:', error);
      listEl.innerHTML = `<p class="text-red-500"><i class="fas fa-exclamation-circle mr-2"></i>Error loading requests: ${error.message}</p>`;
    }
  }

  /**
   * Set button loading state
   */
  setButtonLoading(buttonId, isLoading, originalText = null) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;

    if (isLoading) {
      btn.disabled = true;
      btn.dataset.originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';
    } else {
      btn.disabled = false;
      btn.innerHTML = btn.dataset.originalText || originalText || btn.innerHTML;
    }
  }
}

// Global instance
const uiController = new UIController(authService, requestService);
