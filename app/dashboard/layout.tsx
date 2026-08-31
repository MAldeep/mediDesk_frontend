// import AuthGuard from "@/app/components/guards/AuthGuard";
import Footer from "@/app/components/Home/Footer";
import NavBar from "@/app/components/Home/NavBar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      {/* <AuthGuard> */}
      <NavBar />
      {children}
      <Footer />
      {/* </AuthGuard> */}
    </div>
  );
}
