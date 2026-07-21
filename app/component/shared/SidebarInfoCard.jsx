export default function SidebarInfoCard({
  variant = "white",
  title,
  children,
  className = "",
}) {
  if (variant === "green") {
    return (
      <div className={`bg-[#00a859] text-white rounded-[24px] p-6 sm:p-7 shadow-md ${className}`}>
        {title && <h3 className="font-extrabold text-xl mb-4 text-white">{title}</h3>}
        {children}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-[24px] p-6 sm:p-7 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] ${className}`}>
      {title && <h3 className="font-extrabold text-slate-900 text-lg mb-4">{title}</h3>}
      {children}
    </div>
  );
}
