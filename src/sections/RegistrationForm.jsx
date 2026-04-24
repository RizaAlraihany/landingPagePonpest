import { useState } from "react";
import { submitToSpreadsheet } from "../services/spreadsheet";
import {
  User, CreditCard, MapPin, Calendar, Phone, Mail,
  Users, GraduationCap, CheckCircle2, AlertCircle, Loader2, ChevronRight,
} from "lucide-react";

const programs = [
  "TK / Raudhatul Athfal",
  "MI (Madrasah Ibtidaiyah)",
  "MTs (Madrasah Tsanawiyah)",
  "MA (Madrasah Aliyah)",
  "MAN (Madrasah Aliyah Negeri)",
  "SMK – TKRO",
  "SMK – Multimedia",
  "AKPER (Akademi Keperawatan)",
  "Tahfidz Al-Qur'an",
  "Diniyah",
];

const genders = ["Putra", "Putri"];

const initialForm = {
  namaLengkap: "",
  nik: "",
  tempatLahir: "",
  tanggalLahir: "",
  alamat: "",
  noHp: "",
  email: "",
  namaOrtu: "",
  program: "",
  jenisKelamin: "",
};

const validators = {
  namaLengkap: (v) =>
    !v.trim() ? "Nama lengkap wajib diisi" : v.trim().length < 3 ? "Nama minimal 3 karakter" : "",
  nik: (v) =>
    !v.trim() ? "NIK wajib diisi" : !/^\d{16}$/.test(v.trim()) ? "NIK harus 16 digit angka" : "",
  tempatLahir: (v) => (!v.trim() ? "Tempat lahir wajib diisi" : ""),
  tanggalLahir: (v) => (!v ? "Tanggal lahir wajib diisi" : ""),
  alamat: (v) =>
    !v.trim() ? "Alamat wajib diisi" : v.trim().length < 10 ? "Alamat terlalu singkat" : "",
  noHp: (v) =>
    !v.trim() ? "No HP wajib diisi" : !/^(\+62|62|0)[0-9]{8,12}$/.test(v.trim()) ? "Format No HP tidak valid (contoh: 0812xxxxxxxx)" : "",
  email: (v) =>
    !v.trim() ? "Email wajib diisi" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "Format email tidak valid" : "",
  namaOrtu: (v) => (!v.trim() ? "Nama orang tua wajib diisi" : ""),
  program: (v) => (!v ? "Pilih program pendidikan" : ""),
  jenisKelamin: (v) => (!v ? "Pilih jenis kelamin" : ""),
};

const fields = [
  { name: "namaLengkap", label: "Nama Lengkap", icon: User, type: "text", placeholder: "Nama sesuai akta kelahiran" },
  { name: "nik", label: "NIK (Nomor Induk Kependudukan)", icon: CreditCard, type: "text", placeholder: "16 digit angka", maxLength: 16 },
  { name: "tempatLahir", label: "Tempat Lahir", icon: MapPin, type: "text", placeholder: "Kota/kabupaten tempat lahir" },
  { name: "tanggalLahir", label: "Tanggal Lahir", icon: Calendar, type: "date" },
  { name: "alamat", label: "Alamat Lengkap", icon: MapPin, type: "textarea", placeholder: "Jalan, RT/RW, Desa/Kel, Kec, Kab/Kota" },
  { name: "noHp", label: "No HP / WhatsApp", icon: Phone, type: "tel", placeholder: "Contoh: 0812xxxxxxxx" },
  { name: "email", label: "Email", icon: Mail, type: "email", placeholder: "Contoh: nama@email.com" },
  { name: "namaOrtu", label: "Nama Orang Tua / Wali", icon: Users, type: "text", placeholder: "Nama lengkap orang tua/wali" },
];

const inputBase = "w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2";
const inputNormal = "border-gray-200 focus:ring-primary-200 focus:border-primary-400 bg-white";
const inputError = "border-red-300 focus:ring-red-100 bg-red-50/50";

