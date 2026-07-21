import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
};

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  let variantStyles = "";

  switch (variant) {
    case "primary":
      variantStyles = "bg-[#006B2C] text-white hover:bg-[#005a25]";
      break;
    case "secondary":
      variantStyles = "bg-[linear-gradient(90deg,#00A63E_0%,#008C34_100%)] text-white shadow-[0px_8px_20px_rgba(0,166,62,0.18)] hover:brightness-110";
      break;
    case "outline":
      variantStyles = "bg-white border border-[#D9E0D8] text-[#42493E] hover:bg-gray-50";
      break;
  }

  return (
    <button
      className={`rounded-xl px-6 py-3 font-medium transition-all ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
