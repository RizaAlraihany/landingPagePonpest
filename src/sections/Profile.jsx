import { Shield, Heart, BookOpen, Star, ArrowRight, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { FadeInSection } from "../components/FadeInSection";

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
    <section id="profil" className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-40 pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-50 rounded-full blur-3xl opacity-50 pointer-events-none translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Content Grid 2x2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12 lg:gap-y-16 items-start">

          {/* TOP LEFT: Heading & Short P */}
          <FadeInSection delay={0.1} className="flex flex-col justify-center h-full">
            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 text-sm font-semibold rounded-full mb-6 ring-1 ring-inset ring-primary-500/10 w-fit">
              Profil Pesantren
            </span>

            {/* New Heading */}
            <div className="mb-4">
              <img
                src="/arabAsqBlack.png"
                alt="مَعْهَدُ الشَّاكِرَةِ"
                className="w-[180px] md:w-[220px] h-auto object-contain opacity-90"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-900 leading-tight mb-4 tracking-tight">
              Ma&apos;had <br /> Asy-Syakiroh <br />
              <span className="text-primary-600">Buntet Pesantren</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed border-l-4 border-gold-500 pl-4 bg-gradient-to-r from-gold-50/50 to-transparent py-2">
              Mencetak santri <strong className="text-primary-800">berilmu</strong>, <strong className="text-primary-800">berakhlak</strong>, dan berlandaskan nilai Islam <span className="text-primary-800 font-bold"> Ahlussunnah Wal Jamaah </span> di lingkungan pesantren terpercaya sejak 1758.
            </p>
          </FadeInSection>

          {/* TOP RIGHT: Santri Image & Stats CTA */}
          <FadeInSection delay={0.3} className="relative hidden lg:flex flex-col items-center justify-between h-full w-full">

            {/* Image */}
            <div className="relative w-full max-w-[250px] aspect-square mb-2 mt-2">
              <div className="absolute inset-0 bg-primary-200/40 rounded-full blur-3xl translate-x-8 translate-y-8 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gold-200/30 rounded-full blur-3xl -translate-x-8 -translate-y-8 pointer-events-none"></div>
              <img
                src="/santri.png"
                alt="Santri Ma'had Asy-Syakiroh"
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Stats CTA (Hanya Desktop) */}
            <div className="w-full max-w-[360px] h-[100px] bg-primary-800 rounded-2xl px-2 py-2 shadow-xl border border-primary-700/50">
              <div className="grid grid-cols-3 gap-1 text-center divide-x divide-primary-700/50">
                <div className="flex flex-col items-center px-1">
                  <div className="w-6 h-6 bg-primary-700/50 rounded-lg flex items-center justify-center mb-2">
                    <BookOpen className="w-4 h-4 text-gold-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-0.5">10+</h4>
                  <p className="text-[8px] text-gray-300 font-bold tracking-wider uppercase leading-tight">Program Pendidikan</p>
                </div>
                <div className="flex flex-col items-center px-1">
                  <div className="w-6 h-6 bg-primary-700/50 rounded-lg flex items-center justify-center mb-2">
                    <Users className="w-4 h-4 text-gold-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-0.5">500+</h4>
                  <p className="text-[8px] text-gray-300 font-bold tracking-wider uppercase leading-tight">Santri Aktif</p>
                </div>
                <div className="flex flex-col items-center px-1">
                  <div className="w-6 h-6 bg-primary-700/50 rounded-lg flex items-center justify-center mb-2">
                    <Award className="w-4 h-4 text-gold-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-0.5">1758</h4>
                  <p className="text-[8px] text-gray-300 font-bold tracking-wider uppercase leading-tight">Tahun Berdiri</p>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* BOTTOM LEFT: Description + Blockquote + CTA */}
          <FadeInSection delay={0.4} className="flex flex-col justify-start h-full">
            <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed text-justify mb-8">
              <p>
                <strong className="text-primary-800">Ma&apos;had Asy-Syakiroh 1 &amp; 2</strong> merupakan salah satu unit pondok
                pesantren di bawah naungan <strong className="text-primary-800">Yayasan Lembaga Pendidikan Islam Pondok Buntet Pesantren Cirebon</strong>.
                Pondok Buntet Pesantren sendiri merupakan salah satu pondok pesantren tertua di Indonesia yang
                didirikan oleh <strong className="text-primary-800">KH. Muqoyyim</strong> pada tahun <strong className="text-primary-800">1758</strong>.
              </p>
              <p>
                Ma&apos;had Asy-Syakiroh 1 &amp; 2 saat ini diasuh oleh <strong className="text-primary-800">KH. Hasanuddin Kriyani</strong> dan <strong className="text-primary-800">Ny. Hj. Eni Khunaeniyah Fathoni</strong>.
                Ma&apos;had Asy-Syakiroh 1 &amp; 2 berusaha mencetak santri yang berakhlakul karimah dan berilmu sesuai tuntunan Rasulullah SAW.
              </p>
            </div>

            <blockquote className="mt-2 border-l-4 border-primary-500 pl-5 py-2 mb-8">
              <p className="font-arabic text-2xl text-primary-700 leading-loose mb-2">
                طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
              </p>
              <p className="text-xs text-gray-400 italic">
                &quot;Menuntut ilmu adalah kewajiban bagi setiap Muslim.&quot; &mdash; H.R. Ibnu Majah
              </p>
            </blockquote>

            <div className="mt-2">
              <Link
                to="/daftar"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-700 text-white font-bold text-sm rounded-xl hover:bg-primary-600 transition-all duration-300 shadow-lg shadow-primary-900/20 hover:-translate-y-0.5"
              >
                Daftar Sekarang <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeInSection>

          {/* BOTTOM RIGHT: Pillars grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 items-start">
            {pillars.map(({ icon: Icon, title, desc }, idx) => (
              <FadeInSection key={title} delay={0.2 + idx * 0.1}>
                <div className="group p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white h-full">
                  <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                    <Icon className="w-5 h-5 text-primary-700" />
                  </div>
                  <h3 className="font-bold text-primary-800 mb-2 text-sm">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
