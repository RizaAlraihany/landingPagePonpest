import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react'

const stats = [
  { icon: BookOpen, label: 'Program Pendidikan', value: '10+' },
  { icon: Users, label: 'Santri Aktif', value: '500+' },
  { icon: Award, label: 'Tahun Berdiri', value: '1758' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-islamic">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/5 translate-y-1/3 -translate-x-1/3 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/40 via-transparent to-primary-950/60 pointer-events-none" />

      {/* Geometric ornament top-right */}
      <div className="absolute top-24 right-8 md:right-20 opacity-20 pointer-events-none select-none">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          <polygon points="90,10 170,50 170,130 90,170 10,130 10,50" stroke="white" strokeWidth="1" fill="none" />
          <polygon points="90,30 150,62 150,118 90,150 30,118 30,62" stroke="white" strokeWidth="0.5" fill="none" />
          <polygon points="90,50 130,74 130,106 90,130 50,106 50,74" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="90" cy="90" r="12" stroke="white" strokeWidth="0.5" fill="none" />
        </svg>
      </div>
      {/* Geometric ornament bottom-left */}
      <div className="absolute bottom-24 left-8 md:left-20 opacity-10 pointer-events-none select-none">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <rect x="10" y="10" width="100" height="100" rx="4" stroke="white" strokeWidth="1" fill="none" />
          <rect x="25" y="25" width="70" height="70" rx="2" stroke="white" strokeWidth="0.5" fill="none" />
          <rect x="40" y="40" width="40" height="40" rx="1" stroke="white" strokeWidth="0.5" fill="none" />
          <line x1="10" y1="60" x2="110" y2="60" stroke="white" strokeWidth="0.5" />
          <line x1="60" y1="10" x2="60" y2="110" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
            Penerimaan Santri Baru Tahun Ajaran 2025/2026
          </div>

          {/* Arabic text */}
          <p className="font-arabic text-3xl text-gold-400 mb-4 leading-loose">
            مَعْهَدُ الشَّاكِرَةِ
          </p>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Ma'had{' '}
            <span className="text-gold-400">Asy-Syakiroh</span>
            <br />
            Buntet Pesantren
          </h1>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-xl">
            Mencetak santri <span className="text-gold-300 font-semibold">berilmu</span>,{' '}
            <span className="text-gold-300 font-semibold">berakhlak</span>, dan berlandaskan
            nilai Islam yang kuat di lingkungan pesantren terpercaya sejak 1758.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/daftar"
              className="inline-flex items-center gap-2 px-7 py-4 bg-gold-500 text-primary-900 font-bold rounded-xl hover:bg-gold-400 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-base"
            >
              Daftar Sekarang
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#profil"
              className="inline-flex items-center gap-2 px-7 py-4 border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/60 transition-all duration-200 text-base"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-lg">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-gold-400" />
                </div>
                <p className="text-2xl font-extrabold text-white">{value}</p>
                <p className="text-xs text-white/60 mt-0.5 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 md:h-20 fill-white">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  )
}