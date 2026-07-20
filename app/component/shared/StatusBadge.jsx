import { BadgeCheck } from "lucide-react";

export default function StatusBadge({ status, textOverride }) {
  const normalizedStatus = (status || "").toLowerCase();

  if (normalizedStatus === "active") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#e8f7eb] text-[#00a859] border border-emerald-200">
        {textOverride || "ACTIVE"}
      </span>
    );
  }

  if (normalizedStatus === "expiring" || normalizedStatus === "expiring soon") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
        {textOverride || "EXPIRING SOON"}
      </span>
    );
  }

  if (normalizedStatus === "expired") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200">
        {textOverride || "EXPIRED"}
      </span>
    );
  }

  if (normalizedStatus === "verified") {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#e8f7eb] text-[#00a859] border border-emerald-200">
        <BadgeCheck className="w-3.5 h-3.5" />
        <span>{textOverride || "Verified Customer"}</span>
      </span>
    );
  }

  // Pending / default
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
      {textOverride || "PENDING"}
    </span>
  );
}
