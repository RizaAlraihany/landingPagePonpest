# Ma'had Asy-Syakiroh - Modern Landing Page

![Ma'had Asy-Syakiroh Banner](public/santri.png) <!-- Update with your actual banner/screenshot path -->

Sebuah landing page premium dan responsif yang dibangun untuk **Ma'had Asy-Syakiroh Buntet Pesantren**. Proyek ini bertujuan untuk mendigitalkan profil dan alur pendaftaran santri baru dengan desain yang modern, minimalis, dan profesional tanpa menghilangkan identitas nilai pesantren (menggunakan tema warna Islami dan emas/gold).

## 🚀 Fitur Utama

- **Desain Premium & Modern**: Layout berbasis whitespace, tipografi terstruktur, dan glassmorphism effect.
- **Animasi Halus (Smooth Animations)**: Memanfaatkan `framer-motion` untuk *scroll reveal* dan efek masuk bertahap (*staggered entrance*) di setiap section halaman.
- **Responsif Sepenuhnya**: Tampilan sempurna dan dioptimalkan dari layar *mobile* kecil hingga monitor ultrawide (2XL).
- **Alur Pendaftaran Jelas**: Menampilkan alur pendaftaran dalam 3 langkah mudah dengan komponen visual yang intuitif.
- **Performa Tinggi**: Dibangun menggunakan ekosistem bundler Vite yang super cepat.

## 🛠️ Tech Stack

Proyek ini menggunakan teknologi *frontend* terkini:

- **Framework**: [React.js](https://react.dev/) (v18+)
- **Build Tool**: [Vite](https://vitejs.dev/) (Cepat dan teroptimasi)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first styling, desain khusus)
- **Animasi**: [Framer Motion](https://www.framer.com/motion/) (Untuk scroll animation `FadeInSection`)
- **Ikonography**: [Lucide React](https://lucide.dev/) (Clean and consistent SVG icons)
- **Routing**: [React Router](https://reactrouter.com/)

## 📂 Struktur Proyek

Arsitektur aplikasi disusun secara modular untuk memudahkan pemeliharaan:

```text
src/
├── components/       # Komponen UI yang dapat digunakan kembali (contoh: FadeInSection.jsx)
├── pages/            # Halaman utama (contoh: Home.jsx)
├── sections/         # Bagian-bagian halaman (Hero, Profile, Programs, Contact, dll.)
├── App.jsx           # Entry point komponen React
├── index.css         # Konfigurasi Tailwind & base styling
└── main.jsx          # Entry point aplikasi (Root renderer)
```

## 💻 Cara Instalasi & Menjalankan (Local Development)

Ikuti langkah-langkah berikut untuk menjalankan proyek di perangkat lokal Anda:

1. **Clone repository ini**
   ```bash
   git clone https://github.com/USERNAME/landing-page-ponpes.git
   cd landing-page-ponpes
   ```

2. **Install dependencies**
   Anda dapat menggunakan `npm`, `yarn`, atau `pnpm`.
   ```bash
   npm install
   ```

3. **Jalankan *Development Server***
   ```bash
   npm run dev
   ```

4. Buka browser Anda dan akses `http://localhost:5173`

## 📦 Build untuk Production

Untuk menghasilkan *build* production yang sudah teroptimasi:

```bash
npm run build
```
Hasil file statis akan berada di dalam direktori `dist/` dan siap untuk di-deploy ke layanan seperti Vercel, Netlify, atau GitHub Pages.

## 🎨 Konvensi Desain (Design System)

- **Colors**:
  - `primary`: Warna dominan hijau khas Islami (diatur khusus di *Tailwind Config*).
  - `gold`: Aksen elegan untuk menarik perhatian (*CTA/Buttons*, *Highlights*).
- **Typography**: Menggunakan perpaduan *Sans-serif* modern untuk teks utama dan gaya tulisan Arab untuk ornamen (`font-arabic`).
- **Pacing & Spacing**: Konsisten menggunakan sistem *grid* dan *flexbox* Tailwind dengan ruang putih (whitespace) yang luas agar konten mudah dicerna.

## 🤝 Berkontribusi

Bagi Anda yang ingin berkontribusi (menambahkan fitur, memperbaiki *bug*, atau memperbarui konten):
1. *Fork* repositori ini.
2. Buat *branch* fitur Anda (`git checkout -b fitur/NamaFitur`).
3. Lakukan *commit* pada perubahan Anda (`git commit -m 'Menambahkan fitur XYZ'`).
4. *Push* ke branch tersebut (`git push origin fitur/NamaFitur`).
5. Buka *Pull Request*.

## 📝 Lisensi

Hak Cipta © 2026 Ma'had Asy-Syakiroh. Hak Cipta Dilindungi Undang-Undang.

---
*Didesain dan dikembangkan dengan standar startup untuk pengalaman web terbaik.*
