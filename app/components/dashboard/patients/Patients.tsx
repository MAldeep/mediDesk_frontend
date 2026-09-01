"use client";
import { useAuthStore } from "@/app/stores/useAuthStore";
import Link from "next/link";

export default function Patients() {
  const user = useAuthStore((state) => state.user);
  const userRole = user?.role;
  return (
    <div className="w-full flex-1 bg-slate-300 rounded-2xl flex flex-col justify-start items-center p-2 gap-2">
      <h1 className="text-4xl ">Patients</h1>
      <div className="flex-1 bg-red-200 w-full">
        <Link href={`/dashboard/${userRole}/addNewPatient`}>
          Add New Patient
        </Link>
      </div>
    </div>
  );
}
