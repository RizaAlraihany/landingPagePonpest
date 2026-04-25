import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: BookOpen, label: "Program Pendidikan", value: "10+" },
  { icon: Users, label: "Santri Aktif", value: "500+" },
  { icon: Award, label: "Tahun Berdiri", value: "1758" },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-islamic pt-28 md:pt-32 pb-24 md:pb-28">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/5 blur-[120px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary-900/40 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/30 via-transparent to-primary-950/80 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full z-10 flex flex-col justify-center h-full">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid xl:grid-cols-2 gap-8 xl:gap-12 items-center"
        >
          {/* Left Content */}
          <div className="text-left max-w-2xl">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white/90 text-xs font-medium mb-6 shadow-lg shadow-black/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
                </span>
                Penerimaan Santri Baru 2025/2026
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="font-arabic text-2xl md:text-3xl text-gold-400 mb-2 tracking-wide opacity-90 leading-loose">
                مَعْهَدُ الشَّاكِرَةِ
              </p>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-[1.1] mb-4 tracking-tight text-balance">
                Ma'had <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">Asy-Syakiroh</span>
                <br />
                Buntet Pesantren
              </h1>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8 max-w-xl text-balance">
                Mencetak santri <span className="text-gold-300 font-semibold">berilmu</span>,{" "}
                <span className="text-gold-300 font-semibold">berakhlak</span>,
                dan berlandaskan nilai Islam Ahlussunnah wal Jamaah di lingkungan pesantren terpercaya sejak 1758.
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/daftar"
                  className="inline-flex justify-center items-center gap-2 px-6 py-3.5 bg-gold-500 text-primary-950 font-bold text-sm rounded-xl hover:bg-gold-400 transition-all duration-300 shadow-[0_0_30px_rgba(234,179,8,0.2)] hover:shadow-[0_0_50px_rgba(234,179,8,0.3)] hover:-translate-y-0.5"
                >
                  Daftar Sekarang
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#profil"
                  className="inline-flex justify-center items-center gap-2 px-6 py-3.5 bg-white/5 border border-white/10 text-white font-semibold text-sm rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md"
                >
                  Pelajari Lebih Lanjut
                </a>
              </div>
            </motion.div>

            {/* Mobile Stats */}
            <motion.div variants={fadeUp}>
              <div className="mt-8 grid grid-cols-3 gap-3 max-w-md xl:hidden">
                {stats.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="text-center bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-xl">
                    <Icon className="w-4 h-4 text-gold-400 mx-auto mb-1.5" />
                    <p className="text-lg font-bold text-white mb-0.5">{value}</p>
                    <p className="text-[10px] text-white/60 uppercase tracking-wider">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content / Desktop Illustration */}
          <div className="hidden xl:flex flex-col items-center justify-center relative">
            <motion.div variants={fadeUp} className="relative z-10 w-full flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/20 to-primary-500/20 blur-[50px] rounded-full" />
                <div className="absolute -inset-2 border border-white/10 rounded-3xl rotate-3 backdrop-blur-sm" />
                <div className="absolute -inset-2 border border-white/10 rounded-3xl -rotate-3 bg-white/5 backdrop-blur-sm" />
                
                <img
                  src="/santri.png"
                  alt="Santri Ma'had Asy-Syakiroh"
                  className="relative z-20 max-h-[280px] xl:max-h-[320px] 2xl:max-h-[360px] object-contain drop-shadow-2xl"
                />
              </div>
            </motion.div>

            {/* Desktop Stats */}
            <motion.div variants={fadeUp} className="w-full mt-8 z-20">
              <div className="grid grid-cols-3 gap-3 w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
                {stats.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="text-center group">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 group-hover:bg-gold-500/20 transition-all duration-300">
                      <Icon className="w-4 h-4 text-gold-400" />
                    </div>
                    <p className="text-xl font-bold text-white mb-0.5">{value}</p>
                    <p className="text-[10px] text-white/60 uppercase tracking-wider font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block w-full h-12 md:h-16 fill-white translate-y-1 outline-none border-none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}