'use strict';

/**
 * Request Management Service
 * @version 1.0
 * Handles business logic for creating and managing requests
 */

class RequestService {
  constructor(firestoreService, apiService) {
    this.firestore = firestoreService;
    this.api = apiService;
  }

  /**
   * Validate request form data
   */
  validateForm(formData) {
    const errors = [];
    
    if (!formData.title?.trim()) {
      errors.push('Title is required');
    }
    if (!formData.description?.trim()) {
      errors.push('Description is required');
    }
    if (!formData.type) {
      errors.push('Task type is required');
    }
    if (formData.type === 'translate' && !formData.targetLanguage) {
      errors.push('Target language is required for translation tasks');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Create new request
   */
  async createRequest(formData, userId, userEmail) {
    // Validate
    const validation = this.validateForm(formData);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    // Prepare data
    const requestData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      type: formData.type,
      content: formData.content?.trim() || '',
      targetLanguage: formData.targetLanguage || '',
      metadata: formData.metadata || {},
      createdBy: userId,
      createdByEmail: userEmail,
      status: 'pending'
    };

    // Save to Firestore
    const fsResult = await this.firestore.createRequest(requestData);
    if (!fsResult.success) {
      return fsResult;
    }

    // Notify via API if available
    try {
      if (this.api) {
        await this.api.createRequest({
          ...requestData,
          requestId: fsResult.requestId
        });
      }
    } catch (err) {
      console.warn('API notification failed, but request saved to Firestore:', err);
    }

    return {
      success: true,
      requestId: fsResult.requestId,
      message: 'Request created successfully. Awaiting admin approval.'
    };
  }

  /**
   * Get status display info
   */
  getStatusDisplay(status) {
    const statusMap = {
      'pending': { label: 'Pending Approval', color: 'yellow', icon: 'hourglass' },
      'approved': { label: 'Approved', color: 'blue', icon: 'check-circle' },
      'rejected': { label: 'Rejected', color: 'red', icon: 'times-circle' },
      'processing': { label: 'Processing', color: 'blue', icon: 'spinner' },
      'completed': { label: 'Completed', color: 'green', icon: 'check-double' }
    };
    return statusMap[status] || { label: status, color: 'gray', icon: 'question' };
  }

  /**
   * Format date for display
   */
  formatDate(date) {
    if (!date) return 'N/A';
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

// Global instance
const requestService = new RequestService(firestoreService, null);
