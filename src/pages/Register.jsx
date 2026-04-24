import RegistrationForm from "../sections/RegistrationForm";

export default function Register() {
  return (
    <div className="pt-24 pb-20 bg-slate-50/50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 text-sm font-semibold rounded-full mb-4 ring-1 ring-inset ring-primary-500/10">
            Formulir Pendaftaran
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-800 tracking-tight">
            Daftar Sebagai Santri
          </h1>
          <p className="text-gray-500 mt-3 text-sm">
            Ma'had Asy-Syakiroh Buntet Pesantren Cirebon
          </p>
        </div>
        <RegistrationForm />
      </div>
    </div>
  );
}
