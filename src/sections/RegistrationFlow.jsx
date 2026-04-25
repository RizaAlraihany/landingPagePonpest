import { Link } from "react-router-dom";
import {
  ClipboardList,
  School,
  Home,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { FadeInSection } from "../components/FadeInSection";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Isi Formulir",
    desc: "Lengkapi formulir pendaftaran online dengan data diri calon santri dan orang tua.",
    details: [
      "Data diri lengkap",
      "Pilihan program pendidikan",
      "Upload dokumen (jika ada)",
    ],
    color: "primary",
  },
  {
    number: "02",
    icon: School,
    title: "Daftar Sekolah",
    desc: "Lakukan pendaftaran ke sekolah formal pilihan yang tersedia di lingkungan Buntet Pesantren.",
    details: [
      "Pilih jenjang pendidikan",
      "Serahkan berkas ke sekolah",
      "Ikuti seleksi sekolah",
    ],
    color: "gold",
  },
  {
    number: "03",
    icon: Home,
    title: "Daftar Pondok",
    desc: "Hubungi pengurus Ma'had Asy-Syakiroh untuk proses pendaftaran pondok dan penempatan kamar.",
    details: [
      "Hubungi kontak pengurus",
      "Survei dan penempatan",
      "Selesaikan administrasi",
    ],
    color: "primary",
  },
];

const colorMap = {
  primary: {
    iconBg:
      "bg-gradient-to-br from-primary-400 to-primary-600 shadow-primary-500/20",
    iconText: "text-white",
    number: "text-white/5",
    check: "text-primary-400",
  },
  gold: {
    iconBg: "bg-gradient-to-br from-gold-400 to-gold-600 shadow-gold-500/20",
    iconText: "text-white",
    number: "text-white/5",
    check: "text-gold-400",
  },
};

export default function RegistrationFlow() {
  return (
    <section
      id="pendaftaran"
      className="relative pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden bg-islamic"
    >
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

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <FadeInSection delay={0.1}>
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/10 text-white text-sm font-semibold rounded-full mb-4 backdrop-blur-md">
              Alur Pendaftaran
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              3 Langkah Mudah Menjadi Santri
            </h2>
            <p className="text-white/70 mt-4 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
              Proses pendaftaran dirancang sesederhana mungkin agar orang tua dan
              calon santri dapat mendaftar dengan mudah.
            </p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-12">
          {steps.map((step, i) => {
            const c = colorMap[step.color];
            const Icon = step.icon;
            return (
              <FadeInSection key={i} delay={0.2 + i * 0.1}>
                <div className="relative group/card h-full">
                  {i < steps.length - 1 && (
                    <div className="hidden md:flex absolute -right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20">
                      <ArrowRight className="w-5 h-5 text-white/30" />
                    </div>
                  )}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-7 lg:p-8 h-full shadow-xl hover:shadow-2xl hover:bg-white/[0.15] hover:border-white/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col">
                    <span
                      className={`absolute -top-4 -right-2 text-8xl font-black ${c.number} select-none transition-transform duration-500 group-hover/card:scale-110`}
                    >
                      {step.number}
                    </span>

                    <div className="relative z-10 flex flex-col h-full">
                      <div
                        className={`w-14 h-14 ${c.iconBg} rounded-2xl flex items-center justify-center mb-8 shadow-lg transition-transform duration-300 group-hover/card:scale-110`}
                      >
                        <Icon className={`w-7 h-7 ${c.iconText}`} />
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed mb-8 flex-1">
                        {step.desc}
                      </p>

                      <ul className="space-y-3 mt-auto">
                        {step.details.map((d) => (
                          <li
                            key={d}
                            className="flex items-start gap-3 text-sm text-white/90 font-medium"
                          >
                            <CheckCircle2
                              className={`w-5 h-5 ${c.check} flex-shrink-0 mt-0.5`}
                            />
                            <span className="leading-snug">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            );
          })}
        </div>

        <FadeInSection delay={0.5}>
          <div className="text-center">
            <Link
              to="/daftar"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-gray-900 font-bold text-base rounded-full hover:bg-gold-400 transition-all duration-300 shadow-[0_8px_30px_rgb(234,179,8,0.3)] hover:shadow-[0_8px_30px_rgb(234,179,8,0.5)] hover:-translate-y-1"
            >
              Mulai Pendaftaran Sekarang
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-white/60 text-sm mt-5 font-medium">
              Butuh bantuan? Hubungi pengurus kami langsung.
            </p>
          </div>
        </FadeInSection>
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
