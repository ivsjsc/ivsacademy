const SHEET_NAME = 'Newsletter';
const HEADER = ['createdAt', 'email', 'source', 'pageUrl', 'ip', 'userAgent'];

function setupNewsletterSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADER);
  }
}

function doPost(e) {
  try {
    setupNewsletterSheet();

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    const payload = e && e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};

    const email = String(payload.email || '').trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ success: false, error: 'Invalid email' }, 400);
    }

    sheet.appendRow([
      payload.subscribedAt || new Date().toISOString(),
      email,
      String(payload.source || 'website'),
      String(payload.pageUrl || ''),
      String(payload.ip || ''),
      String(payload.userAgent || '')
    ]);

    return jsonResponse({ success: true, message: 'Appended to sheet' });
  } catch (error) {
    console.error(error);
    return jsonResponse({ success: false, error: error.message || 'Unexpected error' }, 500);
  }
}

function jsonResponse(body, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(body));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
