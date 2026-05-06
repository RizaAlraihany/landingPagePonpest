import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/#profil" },
  { label: "Program", href: "/#program" },
  { label: "Kegiatan", href: "/#kegiatan" },
  { label: "Kontak", href: "/#kontak" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/96 backdrop-blur-xl shadow-[0_1px_0_0_rgb(0_0_0/0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 group flex-shrink-0"
            >
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl overflow-hidden shadow-md ring-1 ring-white/20 flex-shrink-0 bg-white flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Logo Ma'had Asy-Syakiroh"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="hidden sm:block leading-tight">
                <p
                  className={`font-extrabold text-sm tracking-tight transition-colors duration-300 ${
                    scrolled ? "text-primary-800" : "text-white"
                  }`}
                >
                  Ma'had Asy-Syakiroh
                </p>
                <p
                  className={`text-[11px] font-medium transition-colors duration-300 ${
                    scrolled ? "text-primary-500" : "text-primary-200"
                  }`}
                >
                  Buntet Pesantren Cirebon
                </p>
              </div>
            </Link>

            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Navigasi utama"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    scrolled
                      ? "text-gray-800 hover:text-primary-700 hover:bg-primary-50"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                to="/daftar"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500 text-primary-900 font-bold text-sm rounded-2xl hover:bg-gold-400 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                Daftar Sekarang
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Tutup menu" : "Buka menu"}
                aria-expanded={isOpen}
                className={`md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 ${
                  scrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {isOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <div
          className="absolute inset-0 bg-primary-950/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 bottom-0 w-72 bg-white shadow-2xl transition-transform duration-300 ease-spring ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
            <span className="font-extrabold text-primary-800 text-sm">
              Menu
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-3 rounded-2xl text-gray-700 font-semibold text-sm hover:bg-primary-50 hover:text-primary-700 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="px-4 pt-2">
            <Link
              to="/daftar"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full py-3.5 bg-gold-500 text-primary-900 font-bold text-sm rounded-2xl hover:bg-gold-400 transition-colors"
            >
              Daftar Sekarang
            </Link>
          </div>

          <div className="absolute bottom-8 left-0 right-0 px-6 text-center">
            <p className="text-xs text-gray-400">
              Pertanyaan? Hubungi pengurus kami
            </p>
            <a
              href="tel:081572658419"
              className="text-xs font-semibold text-primary-600 hover:text-primary-700"
            >
              0815-7265-8419
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
