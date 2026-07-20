import { FileText, Download } from "lucide-react";

export default function DocumentItem({ name, type }) {
  const isPdf = type === "pdf" || name.endsWith(".pdf");

  return (
    <div className="bg-white rounded-[20px] p-4 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center justify-between gap-3 hover:border-emerald-300 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
          isPdf ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-[#00a859]"
        }`}>
          <FileText className="w-5 h-5" />
        </div>
        <span className="font-bold text-slate-800 text-xs sm:text-sm">{name}</span>
      </div>

      <button
        onClick={() => alert(`Downloading ${name}...`)}
        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#e8f7eb] text-slate-600 hover:text-[#00a859] flex items-center justify-center transition-colors cursor-pointer"
        aria-label={`Download ${name}`}
      >
        <Download className="w-4 h-4" />
      </button>
    </div>
  );
}
