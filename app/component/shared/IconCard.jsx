import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";

export default function IconCard({
  icon: Icon,
  title,
  description,
  linkText,
  href = "#",
  iconBgClass = "bg-emerald-50 text-[#00a859]",
}) {
  return (
    <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Icon Badge */}
        <div className={`w-12 h-12 rounded-full ${iconBgClass} flex items-center justify-center mb-5`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>

        {/* Title & Description */}
        <h3 className="font-extrabold text-[#1c2e22] text-lg sm:text-xl mb-2">
          {title}
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Action Link */}
      <div>
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-[#00a859] font-bold text-xs sm:text-sm hover:underline group"
        >
          <span>{linkText}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
