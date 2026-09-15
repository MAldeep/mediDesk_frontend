import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
interface AppointmentControlProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
}
export default function AppointmentControlAndFilterBar({
  search,
  setSearch,
  sort,
  setSort,
}: AppointmentControlProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* Live Search */}
      <div className="relative flex-1 min-w-50">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search || ""}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by patient name or doctor..."
          className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      {/* Sort Select */}
      <select
        value={sort || "-date"}
        onChange={(e) => setSort(e.target.value)}
        className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 cursor-pointer"
      >
        <option value="-date">Newest First</option>
        <option value="date">Oldest First</option>
        <option value="status">Status</option>
      </select>
    </div>
  );
}
