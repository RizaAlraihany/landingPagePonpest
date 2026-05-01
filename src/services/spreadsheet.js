const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

/**
 * Mengubah File object menjadi Base64 string lengkap dengan prefix data-url
 */
const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export async function submitToSpreadsheet(formData) {
  if (!APPS_SCRIPT_URL) {
    throw new Error("URL Google Apps Script belum dikonfigurasi. Periksa file .env di root project.");
  }

  try {
    // Proses konversi foto ke Base64 jika ada file yang diunggah
    const fotoKKBase64 = formData.fotoKK instanceof File ? await toBase64(formData.fotoKK) : "";
    const fotoIjazahBase64 = formData.fotoIjazah instanceof File ? await toBase64(formData.fotoIjazah) : "";

    const payload = {
      namaLengkap: formData.namaLengkap || "",
      nisn: formData.nisn || "",
      tempatTanggalLahir: formData.tempatTanggalLahir || "",
      jenisKelamin: formData.jenisKelamin || "",
      fotoKKBase64: fotoKKBase64,
      fotoKKName: formData.fotoKK instanceof File ? formData.fotoKK.name : "",
      fotoIjazahBase64: fotoIjazahBase64,
      fotoIjazahName: formData.fotoIjazah instanceof File ? formData.fotoIjazah.name : "",
      masukPendidikan: formData.masukPendidikan || "",
      alamat: formData.alamat || "",
      namaAyah: formData.namaAyah || "",
      namaIbu: formData.namaIbu || "",
      noTelepon: formData.noTelepon || "",
      email: formData.email || "",
      _timestamp: new Date().toISOString()
    };

    // Menggunakan POST karena membawa data foto yang besar
    // mode: 'no-cors' digunakan untuk menghindari kendala kebijakan CORS Google
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "text/plain", // Menggunakan text/plain agar tidak memicu preflight CORS
      },
      body: JSON.stringify(payload),
    });

    // Karena no-cors, kita anggap sukses jika tidak ada error lemparan fetch
    return { success: true };
  } catch (err) {
    console.error("Spreadsheet Error:", err);
    throw new Error("Gagal mengirim data. Pastikan koneksi internet stabil.");
  }
}