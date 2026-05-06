var SPREADSHEET_ID = "1EsmEjmYQPb41ikWMYW5VIKdQue2RQQYxcSU5rW1jFYE";
var SHEET_NAME = "DB Pendaftaran";

var DRIVE_FOLDER_IDS = {
  fotoKK: "1JZ4UI21dTiYUF_9hIGWZywWjCWeOByZU",
  fotoIjazah: "1Qe4fuUB0iO51-r3mQzdfWjzf_jhuALOO",
};

var TIMEZONE = "Asia/Jakarta";
var MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
var MAX_REQUEST_SIZE_BYTES = 20 * 1024 * 1024;
var REQUIRE_PUBLIC_FILE_LINKS = true;

var ALLOWED_MIME_TYPES = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  pdf: "application/pdf",
};

var FILE_CONFIG = {
  fotoKK: {
    label: "Kartu Keluarga",
    suffix: "kk",
    folderId: DRIVE_FOLDER_IDS.fotoKK,
  },
  fotoIjazah: {
    label: "Ijazah Terakhir",
    suffix: "ijazah",
    folderId: DRIVE_FOLDER_IDS.fotoIjazah,
  },
};

var TEXT_FIELDS = [
  "namaLengkap",
  "nisn",
  "tempatTanggalLahir",
  "jenisKelamin",
  "masukPendidikan",
  "alamat",
  "namaAyah",
  "namaIbu",
  "noTelepon",
  "email",
];

var REQUIRED_TEXT_FIELDS = {
  namaLengkap: "Nama lengkap",
  nisn: "NISN",
  tempatTanggalLahir: "Tempat tanggal lahir",
  jenisKelamin: "Jenis kelamin",
  masukPendidikan: "Masuk pendidikan",
  alamat: "Alamat",
  namaAyah: "Nama Ayah/Wali",
  namaIbu: "Nama Ibu/Wali",
  noTelepon: "Nomor telepon",
  email: "Email",
};

var HEADERS = [
  "Timestamp",
  "Nama Lengkap",
  "NISN",
  "Tempat, tanggal, lahir",
  "Jenis Kelamin",
  "Link Kartu Keluarga",
  "Link Ijazah Terakhir",
  "Masuk Pendidikan",
  "Alamat",
  "Nama Ayah /Wali",
  "Nama Ibu/Wali",
  "Nomor Telepon",
  "Email Address",
];

function doGet() {
  return buildJsonResponse({
    success: true,
    message: "Apps Script pendaftaran aktif.",
    version: "2026-05-06",
  });
}

function doPost(e) {
  var uploadedFileIds = [];

  try {
    var registration = parseRequest(e);
    validateRegistration(registration);

    var uploads = uploadRegistrationFiles(registration, uploadedFileIds);
    var rowNumber = appendRegistration(registration, uploads);

    return buildJsonResponse({
      success: true,
      message: "Data pendaftaran berhasil disimpan.",
      row: rowNumber,
      files: {
        fotoKK: uploads.fotoKK.url,
        fotoIjazah: uploads.fotoIjazah.url,
      },
    });
  } catch (err) {
    cleanupUploadedFiles(uploadedFileIds);
    Logger.log("doPost error: " + err.stack);

    return buildJsonResponse({
      success: false,
      message: getClientErrorMessage(err),
    });
  }
}

function TEST_parseSampleRequestFromEditor() {
  var registration = parseRequest(createEditorSampleEvent());
  validateRegistration(registration);

  Logger.log(
    JSON.stringify(
      {
        success: true,
        message:
          "Parsing dan validasi request berhasil. Untuk test upload Drive + append Spreadsheet, submit lewat Web App URL /exec dari website.",
        registration: {
          namaLengkap: registration.namaLengkap,
          fotoKKName: registration.fotoKK.name,
          fotoIjazahName: registration.fotoIjazah.name,
        },
      },
      null,
      2,
    ),
  );
}

function TEST_uploadAndAppendSampleRowFromEditor() {
  var response = doPost(createEditorSampleEvent());
  Logger.log(response.getContent());
}

function testParseRequestFromEditor() {
  TEST_parseSampleRequestFromEditor();
}

