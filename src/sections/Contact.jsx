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
    badge:
      "bg-primary-50 text-primary-700 ring-1 ring-inset ring-primary-500/10",
    iconBg: "bg-primary-50",
    iconText: "text-primary-600",
    btn: "bg-primary-600 hover:bg-primary-500 text-white shadow-primary-600/20 hover:shadow-primary-600/40",
  },
  gold: {
    badge: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-500/20",
    iconBg: "bg-amber-50",
    iconText: "text-amber-600",
    btn: "bg-gold-500 hover:bg-gold-400 text-gray-900 shadow-gold-500/20 hover:shadow-gold-500/40",
  },
};

export default function Contact() {
  return (
    <section id="kontak" className="py-20 md:py-28 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4 md:mb-6">
          <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 text-sm font-semibold rounded-full mb-4 ring-1 ring-inset ring-primary-500/10">
            Kontak Pendaftaran
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Hubungi Pengurus Kami
          </h2>
          <p className="text-gray-500 mt-4 max-w-md mx-auto text-sm md:text-base">
            Tim pengurus siap membantu proses pendaftaran dan menjawab
            pertanyaan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {contacts.map((c) => {
            const style = colorMap[c.color];
            return (
              <div
                key={c.type}
                className="bg-white rounded-[2rem] p-8 lg:p-8 border border-slate-200/70 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-primary-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white flex flex-col relative group/card"
              >
                <div className="mb-8">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${style.badge}`}
                  >
                    Narahubung
                  </span>
                  <h3 className="text-2xl font-extrabold text-gray-900">
                    {c.type}
                  </h3>
                </div>

                <div className="space-y-6 flex-1">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 ${style.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover/card:scale-110`}
                    >
                      <Phone className={`w-5 h-5 ${style.iconText}`} />
                    </div>
                    <div className="pt-1">
                      <p className="text-xs font-semibold text-gray-400 mb-1">
                        Nomor WhatsApp
                      </p>
                      <a
                        href={`tel:${c.phoneRaw}`}
                        className="text-lg font-bold text-gray-800 hover:text-primary-600 transition-colors"
                      >
                        {c.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 ${style.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover/card:scale-110`}
                    >
                      <MapPin className={`w-5 h-5 ${style.iconText}`} />
                    </div>
                    <div className="pt-1">
                      <p className="text-xs font-semibold text-gray-400 mb-1">
                        Lokasi Asrama
                      </p>
                      <a
                        href={c.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors leading-relaxed"
                      >
                        {c.location}
                      </a>
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${c.phoneRaw}?text=Assalamu'alaikum, saya ingin menanyakan informasi pendaftaran Ma'had Asy-Syakiroh untuk ${c.type}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-lg ${style.btn}`}
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat WhatsApp
                </a>
              </div>
            );
          })}
        </div>

        <p className="text-center font-medium text-gray-400 text-sm mt-12">
          Jam layanan: Setiap hari pukul 08.00 – 20.00 WIB
        </p>
      </div>
    </section>
  );
}
