'use strict';

/**
 * Firestore Database Service
 * @version 1.0
 * Handles all Firestore CRUD operations
 */

class FirestoreService {
  constructor() {
    this.db = null;
    this.requestsCollection = 'celestech_requests';
  }

  /**
   * Initialize Firestore
   */
  init() {
    try {
      this.db = firebase.firestore();
      componentLog('FirestoreService', 'Firestore initialized');
      return true;
    } catch (error) {
      console.error('FirestoreService init error:', error);
      return false;
    }
  }

  /**
   * Create a new request
   */
  async createRequest(requestData) {
    try {
      const docRef = await this.db.collection(this.requestsCollection).add({
        ...requestData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'pending'
      });
      
      componentLog('FirestoreService', `Request created: ${docRef.id}`);
      return { success: true, requestId: docRef.id };
    } catch (error) {
      console.error('Create request error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get user's requests
   */
  async getUserRequests(userId) {
    try {
      const snapshot = await this.db
        .collection(this.requestsCollection)
        .where('createdBy', '==', userId)
        .orderBy('createdAt', 'desc')
        .limit(50)
        .get();
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || null,
        updatedAt: doc.data().updatedAt?.toDate() || null
      }));
    } catch (error) {
      console.error('Get user requests error:', error);
      return [];
    }
  }

  /**
   * Get single request
   */
  async getRequest(requestId) {
    try {
      const doc = await this.db
        .collection(this.requestsCollection)
        .doc(requestId)
        .get();
      
      if (!doc.exists) {
        throw new Error('Request not found');
      }
      
      return {
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || null,
        updatedAt: doc.data().updatedAt?.toDate() || null
      };
    } catch (error) {
      console.error('Get request error:', error);
      throw error;
    }
  }

  /**
   * Get pending requests (for admin)
   */
  async getPendingRequests() {
    try {
      const snapshot = await this.db
        .collection(this.requestsCollection)
        .where('status', '==', 'pending')
        .orderBy('createdAt', 'asc')
        .limit(100)
        .get();
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || null,
        updatedAt: doc.data().updatedAt?.toDate() || null
      }));
    } catch (error) {
      console.error('Get pending requests error:', error);
      return [];
    }
  }

  /**
   * Update request status
   */
  async updateRequestStatus(requestId, status, notes = '') {
    try {
      const updateData = {
        status,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      
      if (notes) {
        updateData.adminNotes = notes;
      }
      
      await this.db
        .collection(this.requestsCollection)
        .doc(requestId)
        .update(updateData);
      
      componentLog('FirestoreService', `Request updated: ${requestId} -> ${status}`);
      return { success: true };
    } catch (error) {
      console.error('Update request error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Save GenAI result
   */
  async saveGenAIResult(requestId, result) {
    try {
      await this.db
        .collection(this.requestsCollection)
        .doc(requestId)
        .update({
          genaiResult: result,
          status: 'completed',
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      
      return { success: true };
    } catch (error) {
      console.error('Save GenAI result error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Listen to request updates (real-time)
   */
  listenToRequest(requestId, callback) {
    return this.db
      .collection(this.requestsCollection)
      .doc(requestId)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            callback({
              success: true,
              data: {
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate() || null,
                updatedAt: doc.data().updatedAt?.toDate() || null
              }
            });
          }
        },
        (error) => {
          console.error('Listen error:', error);
          callback({ success: false, error: error.message });
        }
      );
  }
}

// Global instance
const firestoreService = new FirestoreService();