function TEST_checkDriveAndSpreadsheetPermission() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var kkFolder = DriveApp.getFolderById(DRIVE_FOLDER_IDS.fotoKK);
  var ijazahFolder = DriveApp.getFolderById(DRIVE_FOLDER_IDS.fotoIjazah);
  var kkTestFile = createAndTrashPermissionTestFile(kkFolder, "kk", true);
  var ijazahTestFile = createAndTrashPermissionTestFile(
    ijazahFolder,
    "ijazah",
    true,
  );

  Logger.log(
    JSON.stringify(
      {
        success: true,
        message:
          "Permission Spreadsheet dan Drive berhasil, termasuk create file di kedua folder.",
        spreadsheetName: ss.getName(),
        folders: {
          fotoKK: kkFolder.getName(),
          fotoIjazah: ijazahFolder.getName(),
        },
        writeTests: {
          fotoKK: kkTestFile,
          fotoIjazah: ijazahTestFile,
        },
      },
      null,
      2,
    ),
  );
}

function TEST_checkPublicSharingPermission() {
  var kkFolder = DriveApp.getFolderById(DRIVE_FOLDER_IDS.fotoKK);
  var ijazahFolder = DriveApp.getFolderById(DRIVE_FOLDER_IDS.fotoIjazah);

  Logger.log(
    JSON.stringify(
      {
        success: true,
        message: "Public sharing berhasil untuk kedua folder.",
        results: {
          fotoKK: createAndTrashPermissionTestFile(kkFolder, "kk_public", true),
          fotoIjazah: createAndTrashPermissionTestFile(
            ijazahFolder,
            "ijazah_public",
            true,
          ),
        },
      },
      null,
      2,
    ),
  );
}

function createAndTrashPermissionTestFile(folder, suffix, testPublicSharing) {
  var file = folder.createFile(
    Utilities.newBlob(
      "permission-check",
      "text/plain",
      "permission_check_" + suffix + "_" + Utilities.getUuid() + ".txt",
    ),
  );

  var result = {
    id: file.getId(),
    name: file.getName(),
  };

  if (testPublicSharing) {
    setFilePublic(file, "File test " + suffix);
    result.url = buildDriveViewUrl(file.getId());
    result.sharingAccess = String(file.getSharingAccess());
    result.sharingPermission = String(file.getSharingPermission());
  }

  file.setTrashed(true);
  return result;
}

function createEditorSampleEvent() {
  var samplePayload = {
    namaLengkap: "Test Apps Script Editor",
    nisn: "1234567890",
    tempatTanggalLahir: "Cirebon, 01 Januari 2010",
    jenisKelamin: "Putra",
    masukPendidikan: "MTs NU Putra 1",
    alamat: "Jl. Contoh No. 1, Cirebon",
    namaAyah: "Ayah Test",
    namaIbu: "Ibu Test",
    noTelepon: "081234567890",
    email: "test@example.com",
    _timestamp: new Date().toISOString(),
    _requestId: "editor-test",
  };

  var samplePngBase64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=";
  var sampleEvent = {
    parameter: {},
    postData: {
      type: "application/json",
      length: 0,
      contents: JSON.stringify({
        namaLengkap: samplePayload.namaLengkap,
        nisn: samplePayload.nisn,
        tempatTanggalLahir: samplePayload.tempatTanggalLahir,
        jenisKelamin: samplePayload.jenisKelamin,
        masukPendidikan: samplePayload.masukPendidikan,
        alamat: samplePayload.alamat,
        namaAyah: samplePayload.namaAyah,
        namaIbu: samplePayload.namaIbu,
        noTelepon: samplePayload.noTelepon,
        email: samplePayload.email,
        _timestamp: samplePayload._timestamp,
        _requestId: samplePayload._requestId,
        fotoKKBase64: samplePngBase64,
        fotoKKName: "sample-kk.png",
        fotoKKMimeType: "image/png",
        fotoKKSize: 68,
        fotoIjazahBase64: samplePngBase64,
        fotoIjazahName: "sample-ijazah.png",
        fotoIjazahMimeType: "image/png",
        fotoIjazahSize: 68,
      }),
    },
  };

  return sampleEvent;
}

