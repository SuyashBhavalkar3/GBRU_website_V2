export default function CoverageItem({ badge, category, description }) {
  return (
    <div className="bg-white rounded-[20px] p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-start gap-4 mb-3 hover:border-emerald-300 transition-colors">
      <div className="w-10 h-10 rounded-2xl bg-[#00a859] text-white font-extrabold text-base flex items-center justify-center shrink-0 shadow-2xs">
        {badge}
      </div>
      <div>
        <h4 className="font-extrabold text-slate-900 text-sm mb-1">{category}</h4>
        <p className="text-slate-500 text-xs leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
