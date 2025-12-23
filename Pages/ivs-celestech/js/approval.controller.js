'use strict';

/**
 * Admin Approval Controller
 * @version 1.0
 * Handles approval workflow for requests
 */

class ApprovalController {
  constructor(authService, firestoreService, apiService) {
    this.auth = authService;
    this.firestore = firestoreService;
    this.api = apiService;
  }

  /**
   * Check if current user is admin
   */
  isAdmin() {
    return this.auth.isAdmin();
  }

  /**
   * Load pending requests for admin dashboard
   */
  async loadPendingRequests() {
    if (!this.isAdmin()) {
      console.warn('Not an admin');
      return;
    }

    const panelEl = document.getElementById('pending-requests');
    if (!panelEl) return;

    // Show loading
    panelEl.innerHTML = '<p class="text-gray-500"><i class="fas fa-spinner fa-spin mr-2"></i>Loading pending requests...</p>';

    try {
      const requests = await this.firestore.getPendingRequests();
      
      if (requests.length === 0) {
        panelEl.innerHTML = '<p class="text-gray-500"><i class="fas fa-check-circle mr-2"></i>No pending requests</p>';
        return;
      }

      panelEl.innerHTML = requests.map(req => this.renderApprovalItem(req)).join('');
      this.attachEventListeners(requests);
    } catch (error) {
      console.error('Load pending requests error:', error);
      panelEl.innerHTML = `<p class="text-red-500"><i class="fas fa-exclamation-circle mr-2"></i>Error: ${error.message}</p>`;
    }
  }

  /**
   * Render approval item for admin review
   */
  renderApprovalItem(request) {
    return `
      <div class="bg-white dark:bg-gray-700 border-2 border-yellow-300 dark:border-yellow-600 rounded-lg p-4 mb-4 animate-slide-down">
        <div class="mb-3">
          <h3 class="font-bold text-lg"><i class="fas fa-flag mr-2 text-yellow-500"></i>${this.escapeHtml(request.title)}</h3>
          <p class="text-gray-600 dark:text-gray-300 mt-2">${this.escapeHtml(request.description)}</p>
        </div>
        
        <div class="grid grid-cols-2 gap-3 text-sm mb-4 pb-4 border-b dark:border-gray-600">
          <div>
            <strong><i class="fas fa-tasks mr-1"></i>Type:</strong> ${request.type}
          </div>
          <div>
            <strong><i class="fas fa-user mr-1"></i>Creator:</strong> ${request.createdByEmail || 'Unknown'}
          </div>
          <div>
            <strong><i class="fas fa-calendar mr-1"></i>Created:</strong> ${new Date(request.createdAt).toLocaleString('vi-VN')}
          </div>
          ${request.targetLanguage ? `
            <div>
              <strong><i class="fas fa-globe mr-1"></i>Target:</strong> ${request.targetLanguage}
            </div>
          ` : ''}
        </div>

        ${request.content ? `
          <div class="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm border dark:border-gray-600">
            <strong><i class="fas fa-file-code mr-1"></i>Content (preview):</strong>
            <p class="mt-2 whitespace-pre-wrap font-mono text-xs max-h-32 overflow-y-auto">${this.escapeHtml(request.content.substring(0, 500))}</p>
          </div>
        ` : ''}

        <div class="flex gap-2 flex-wrap">
          <button id="approve-${request.id}" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 transition">
            <i class="fas fa-check"></i> Approve & Process
          </button>
          <button id="reject-${request.id}" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 transition">
            <i class="fas fa-times"></i> Reject
          </button>
          <button id="notes-${request.id}" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 transition" onclick="approvalController.addNotes('${request.id}')">
            <i class="fas fa-comment"></i> Add Notes
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Attach event listeners to approval buttons
   */
  attachEventListeners(requests) {
    requests.forEach(req => {
      const approveBt = document.getElementById(`approve-${req.id}`);
      const rejectBtn = document.getElementById(`reject-${req.id}`);

      if (approveBt) {
        approveBt.addEventListener('click', () => this.approveRequest(req.id));
      }
      if (rejectBtn) {
        rejectBtn.addEventListener('click', () => this.rejectRequest(req.id));
      }
    });
  }

  /**
   * Approve request
   */
  async approveRequest(requestId) {
    if (!confirm('Approve this request? It will be sent for GenAI processing.')) {
      return;
    }

    const btn = document.getElementById(`approve-${requestId}`);
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Approving...';
    }

    try {
      const result = await this.firestore.updateRequestStatus(requestId, 'approved', '');
      
      if (result.success) {
        // Call API to trigger GenAI processing if available
        if (this.api) {
          try {
            await this.api.approveRequest(requestId);
          } catch (err) {
            console.warn('API approval notification failed:', err);
          }
        }

        alert('✅ Request approved! Processing will begin soon.');
        this.loadPendingRequests();
      } else {
        alert('❌ Failed to approve: ' + result.error);
        if (btn) btn.disabled = false;
      }
    } catch (error) {
      console.error('Approve error:', error);
      alert('❌ Error: ' + error.message);
      if (btn) btn.disabled = false;
    }
  }

  /**
   * Reject request
   */
  async rejectRequest(requestId) {
    const reason = prompt('Enter reason for rejection:', '');
    if (reason === null) return;

    const btn = document.getElementById(`reject-${requestId}`);
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Rejecting...';
    }

    try {
      const result = await this.firestore.updateRequestStatus(requestId, 'rejected', reason);
      
      if (result.success) {
        if (this.api) {
          try {
            await this.api.rejectRequest(requestId, reason);
          } catch (err) {
            console.warn('API rejection notification failed:', err);
          }
        }

        alert('✅ Request rejected');
        this.loadPendingRequests();
      } else {
        alert('❌ Failed to reject: ' + result.error);
        if (btn) btn.disabled = false;
      }
    } catch (error) {
      console.error('Reject error:', error);
      alert('❌ Error: ' + error.message);
      if (btn) btn.disabled = false;
    }
  }

  /**
   * Add notes to request
   */
  async addNotes(requestId) {
    const notes = prompt('Add admin notes:');
    if (notes === null) return;

    try {
      const result = await this.firestore.updateRequestStatus(requestId, 'approved', notes);
      if (result.success) {
        alert('✅ Notes added');
        this.loadPendingRequests();
      } else {
        alert('❌ Failed: ' + result.error);
      }
    } catch (error) {
      alert('❌ Error: ' + error.message);
    }
  }

  /**
   * Escape HTML
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Global instance
const approvalController = new ApprovalController(authService, firestoreService, null);