function parseRequest(e) {
  if (!e) {
    throw new Error(
      "Request POST kosong. doPost(e) tidak bisa dijalankan langsung dari tombol Run Apps Script editor. Kirim request melalui Web App URL /exec, atau jalankan testParseRequestFromEditor() untuk test parsing.",
    );
  }

  if (e.parameter && e.parameter.payload) {
    return normalizeRegistrationPayload(
      parseJson(e.parameter.payload, "payload FormData"),
      {
        fotoKK: buildFilePayloadFromParameters(e.parameter, "fotoKK"),
        fotoIjazah: buildFilePayloadFromParameters(e.parameter, "fotoIjazah"),
      },
    );
  }

  if (!e.postData) {
    throw new Error(
      "Request POST kosong. Apps Script tidak menerima body request. Pastikan frontend mengirim ke URL Web App /exec terbaru dan deployment sudah diperbarui.",
    );
  }

  if (e.postData.length && Number(e.postData.length) > MAX_REQUEST_SIZE_BYTES) {
    throw new Error(
      "Ukuran request terlalu besar. Maksimal 2 file masing-masing 5MB.",
    );
  }

  var raw = e.postData.contents || "{}";

  if (isMultipartRequest(e.postData.type)) {
    var multipartFields = parseMultipartFields(raw, e.postData.type);

    if (multipartFields.payload) {
      return normalizeRegistrationPayload(
        parseJson(multipartFields.payload, "payload FormData"),
        {
          fotoKK: buildFilePayloadFromParameters(multipartFields, "fotoKK"),
          fotoIjazah: buildFilePayloadFromParameters(
            multipartFields,
            "fotoIjazah",
          ),
        },
      );
    }
  }

  var data = parseJson(raw, "body JSON");

  return normalizeRegistrationPayload(data, {
    fotoKK: {
      base64: data.fotoKKBase64,
      name: data.fotoKKName,
      mimeType: data.fotoKKMimeType,
      size: data.fotoKKSize,
    },
    fotoIjazah: {
      base64: data.fotoIjazahBase64,
      name: data.fotoIjazahName,
      mimeType: data.fotoIjazahMimeType,
      size: data.fotoIjazahSize,
    },
  });
}

function isMultipartRequest(contentType) {
  return /multipart\/form-data/i.test(String(contentType || ""));
}

function parseMultipartFields(contents, contentType) {
  if (contents === undefined || contentType === undefined) {
    throw new Error(
      "parseMultipartFields adalah helper internal. Jangan jalankan langsung dari Apps Script editor. Jalankan TEST_parseSampleRequestFromEditor() atau submit lewat Web App URL /exec.",
    );
  }

  var boundaryMatch = String(contentType || "").match(
    /boundary=(?:"([^"]+)"|([^;]+))/i,
  );

  if (!boundaryMatch) {
    throw new Error("Boundary FormData tidak ditemukan.");
  }

  var boundary = "--" + (boundaryMatch[1] || boundaryMatch[2]);
  var parts = String(contents || "").split(boundary);
  var fields = {};

  parts.forEach(function (part) {
    if (!part || part === "--" || part === "--\r\n") return;

    var separator = "\r\n\r\n";
    var separatorIndex = part.indexOf(separator);

    if (separatorIndex === -1) {
      separator = "\n\n";
      separatorIndex = part.indexOf(separator);
    }

    if (separatorIndex === -1) return;

    var headers = part.slice(0, separatorIndex);
    var body = part.slice(separatorIndex + separator.length);
    var nameMatch = headers.match(/name="([^"]+)"/i);

    if (!nameMatch) return;

    fields[nameMatch[1]] = trimMultipartFieldValue(body);
  });

  return fields;
}

function trimMultipartFieldValue(value) {
  return String(value || "")
    .replace(/\r\n--$/, "")
    .replace(/\n--$/, "")
    .replace(/\r\n$/, "")
    .replace(/\n$/, "");
}

function parseJson(value, sourceName) {
  if (value === undefined) {
    throw new Error(
      "parseJson adalah helper internal. Jangan jalankan langsung dari Apps Script editor. Jalankan TEST_parseSampleRequestFromEditor() atau submit lewat Web App URL /exec.",
    );
  }

  try {
    return JSON.parse(value);
  } catch (err) {
    throw new Error("Format " + sourceName + " tidak valid.");
  }
}

