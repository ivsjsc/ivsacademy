'use strict';

/**
 * Celestech API Routes
 * @version 1.0
 * Handles request creation, approval, and GenAI processing
 */

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const db = admin.firestore();

/**
 * Middleware: Verify Firebase ID Token
 */
async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const token = authHeader.substring(7);
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.uid = decodedToken.uid;
    req.email = decodedToken.email;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
}

// Apply middleware to all routes
router.use(verifyToken);

/**
 * POST /api/celestech/requests - Create new request
 */
router.post('/requests', async (req, res) => {
  try {
    const { title, description, type, content, targetLanguage, metadata } = req.body;

    // Validate
    if (!title || !description || !type) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: title, description, type'
      });
    }

    // Create in Firestore
    const docRef = await db.collection('celestech_requests').add({
      title,
      description,
      type,
      content: content || '',
      targetLanguage: targetLanguage || '',
      metadata: metadata || {},
      createdBy: req.uid,
      createdByEmail: req.email,
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // TODO: Send email notification to admins
    console.log(`[Celestech] New request created: ${docRef.id}`);

    res.json({
      success: true,
      message: 'Request created successfully',
      requestId: docRef.id
    });
  } catch (error) {
    console.error('Create request error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

/**
 * POST /api/celestech/requests/:id/approve - Admin approve request
 */
router.post('/requests/:id/approve', async (req, res) => {
  try {
    const { notes } = req.body;

    // Update status
    await db.collection('celestech_requests').doc(req.params.id).update({
      status: 'approved',
      adminNotes: notes || '',
      approvedBy: req.uid,
      approvedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // TODO: Trigger Cloud Function for GenAI processing
    console.log(`[Celestech] Request approved: ${req.params.id}`);

    res.json({ 
      success: true, 
      message: 'Request approved' 
    });
  } catch (error) {
    console.error('Approve request error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

/**
 * POST /api/celestech/requests/:id/reject - Admin reject request
 */
router.post('/requests/:id/reject', async (req, res) => {
  try {
    const { reason } = req.body;

    // Update status
    await db.collection('celestech_requests').doc(req.params.id).update({
      status: 'rejected',
      rejectionReason: reason || '',
      rejectedBy: req.uid,
      rejectedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // TODO: Send rejection notification to requester
    console.log(`[Celestech] Request rejected: ${req.params.id}`);

    res.json({ 
      success: true, 
      message: 'Request rejected' 
    });
  } catch (error) {
    console.error('Reject request error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

/**
 * POST /api/celestech/genai/process - Process GenAI task
 */
router.post('/genai/process', async (req, res) => {
  try {
    const { type, text, requestId, targetLanguage } = req.body;

    if (!type || !text) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: type, text'
      });
    }

    // TODO: Call Google GenAI API via Cloud Function
    // This is a placeholder - integrate with @google/genai library

    const result = {
      type,
      status: 'processing',
      message: 'GenAI processing initiated'
    };

    if (requestId) {
      await db.collection('celestech_requests').doc(requestId).update({
        status: 'processing',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    console.log(`[Celestech] GenAI task queued: ${type} for request ${requestId}`);

    res.json({ 
      success: true, 
      data: result 
    });
  } catch (error) {
    console.error('GenAI process error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;