export default function RegistrationForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const validate = (name, value) => validators[name]?.(value) || "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(initialForm).forEach((key) => {
      const err = validate(key, form[key]);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);
    setTouched(Object.keys(initialForm).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) {
      const firstErr = document.querySelector("[data-error='true']");
      firstErr?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStatus("loading");
    try {
      await submitToSpreadsheet(form);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Terjadi kesalahan. Coba lagi.");
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setErrorMsg("");
  };

  if (status === "success") {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-extrabold text-primary-900 mb-3">
          Pendaftaran Berhasil! 🎉
        </h2>
        <p className="text-gray-600 text-sm mb-2">
          Data <strong className="text-primary-800">{form.namaLengkap}</strong> telah kami terima.
        </p>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          Pengurus akan menghubungi Anda melalui WhatsApp/Email dalam 1–3 hari kerja.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/6281572658419"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold text-sm rounded-xl hover:bg-green-500 transition-colors"
          >
            Hubungi via WhatsApp
          </a>
          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold text-sm rounded-xl hover:bg-gray-50 transition-colors"
          >
            Daftar Santri Lain
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-5">
        <div className="flex items-center gap-3 pb-5 border-b border-gray-100">
          <div className="w-9 h-9 bg-primary-700 rounded-xl flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-primary-900 text-sm">Data Calon Santri</h3>
            <p className="text-xs text-gray-400">Isi semua kolom dengan benar</p>
          </div>
        </div>

        <div data-error={!!(touched.jenisKelamin && errors.jenisKelamin)}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Jenis Kelamin <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            {genders.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => {
                  setForm((prev) => ({ ...prev, jenisKelamin: g }));
                  setTouched((prev) => ({ ...prev, jenisKelamin: true }));
                  setErrors((prev) => ({ ...prev, jenisKelamin: "" }));
                }}
                className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${
                  form.jenisKelamin === g
                    ? g === "Putra"
                      ? "bg-primary-700 border-primary-700 text-white"
                      : "bg-gold-500 border-gold-500 text-primary-900"
                    : "border-gray-200 text-gray-500 hover:border-primary-300 hover:text-primary-700"
                }`}
              >
                {g === "Putra" ? "♂ Santri Putra" : "♀ Santri Putri"}
              </button>
            ))}
          </div>
          {touched.jenisKelamin && errors.jenisKelamin && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.jenisKelamin}
            </p>
          )}
        </div>

        {fields.map(({ name, label, icon: Icon, type, placeholder, maxLength }) => (
          <div key={name} data-error={!!(touched[name] && errors[name])}>
            <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
              {label} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none">
                <Icon className="w-4 h-4" />
              </div>
              {type === "textarea" ? (
                <textarea
                  id={name}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={placeholder}
                  rows={3}
                  className={`${inputBase} ${touched[name] && errors[name] ? inputError : inputNormal} resize-none`}
                />
              ) : (
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={placeholder}
                  maxLength={maxLength}
                  className={`${inputBase} ${touched[name] && errors[name] ? inputError : inputNormal}`}
                />
              )}
              {touched[name] && !errors[name] && form[name] && (
                <div className="absolute right-3 top-3.5 text-green-500 pointer-events-none">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
            </div>
            {touched[name] && errors[name] && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors[name]}
              </p>
            )}
          </div>
        ))}

        <div data-error={!!(touched.program && errors.program)}>
          <label htmlFor="program" className="block text-sm font-semibold text-gray-700 mb-2">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-gray-400" />
              Program Pendidikan <span className="text-red-500">*</span>
            </span>
          </label>
          <div className="relative">
            <select
              id="program"
              name="program"
              value={form.program}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 appearance-none bg-white pr-10 ${
                touched.program && errors.program ? inputError : inputNormal
              }`}
            >
              <option value="">Pilih program pendidikan</option>
              {programs.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <div className="absolute right-3.5 top-3.5 text-gray-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {touched.program && errors.program && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.program}
            </p>
          )}
        </div>
      </div>

      {status === "error" && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Pendaftaran gagal dikirim</p>
            <p className="text-red-500 mt-0.5 text-xs">{errorMsg}</p>
            <p className="mt-1 text-xs text-red-400">
              Silakan coba lagi, atau hubungi pengurus langsung via WhatsApp.
            </p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-3 py-4 bg-primary-700 text-white font-bold text-sm rounded-2xl hover:bg-primary-600 active:scale-[0.99] transition-all duration-200 shadow-lg shadow-primary-900/20 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Mengirim Data...
          </>
        ) : (
          <>
            Kirim Pendaftaran
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-gray-400">
        Dengan mendaftar, Anda menyetujui data ini digunakan untuk keperluan administrasi pesantren.
      </p>
    </form>
  );
}