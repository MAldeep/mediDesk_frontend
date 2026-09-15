"use client";

import { Calendar, FileText, ShieldCheck, UserCheck } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Appointment Management",
    description:
      "Seamless scheduling to prevent double-bookings, paired with automated patient reminders to minimize no-shows.",
    iconBg: "bg-blue-50 text-blue-600",
  },
  {
    icon: FileText,
    title: "E-Prescriptions & Records",
    description:
      "Generate digital prescriptions effortlessly and store complete patient medical histories for instant access anytime.",
    iconBg: "bg-teal-50 text-teal-600",
  },
  {
    icon: ShieldCheck,
    title: "High Security & Role-Based Access (RBAC)",
    description:
      "Enforce granular permissions for admins, doctors, and receptionists to guarantee complete patient data privacy.",
    iconBg: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: UserCheck,
    title: "Seamless Patient Experience",
    description:
      "Organize patient profiles effortlessly, streamline follow-ups, save valuable time, and significantly reduce wait times.",
    iconBg: "bg-sky-50 text-sky-600",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Why MediDesk?
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything you need to manage your smart clinic in one place
          </p>
          <p className="text-base text-slate-600">
            Engineered specifically to fulfill the needs of modern clinics and
            medical centers with complete security and efficiency.
          </p>
        </div>

        {/* Features Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group p-6 bg-slate-50 hover:bg-white rounded-2xl border border-slate-100 hover:border-slate-200/80 hover:shadow-xl hover:shadow-slate-200/50 transition duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center font-bold transition group-hover:scale-110 duration-200`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
