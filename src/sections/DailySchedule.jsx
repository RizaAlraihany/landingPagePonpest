const schedule = [
  { time: "04.00", activity: "Bangun Tidur", category: "ibadah" },
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

const categoryStyle = {
  ibadah: {
    dot: "bg-primary-500 shadow-primary-500/40",
    badge:
      "bg-primary-50 text-primary-700 ring-1 ring-inset ring-primary-500/20",
    label: "Ibadah",
  },
  quran: {
    dot: "bg-gold-500 shadow-gold-500/40",
    badge: "bg-gold-50 text-gold-700 ring-1 ring-inset ring-gold-500/30",
    label: "Qur'an & Kitab",
  },
  formal: {
    dot: "bg-blue-500 shadow-blue-500/40",
    badge: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-500/20",
    label: "Pendidikan",
  },
  daily: {
    dot: "bg-gray-400 shadow-gray-400/40",
    badge: "bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/20",
    label: "Kegiatan Harian",
  },
};

export default function DailySchedule() {
  return (
    <section id="kegiatan" className="py-20 md:py-28 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4 md:mb-6">
          <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 text-sm font-semibold rounded-full mb-4 ring-1 ring-inset ring-primary-500/20">
            Kegiatan Harian
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Jadwal Santri Sehari-hari
          </h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm md:text-base">
            Setiap hari dirancang penuh makna — seimbang antara ibadah, ilmu,
            dan istirahat.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6">
          {Object.entries(categoryStyle).map(([key, val]) => (
            <div
              key={key}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-transform hover:-translate-y-0.5 cursor-default ${val.badge}`}
            >
              <span className={`w-2 h-2 rounded-full shadow-sm ${val.dot}`} />
              {val.label}
            </div>
          ))}
        </div>

        <div className="w-full mx-auto">
          <div className="columns-1 lg:columns-2 gap-x-4 lg:gap-x-12">
            {schedule.map((item, i) => {
              const style = categoryStyle[item.category];
              return (
                <div
                  key={i}
                  className="relative flex items-center gap-4 md:gap-5 group break-inside-avoid mb-1 md:mb-2"
                >
                  <div className="w-[50px] md:w-[60px] text-right flex-shrink-0">
                    <span className="text-xs font-semibold text-gray-400 group-hover:text-gray-700 transition-colors duration-300">
                      {item.span ? item.span.split("–")[0].trim() : item.time}
                    </span>
                  </div>

                  <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-6 h-6 bg-slate-50/50 group-hover:bg-white rounded-full transition-colors duration-300">
                    <div
                      className={`w-2 h-2 rounded-full shadow-sm ${style.dot} group-hover:scale-125 transition-transform duration-300`}
                    />
                  </div>

                  <div className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 md:px-5 md:py-3.5 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.02)] group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:border-primary-200 group-hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-semibold text-gray-700 text-sm group-hover:text-primary-900 transition-colors">
                          {item.activity}
                        </span>
                        {item.span && (
                          <span className="text-[10px] md:text-[11px] font-medium text-gray-500 bg-gray-50/50 border border-gray-100 px-2 py-0.5 rounded-md">
                            {item.span}
                          </span>
                        )}
                      </div>
                      <span
                        className={`inline-flex w-fit items-center text-[10px] font-semibold px-2 py-0.5 rounded-md ${style.badge}`}
                      >
                        {style.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
