import { GraduationCap, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-700 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-gold-400" />
              </div>
              <div>
                <p className="font-bold text-sm">Ma'had Asy-Syakiroh</p>
                <p className="text-xs text-primary-300">
                  Buntet Pesantren Cirebon
                </p>
              </div>
            </div>
            <p className="text-primary-300 text-sm leading-relaxed">
              Mencetak santri berilmu, berakhlak, dan berlandaskan nilai Islam
              sejak bergabung dalam keluarga besar Buntet Pesantren.
            </p>
            <p className="font-arabic text-2xl text-gold-400 mt-4 leading-relaxed">
              بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gold-400 mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm text-primary-300">
              {[
                "Beranda",
                "Profil Pesantren",
                "Program Pendidikan",
                "Kegiatan Harian",
                "Pendaftaran",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gold-400 mb-4">Kontak</h3>
            <div className="space-y-3 text-sm text-primary-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-gold-500 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Santri Putra</p>
                  <p>Blok Karang Anyar, Buntet Pesantren</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-gold-500 flex-shrink-0" />
                <a
                  href="tel:081572658419"
                  className="hover:text-white transition-colors"
                >
                  0815-7265-8419
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-gold-500 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Santri Putri</p>
                  <p>Blok Pesantren, Mertapada Kulon</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-gold-500 flex-shrink-0" />
                <a
                  href="tel:085795155186"
                  className="hover:text-white transition-colors"
                >
                  0857-9515-5186
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-primary-400 text-sm">
            © {new Date().getFullYear()} Ma'had Asy-Syakiroh Buntet Pesantren.
            All rights reserved.
          </p>
          <p className="text-primary-500 text-xs">
            Bagian dari Yayasan Lembaga Pendidikan Islam Buntet Pesantren
          </p>
        </div>
      </div>
    </footer>
  );
}
