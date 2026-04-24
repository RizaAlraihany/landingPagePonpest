import { Link } from "react-router-dom";
import {
  ClipboardList,
  School,
  Home,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

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
    bg: "bg-primary-700",
    light: "bg-primary-50",
    border: "border-primary-200",
    text: "text-primary-700",
    icon: "text-primary-600",
    number: "text-primary-300",
  },
  gold: {
    bg: "bg-gold-500",
    light: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    icon: "text-amber-600",
    number: "text-amber-300",
  },
};

export default function RegistrationFlow() {
  return (
    <section
      id="pendaftaran"
      className="py-20 md:py-28 bg-islamic relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full mb-4">
            Alur Pendaftaran
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            3 Langkah Mudah Menjadi Santri
          </h2>
          <p className="text-primary-200 mt-3 max-w-lg mx-auto">
            Proses pendaftaran dirancang sesederhana mungkin agar orang tua dan
            calon santri dapat mendaftar dengan mudah.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, i) => {
            const c = colorMap[step.color];
            const Icon = step.icon;
            return (
              <div key={i} className="relative">
                {/* Connector arrow (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-white/30" />
                  </div>
                )}

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-7 h-full hover:bg-white/15 transition-colors">
                  {/* Number + Icon */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`w-12 h-12 ${c.bg} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span
                      className={`text-5xl font-extrabold ${c.number} opacity-40`}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-primary-200 text-sm leading-relaxed mb-5">
                    {step.desc}
                  </p>

                  {/* Detail list */}
                  <ul className="space-y-2">
                    {step.details.map((d) => (
                      <li
                        key={d}
                        className="flex items-center gap-2 text-sm text-primary-100"
                      >
                        <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/daftar"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-primary-900 font-bold text-base rounded-xl hover:bg-gold-400 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
          >
            Mulai Pendaftaran Sekarang
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-primary-300 text-sm mt-4">
            Butuh bantuan? Hubungi pengurus kami langsung.
          </p>
        </div>
      </div>
    </section>
  );
}
