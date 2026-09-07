"use client";
import { usePermission } from "@/app/hooks/usePermissions";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InviteUserBtn() {
  const router = useRouter();
  const { userRole } = usePermission();
  return (
    <button
      type="button"
      onClick={() => router.replace(`/dashboard/${userRole}/inviteUser`)}
      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 hover:bg-indigo-100 active:bg-indigo-200 rounded-xl transition-all shadow-2xs cursor-pointer"
    >
      <UserPlus className="w-4 h-4" />
      <span>Invite Doctor / Staff</span>
    </button>
  );
}
