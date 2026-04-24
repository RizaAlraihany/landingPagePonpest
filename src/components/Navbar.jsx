import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, GraduationCap } from "lucide-react";

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg overflow-hidden">
              <img
                src="/logo.png"
                alt="Logo Ma'had Asy-Syakiroh"
                className="h-10 w-auto object-contain"
              />
            </div>

            <div className="hidden sm:block">
              <p
                className={`font-bold text-sm leading-tight ${
                  scrolled ? "text-primary-800" : "text-white"
                }`}
              >
                Ma'had Asy-Syakiroh
              </p>
              <p
                className={`text-xs ${
                  scrolled ? "text-primary-600" : "text-primary-200"
                }`}
              >
                Buntet Pesantren Cirebon
              </p>
            </div>
          </Link>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  scrolled
                    ? "text-gray-700 hover:text-primary-700 hover:bg-primary-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <Link
            to="/daftar"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500 text-primary-900 font-semibold text-sm rounded-xl hover:bg-gold-400 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Daftar Sekarang
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white shadow-xl border-t border-gray-100 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-primary-50 hover:text-primary-700 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/daftar"
            className="block mt-3 px-4 py-3 bg-gold-500 text-primary-900 font-semibold rounded-xl text-center hover:bg-gold-400 transition-colors"
          >
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </header>
  );
}
