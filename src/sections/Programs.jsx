import {
  GraduationCap,
  BookOpen,
  Mic2,
  BookMarked,
  Cpu,
  Stethoscope,
} from "lucide-react";

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
    <section id="program" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
            Program Pendidikan
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-900">
            Pendidikan Lengkap, Satu Atap
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Formal dan non-formal berjalan beriringan — menjamin santri unggul
            di dua dunia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Formal */}
          <div className="bg-primary-50 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-700 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-primary-900 text-lg">
                  Pendidikan Formal
                </h3>
                <p className="text-primary-600 text-sm">
                  Berjenjang TK hingga Perguruan Tinggi
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {formal.map(({ icon: Icon, name }) => (
                <div
                  key={name}
                  className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-primary-100 hover:border-primary-300 transition-colors"
                >
                  <Icon className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Non-Formal */}
          <div className="bg-amber-50 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-900" />
              </div>
              <div>
                <h3 className="font-extrabold text-primary-900 text-lg">
                  Pendidikan Non-Formal
                </h3>
                <p className="text-yellow-700 text-sm">
                  Tradisi keilmuan pesantren
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {nonformal.map(({ icon: Icon, name, desc }) => (
                <div
                  key={name}
                  className="flex gap-4 bg-white rounded-xl px-4 py-4 shadow-sm border border-amber-100 hover:border-gold-300 transition-colors"
                >
                  <div className="w-9 h-9 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-gold-700" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm mb-1">
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
      </div>
    </section>
  );
}
