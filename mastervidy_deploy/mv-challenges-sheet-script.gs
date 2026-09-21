/**
 * MV Challenges — Registration → Google Sheet sync
 *
 * SETUP (do this in order):
 * 1. Go to sheets.google.com and create a new blank spreadsheet.
 *    Name it: MV Challenges Registrations
 * 2. Rename "Sheet1" (bottom tab) to: Challenge Registrations
 * 3. In the menu: Extensions → Apps Script. Delete any starter code,
 *    then paste this entire file in.
 * 4. Click Deploy → New deployment.
 *    - Type: "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (this only controls who can SEND data in —
 *      the sheet itself stays private, nobody can read it through this URL)
 * 5. Click Deploy, authorize it with your Google account when prompted.
 * 6. Copy the "Web app URL" it gives you.
 * 7. Send that URL to Claude, or paste it yourself into index.html where it
 *    says: const GOOGLE_SHEET_WEBHOOK_URL = "";
 *
 * That's it — every registration submitted on the site will now also land
 * as a row in this sheet automatically. Nobody outside your Google account
 * can read the sheet itself; the URL only accepts new rows, it can't be
 * used to read existing data back out.
 */

const SHEET_TAB_NAME = "Challenge Registrations";

const HEADERS = [
  "Registration ID", "Full Name", "WhatsApp Number", "Age", "Date of Birth",
  "Gender", "Area / Ghetto", "Instagram / TikTok", "Registration Consent",
  "WhatsApp Marketing Consent", "Consent Version", "Consent Timestamp",
  "Registration Date", "Registration Status"
];

function doPost(e) {
  try {
    const sheet = getOrCreateSheet_();
    const data = JSON.parse(e.postData.contents);

    // Duplicate protection: skip if this Registration ID is already a row.
    if (isDuplicate_(sheet, data.id)) {
      return ContentService.createTextOutput(JSON.stringify({ status: "duplicate_skipped" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow([
      data.id || "",
      data.full_name || "",
      data.whatsapp_number || "",
      data.age || "",
      data.date_of_birth || "",
      data.gender || "",
      data.area_ghetto || "",
      data.social_handle || "",
      data.registration_consent ? "Yes" : "No",
      data.marketing_whatsapp_consent ? "Yes" : "No",
      data.consent_version || "",
      data.consent_timestamp || "",
      data.created_at || new Date().toISOString(),
      data.registration_status || "NEW"
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_TAB_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_TAB_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function isDuplicate_(sheet, registrationId) {
  if (!registrationId) return false;
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat();
  return ids.includes(registrationId);
}
