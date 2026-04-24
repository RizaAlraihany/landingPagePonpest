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
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary-900/30 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/20 via-transparent to-primary-950/60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-28 md:pt-32 md:pb-32 w-full">
        <div className="grid xl:grid-cols-2 gap-12 xl:gap-16 items-center">
          <div className="text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-xs font-medium mb-8 shadow-sm">
              <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse flex-shrink-0" />
              Penerimaan Santri Baru Tahun Ajaran 2025/2026
            </div>

            <p className="font-arabic text-2xl md:text-3xl text-gold-400/90 mb-3 tracking-wide leading-loose">
              مَعْهَدُ الشَّاكِرَةِ
            </p>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              Ma'had{" "}
              <span className="text-gold-400">Asy-Syakiroh</span>
              <br />
              Buntet Pesantren
            </h1>

            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-10 max-w-lg">
              Mencetak santri{" "}
              <span className="text-gold-300 font-semibold">berilmu</span>,{" "}
              <span className="text-gold-300 font-semibold">berakhlak</span>,
              dan berlandaskan nilai Islam yang kuat di lingkungan pesantren
              terpercaya sejak 1758.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/daftar"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold-500 text-primary-900 font-bold text-sm rounded-2xl hover:bg-gold-400 active:scale-95 transition-all shadow-xl shadow-black/20 hover:-translate-y-0.5"
              >
                Daftar Sekarang
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#profil"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/25 text-white/90 font-medium text-sm rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 max-w-sm xl:hidden">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-3">
                  <Icon className="w-4 h-4 text-gold-400 mx-auto mb-1.5" />
                  <p className="text-lg font-bold text-white leading-none">{value}</p>
                  <p className="text-[10px] text-white/55 mt-1 leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden xl:flex flex-col items-center justify-center">
            <div className="relative flex justify-center mb-6">
              <div className="absolute inset-0 bg-gold-400/10 blur-3xl rounded-full scale-125 pointer-events-none" />
              <img
                src="/santri.png"
                alt="Santri Ma'had Asy-Syakiroh"
                className="relative z-10 max-h-[380px] object-contain drop-shadow-2xl"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 w-full max-w-sm bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl p-5 shadow-2xl">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center">
                  <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-4 h-4 text-gold-400" />
                  </div>
                  <p className="text-lg font-bold text-white leading-none">{value}</p>
                  <p className="text-[11px] text-white/55 mt-1 leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 md:h-20 fill-white">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  )
}