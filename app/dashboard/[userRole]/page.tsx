export default function UserDashboard() {
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row">
      <main className="flex-1 bg-amber-950 flex flex-col gap-6 p-2">
        {/* Appointments */}
        <div className="w-full flex-1 bg-amber-400 rounded-2xl">
          Appointments
        </div>
        {/* Patients */}
        <div className="w-full flex-1 bg-amber-400 rounded-2xl">Patients</div>
      </main>
    </div>
  );
}
