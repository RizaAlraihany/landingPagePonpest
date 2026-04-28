import RegistrationForm from "../sections/RegistrationForm";

export default function Register() {
  return (
    <div className="pt-24 pb-20 bg-slate-50/50">
      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* ── Header ── */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 text-sm font-semibold rounded-full mb-4 ring-1 ring-inset ring-primary-500/10">
            Formulir Pendaftaran
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-800 tracking-tight">
            Daftar Sebagai Santri
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Ma'had Asy-Syakiroh Buntet Pesantren Cirebon
          </p>
        </div>

        {/* ── PSB Description Card ── */}
        <div className="mb-8 bg-white border border-primary-100 rounded-2xl p-6 shadow-sm space-y-4">
          {/* Title Banner */}
          <div className="flex items-center gap-3">
            <div className="w-1 h-12 bg-gradient-to-b from-gold-400 to-primary-600 rounded-full flex-shrink-0" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gold-600 mb-0.5">
                Tahun Ajaran 2026/2027
              </p>
              <h2 className="text-lg font-extrabold text-primary-900 leading-tight">
                PENERIMAAN SANTRI BARU 2026
              </h2>
            </div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            Formulir Pendaftaran Santri Baru Pondok Pesantren Putra–Putri{" "}
            <strong className="text-primary-800">Asy-Syakiroh 1 &amp; 2</strong>{" "}
            Buntet Pesantren Cirebon Tahun Ajaran 2026/2027.
          </p>

          <p className="text-sm text-gray-600 leading-relaxed">
            Formulir ini digunakan untuk proses <strong className="text-primary-800">pendataan calon santri</strong>{" "}
            yang akan menempuh pendidikan dan pembinaan di lingkungan pesantren. Mohon mengisi seluruh
            data dengan <strong className="text-primary-800">lengkap, jujur, dan sesuai dokumen resmi</strong>{" "}
            agar memudahkan proses verifikasi dan administrasi.
          </p>

          <div className="flex items-start gap-2.5 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <span className="text-green-600 mt-0.5 flex-shrink-0">
              {/* WhatsApp icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </span>
            <p className="text-xs text-green-800 leading-relaxed">
              Pastikan <strong>nomor WhatsApp</strong> yang dicantumkan <strong>aktif</strong> untuk
              menerima informasi lanjutan terkait jadwal daftar ulang, serta ketentuan lainnya.
            </p>
          </div>
        </div>

        {/* ── Form ── */}
        <RegistrationForm />
      </div>
    </div>
  );
}
