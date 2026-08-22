import NavBar from "@/app/components/Home/NavBar";
import LoginForm from "../Auth_Components/LoginForm";

export default function Login() {
  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col justify-between">
      <NavBar />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Login Now
            </h1>
            <p className="text-sm text-slate-600">Welcome To MediDesk</p>
          </div>
          <LoginForm />
        </div>
      </main>
      <footer className="py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} MediDesk. All rights reserved.
      </footer>
    </div>
  );
}
