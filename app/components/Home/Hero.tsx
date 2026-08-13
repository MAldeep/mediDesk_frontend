// src/components/home/Hero.tsx
"use client";

import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Users,
  ShieldCheck,
  CheckCircle2,
  Activity,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-slate-50 via-blue-50/20 to-white py-16 lg:py-24">
      {/* Decorative Blur Spheres in Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-75 h-75 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* 1️⃣ Left Column: Copywriting & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs sm:text-sm font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>الجيل الجديد لـ إدارة العيادات والمراكز الطبية</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              إدارة عيادتك أسهل مع{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-teal-500">
                MediDesk
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              منظومة متكاملة لإدارة ملفات المرضى، تنظيم المواعيد، الروشتات
              الإلكترونية، والحسابات. مصممة لتوفير وقت الطبيب وتحسين تجربة
              المريض.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/register"
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition duration-200 flex items-center justify-center gap-2 group"
              >
                <span>ابدأ التجربة المجانية</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/about"
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <span>اعرف أكثر عن الميزات</span>
              </Link>
            </div>

            {/* Quick Benefits Checklist */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                <span>إعداد سريع في أقل من 5 دقائق</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                <span>حماية كاملة للبيانات RBAC</span>
              </div>
            </div>
          </div>

          {/* 2️⃣ Right Column: Live Interactive Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glassmorphism Outer Card */}
              <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-2xl shadow-slate-300/40 p-6 space-y-6">
                {/* Card Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        نظرة عامة اليوم
                      </h3>
                      <p className="text-xs text-slate-500">
                        عيادة د. علي مجدي
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60">
                    نشط الآن
                  </span>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>حجوزات اليوم</span>
                    </div>
                    <p className="text-xl font-bold text-slate-900">18 مريض</p>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                      <Users className="w-3.5 h-3.5 text-teal-600" />
                      <span>إجمالي المرضى</span>
                    </div>
                    <p className="text-xl font-bold text-slate-900">1,240</p>
                  </div>
                </div>

                {/* Live Appointment Preview Item */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    الموعد القادم
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                        أ
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          أحمد محمود
                        </p>
                        <p className="text-[11px] text-slate-500">
                          كشف أسنان - 10:30 ص
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-blue-600 bg-white px-2 py-1 rounded-md shadow-xs border border-blue-100">
                      مؤكد
                    </span>
                  </div>
                </div>

                {/* Security Badge Footnote */}
                <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400 border-t border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-slate-400" />
                  <span>تشفير طبي عالي الأمان للبيانات</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
