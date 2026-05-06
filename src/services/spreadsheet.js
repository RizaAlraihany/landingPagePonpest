const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

export const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_UPLOAD_TYPES = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  pdf: "application/pdf",
};

const TEXT_FIELDS = [
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

const FILE_FIELDS = [
  { key: "fotoKK", label: "Foto KK" },
  { key: "fotoIjazah", label: "Foto Ijazah" },
];

const getExtension = (fileName = "") => {
  const parts = fileName.toLowerCase().split(".");
  return parts.length > 1 ? parts.pop() : "";
};

const getAllowedMimeType = (file) => {
  const ext = getExtension(file?.name);
  return ALLOWED_UPLOAD_TYPES[ext] || "";
};

export const formatFileSize = (bytes) => {
  if (!Number.isFinite(bytes)) return "0 MB";
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export function validateUploadFile(file, label = "File") {
  if (!file) return `${label} wajib diunggah`;
  if (!(file instanceof File)) return `${label} tidak valid`;

  const allowedMimeType = getAllowedMimeType(file);
  const browserMimeType = file.type || allowedMimeType;

  if (!allowedMimeType || browserMimeType !== allowedMimeType) {
    return `${label} harus berupa JPG, PNG, atau PDF`;
  }

  if (file.size <= 0) {
    return `${label} kosong atau tidak dapat dibaca`;
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return `${label} maksimal ${formatFileSize(MAX_UPLOAD_SIZE_BYTES)}`;
  }

  return "";
}

export function validateOptionalUploadFile(file, label = "File") {
  if (!file) return "";
  return validateUploadFile(file, label);
}

const readFileAsBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        reject(new Error(`Gagal membaca file ${file.name}`));
        return;
      }

      const separatorIndex = result.indexOf(",");
      if (separatorIndex === -1) {
        reject(new Error(`Format base64 file ${file.name} tidak valid`));
        return;
      }

      resolve(result.slice(separatorIndex + 1));
    };

    reader.onerror = () => {
      reject(
        new Error(`Gagal membaca file ${file.name}`, { cause: reader.error }),
      );
    };

    reader.readAsDataURL(file);
  });

const createRequestId = () => {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const buildTextPayload = (formData) =>
  TEXT_FIELDS.reduce(
    (payload, field) => ({
      ...payload,
      [field]: formData[field] || "",
    }),
    {
      _timestamp: new Date().toISOString(),
      _requestId: createRequestId(),
    },
  );

async function appendFilePayload(body, field, file) {
  if (!file) return;

  const validationError = validateUploadFile(file, field.label);
  if (validationError) throw new Error(validationError);

  body.append(`${field.key}Name`, file.name);
  body.append(`${field.key}MimeType`, getAllowedMimeType(file));
  body.append(`${field.key}Size`, String(file.size));
  body.append(`${field.key}Base64`, await readFileAsBase64(file));
}

async function createRegistrationBody(formData) {
  const body = new FormData();
  body.append("payload", JSON.stringify(buildTextPayload(formData)));
  body.append("_transport", "form-data-base64");

  for (const field of FILE_FIELDS) {
    await appendFilePayload(body, field, formData[field.key]);
  }

  return body;
}

async function parseAppsScriptResponse(response) {
  const text = await response.text();

  if (!text) {
    throw new Error("Response Google Apps Script kosong.");
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error("Response Google Apps Script bukan JSON yang valid.", {
      cause: error,
    });
  }
}

export async function submitToSpreadsheet(formData) {
  if (!APPS_SCRIPT_URL) {
    throw new Error(
      "URL Google Apps Script belum dikonfigurasi. Periksa file .env di root project.",
    );
  }

  const body = await createRegistrationBody(formData);

  let response;

  try {
    response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body,
      mode: "cors",
      credentials: "omit",
      headers: {
        Accept: "application/json",
      },
    });
  } catch (error) {
    console.error("Fetch Apps Script Error:", error);

    throw new Error(
      "Gagal terhubung ke Google Apps Script. Periksa deployment Web App dan koneksi internet.",
    );
  }

  let result;

  try {
    result = await parseAppsScriptResponse(response);
  } catch (err) {
    console.error("Invalid JSON response:", err);

    throw new Error(
      "Apps Script memberikan response tidak valid. Pastikan URL /exec benar dan deployment terbaru sudah digunakan.",
    );
  }

  if (!result?.success) {
    throw new Error(
      result?.message || "Google Apps Script menolak data pendaftaran.",
    );
  }

  return result;
}
