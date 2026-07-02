'use strict';

const express = require('express');
const router = express.Router();

let admin = null;
try {
  admin = require('firebase-admin');
} catch (error) {
  admin = null;
}

function ensureFirebaseAdmin() {
  if (!admin) return null;
  if (admin.apps && admin.apps.length > 0) return admin;

  const rawKey = process.env.FIREBASE_ADMIN_SDK_KEY;
  if (!rawKey) return null;

  try {
    const serviceAccount = JSON.parse(rawKey);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    return admin;
  } catch (error) {
    console.error('[Contact] Failed to initialize Firebase Admin:', error.message);
    return null;
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isSpamSubmission(body) {
  const honeypot = String(body?.botField || body?.bot_field || body?.bot || '').trim();
  const startedAt = Number(body?.startedAt || 0);
  const elapsedMs = startedAt > 0 ? Date.now() - startedAt : 0;

  if (honeypot) return true;
  if (startedAt > 0 && elapsedMs > 0 && elapsedMs < 2500) return true;
  return false;
}

router.post('/submit', async (req, res) => {
  try {
    const firebaseAdmin = ensureFirebaseAdmin();
    const db = firebaseAdmin ? firebaseAdmin.firestore() : null;

    const name = String(req.body?.name || '').trim();
    const email = String(req.body?.email || '').trim().toLowerCase();
    const phone = String(req.body?.phone || '').trim();
    const message = String(req.body?.message || '').trim();

    if (isSpamSubmission(req.body)) {
      return res.status(400).json({ success: false, error: 'Spam detected.' });
    }

    if (!name || !email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, error: 'Thiếu thông tin bắt buộc hoặc email không hợp lệ.' });
    }

    const submittedAt = firebaseAdmin ? firebaseAdmin.firestore.FieldValue.serverTimestamp() : new Date();
    if (db) {
      await db.collection('contact_requests').add({
        name,
        email,
        phone,
        message,
        status: 'new',
        createdAt: submittedAt,
        updatedAt: submittedAt
      });
    }

    res.json({ success: true, message: 'Yêu cầu của bạn đã được gửi thành công.' });
  } catch (error) {
    console.error('[Contact] Submit error:', error);
    res.status(500).json({ success: false, error: 'Không thể gửi yêu cầu lúc này.' });
  }
});

module.exports = router;
