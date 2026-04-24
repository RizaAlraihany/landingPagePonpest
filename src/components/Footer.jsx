import { GraduationCap, Phone, MapPin, Map } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-white pt-20 pb-10 border-t border-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          <div className="md:col-span-12 lg:col-span-5 pr-0 lg:pr-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-800 to-primary-900 border border-white/10 flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-gold-400" />
              </div>
              <div>
                <h2 className="font-extrabold text-lg tracking-tight text-white">
                  Ma'had Asy-Syakiroh
                </h2>
                <p className="text-sm font-medium text-primary-300">
                  Buntet Pesantren Cirebon
                </p>
              </div>
            </div>

            <p className="text-primary-200/80 text-sm leading-relaxed mb-6">
              Mencetak santri berilmu, berakhlak, dan berlandaskan nilai Islam
              sejak bergabung dalam keluarga besar Buntet Pesantren.
            </p>

            <p className="font-arabic text-2xl text-gold-400/90 leading-loose">
              بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ
            </p>

            <div className="flex items-center gap-3 mt-8">
              {/* Facebook SVG */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center group hover:bg-gold-500/10 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <svg
                  className="w-4 h-4 text-primary-200/70 group-hover:text-gold-400 transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* Instagram SVG */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center group hover:bg-gold-500/10 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <svg
                  className="w-4 h-4 text-primary-200/70 group-hover:text-gold-400 transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* TikTok SVG */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center group hover:bg-gold-500/10 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <svg
                  className="w-4 h-4 text-primary-200/70 group-hover:text-gold-400 transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>

              {/* Map Lucide Icon */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center group hover:bg-gold-500/10 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <Map className="w-4 h-4 text-primary-200/70 group-hover:text-gold-400 transition-colors" />
              </a>
            </div>
          </div>

          <div className="md:col-span-5 lg:col-span-3">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-6">
              Navigasi
            </h3>
            <ul className="space-y-3">
              {[
                "Beranda",
                "Profil Pesantren",
                "Program Pendidikan",
                "Kegiatan Harian",
                "Pendaftaran",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-primary-200/70 hover:text-gold-400 inline-block transition-all duration-300 hover:translate-x-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-7 lg:col-span-4">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-6">
              Informasi Kontak
            </h3>
            <div className="space-y-5">
              <div className="group flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/10 transition-colors">
                  <MapPin className="w-4 h-4 text-gold-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-1">
                    Santri Putra
                  </p>
                  <p className="text-xs text-primary-200/70 leading-relaxed mb-2">
                    Blok Karang Anyar, Buntet Pesantren
                  </p>
                  <a
                    href="tel:081572658419"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary-300 hover:text-gold-400 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    0815-7265-8419
                  </a>
                </div>
              </div>

              <div className="group flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/10 transition-colors">
                  <MapPin className="w-4 h-4 text-gold-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-1">
                    Santri Putri
                  </p>
                  <p className="text-xs text-primary-200/70 leading-relaxed mb-2">
                    Blok Pesantren, Mertapada Kulon
                  </p>
                  <a
                    href="tel:085795155186"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary-300 hover:text-gold-400 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    0857-9515-5186
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-200/50 text-xs font-medium text-center md:text-left">
            © {new Date().getFullYear()} Ma'had Asy-Syakiroh Buntet Pesantren.
            All rights reserved.
          </p>
          <p className="text-primary-200/50 text-xs font-medium text-center md:text-right">
            Bagian dari Yayasan Lembaga Pendidikan Islam Buntet Pesantren
          </p>
        </div>
      </div>
    </footer>
  );
}
