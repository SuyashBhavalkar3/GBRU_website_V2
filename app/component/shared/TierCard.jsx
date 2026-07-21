export default function TierCard({
  name,
  icon: Icon,
  badgeBgClass = "bg-[#b85c14] text-white",
  tagText = "Refer 1-5 Farmers",
  criteria,
  reward,
}) {
  return (
    <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100/80 hover:shadow-lg transition-all duration-300 flex flex-col justify-between items-center text-center h-full">
      <div className="flex flex-col items-center">
        {/* Top Circular Icon Badge */}
        <div className={`w-12 h-12 rounded-full ${badgeBgClass} flex items-center justify-center mb-4 shadow-xs shrink-0`}>
          {Icon && <Icon className="w-6 h-6 text-white" />}
        </div>

        {/* Tier Name */}
        <h3 className="font-extrabold text-[#1c2e22] text-base sm:text-lg mb-2">
          {name}
        </h3>

        {/* Farmers Tag Pill */}
        <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full mb-3 inline-block">
          {tagText}
        </span>

        {/* Criteria / Description */}
        <p className="text-slate-500 text-xs leading-relaxed max-w-[200px] mb-4">
          {criteria}
        </p>
      </div>

      {/* Footer Reward Line */}
      <div className="w-full pt-3 border-t border-slate-100 text-center">
        <p className="text-[11px] text-slate-500 font-bold">
          {reward}
        </p>
      </div>
    </div>
  );
}
