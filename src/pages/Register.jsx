// import RegistrationForm from "../sections/RegistrationForm";

// export default function Register() {
//   return (
//     <div className="min-h-screen bg-gray-50 pt-20">
     
//     </div>
//   );
// }
import RegistrationForm from "../sections/RegistrationForm";

export default function Register() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
            Formulir Pendaftaran
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-800">
            Daftar Sebagai Santri
          </h1>
          <p className="text-gray-600 mt-3">
            Ma'had Asy-Syakiroh Buntet Pesantren Cirebon
          </p>
        </div>
        <RegistrationForm />
      </div>
    </div>
  );
}