import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function SettingsListItem({
  icon: Icon,
  label,
  value,
  href,
  isLogout = false,
  onClick,
}) {
  const content = (
    <div
      onClick={onClick}
      className={`flex items-center justify-between py-4 px-6 hover:bg-slate-50 transition-colors cursor-pointer ${
        isLogout ? "text-rose-600 font-bold" : "text-slate-800 font-semibold"
      }`}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isLogout ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-700"
          }`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
        <span className="text-sm">{label}</span>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-400">
        {value && <span className="text-slate-500 font-medium">{value}</span>}
        {!isLogout && <ChevronRight className="w-4 h-4 text-slate-400" />}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
