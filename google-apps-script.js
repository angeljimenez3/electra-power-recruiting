// ============================================
// ELECTRA POWER CO. — Google Apps Script
// Paste this into Extensions → Apps Script
// ============================================

const NOTIFICATION_EMAIL = 'info@electrapowerco.com';

function doGet(e) {
  return handleSubmission(e.parameter || {});
}

function doPost(e) {
  return handleSubmission(e.parameter || {});
}

function handleSubmission(data) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    sheet.appendRow([
      new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
      data.nombre || '',
      data.telefono || '',
      data.zona || '',
      data.otraCiudad || '',
      data.edad || '',
    ]);

    var subject = 'Nueva Aplicacion — ' + (data.nombre || 'Sin nombre');
    var body = 'Nombre: ' + (data.nombre || 'N/A') + '\n'
      + 'Telefono: ' + (data.telefono || 'N/A') + '\n'
      + 'Zona: ' + (data.zona || 'N/A') + '\n'
      + 'Otra Ciudad: ' + (data.otraCiudad || 'N/A') + '\n'
      + 'Edad: ' + (data.edad || 'N/A') + '\n'
      + 'Fecha: ' + new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });

    MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);

    return ContentService
      .createTextOutput('ok')
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    return ContentService
      .createTextOutput('error: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}
