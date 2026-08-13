"use client";

import Link from "next/link";
import { Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-5 lg:px-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Medi<span className="text-blue-500">Desk</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              منظومة إدارة العيادات الطبية الحديثة. سهولة وتكامل في إدارة
              الحجوزات والملفات والروشتات.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
            <div className="space-y-3">
              <p className="font-semibold text-white">النظام</p>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="hover:text-blue-400 transition"
                  >
                    المميزات
                  </Link>
                </li>
                <li>
                  <Link
                    href="/subscriptions"
                    className="hover:text-blue-400 transition"
                  >
                    الاشتراكات
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-blue-400 transition"
                  >
                    عن المنظومة
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="font-semibold text-white">الدعم والخصوصية</p>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-blue-400 transition">
                    مركز المساعدة
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition">
                    سياسة الخصوصية
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition">
                    الشروط والأحكام
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3 col-span-2 sm:col-span-1">
              <p className="font-semibold text-white">تواصل معنا</p>
              <p className="text-xs text-slate-400">support@medidesk.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} MediDesk. جميع الحقوق محفوظة.</p>
          <p className="text-slate-400 font-medium">
            صُمم بأعلى معايير الأمان والتشفير الطبي.
          </p>
        </div>
      </div>
    </footer>
  );
}
