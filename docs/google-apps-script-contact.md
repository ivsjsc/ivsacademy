# Google Apps Script Contact Form Setup

This guide wires the IVS Academy contact form to:

- Google Sheet for lead storage
- Google Apps Script Web App for receiving submissions
- MailApp for email notification

## 1) Create the Google Sheet

Create a new spreadsheet named:

`IVS Academy Contact Leads`

Use this header row on the first sheet:

| Timestamp | Full Name | Email | Phone | Message | Source Page | User Agent | Status |
|---|---|---|---|---|---|---|---|

## 2) Open Apps Script

In the spreadsheet, go to:

`Extensions -> Apps Script`

## 3) Paste the script

Replace the default code with the script below.

```javascript
const SPREADSHEET_ID = '1NuVjJTgOWMfJR87aNZ8uFcZLIjMzvZPaRy60E2yA3ew3XW2dwUK2X_IV';
const SHEET_NAME = 'IVS Academy Contact Leads';
const NOTIFY_EMAIL = 'nmi.triet@gmail.com';

function doPost(e) {
  try {
    const data = parsePayload_(e);

    if ((data.botField || data.bot_field || data.bot || '').toString().trim()) {
      return json_({ success: true, ignored: true, reason: 'honeypot' });
    }

    const name = (data.name || '').toString().trim();
    const email = (data.email || '').toString().trim();
    const phone = (data.phone || '').toString().trim();
    const message = (data.message || '').toString().trim();
    const sourcePage = (data.source_page || data.sourcePage || '').toString().trim();
    const userAgent = (data.userAgent || e?.parameter?.userAgent || '').toString().trim();

    if (!name || !email || !phone || !message) {
      return json_({ success: false, error: 'Missing required fields.' });
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getSheets()[0];
    const timestamp = new Date();

    sheet.appendRow([
      timestamp,
      name,
      email,
      phone,
      message,
      sourcePage,
      userAgent,
      'new'
    ]);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'New Contact Lead - IVS Academy',
      htmlBody: buildEmailBody_({
        timestamp,
        name,
        email,
        phone,
        message,
        sourcePage
      })
    });

    return json_({ success: true, message: 'Lead stored successfully.' });
  } catch (error) {
    console.error(error);
    return json_({ success: false, error: error.message || 'Unexpected error.' });
  }
}

function parsePayload_(e) {
  if (!e) return {};
  if (e.postData && e.postData.contents) {
    const raw = e.postData.contents;
    try {
      return JSON.parse(raw);
    } catch (error) {
      return Object.fromEntries(new URLSearchParams(raw));
    }
  }
  return e.parameter || {};
}

function buildEmailBody_(data) {
  return `
    <p><strong>Họ tên:</strong> ${escapeHtml_(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml_(data.email)}</p>
    <p><strong>Số điện thoại:</strong> ${escapeHtml_(data.phone)}</p>
    <p><strong>Nội dung:</strong><br/>${escapeHtml_(data.message).replace(/\n/g, '<br/>')}</p>
    <p><strong>Trang nguồn:</strong> ${escapeHtml_(data.sourcePage || 'contact.html')}</p>
    <p><strong>Thời gian gửi:</strong> ${escapeHtml_(data.timestamp.toISOString())}</p>
  `;
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 4) Deploy as a Web App

In Apps Script:

1. Click `Deploy`
2. Choose `New deployment`
3. Select `Web app`
4. Set:
   - `Execute as`: `Me`
   - `Who has access`: `Anyone`
5. Deploy and authorize

## 5) Copy the Web App URL

Copy the generated Web App URL.

## 6) Put the URL into frontend config

Open:

`/js/contact-config.js`

Set:

```js
CONTACT_FORM_ENDPOINT: 'PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'
```

## 7) Verify

Submit the contact form and confirm:

- A new row appears in the sheet
- An email is sent to `nmi.triet@gmail.com`
- The frontend shows success/failure status correctly

## Notes

- Keep the endpoint out of HTML templates.
- If the endpoint is blank, the form should fall back to direct email guidance.
- Apps Script should ignore honeypot submissions and still return a safe response.
