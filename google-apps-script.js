// ============================================
// ELECTRA POWER CO. — Google Apps Script
// Paste this into Extensions → Apps Script
// ============================================

var NOTIFICATION_EMAIL = 'info@electrapowerco.com';

function doGet(e) {
  var data = e.parameter || {};
  var callback = data.callback || '';

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    sheet.appendRow([
      new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
      data.nombre || '',
      data.telefono || '',
      data.zona || '',
      data.otraCiudad || '',
      data.edad || ''
    ]);

    var subject = 'Nueva Aplicacion — ' + (data.nombre || 'Sin nombre');
    var body = 'Nombre: ' + (data.nombre || 'N/A') + '\n'
      + 'Telefono: ' + (data.telefono || 'N/A') + '\n'
      + 'Zona: ' + (data.zona || 'N/A') + '\n'
      + 'Otra Ciudad: ' + (data.otraCiudad || 'N/A') + '\n'
      + 'Edad: ' + (data.edad || 'N/A') + '\n'
      + 'Fecha: ' + new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });

    MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);

    if (callback) {
      return ContentService
        .createTextOutput(callback + '({"status":"ok"})')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return ContentService
      .createTextOutput('ok')
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    if (callback) {
      return ContentService
        .createTextOutput(callback + '({"status":"error"})')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return ContentService
      .createTextOutput('error')
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function doPost(e) {
  return doGet(e);
}
