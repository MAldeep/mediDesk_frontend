import NavBar from "@/app/components/Home/NavBar";
import RegisterForm from "../Auth_Components/RegisterForm";

export default function Register() {
  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col justify-between">
      <NavBar />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md space-y-6">
          {/* Header Text */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Create an Account
            </h1>
            <p className="text-sm text-slate-600">
              Get started with MediDesk clinic management
            </p>
          </div>
          {/* Form Card */}
          <RegisterForm />
        </div>
      </main>

      {/* Footer minimal spacer */}
      <footer className="py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} MediDesk. All rights reserved.
      </footer>
    </div>
  );
}
