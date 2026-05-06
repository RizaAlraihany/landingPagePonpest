import { useState, useRef } from "react";
import {
  submitToSpreadsheet,
  validateOptionalUploadFile,
} from "../services/spreadsheet";
import {
  User,
  Hash,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Users,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight,
  Upload,
  X,
  FileImage,
} from "lucide-react";

const programs = [
  "MTs NU Putra 1",
  "MTs NU Putra 2",
  "MTs NU Putri 3",
  "MA NU Putra",
  "MA NU Putri",
  "SMKPK Mekanika",
  "MAN 3 Cirebon",
  "Akademi Keperawatan (AKPER) Buntet Pesantren",
  "Institut Agama Islam Buntet Pesantren",
];

const genders = ["Putra", "Putri"];

const initialForm = {
  namaLengkap: "",
  nisn: "",
  tempatTanggalLahir: "",
  jenisKelamin: "",
  masukPendidikan: "",
  alamat: "",
  namaAyah: "",
  namaIbu: "",
  noTelepon: "",
  email: "",
  fotoKK: null,
  fotoIjazah: null,
};

const validators = {
  namaLengkap: (v) =>
    !v.trim()
      ? "Nama lengkap wajib diisi"
      : v.trim().length < 3
        ? "Nama minimal 3 karakter"
        : "",
  nisn: (v) =>
    !v.trim()
      ? "NISN wajib diisi"
      : !/^\d{10}$/.test(v.trim())
        ? "NISN harus 10 digit angka"
        : "",
  tempatTanggalLahir: (v) =>
    !v.trim() ? "Tempat, tanggal lahir wajib diisi" : "",
  jenisKelamin: (v) => (!v ? "Pilih jenis kelamin" : ""),
  masukPendidikan: (v) => (!v ? "Pilih program pendidikan" : ""),
  alamat: (v) =>
    !v.trim()
      ? "Alamat wajib diisi"
      : v.trim().length < 10
        ? "Alamat terlalu singkat"
        : "",
  namaAyah: (v) => (!v.trim() ? "Nama Ayah/Wali wajib diisi" : ""),
  namaIbu: (v) => (!v.trim() ? "Nama Ibu/Wali wajib diisi" : ""),
  noTelepon: (v) =>
    !v.trim()
      ? "Nomor telepon wajib diisi"
      : !/^(\+62|62|0)[0-9]{8,12}$/.test(v.trim())
        ? "Format tidak valid (contoh: 0812xxxxxxxx)"
        : "",
  // Email opsional — hanya validasi format kalau ada isian
  email: (v) =>
    v.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
      ? "Format email tidak valid"
      : "",
  fotoKK: (v) => validateOptionalUploadFile(v, "Foto KK"),
  fotoIjazah: (v) => validateOptionalUploadFile(v, "Foto Ijazah"),
};

const inputBase =
  "w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2";
const inputNormal =
  "border-gray-200 focus:ring-primary-200 focus:border-primary-400 bg-white";
const inputError = "border-red-300 focus:ring-red-100 bg-red-50/50";

