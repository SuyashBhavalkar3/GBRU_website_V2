export default function MaintenanceRow({ date, service, status, statusType }) {
  const isPassed = statusType === "passed" || status === "PASSED";

  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors">
      <td className="py-3 px-4 text-xs text-slate-500 font-medium">{date}</td>
      <td className="py-3 px-4 text-xs font-extrabold text-slate-900">{service}</td>
      <td className="py-3 px-4 text-right">
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
            isPassed
              ? "bg-[#00a859] text-white"
              : "bg-slate-200 text-slate-700"
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}
