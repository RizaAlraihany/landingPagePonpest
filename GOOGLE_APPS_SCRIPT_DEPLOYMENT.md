# Google Apps Script Deployment Guide

Panduan ini untuk endpoint pendaftaran santri baru yang menerima text field dan file KK/Ijazah, mengupload file ke Google Drive, lalu menyimpan URL file ke Google Spreadsheet.

## 1. Setup Apps Script

1. Buka [Google Apps Script](https://script.google.com/).
2. Buat project baru.
3. Salin seluruh isi `kode.gs` dari repository ini ke file `Code.gs` di Apps Script.
4. Buka `Project Settings`, aktifkan `Show "appsscript.json" manifest file in editor`.
5. Buka file `appsscript.json`, lalu samakan dengan file `appsscript.json` di repository ini:

```json
{
  "timeZone": "Asia/Jakarta",
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "oauthScopes": [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets"
  ]
}
```

6. Pastikan konstanta berikut sudah sesuai:
   - `SPREADSHEET_ID`
   - `SHEET_NAME`
   - `DRIVE_FOLDER_IDS.fotoKK`
   - `DRIVE_FOLDER_IDS.fotoIjazah`

## 2. Permission Drive dan Spreadsheet

Akun Google yang melakukan deploy harus punya akses:

- Editor ke spreadsheet tujuan.
- Akses upload/create file ke folder Google Drive KK.
- Akses upload/create file ke folder Google Drive Ijazah.
- Izin untuk mengubah sharing file menjadi `Anyone with the link`.

Jika folder berada di akun lain, share folder tersebut ke akun deployer sebagai Editor.

Untuk keamanan, jangan set folder upload sebagai `Anyone with the link` + `Editor`. Pilihan yang disarankan:

- Folder `Restricted`, lalu share folder ke akun deployer sebagai `Editor`.
- Atau folder `Anyone with the link` + `Viewer` jika memang foldernya perlu terlihat publik.

Script akan membuat setiap file upload menjadi `Anyone with the link` + `Viewer`. Jika folder sudah public sebagai `Editor`, Google Drive dapat menolak script menurunkannya menjadi Viewer dan sistem akan mengembalikan error.

## 3. Deploy Web App

1. Klik `Deploy` -> `New deployment`.
2. Pilih type `Web app`.
3. Isi:
   - Execute as: `Me`
   - Who has access: `Anyone`
4. Klik `Deploy`.
5. Authorize permission yang diminta.
6. Copy URL `/exec`.
7. Simpan ke `.env`:

```env
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

Restart dev server setelah mengubah `.env`.

## 4. Testing Health Check

Buka URL `/exec` dari browser. Response normal:

```json
{
  "success": true,
  "message": "Apps Script pendaftaran aktif.",
  "version": "2026-05-06"
}
```

Di Apps Script editor, jangan menjalankan `doPost`, `parseRequest`, `parseJson`, `parseMultipartFields`, `buildFilePayloadFromParameters`, atau `normalizeRegistrationPayload` langsung dari tombol Run. Fungsi-fungsi itu membutuhkan event POST asli.

Gunakan fungsi test berikut dari dropdown Run:

- `TEST_checkDriveAndSpreadsheetPermission`: memicu authorization penuh dan memastikan akun deployer bisa akses Spreadsheet, membuat file, dan membuat file public di kedua folder Drive. Fungsi ini membuat file `.txt` kecil lalu langsung memindahkannya ke trash.
- `TEST_checkPublicSharingPermission`: khusus test apakah Google Drive mengizinkan file di kedua folder dibuat `Anyone with the link`.
- `TEST_parseSampleRequestFromEditor`: test parsing dan validasi tanpa upload ke Drive.
- `TEST_uploadAndAppendSampleRowFromEditor`: test end-to-end dengan sample file kecil. Fungsi ini akan membuat 2 file sample di Drive dan 1 row sample di Spreadsheet.

## 5. Testing Upload dari Website

1. Jalankan website:

```bash
npm run dev
```

2. Buka halaman `/daftar`.
3. Isi seluruh field.
4. Upload:
   - KK: opsional untuk submit online. Jika diupload, format `.jpg`, `.jpeg`, `.png`, atau `.pdf`, maksimal 5MB.
   - Ijazah: opsional untuk submit online. Jika diupload, format `.jpg`, `.jpeg`, `.png`, atau `.pdf`, maksimal 5MB.
5. Submit.
6. Pastikan:
   - Jika KK diupload, file KK masuk ke folder KK.
   - Jika Ijazah diupload, file Ijazah masuk ke folder Ijazah.
   - File dapat dibuka oleh `Anyone with the link`.
   - Spreadsheet mendapat URL file di kolom F dan G jika file diupload, atau kosong jika file tidak diupload.

## 6. Catatan CORS

Frontend mengirim `FormData` tanpa header `Content-Type` custom. Browser akan membuat simple request sehingga tidak memicu preflight CORS.

Jangan menambahkan header custom seperti `Authorization` atau `Content-Type: multipart/form-data` secara manual di `fetch`, karena boundary harus dibuat browser dan header custom dapat memicu preflight.

Jika response tetap diblokir oleh environment tertentu, gunakan backend proxy seperti Cloud Functions, Cloud Run, atau server Node kecil sebagai lapisan API.

## 7. Troubleshooting

- `Google Apps Script tidak memiliki akses...`: akun deployer belum punya akses ke Spreadsheet/folder Drive.
- `You do not have permission to call DriveApp.getFolderById` atau `DriveApp.Folder.createFile`: manifest belum punya OAuth scope Drive penuh, atau script belum diauthorize ulang. Samakan `appsscript.json`, jalankan `TEST_checkDriveAndSpreadsheetPermission`, lalu approve permission.
- `File berhasil dibuat, tetapi gagal dibuat public`: kebijakan folder/domain memblokir `Anyone with the link`.
- `sudah public sebagai Editor`: ubah General access folder/file dari `Anyone with the link` + `Editor` menjadi `Viewer` atau `Restricted`.
- Jika public sharing diblokir oleh Google Workspace Admin atau Shared Drive policy, kode tidak bisa memaksa public link. Solusinya ubah policy external sharing, pindahkan folder ke My Drive akun deployer yang mengizinkan public link, atau set `REQUIRE_PUBLIC_FILE_LINKS = false` hanya jika URL boleh bersifat private/internal.
- `harus berupa JPG, PNG, atau PDF`: extension atau MIME tidak sesuai.
- `tidak cocok dengan format file`: isi file tidak sesuai extension, misalnya file `.pdf` palsu.
- `Response Google Apps Script kosong`: deploy URL salah, belum authorize, atau request diblokir.
- `Request POST kosong`: biasanya kode Web App yang aktif masih versi lama, URL `.env` belum memakai deployment `/exec` terbaru, atau request dikirim tanpa body. Deploy ulang Apps Script setelah copy `kode.gs` terbaru.
