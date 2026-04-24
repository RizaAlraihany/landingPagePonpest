import { GraduationCap, Phone, MapPin, Map } from "lucide-react";

const navItems = [
  "Beranda",
  "Profil Pesantren",
  "Program Pendidikan",
  "Kegiatan Harian",
  "Pendaftaran",
];

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-white pt-16 pb-8 border-t border-primary-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-5 lg:pr-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-primary-900 border border-white/10 flex items-center justify-center shadow-sm flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-gold-400" />
              </div>
              <div>
                <h2 className="font-extrabold text-base tracking-tight text-white leading-tight">
                  Ma'had Asy-Syakiroh
                </h2>
                <p className="text-xs font-medium text-primary-400 mt-0.5">
                  Buntet Pesantren Cirebon
                </p>
              </div>
            </div>

            <p className="text-primary-300/70 text-sm leading-relaxed mb-5">
              Mencetak santri berilmu, berakhlak, dan berlandaskan nilai Islam
              sejak bergabung dalam keluarga besar Buntet Pesantren.
            </p>

            <p className="font-arabic text-2xl text-gold-400/80 leading-loose">
              بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ
            </p>

            <div className="flex items-center gap-2 mt-7">
              {[
                <path
                  key="fb"
                  d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                />,
                <>
                  <rect
                    key="ig-r"
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                  />
                  <path
                    key="ig-p"
                    d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                  />
                  <line key="ig-l" x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </>,
                <path key="tt" d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />,
              ].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 hover:border-white/15 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <svg
                    className="w-3.5 h-3.5 text-primary-300/60 hover:text-gold-400 transition-colors"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icon}
                  </svg>
                </a>
              ))}
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 hover:border-white/15 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Map className="w-3.5 h-3.5 text-primary-300/60" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-bold text-white text-xs uppercase tracking-widest mb-5 text-primary-300/60">
              Navigasi
            </h3>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-primary-300/60 hover:text-gold-400 inline-block transition-all duration-200 hover:translate-x-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="font-bold text-white text-xs uppercase tracking-widest mb-5 text-primary-300/60">
              Informasi Kontak
            </h3>
            <div className="space-y-5">
              {[
                {
                  title: "Santri Putra",
                  address: "Blok Karang Anyar, Buntet Pesantren",
                  phone: "0815-7265-8419",
                  tel: "081572658419",
                },
                {
                  title: "Santri Putri",
                  address: "Blok Pesantren, Mertapada Kulon",
                  phone: "0857-9515-5186",
                  tel: "085795155186",
                },
              ].map((c) => (
                <div key={c.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-0.5">
                      {c.title}
                    </p>
                    <p className="text-xs text-primary-300/60 mb-1.5">
                      {c.address}
                    </p>
                    <a
                      href={`tel:${c.tel}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-300/80 hover:text-gold-400 transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      {c.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 mt-12 pt-7 flex justify-center items-center">
          <p className="text-primary-300/40 text-xs font-medium text-center">
            © {new Date().getFullYear()} Ma'had Asy-Syakiroh Buntet Pesantren.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
