import { Shield, Heart, BookOpen, Star } from "lucide-react";

const pillars = [
  {
    icon: BookOpen,
    title: "Ilmu Agama",
    desc: "Pengajaran kitab kuning, Al-Qur'an, dan ilmu syariat secara mendalam dan terstruktur.",
  },
  {
    icon: Heart,
    title: "Akhlakul Karimah",
    desc: "Pembentukan karakter mulia melalui keteladanan dan pembiasaan adab pesantren.",
  },
  {
    icon: Shield,
    title: "Pendidikan Formal",
    desc: "Pendidikan formal berkualitas dari TK hingga perguruan tinggi dalam satu lingkungan.",
  },
  {
    icon: Star,
    title: "Tradisi Keilmuan",
    desc: "Bagian dari Buntet Pesantren yang berdiri sejak 1758 — warisan ulama Nusantara.",
  },
];

export default function Profile() {
  return (
    <section id="profil" className="relative py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-5">
              Profil Pesantren
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-900 leading-tight mb-6">
              Warisan Ulama,{" "}
              <span className="text-primary-600">Masa Depan Santri</span>
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-primary-800">
                  Ma'had Asy-Syakiroh
                </strong>{" "}
                adalah pondok pesantren yang bernaung di bawah{" "}
                <strong className="text-primary-800">
                  Yayasan Lembaga Pendidikan Islam
                </strong>{" "}
                Buntet Pesantren Cirebon — salah satu pesantren tertua di
                Indonesia yang telah berdiri sejak{" "}
                <strong className="text-primary-800">tahun 1758</strong>.
              </p>
              <p>
                Berlokasi di lingkungan Buntet Pesantren yang kondusif, Ma'had
                Asy-Syakiroh menjadi rumah kedua bagi para santri dalam menuntut
                ilmu agama dan formal secara seimbang, dengan fondasi utama{" "}
                <strong className="text-primary-800">akhlakul karimah</strong>.
              </p>
              <p>
                Di sini, santri tidak hanya belajar — mereka bertumbuh menjadi
                generasi yang berilmu, berkarakter, dan siap menghadapi
                tantangan zaman tanpa kehilangan akar keislaman.
              </p>
            </div>

            {/* Quote */}
            <blockquote className="mt-8 border-l-4 border-gold-500 pl-5 py-2">
              <p className="font-arabic text-2xl text-primary-700 leading-loose mb-2">
                طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
              </p>
              <p className="text-sm text-gray-500 italic">
                "Menuntut ilmu adalah kewajiban bagi setiap Muslim." — H.R. Ibnu
                Majah
              </p>
            </blockquote>
          </div>

          {/* Right: Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                  <Icon className="w-6 h-6 text-primary-700" />
                </div>
                <h3 className="font-bold text-primary-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
