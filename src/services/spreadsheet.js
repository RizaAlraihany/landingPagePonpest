const APPS_SCRIPT_URL =
  import.meta.env.VITE_APPS_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbw9iWY2BpGM-HZ3JXbsJ_AP7IfqrhtytaPCa-UQ20fI4CJxPX2wd1U0ZyPe0qiMVWS0uQ/exec";

/**
 * Submit registration data to Google Spreadsheet via Apps Script
 * @param {Object} formData - Form data from RegistrationForm
 * @returns {Promise<Object>} Response from Apps Script
 */
export async function submitToSpreadsheet(formData) {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === "GANTI_DENGAN_URL_APPS_SCRIPT") {
    throw new Error(
      "URL Google Apps Script belum dikonfigurasi. Hubungi admin.",
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",

      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        ...formData,
        _timestamp: new Date().toISOString(),
        _source: "website",
      }),
      signal: controller.signal,
    });

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

/**
 * Alternative: use this if you set up a CORS proxy or use redirect mode
 * Uncomment and replace submitToSpreadsheet above if Apps Script returns proper CORS headers
 */
export async function submitToSpreadsheetWithResponse(formData) {
  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Gagal menyimpan data");
  }

  return result;
}
