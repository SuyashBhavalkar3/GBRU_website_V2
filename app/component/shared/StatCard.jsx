export default function StatCard({ number, label, icon: Icon, iconBgClass }) {
  return (
    <div className="bg-white rounded-[24px] p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center">
      {Icon && (
        <div className={`w-10 h-10 rounded-full ${iconBgClass || "bg-emerald-50 text-[#00a859]"} flex items-center justify-center mb-2`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div className="text-2xl sm:text-3xl font-extrabold text-[#1c3a27]">
        {number}
      </div>
      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
        {label}
      </div>
    </div>
  );
}
