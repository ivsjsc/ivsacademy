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
    console.error('[Newsletter] Failed to initialize Firebase Admin:', error.message);
    return null;
  }
}

function getEnv(name) {
  const value = process.env[name];
  return typeof value === 'string' && value.trim() ? value.trim() : '';
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
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

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (error) {
    data = { raw: text };
  }

  if (!response.ok) {
    const message = data?.error || data?.message || text || `HTTP ${response.status}`;
    throw new Error(message);
  }

  return data;
}

async function sendWelcomeEmail(email) {
  const apiKey = getEnv('BREVO_API_KEY') || getEnv('SENDGRID_API_KEY');
  const fromEmail = getEnv('NEWSLETTER_FROM_EMAIL') || getEnv('SUPPORT_EMAIL') || getEnv('ADMIN_EMAIL');
  if (!apiKey || !fromEmail) return { skipped: true };

  const isBrevo = Boolean(getEnv('BREVO_API_KEY'));

  if (isBrevo) {
    const payload = {
      sender: {
        name: 'IVS JSC',
        email: fromEmail
      },
      to: [
        {
          email
        }
      ],
      subject: 'Cảm ơn bạn đã đăng ký nhận tin từ IVS JSC',
      htmlContent: [
        '<p>Xin chào,</p>',
        '<p>Cảm ơn bạn đã đăng ký nhận bản tin từ IVS JSC.</p>',
        '<p>Chúng tôi sẽ gửi tới bạn các cập nhật mới nhất về giáo dục, công nghệ và giải pháp số.</p>',
        '<p>Trân trọng,<br>IVS JSC</p>'
      ].join('')
    };

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(body || `Brevo HTTP ${response.status}`);
    }

    return { skipped: false, provider: 'brevo' };
  }

  const payload = {
    personalizations: [
      {
        to: [{ email }],
        subject: 'Cảm ơn bạn đã đăng ký nhận tin từ IVS JSC'
      }
    ],
    from: {
      email: fromEmail,
      name: 'IVS JSC'
    },
    content: [
      {
        type: 'text/html',
        value: [
          '<p>Xin chào,</p>',
          '<p>Cảm ơn bạn đã đăng ký nhận bản tin từ IVS JSC.</p>',
          '<p>Chúng tôi sẽ gửi tới bạn các cập nhật mới nhất về giáo dục, công nghệ và giải pháp số.</p>',
          '<p>Trân trọng,<br>IVS JSC</p>'
        ].join('')
      }
    ]
  };

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `SendGrid HTTP ${response.status}`);
  }

  return { skipped: false, provider: 'sendgrid' };
}

router.post('/subscribe', async (req, res) => {
  try {
    const firebaseAdmin = ensureFirebaseAdmin();
    const db = firebaseAdmin ? firebaseAdmin.firestore() : null;
    const email = normalizeEmail(req.body?.email);
    const source = String(req.body?.source || 'website').slice(0, 100);
    const pageUrl = String(req.body?.pageUrl || '').slice(0, 500);

    if (isSpamSubmission(req.body)) {
      return res.status(400).json({ success: false, error: 'Spam detected.' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, error: 'Email không hợp lệ.' });
    }

    const submittedAt = firebaseAdmin ? firebaseAdmin.firestore.FieldValue.serverTimestamp() : new Date();
    const subscriberRef = db ? db.collection('newsletter_subscribers').doc(email) : null;

    if (subscriberRef) {
      await subscriberRef.set(
        {
          email,
          source,
          pageUrl,
          status: 'subscribed',
          updatedAt: submittedAt,
          createdAt: submittedAt
        },
        { merge: true }
      );
    }

    const sheetWebhookUrl = getEnv('NEWSLETTER_SHEET_WEBHOOK_URL');
    if (sheetWebhookUrl) {
      await postJson(sheetWebhookUrl, {
        email,
        source,
        pageUrl,
        subscribedAt: new Date().toISOString()
      });
    }

    const emailResult = await sendWelcomeEmail(email);

    res.json({
      success: true,
      message: 'Đăng ký thành công.',
      firestore: Boolean(subscriberRef),
      sheetSynced: Boolean(sheetWebhookUrl),
      emailSent: !emailResult.skipped
    });
  } catch (error) {
    console.error('[Newsletter] Subscribe error:', error);
    res.status(500).json({
      success: false,
      error: 'Không thể xử lý đăng ký lúc này.'
    });
  }
});

module.exports = router;
