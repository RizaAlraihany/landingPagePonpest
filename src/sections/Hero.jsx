import { Link } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";
import { motion } from "framer-motion";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function Hero() {
  return (
    <section className="relative w-full bg-islamic overflow-hidden pt-20 md:pt-24 min-h-screen lg:min-h-[90vh] flex flex-col justify-center">
      {/* MOBILE */}
      <div className="lg:hidden w-full px-2 pt-5 pb-10 flex flex-col items-center relative z-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-20 text-center w-full max-w-sm mx-auto bg-gradient-to-b from-primary-950/75 to-primary-900/70 backdrop-blur-2xl border border-white/10 rounded-[28px] p-5 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.45)] overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="relative w-full mb-3">
            <div className="flex items-end justify-between w-full">
              <motion.div
                variants={fadeUp}
                className="relative z-10 flex justify-end"
              >
                <img
                  src="/nyai.png"
                  alt="Nyai Pengasuh"
                  className="w-[122px] sm:w-[142px] h-auto object-contain -pl-2"
                  style={{
                    filter:
                      "drop-shadow(0 8px 20px rgba(0,0,0,0.45)) drop-shadow(0 0 10px rgba(212,175,55,0.12))",
                  }}
                />
              </motion.div>

              <div className="flex-1" />

              <motion.div
                variants={fadeUp}
                className="relative z-10 flex justify-start"
              >
                <img
                  src="/abah.png"
                  alt="Abah Pengasuh"
                  className="w-[120px] sm:w-[142px] h-auto -pr-2 object-contain"
                  style={{
                    filter:
                      "drop-shadow(0 8px 20px rgba(0,0,0,0.45)) drop-shadow(0 0 10px rgba(212,175,55,0.12))",
                  }}
                  onError={(e) => {
                    e.currentTarget.src = "/santri.png";
                  }}
                />
              </motion.div>
            </div>

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pt-2 pointer-events-none">
              <motion.div
                variants={fadeUp}
                className="pointer-events-auto text-center flex flex-col items-center"
              >
                <h1 className="text-[20px] sm:text-[24px] font-extrabold text-white leading-[1.1] tracking-tight uppercase drop-shadow-md">
                  Penerimaan
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
                    Santri Baru
                  </span>
                </h1>

                <p className="w-fit -mt-[1px] border border-primary-600/10 bg-primary-600/20 px-2 py-1 rounded-full text-white/80 text-[8px] sm:text-[9px] leading-none font-semibold uppercase tracking-[0.08em]">
                  Tahun Ajaran 2026/2027
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="pointer-events-auto mt-1">
                <img
                  src="/arabAsqWhite.png"
                  alt="مَعْهَدُ الشَّاكِرَةِ"
                  className="w-[90px] sm:w-[105px] opacity-90 mx-auto"
                  style={{
                    filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.35))",
                  }}
                  onError={(e) => {
                    e.currentTarget.src = "/santri.png";
                  }}
                />
              </motion.div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[78%] h-[78%] bg-gold-500/10 blur-3xl rounded-full z-0 pointer-events-none" />
          </div>

          <motion.div
            variants={fadeUp}
            className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto my-4 rounded-full opacity-70"
          />

          <motion.div variants={fadeUp}>
            <p className="text-white/75 text-[10px] sm:text-[11px] leading-[1.45] font-medium mb-6 tracking-wide">
              Pondok Pesantren Putra-Putri
              <span className="text-gold-300 font-semibold">
                {" "}Asy-Syakiroh 1 &amp; 2
              </span>
              <br />
              <span className="text-white/45 text-[8px] uppercase tracking-[0.18em]">
                Yayasan Lembaga Pendidikan Islam
              </span>
              <br />
              <span className="text-white/45 text-[8px] uppercase tracking-[0.18em]">
                Buntet Pesantren · Cirebon
              </span>
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center"
          >
            <Link
              to="/daftar"
              className="w-full inline-flex justify-center items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 text-primary-950 font-bold text-sm rounded-2xl shadow-lg shadow-gold-500/20 hover:shadow-gold-500/40hover:from-gold-400 hover:to-gold-500 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Daftar Sekarang
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#profil"
              className="w-full inline-flex justify-center items-center gap-2 px-6 py-3.5 bg-white/5 border border-white/10 text-white/90 font-semibold text-sm rounded-2xl hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm"
            >
              <Info className="w-4 h-4" />
              Pelajari Lebih Lanjut
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* DESKTOP */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 hidden lg:flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-4 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:flex lg:col-span-3 justify-start items-center relative z-20"
          >
            <img
              src="/nyai.png"
              alt="Nyai Pengasuh"
              className="h-[300px] md:h-[400px] lg:h-[550px] xl:h-[650px] w-auto object-contain drop-shadow-2xl lg:-translate-y-6"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col items-center justify-center text-center lg:py-8 relative z-30"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-gold-600 to-gold-400 text-primary-950 text-xs md:text-sm font-black tracking-[0.15em] uppercase rounded-full shadow-lg shadow-gold-500/30 ring-2 ring-gold-300/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-900 opacity-100" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-950" />
                </span>
                Tahun Ajaran 2026/2027
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="mb-3 lg:mb-6 w-full">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.15] tracking-tight uppercase max-w-2xl mx-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
                Penerimaan
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-400">
                  Santri Baru
                </span>
              </h1>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mb-4 lg:mb-8 max-w-lg mx-auto"
            >
              <p className="text-white/95 text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                Pondok Pesantren Putra-Putri{" "}
                <span className="text-gold-300 font-bold">
                  Asy-Syakiroh 1 & 2
                </span>
                <br />
                Buntet Pesantren Cirebon
              </p>

              <img
                src="/arabAsqWhite.png"
                alt="مَعْهَدُ الشَّاكِرَةِ"
                className="w-[100px] opacity-90 mt-3 mx-auto"
                onError={(e) => {
                  e.currentTarget.src = "/santri.png";
                }}
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-row items-center gap-4 w-full justify-center"
            >
              <Link
                to="/daftar"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-gold-500 text-primary-950 font-bold text-base rounded-full hover:bg-gold-400 transition-all duration-300"
              >
                Daftar Sekarang
                <ArrowRight className="w-5 h-5" />
              </Link>

              <a
                href="#profil"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-bold text-base rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-md"
              >
                <Info className="w-5 h-5" />
                Pelajari Lebih Lanjut
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:flex lg:col-span-3 justify-end items-center relative z-20"
          >
            <img
              src="/abah.png"
              alt="Abah Pengasuh"
              className="h-[300px] md:h-[400px] lg:h-[550px] xl:h-[650px] w-auto object-contain drop-shadow-2xl lg:-translate-y-6"
              onError={(e) => {
                e.currentTarget.src = "/santri.png";
              }}
            />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-30">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="block w-full h-8 md:h-16 fill-white translate-y-1"
        >
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}
