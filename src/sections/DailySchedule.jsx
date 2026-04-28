import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FadeInSection } from "../components/FadeInSection";

const schedule = [
  { time: "04.00", activity: "Bangun Tidur", category: "daily" },
  { time: "04.30", activity: "Subuh Berjamaah & Dzikir", category: "ibadah" },
  { time: "05.30", activity: "Pengajian Al-Qur'an", category: "quran" },
  { time: "06.30", activity: "Persiapan Sekolah", category: "formal" },
  {
    time: "07.00",
    activity: "Sekolah",
    category: "formal",
    span: "07.00 – 13.00",
  },
  { time: "13.30", activity: "Makan Siang", category: "daily" },
  { time: "15.30", activity: "Ashar Berjamaah", category: "ibadah" },
  { time: "16.00", activity: "Pengajian Al-Qur'an", category: "quran" },
  { time: "17.00", activity: "Piket", category: "daily" },
  { time: "17.30", activity: "Makan Sore", category: "daily" },
  { time: "18.00", activity: "Maghrib Berjamaah", category: "ibadah" },
  { time: "18.30", activity: "Kitab Bandongan", category: "quran" },
  { time: "19.00", activity: "Isya Berjamaah", category: "ibadah" },
  { time: "20.00", activity: "Diniyah", category: "quran" },
  { time: "21.30", activity: "Belajar Malam", category: "formal" },
  { time: "22.00", activity: "Istirahat", category: "daily" },
];

const categoryConfig = {
  ibadah: {
    dot: "bg-primary-500",
    line: "bg-primary-200",
    badge: "bg-primary-50 text-primary-700 ring-1 ring-primary-500/20",
    label: "Ibadah",
    emoji: "🕌",
  },
  quran: {
    dot: "bg-gold-500",
    line: "bg-gold-200",
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-500/20",
    label: "Qur'an & Kitab",
    emoji: "📖",
  },
  formal: {
    dot: "bg-blue-500",
    line: "bg-blue-200",
    badge: "bg-blue-50 text-blue-700 ring-1 ring-blue-500/20",
    label: "Pendidikan",
    emoji: "🏫",
  },
  daily: {
    dot: "bg-slate-400",
    line: "bg-slate-200",
    badge: "bg-slate-50 text-slate-600 ring-1 ring-slate-500/15",
    label: "Kegiatan Harian",
    emoji: "🌿",
  },
};

function TimelineItem({ item, isLast }) {
  const cfg = categoryConfig[item.category];
  return (
    <div className="relative flex gap-4 group/item">
      {/* Time */}
      <div className="w-14 flex-shrink-0 text-right pt-3.5">
        <span className="text-xs font-bold text-gray-400 group-hover/item:text-primary-600 transition-colors tabular-nums">
          {item.span ? item.span.split("–")[0].trim() : item.time}
        </span>
      </div>

      {/* Timeline track */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={`w-2.5 h-2.5 rounded-full mt-3.5 flex-shrink-0 z-10 transition-transform duration-300 group-hover/item:scale-125 ${cfg.dot}`}
        />
        {!isLast && (
          <div
            className={`w-0.5 flex-1 min-h-4 mt-1 rounded-full ${cfg.line}`}
          />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 pb-3">
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 md:px-5 md:py-3.5 shadow-card group-hover/item:shadow-card-hover group-hover/item:border-primary-200 group-hover/item:-translate-y-0.5 transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-gray-800 text-sm group-hover/item:text-primary-900 transition-colors">
                {item.activity}
              </span>
              {item.span && (
                <span className="text-[10px] font-medium text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md ">
                  {item.span}
                </span>
              )}
            </div>
            <span
              className={`inline-flex w-fit items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full ring-inset ${cfg.badge}`}
            >
              {cfg.emoji} {cfg.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DailySchedule() {
  const half = Math.ceil(schedule.length / 2);
  const leftCol = schedule.slice(0, half);
  const rightCol = schedule.slice(half);

  return (
    <section id="kegiatan" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection delay={0.1}>
          {/* header */}
          <div className="text-center mb-4 md:mb-6">
            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 text-sm font-semibold rounded-full mb-4 ring-1 ring-inset ring-primary-500/15">
              Kegiatan Harian
            </span>
            <h2 className="section-title">Jadwal Santri Sehari-hari</h2>
            <p className="section-desc text-gray-500 text-sm md:text-base mt-3 max-w-2xl mx-auto">
              Setiap hari dirancang penuh makna — seimbang antara ibadah, ilmu,
              dan istirahat.
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {Object.entries(categoryConfig).map(([, cfg]) => (
              <div
                key={cfg.label}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ring-inset ${cfg.badge}`}
              >
                <span>{cfg.emoji}</span>
                {cfg.label}
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* ── Timeline grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 lg:gap-x-16">
          {/* Left column */}
          <div>
            {leftCol.map((item, i) => (
              <FadeInSection key={`${item.time}-${item.activity}`} delay={0.1 + i * 0.05}>
                <TimelineItem
                  item={item}
                  isLast={i === leftCol.length - 1}
                />
              </FadeInSection>
            ))}
          </div>

          {/* Right column */}
          <div>
            {rightCol.map((item, i) => (
              <FadeInSection key={`${item.time}-${item.activity}`} delay={0.3 + i * 0.05}>
                <TimelineItem
                  item={item}
                  isLast={i === rightCol.length - 1}
                />
              </FadeInSection>
            ))}
          </div>
        </div>

        <FadeInSection delay={0.6}>
          <p className="text-center text-xs text-gray-400 mt-8 font-medium">
            * Jadwal dapat berubah pada hari-hari tertentu, hari raya, dan
            kegiatan pesantren khusus.
          </p>
          <div className="text-center mt-6">
            <Link
              to="/daftar"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-700 text-white font-bold text-sm rounded-full hover:bg-primary-600 transition-all duration-300 shadow-lg shadow-primary-900/20 hover:-translate-y-0.5"
            >
              Tertarik? Daftar Sekarang <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
