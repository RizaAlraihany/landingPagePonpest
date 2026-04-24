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
    dot: "bg-primary-600",
    badge: "bg-primary-100 text-primary-700",
    label: "Ibadah",
  },
  quran: {
    dot: "bg-gold-500",
    badge: "bg-gold-100 text-gold-700",
    label: "Qur'an & Kitab",
  },
  formal: {
    dot: "bg-blue-500",
    badge: "bg-blue-100 text-blue-700",
    label: "Pendidikan",
  },
  daily: {
    dot: "bg-gray-400",
    badge: "bg-gray-100 text-gray-600",
    label: "Kegiatan Harian",
  },
};

export default function DailySchedule() {
  return (
    <section id="kegiatan" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
            Kegiatan Harian
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-900">
            Jadwal Santri Sehari-hari
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Setiap hari dirancang penuh makna — seimbang antara ibadah, ilmu,
            dan istirahat.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {Object.entries(categoryStyle).map(([key, val]) => (
            <div
              key={key}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${val.badge}`}
            >
              <span className={`w-2 h-2 rounded-full ${val.dot}`} />
              {val.label}
            </div>
          ))}
        </div>

        {/* Timeline grid */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[72px] top-0 bottom-0 w-px bg-gray-200" />

            <div className="space-y-1">
              {schedule.map((item, i) => {
                const style = categoryStyle[item.category];
                return (
                  <div
                    key={i}
                    className="relative flex items-center gap-4 group"
                  >
                    {/* Time */}
                    <div className="w-16 text-right flex-shrink-0">
                      <span className="text-xs font-bold text-gray-500 group-hover:text-primary-700 transition-colors">
                        {item.span ? item.span.split("–")[0].trim() : item.time}
                      </span>
                    </div>

                    {/* Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${style.dot} group-hover:scale-125 transition-transform`}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 py-2.5 px-4 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all duration-200">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-semibold text-gray-800 text-sm">
                          {item.activity}
                        </span>
                        {item.span && (
                          <span className="text-xs text-gray-400">
                            ({item.span})
                          </span>
                        )}
                        <span
                          className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${style.badge}`}
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
      </div>
    </section>
  );
}
