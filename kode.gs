// ============================================================
// kode.gs — Google Apps Script for Ma'had Asy-Syakiroh
// Spreadsheet ID: 1EsmEjmYQPb41ikWMYW5VIKdQue2RQQYxcSU5rW1jFYE
// Sheet: Lembar1 (gid=1173438807)
//
// Column order:
//  A: Timestamp
//  B: Nama Lengkap
//  C: NISN
//  D: Tempat, tanggal, lahir
//  E: Jenis Kelamin
//  F: Foto Kartu Keluarga (KK) *wajib dibawa ketika daftar offline
//  G: Foto Ijazah Terakhir *wajib dibawa ketika daftar offline
//  H: Masuk Pendidikan
//  I: Alamats
//  J: Nama Ayah /Wali
//  K: Nama Ibu/Wali
//  L: Nomor Telepon
//  M: Email Address
// ============================================================

var SPREADSHEET_ID = "1EsmEjmYQPb41ikWMYW5VIKdQue2RQQYxcSU5rW1jFYE";
var SHEET_NAME     = "DB Pendaftaran";
var DRIVE_FOLDER   = "Ma'had Asy-Syakiroh — Uploads"; // Drive folder name for file uploads

// ── Entry Points ──────────────────────────────────────────────

function doPost(e) {
  try {
    var raw  = e.postData ? e.postData.contents : "{}";
    var data = JSON.parse(raw);
    var result = saveRegistration(data);
    return buildResponse({ success: true, message: "Data berhasil disimpan", row: result });
  } catch (err) {
    return buildResponse({ success: false, message: err.toString() }, 500);
  }
}

function doGet(e) {
  // ── Penerimaan data via GET param (workaround no-cors POST→redirect→GET) ──
  if (e && e.parameter && e.parameter.payload) {
    try {
      var data = JSON.parse(decodeURIComponent(e.parameter.payload));
      var result = saveRegistration(data);
      return buildResponse({ success: true, message: "Data berhasil disimpan", row: result });
    } catch (err) {
      Logger.log("doGet error: " + err.toString());
      return buildResponse({ success: false, message: err.toString() });
    }
  }
  // Health check
  return buildResponse({ success: true, message: "Apps Script Ma'had Asy-Syakiroh aktif. v8" });
}

// ── Core Logic ────────────────────────────────────────────────

function saveRegistration(data) {
  var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    writeHeaders(sheet);
  }

  // Ensure headers exist on first use
  if (sheet.getLastRow() === 0) {
    writeHeaders(sheet);
  }

  // Handle file uploads → save to Drive, get URL
  var fotoKKUrl      = uploadFileToDrive(data.fotoKKBase64,    data.fotoKKName,    "KK");
  var fotoIjazahUrl  = uploadFileToDrive(data.fotoIjazahBase64, data.fotoIjazahName, "Ijazah");

  var timestamp = data._timestamp
    ? Utilities.formatDate(new Date(data._timestamp), "Asia/Jakarta", "dd/MM/yyyy HH:mm:ss")
    : Utilities.formatDate(new Date(), "Asia/Jakarta", "dd/MM/yyyy HH:mm:ss");

  // Row values — exact column order
  var row = [
    timestamp,                                  // A: Timestamp
    sanitize(data.namaLengkap),                 // B: Nama Lengkap
    sanitize(data.nisn),                        // C: NISN
    sanitize(data.tempatTanggalLahir),          // D: Tempat, tanggal, lahir
    sanitize(data.jenisKelamin),                // E: Jenis Kelamin
    fotoKKUrl,                                  // F: Foto KK
    fotoIjazahUrl,                              // G: Foto Ijazah
    sanitize(data.masukPendidikan),             // H: Masuk Pendidikan
    sanitize(data.alamat),                      // I: Alamat
    sanitize(data.namaAyah),                    // J: Nama Ayah/Wali
    sanitize(data.namaIbu),                     // K: Nama Ibu/Wali
    sanitize(data.noTelepon),                   // L: Nomor Telepon
    sanitize(data.email),                       // M: Email Address
  ];

  sheet.appendRow(row);
  return sheet.getLastRow();
}

// ── Helpers ───────────────────────────────────────────────────

function writeHeaders(sheet) {
  var headers = [
    "Timestamp",
    "Nama Lengkap",
    "NISN",
    "Tempat, tanggal, lahir",
    "Jenis Kelamin",
    "Foto Kartu Keluarga (KK) *wajib dibawa ketika daftar offline",
    "Foto Ijazah Terakhir *wajib dibawa ketika daftar offline",
    "Masuk Pendidikan",
    "Alamat",
    "Nama Ayah /Wali",
    "Nama Ibu/Wali",
    "Nomor Telepon",
    "Email Address",
  ];
  sheet.appendRow(headers);

  // Bold + freeze header row
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#0f766e");
  headerRange.setFontColor("#ffffff");
  sheet.setFrozenRows(1);
}

function uploadFileToDrive(base64Data, fileName, prefix) {
  if (!base64Data || !fileName) return "";
  try {
    var folder = getOrCreateFolder(DRIVE_FOLDER);
    var blob   = Utilities.newBlob(
      Utilities.base64Decode(base64Data),
      getMimeType(fileName),
      prefix + "_" + fileName
    );
    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  } catch (err) {
    Logger.log("File upload error: " + err.toString());
    return "Upload gagal: " + err.message;
  }
}

function getOrCreateFolder(name) {
  var folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(name);
}

function getMimeType(fileName) {
  var ext = fileName.split(".").pop().toLowerCase();
  var map = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", pdf: "application/pdf", webp: "image/webp" };
  return map[ext] || "application/octet-stream";
}

function sanitize(val) {
  if (val === null || val === undefined) return "";
  return String(val).trim();
}

function buildResponse(obj, code) {
  var output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