function buildFilePayloadFromParameters(parameters, key) {
  if (!parameters || !key) {
    throw new Error(
      "buildFilePayloadFromParameters adalah helper internal. Jangan jalankan langsung dari Apps Script editor. Jalankan TEST_parseSampleRequestFromEditor() atau submit lewat Web App URL /exec.",
    );
  }

  return {
    base64: parameters[key + "Base64"] || "",
    name: parameters[key + "Name"] || "",
    mimeType: parameters[key + "MimeType"] || "",
    size: parameters[key + "Size"] || 0,
  };
}

function normalizeRegistrationPayload(data, files) {
  if (!data || !files) {
    throw new Error(
      "normalizeRegistrationPayload adalah helper internal. Jangan jalankan langsung dari Apps Script editor. Jalankan TEST_parseSampleRequestFromEditor() atau submit lewat Web App URL /exec.",
    );
  }

  var normalized = {};

  TEXT_FIELDS.forEach(function (fieldName) {
    normalized[fieldName] = sanitizeText(data[fieldName]);
  });

  normalized._timestamp =
    sanitizeText(data._timestamp) || new Date().toISOString();
  normalized._requestId = sanitizeText(data._requestId);
  normalized.fotoKK = normalizeFilePayload(files.fotoKK);
  normalized.fotoIjazah = normalizeFilePayload(files.fotoIjazah);

  return normalized;
}

function normalizeFilePayload(filePayload) {
  filePayload = filePayload || {};

  var parsedBase64 = stripDataUrlPrefix(filePayload.base64);

  return {
    base64: parsedBase64.base64,
    name: sanitizeOriginalFileName(filePayload.name),
    mimeType: sanitizeText(
      filePayload.mimeType || parsedBase64.mimeType,
    ).toLowerCase(),
    size: Number(filePayload.size || 0),
  };
}

function stripDataUrlPrefix(value) {
  var text = String(value || "").trim();
  var match = text.match(/^data:([^;]+);base64,(.*)$/);

  if (match) {
    return {
      mimeType: String(match[1]).toLowerCase(),
      base64: String(match[2]).replace(/\s/g, ""),
    };
  }

  return {
    mimeType: "",
    base64: text.replace(/\s/g, ""),
  };
}

