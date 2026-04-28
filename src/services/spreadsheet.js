const APPS_SCRIPT_URL =
  import.meta.env.VITE_APPS_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbyshqvvZBl5Od_6KFQkBD9-f0kvkKRCPedeRe-1lUysi2hGoUy27AvRMIRMyB3BD_Mu/exec";

/**
 * Convert a File object to Base64 string
 */
async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]); // strip data-url prefix
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Submit registration data to Google Spreadsheet via Apps Script.
 *
 * WHY GET instead of POST?
 * Google Apps Script /exec always 302-redirects. Browsers convert
 * POST→GET on redirect (RFC 2616), so doPost() never fires and the
 * body is silently lost. Sending data as a URL query param via GET
 * is the only reliable no-cors approach.
 *
 * File uploads (fotoKK, fotoIjazah) are NOT sent as base64 here
 * (too large for a URL). The spreadsheet notes they must be brought
 * in person ("wajib dibawa ketika daftar offline").
 *
 * @param {Object} formData - Form data from RegistrationForm
 * @returns {Promise<Object>} Response indicator
 */
export async function submitToSpreadsheet(formData) {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("GANTI")) {
    throw new Error("URL Google Apps Script belum dikonfigurasi. Hubungi admin.");
  }

  // Build payload — text fields only (no base64 files)
  const payload = {
    namaLengkap:        formData.namaLengkap        || "",
    nisn:               formData.nisn               || "",
    tempatTanggalLahir: formData.tempatTanggalLahir || "",
    jenisKelamin:       formData.jenisKelamin       || "",
    fotoKKBase64:       "",   // dikirim offline
    fotoKKName:         formData.fotoKK instanceof File ? formData.fotoKK.name : "",
    fotoIjazahBase64:   "",   // dikirim offline
    fotoIjazahName:     formData.fotoIjazah instanceof File ? formData.fotoIjazah.name : "",
    masukPendidikan:    formData.masukPendidikan    || "",
    alamat:             formData.alamat             || "",
    namaAyah:           formData.namaAyah           || "",
    namaIbu:            formData.namaIbu            || "",
    noTelepon:          formData.noTelepon           || "",
    email:              formData.email              || "",
    _timestamp:         new Date().toISOString(),
    _source:            "website",
  };

  // Encode payload as URL query param
  const url = `${APPS_SCRIPT_URL}?payload=${encodeURIComponent(JSON.stringify(payload))}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    await fetch(url, {
      method: "GET",
      mode: "no-cors",
      signal: controller.signal,
    });

    // no-cors always returns opaque response — treat as success
    return { success: true };
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("Koneksi timeout. Periksa koneksi internet Anda.");
    }
    throw new Error("Gagal mengirim data. Periksa koneksi internet Anda.");
  } finally {
    clearTimeout(timeout);
  }
}

