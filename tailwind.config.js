import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link
              to="/"
              className="flex items-center gap-3 group flex-shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Logo Ma'had Asy-Syakiroh"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <p
                  className={`font-bold text-sm leading-tight transition-colors ${scrolled ? "text-primary-800" : "text-white"}`}
                >
                  Ma'had Asy-Syakiroh
                </p>
                <p
                  className={`text-xs transition-colors ${scrolled ? "text-primary-500" : "text-primary-200"}`}
                >
                  Buntet Pesantren Cirebon
                </p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    scrolled
                      ? "text-gray-600 hover:text-primary-700 hover:bg-primary-50"
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
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500 text-primary-900 font-semibold text-sm rounded-xl hover:bg-gold-400 active:scale-95 transition-all duration-200 shadow-md"
              >
                Daftar Sekarang
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  scrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Toggle menu"
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

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl md:hidden transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <p className="font-bold text-sm text-primary-800">
              Ma'had Asy-Syakiroh
            </p>
            <p className="text-xs text-primary-500">Buntet Pesantren Cirebon</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-primary-50 hover:text-primary-700 transition-colors text-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="px-4 pt-2">
          <Link
            to="/daftar"
            className="block px-4 py-3.5 bg-gold-500 text-primary-900 font-bold rounded-xl text-center hover:bg-gold-400 transition-colors text-sm"
          >
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </>
  );
}
