import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Award } from "lucide-react";

const stats = [
  { icon: BookOpen, label: "Program Pendidikan", value: "10+" },
  { icon: Users, label: "Santri Aktif", value: "500+" },
  { icon: Award, label: "Tahun Berdiri", value: "1758" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-islamic">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/5 blur-2xl -translate-y-1/4 translate-x-1/4" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/30 via-transparent to-primary-950/50" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-28 w-full">
        <div className="grid xl:grid-cols-2 gap-10 xl:gap-14 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-medium mb-7 shadow-md">
              <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
              Penerimaan Santri Baru Tahun Ajaran 2025/2026
            </div>

            <p className="font-arabic text-2xl md:text-3xl text-gold-400/90 mb-3 tracking-wide">
              مَعْهَدُ الشَّاكِرَةِ
            </p>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              Ma'had <span className="text-gold-400">Asy-Syakiroh</span>
              <br />
              Buntet Pesantren
            </h1>

            <p className="text-base md:text-lg xl:text-xl text-white/75 leading-relaxed mb-10 max-w-xl">
              Mencetak santri{" "}
              <span className="text-gold-300 font-semibold">berilmu</span>,{" "}
              <span className="text-gold-300 font-semibold">berakhlak</span>,
              dan berlandaskan nilai Islam yang kuat di lingkungan pesantren
              terpercaya sejak 1758.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/daftar"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-primary-900 font-bold rounded-2xl hover:bg-gold-400 transition-all shadow-xl hover:-translate-y-1"
              >
                Daftar Sekarang
                <ArrowRight className="w-5 h-5" />
              </Link>

              <a
                href="#profil"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-medium rounded-2xl hover:bg-white/10 transition-all"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
          </div>

          <div className="relative hidden xl:flex flex-col items-center justify-center">
            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-gold-400/10 blur-3xl rounded-full scale-110" />
              <img
                src="/santri.png"
                alt="Santri"
                className="relative z-10 max-h-[360px] xl:max-h-[400px] object-contain drop-shadow-2xl"
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-4 shadow-2xl">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center">
                  <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-4 h-4 text-gold-400" />
                  </div>
                  <p className="text-lg font-bold text-white">{value}</p>
                  <p className="text-[11px] text-white/60 leading-tight">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-12 md:h-20 fill-white"
        >
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}
