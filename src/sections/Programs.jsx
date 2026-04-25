import {
  GraduationCap,
  BookOpen,
  Mic2,
  BookMarked,
  Cpu,
  Stethoscope,
} from "lucide-react";
import { FadeInSection } from "../components/FadeInSection";
import { StaggerContainer, StaggerItem } from "../components/StaggerContainer";

const formal = [
  { icon: GraduationCap, name: "TK / Raudhatul Athfal" },
  { icon: GraduationCap, name: "MI (Madrasah Ibtidaiyah)" },
  { icon: GraduationCap, name: "MTs (Madrasah Tsanawiyah)" },
  { icon: GraduationCap, name: "MA (Madrasah Aliyah)" },
  { icon: GraduationCap, name: "MAN (Madrasah Aliyah Negeri)" },
  { icon: Cpu, name: "SMK — TKRO & Multimedia" },
  { icon: Stethoscope, name: "AKPER (Akademi Keperawatan)" },
  { icon: GraduationCap, name: "Dan lain-lain" },
];

const nonformal = [
  {
    icon: BookOpen,
    name: "Tahfidz Al-Qur'an",
    desc: "Program hafalan Al-Qur'an 30 juz dengan metode terstruktur dan pembimbing berpengalaman.",
  },
  {
    icon: BookMarked,
    name: "Diniyah",
    desc: "Pengajian ilmu agama seperti fiqih, akidah, tafsir, dan hadits secara mendalam.",
  },
  {
    icon: BookOpen,
    name: "Bahtsul Masail",
    desc: "Forum diskusi dan kajian hukum Islam dalam tradisi pesantren Ahlussunnah wal Jamaah.",
  },
  {
    icon: Mic2,
    name: "Khitobah",
    desc: "Pelatihan pidato, dakwah, dan retorika Islami untuk membentuk santri yang komunikatif.",
  },
];

export default function Programs() {
  return (
    <section
      id="program"
      className="relative py-20 md:py-28 overflow-hidden bg-islamic"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/20 via-transparent to-primary-950/40" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-white/5 blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="absolute top-0 left-0 right-0 pointer-events-none z-0">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="w-full h-14 md:h-20"
        >
          <path
            fill="#ffffff"
            d="M0,60 C300,120 500,0 720,60 C950,120 1180,0 1440,60 L1440,0 L0,0 Z"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <FadeInSection delay={0.1}>
          <div className="text-center mb-4 md:mb-6">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-gold-300 text-sm font-semibold rounded-full mb-3 backdrop-blur-md border border-white/10">
              Program Pendidikan
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Pendidikan Lengkap, Satu Atap
            </h2>
            <p className="text-white/70 mt-2 max-w-xl mx-auto text-sm md:text-base">
              Formal dan non-formal berjalan beriringan — menjamin santri unggul
              di dua dunia.
            </p>
          </div>
        </FadeInSection>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <StaggerItem>
            <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] p-6 md:p-8 h-full shadow-2xl shadow-black/10 border border-white/20 relative overflow-hidden group/main flex flex-col">
              <div className="absolute top-0 right-0 w-72 h-72 bg-primary-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 transition-transform duration-700 group-hover/main:scale-150 z-0" />

              <div className="relative z-10 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-900/20 flex-shrink-0">
                    <GraduationCap className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-lg md:text-xl leading-tight">
                      Pendidikan Formal
                    </h3>
                    <p className="text-primary-600 font-medium text-sm mt-0.5">
                      Berjenjang TK hingga Perguruan Tinggi
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                  {formal.map(({ icon: Icon, name }) => (
                    <div
                      key={name}
                      className="group flex items-center gap-3 bg-white rounded-xl px-4 py-3 h-full shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-primary-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-default"
                    >
                      <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300 flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-primary-900 transition-colors leading-snug">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] p-6 md:p-8 h-full shadow-2xl shadow-black/10 border border-white/20 relative overflow-hidden group/main flex flex-col">
              <div className="absolute top-0 right-0 w-72 h-72 bg-gold-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 transition-transform duration-700 group-hover/main:scale-150 z-0" />

              <div className="relative z-10 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center shadow-lg shadow-gold-500/20 flex-shrink-0">
                    <BookOpen className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-lg md:text-xl leading-tight">
                      Pendidikan Non-Formal
                    </h3>
                    <p className="text-yellow-600 font-medium text-sm mt-0.5">
                      Tradisi keilmuan pesantren
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 flex-1 justify-between">
                  {nonformal.map(({ icon: Icon, name, desc }) => (
                    <div
                      key={name}
                      className="group flex gap-4 bg-white rounded-xl px-4 py-4 h-full shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-gold-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-default"
                    >
                      <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500 transition-colors duration-300 mt-0.5">
                        <Icon className="w-4 h-4 text-gold-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="font-bold text-gray-800 text-sm mb-1 group-hover:text-gold-700 transition-colors">
                          {name}
                        </p>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-0">
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