function validateRegistration(registration) {
  Object.keys(REQUIRED_TEXT_FIELDS).forEach(function (fieldName) {
    if (!registration[fieldName]) {
      throw new Error(REQUIRED_TEXT_FIELDS[fieldName] + " wajib diisi.");
    }
  });

  if (!/^\d{10}$/.test(registration.nisn)) {
    throw new Error("NISN harus 10 digit angka.");
  }

  if (!/^(\+62|62|0)[0-9]{8,12}$/.test(registration.noTelepon)) {
    throw new Error("Nomor telepon tidak valid.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registration.email)) {
    throw new Error("Email tidak valid.");
  }

  validateOptionalFilePayload(registration.fotoKK, FILE_CONFIG.fotoKK.label);
  validateOptionalFilePayload(
    registration.fotoIjazah,
    FILE_CONFIG.fotoIjazah.label,
  );
}

function validateOptionalFilePayload(filePayload, label) {
  if (!hasUploadFile(filePayload)) return;
  validateFilePayload(filePayload, label);
}

function validateFilePayload(filePayload, label) {
  if (!filePayload || !filePayload.base64 || !filePayload.name) {
    throw new Error(label + " wajib diunggah.");
  }

  var extension = getExtension(filePayload.name);
  var expectedMimeType = ALLOWED_MIME_TYPES[extension];
  var declaredMimeType = filePayload.mimeType || expectedMimeType;

  if (!expectedMimeType || declaredMimeType !== expectedMimeType) {
    throw new Error(label + " harus berupa JPG, PNG, atau PDF.");
  }

  if (filePayload.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(label + " maksimal 5MB.");
  }
}

function uploadRegistrationFiles(registration, uploadedFileIds) {
  return {
    fotoKK: uploadOptionalFileToDrive(
      registration.fotoKK,
      FILE_CONFIG.fotoKK,
      registration,
      uploadedFileIds,
    ),
    fotoIjazah: uploadOptionalFileToDrive(
      registration.fotoIjazah,
      FILE_CONFIG.fotoIjazah,
      registration,
      uploadedFileIds,
    ),
  };
}

function uploadOptionalFileToDrive(
  filePayload,
  config,
  registration,
  uploadedFileIds,
) {
  if (!hasUploadFile(filePayload)) {
    return {
      id: "",
      name: "",
      url: "",
    };
  }

  return uploadFileToDrive(filePayload, config, registration, uploadedFileIds);
}

function hasUploadFile(filePayload) {
  return !!(filePayload && filePayload.base64 && filePayload.name);
}

function uploadFileToDrive(filePayload, config, registration, uploadedFileIds) {
  var bytes;

  try {
    bytes = Utilities.base64Decode(filePayload.base64);
  } catch (err) {
    throw new Error(config.label + " gagal dibaca sebagai base64.");
  }

  if (!bytes || bytes.length === 0) {
    throw new Error(config.label + " kosong atau tidak dapat dibaca.");
  }

  if (bytes.length > MAX_FILE_SIZE_BYTES) {
    throw new Error(config.label + " maksimal 5MB.");
  }

  if (!isFileSignatureValid(bytes, filePayload.mimeType)) {
    throw new Error(
      config.label + " tidak cocok dengan format file yang diizinkan.",
    );
  }

  var folder = DriveApp.getFolderById(config.folderId);
  var fileName = createUniqueFileName(
    registration.namaLengkap,
    config.suffix,
    filePayload.name,
    filePayload.mimeType,
  );
  var blob = Utilities.newBlob(bytes, filePayload.mimeType, fileName);
  var file = folder.createFile(blob);

  uploadedFileIds.push(file.getId());
  setFilePublic(file, "File " + config.label);

  return {
    id: file.getId(),
    name: fileName,
    url: buildDriveViewUrl(file.getId()),
  };
}

function setFilePublic(file, label) {
  var currentAccess = "";
  var currentPermission = "";

  try {
    currentAccess = String(file.getSharingAccess());
    currentPermission = String(file.getSharingPermission());
  } catch (readErr) {
    currentAccess = "unknown";
    currentPermission = "unknown";
  }

  if (currentAccess === "ANYONE_WITH_LINK" && currentPermission === "VIEW") {
    return;
  }

  if (currentAccess === "ANYONE_WITH_LINK" && currentPermission === "EDIT") {
    throw new Error(
      label +
        " sudah public sebagai Editor. Ubah General access folder/file menjadi Viewer atau Restricted. " +
        "Public Editor tidak aman dan Google Drive dapat menolak script menurunkannya menjadi Viewer.",
    );
  }

  try {
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return;
  } catch (err) {
    Logger.log(label + " public sharing error: " + err.message);
    Logger.log(
      label +
        " current sharing: access=" +
        currentAccess +
        ", permission=" +
        currentPermission,
    );

    if (!REQUIRE_PUBLIC_FILE_LINKS) {
      return;
    }

    throw new Error(
      label +
        " berhasil dibuat, tetapi gagal dibuat public. Google menolak Anyone with link. Detail: " +
        err.message +
        ". Current sharing: access=" +
        currentAccess +
        ", permission=" +
        currentPermission +
        ". Periksa setting folder, Shared Drive, atau Google Workspace Admin external sharing.",
    );
  }
}

function buildDriveViewUrl(fileId) {
  return "https://drive.google.com/file/d/" + fileId + "/view?usp=sharing";
}

function appendRegistration(registration, uploads) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    ensureHeaders(sheet);

    var row = [
      formatTimestamp(registration._timestamp),
      toSheetText(registration.namaLengkap),
      toSheetText(registration.nisn),
      toSheetText(registration.tempatTanggalLahir),
      toSheetText(registration.jenisKelamin),
      uploads.fotoKK.url,
      uploads.fotoIjazah.url,
      toSheetText(registration.masukPendidikan),
      toSheetText(registration.alamat),
      toSheetText(registration.namaAyah),
      toSheetText(registration.namaIbu),
      toSheetText(registration.noTelepon),
      toSheetText(registration.email),
    ];

    sheet.appendRow(row);
    return sheet.getLastRow();
  } finally {
    lock.releaseLock();
  }
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() > 0) return;

  sheet.appendRow(HEADERS);
  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#0f766e");
  headerRange.setFontColor("#ffffff");
  sheet.setFrozenRows(1);
}

