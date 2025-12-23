'use strict';

/**
 * API Service - calls backend endpoints
 * @version 1.0
 * Forwards requests to server with Firebase ID token authentication
 */

class APIService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Get Authorization header with ID token
   */
  getAuthHeader() {
    const token = sessionStorage.getItem('firebaseIdToken');
    if (!token) throw new Error('Not authenticated');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Create request via API
   */
  async createRequest(requestData) {
    try {
      const response = await fetch(`${this.baseUrl}/api/celestech/requests`, {
        method: 'POST',
        headers: this.getAuthHeader(),
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      componentLog('APIService', `Request created: ${result.requestId}`);
      return { success: true, data: result };
    } catch (error) {
      console.error('Create request API error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Process GenAI task
   */
  async processGenAITask(taskData) {
    try {
      const response = await fetch(`${this.baseUrl}/api/celestech/genai/process`, {
        method: 'POST',
        headers: this.getAuthHeader(),
        body: JSON.stringify(taskData)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      componentLog('APIService', 'GenAI task processed');
      return { success: true, data: result };
    } catch (error) {
      console.error('GenAI API error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Approve request (admin only)
   */
  async approveRequest(requestId, notes = '') {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/celestech/requests/${requestId}/approve`,
        {
          method: 'POST',
          headers: this.getAuthHeader(),
          body: JSON.stringify({ notes })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      componentLog('APIService', `Request approved: ${requestId}`);
      return { success: true };
    } catch (error) {
      console.error('Approve request error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Reject request (admin only)
   */
  async rejectRequest(requestId, reason = '') {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/celestech/requests/${requestId}/reject`,
        {
          method: 'POST',
          headers: this.getAuthHeader(),
          body: JSON.stringify({ reason })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      componentLog('APIService', `Request rejected: ${requestId}`);
      return { success: true };
    } catch (error) {
      console.error('Reject request error:', error);
      return { success: false, error: error.message };
    }
  }
}

// Global instance initialized in app.js
let apiService = null;