function FileUploadField({
  label,
  name,
  value,
  onChange,
  onClear,
  error,
  touched,
  note,
  required = false,
}) {
  const ref = useRef();
  const hasError = touched && error;
  const selectedFileClass = hasError
    ? "bg-red-50/50 border-red-200 text-red-700"
    : "bg-green-50 border-green-200 text-green-700";

  return (
    <div data-error={!!hasError}>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}{" "}
        {required ? (
          <span className="text-red-500">*</span>
        ) : (
          <span className="text-gray-400 font-medium">(opsional)</span>
        )}
      </label>
      {note && (
        <p className="text-[11px] text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 mb-2 flex items-center gap-1.5">
          <AlertCircle className="w-3 h-3 flex-shrink-0" /> {note}
        </p>
      )}
      {value ? (
        <div
          className={`flex items-center gap-3 p-3 border rounded-xl ${selectedFileClass}`}
        >
          <FileImage
            className={`w-5 h-5 flex-shrink-0 ${hasError ? "text-red-500" : "text-green-600"}`}
          />
          <span className="text-sm flex-1 truncate">{value.name}</span>
          <button
            type="button"
            onClick={() => {
              if (ref.current) ref.current.value = "";
              onClear();
            }}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className={`w-full flex flex-col items-center gap-2 py-5 rounded-xl border-2 border-dashed text-sm transition-all duration-200 hover:border-primary-400 hover:bg-primary-50/50 ${hasError ? "border-red-300 bg-red-50/50" : "border-gray-200 bg-gray-50/50"}`}
        >
          <Upload className="w-5 h-5 text-gray-400" />
          <span className="text-gray-500">Klik untuk unggah file</span>
          <span className="text-xs text-gray-400">
            JPG, PNG, PDF (maks. 5MB)
          </span>
        </button>
      )}
      <input
        ref={ref}
        type="file"
        name={name}
        accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
        className="hidden"
        onChange={(e) => {
          onChange(e.target.files?.[0] || null);
          e.target.value = "";
        }}
      />
      {hasError && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

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
    if (status === "error") {
      setStatus("idle");
      setErrorMsg("");
    }
    if (touched[name])
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleFileChange = (name, file) => {
    setForm((prev) => ({ ...prev, [name]: file }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, file) }));
    if (status === "error") {
      setStatus("idle");
      setErrorMsg("");
    }
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(initialForm).forEach((key) => {
      const err = validate(key, form[key]);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);
    setTouched(
      Object.keys(initialForm).reduce((acc, k) => ({ ...acc, [k]: true }), {}),
    );
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;

    if (!validateAll()) {
      document
        .querySelector("[data-error='true']")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      await submitToSpreadsheet(form);
      setStatus("success");
    } catch (err) {
      console.error("Registration submit error:", err);
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
          Data <strong className="text-primary-800">{form.namaLengkap}</strong>{" "}
          telah kami terima.
        </p>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          Pengurus akan menghubungi Anda melalui WhatsApp dalam 1–3 hari kerja.
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

  // Helper render field — perhatikan parameter "required" baru
  const field = (
    name,
    label,
    Icon,
    type,
    placeholder,
    extra = {},
    required = true,
  ) => (
    <div key={name} data-error={!!(touched[name] && errors[name])}>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {label}{" "}
        {required ? (
          <span className="text-red-500">*</span>
        ) : (
          <span className="text-gray-400 font-normal">(opsional)</span>
        )}
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
            {...extra}
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
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-gray-100">
          <div className="w-9 h-9 bg-primary-700 rounded-xl flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-primary-900 text-sm">
              Data Calon Santri
            </h3>
            <p className="text-xs text-gray-400">
              Isi semua kolom wajib dengan benar dan lengkap
            </p>
          </div>
        </div>

        {/* Nama Lengkap */}
        {field(
          "namaLengkap",
          "Nama Lengkap",
          User,
          "text",
          "Nama sesuai akta kelahiran",
        )}

        {/* NISN */}
        {field(
          "nisn",
          "NISN (Nomor Induk Siswa Nasional)",
          Hash,
          "text",
          "10 digit angka",
          { maxLength: 10 },
        )}

        {/* Tempat, Tanggal Lahir */}
        {field(
          "tempatTanggalLahir",
          "Tempat, Tanggal Lahir",
          Calendar,
          "text",
          "Contoh: Cirebon, 01 Januari 2010",
        )}

        {/* Jenis Kelamin */}
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

        {/* File: Foto KK */}
        <FileUploadField
          label="Foto Kartu Keluarga (KK)"
          name="fotoKK"
          value={form.fotoKK}
          onChange={(file) => handleFileChange("fotoKK", file)}
          onClear={() => handleFileChange("fotoKK", null)}
          error={errors.fotoKK}
          touched={touched.fotoKK}
          note="Wajib dibawa ketika daftar offline"
        />

        {/* File: Foto Ijazah */}
        <FileUploadField
          label="Foto Ijazah Terakhir"
          name="fotoIjazah"
          value={form.fotoIjazah}
          onChange={(file) => handleFileChange("fotoIjazah", file)}
          onClear={() => handleFileChange("fotoIjazah", null)}
          error={errors.fotoIjazah}
          touched={touched.fotoIjazah}
          note="Wajib dibawa ketika daftar offline"
        />

        {/* Program Pendidikan */}
        <div data-error={!!(touched.masukPendidikan && errors.masukPendidikan)}>
          <label
            htmlFor="masukPendidikan"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-gray-400" />
              Masuk Pendidikan <span className="text-red-500">*</span>
            </span>
          </label>
          <div className="relative">
            <select
              id="masukPendidikan"
              name="masukPendidikan"
              value={form.masukPendidikan}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 appearance-none bg-white pr-10 ${
                touched.masukPendidikan && errors.masukPendidikan
                  ? inputError
                  : inputNormal
              }`}
            >
              <option value="">Pilih program pendidikan</option>
              {programs.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-3.5 text-gray-400 pointer-events-none">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {touched.masukPendidikan && errors.masukPendidikan && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.masukPendidikan}
            </p>
          )}
        </div>

        {/* Alamat */}
        {field(
          "alamat",
          "Alamat",
          MapPin,
          "textarea",
          "Jalan, RT/RW, Desa/Kel, Kec, Kab/Kota",
        )}

        {/* Nama Ayah */}
        {field(
          "namaAyah",
          "Nama Ayah / Wali",
          Users,
          "text",
          "Nama lengkap ayah atau wali",
        )}

        {/* Nama Ibu */}
        {field(
          "namaIbu",
          "Nama Ibu / Wali",
          Users,
          "text",
          "Nama lengkap ibu atau wali",
        )}

        {/* No Telepon */}
        {field(
          "noTelepon",
          "Nomor Telepon",
          Phone,
          "tel",
          "Contoh: 0812xxxxxxxx",
        )}

        {/* Email — opsional, argumen terakhir false */}
        {field(
          "email",
          "Email Address",
          Mail,
          "email",
          "Contoh: nama@email.com",
          {},
          false,
        )}
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
            <Loader2 className="w-5 h-5 animate-spin" /> Mengirim Data...
          </>
        ) : (
          <>
            Kirim Pendaftaran <ChevronRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-gray-400">
        Dengan mendaftar, Anda menyetujui data ini digunakan untuk keperluan
        administrasi pesantren.
      </p>
    </form>
  );
}