function cleanupUploadedFiles(fileIds) {
  fileIds.forEach(function (fileId) {
    try {
      DriveApp.getFileById(fileId).setTrashed(true);
    } catch (err) {
      Logger.log("Cleanup gagal untuk file " + fileId + ": " + err.message);
    }
  });
}

function createUniqueFileName(studentName, suffix, originalName, mimeType) {
  var timestamp = Utilities.formatDate(
    new Date(),
    TIMEZONE,
    "yyyyMMdd_HHmmss_SSS",
  );
  var safeStudentName = slugify(studentName || "calon santri");
  var extension = getExtension(originalName);
  var expectedMimeType = ALLOWED_MIME_TYPES[extension];
  var unique = Utilities.getUuid().split("-")[0];

  if (expectedMimeType !== mimeType) {
    extension = getExtensionFromMimeType(mimeType);
  }

  return (
    timestamp +
    "_" +
    safeStudentName +
    "_" +
    suffix +
    "_" +
    unique +
    "." +
    extension
  );
}

function slugify(value) {
  var slug = String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 70);

  return slug || "calon_santri";
}

function getExtension(fileName) {
  var match = String(fileName || "")
    .toLowerCase()
    .match(/\.([a-z0-9]+)$/);
  return match ? match[1] : "";
}

function getExtensionFromMimeType(mimeType) {
  if (mimeType === "image/jpeg") return "jpg";
  if (mimeType === "image/png") return "png";
  if (mimeType === "application/pdf") return "pdf";
  return "bin";
}

function isFileSignatureValid(bytes, mimeType) {
  if (mimeType === "image/jpeg") {
    return (
      byteAt(bytes, 0) === 0xff &&
      byteAt(bytes, 1) === 0xd8 &&
      byteAt(bytes, 2) === 0xff
    );
  }

  if (mimeType === "image/png") {
    return hasSignature(
      bytes,
      [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
    );
  }

  if (mimeType === "application/pdf") {
    return hasSignature(bytes, [0x25, 0x50, 0x44, 0x46]);
  }

  return false;
}

function hasSignature(bytes, signature) {
  if (!bytes || bytes.length < signature.length) return false;

  for (var i = 0; i < signature.length; i += 1) {
    if (byteAt(bytes, i) !== signature[i]) return false;
  }

  return true;
}

function byteAt(bytes, index) {
  var value = bytes[index];
  return value < 0 ? value + 256 : value;
}

function formatTimestamp(value) {
  var date = new Date(value);

  if (String(date) === "Invalid Date") {
    date = new Date();
  }

  return Utilities.formatDate(date, TIMEZONE, "dd/MM/yyyy HH:mm:ss");
}

function sanitizeText(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function sanitizeOriginalFileName(value) {
  return sanitizeText(value)
    .replace(/[\\/:*?"<>|]/g, "_")
    .slice(0, 180);
}

function toSheetText(value) {
  var text = sanitizeText(value);

  if (/^[=+\-@\t\r]/.test(text)) {
    return "'" + text;
  }

  return text;
}

function getClientErrorMessage(err) {
  var message = err && err.message ? err.message : String(err);

  if (
    /permission to call|required permissions|authorization is required|authorize/i.test(
      message,
    )
  ) {
    return "Google Apps Script belum diberi izin Drive/Spreadsheet. Tambahkan oauthScopes di appsscript.json, lalu jalankan TEST_checkDriveAndSpreadsheetPermission() dan authorize.";
  }

  if (
    /gagal dibuat public|Anyone with link|external sharing|setSharing/i.test(
      message,
    )
  ) {
    return message;
  }

  if (
    /Access denied|Cannot find|File not found|No item with the given ID/i.test(
      message,
    )
  ) {
    return "Google Apps Script tidak memiliki akses ke Spreadsheet atau folder Drive. Periksa akun deployment dan permission.";
  }

  return message;
}

function buildJsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
