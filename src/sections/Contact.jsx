import { Phone, MapPin, MessageCircle } from "lucide-react";

const contacts = [
  {
    type: "Santri Putra",
    phone: "0815-7265-8419",
    phoneRaw: "6281572658419",
    location: "Blok Karang Anyar, Buntet Pesantren, Cirebon",
    mapUrl: "https://maps.google.com/?q=Buntet+Pesantren+Cirebon",
    color: "primary",
  },
  {
    type: "Santri Putri",
    phone: "0857-9515-5186",
    phoneRaw: "6285795155186",
    location: "Blok Pesantren, Mertapada Kulon, Cirebon",
    mapUrl: "https://maps.google.com/?q=Mertapada+Kulon+Cirebon",
    color: "gold",
  },
];

const colorMap = {
  primary: {
    header: "bg-primary-700",
    badge: "bg-primary-100 text-primary-700",
    iconBg: "bg-primary-50",
    icon: "text-primary-700",
    btn: "bg-primary-700 hover:bg-primary-600 text-white",
    border: "border-primary-100",
  },
  gold: {
    header: "bg-gold-500",
    badge: "bg-amber-100 text-amber-800",
    iconBg: "bg-amber-50",
    icon: "text-amber-700",
    btn: "bg-gold-500 hover:bg-gold-400 text-primary-900",
    border: "border-amber-100",
  },
};

export default function Contact() {
  return (
    <section id="kontak" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
            Kontak Pendaftaran
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-900">
            Hubungi Pengurus Kami
          </h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            Tim pengurus siap membantu proses pendaftaran dan menjawab
            pertanyaan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {contacts.map((c) => {
            const style = colorMap[c.color];
            return (
              <div
                key={c.type}
                className={`rounded-3xl overflow-hidden border ${style.border} shadow-sm bg-white hover:shadow-lg transition-shadow`}
              >
                {/* Header strip */}
                <div className={`${style.header} px-7 py-5`}>
                  <span className="text-white/80 text-xs font-semibold uppercase tracking-widest">
                    Kontak
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-1">
                    {c.type}
                  </h3>
                </div>

                {/* Body */}
                <div className="p-7 space-y-5">
                  {/* Phone */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 ${style.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <Phone className={`w-5 h-5 ${style.icon}`} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-0.5">
                        Nomor HP
                      </p>
                      <a
                        href={`tel:${c.phoneRaw}`}
                        className="font-bold text-gray-800 hover:text-primary-700 transition-colors text-lg"
                      >
                        {c.phone}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-11 h-11 ${style.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5`}
                    >
                      <MapPin className={`w-5 h-5 ${style.icon}`} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-0.5">
                        Lokasi
                      </p>
                      <a
                        href={c.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-700 hover:text-primary-700 transition-colors leading-snug"
                      >
                        {c.location}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp button */}
                  <a
                    href={`https://wa.me/${c.phoneRaw}?text=Assalamu'alaikum, saya ingin menanyakan informasi pendaftaran Ma'had Asy-Syakiroh untuk ${c.type}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${style.btn}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat WhatsApp
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <p className="text-center text-gray-400 text-sm mt-10">
          Jam layanan: Setiap hari pukul 08.00 – 20.00 WIB
        </p>
      </div>
    </section>
  );
}
