"use client";

import Link from "next/link";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { Activity, LayoutDashboard } from "lucide-react";

export default function NavBar() {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <nav className="max-w-7xl mx-auto px-5 lg:px-12 h-16 flex justify-between items-center">
        {/* 1️⃣ Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition duration-200">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Medi<span className="text-blue-600">Desk</span>
          </span>
        </Link>

        {/* 2️⃣ Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            href="/about"
            className="text-slate-600 hover:text-blue-600 transition-colors"
          >
            About
          </Link>
          <Link
            href="/testimonials"
            className="text-slate-600 hover:text-blue-600 transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="/subscriptions"
            className="text-slate-600 hover:text-blue-600 transition-colors"
          >
            Subscriptions
          </Link>
        </div>

        {/* 3️⃣ Auth Action Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href="/appointments"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm shadow-blue-500/20 transition duration-200"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200/70 rounded-xl transition duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm shadow-blue-500/20 transition duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
