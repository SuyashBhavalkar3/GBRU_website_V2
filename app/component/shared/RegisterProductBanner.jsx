import { Plus } from "lucide-react";

export default function RegisterProductBanner() {
  return (
    <div className="bg-[#008a46] rounded-[28px] p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 my-10">
      <div className="space-y-2 text-center md:text-left">
        <h3 className="text-xl sm:text-2xl font-extrabold text-white">
          Bought another GBRU product?
        </h3>
        <p className="text-emerald-100 text-xs sm:text-sm max-w-xl leading-relaxed">
          Register your equipment today to unlock extended warranty options, access manual downloads, and receive personalized maintenance alerts.
        </p>
      </div>

      <button
        onClick={() => alert("Registration form modal opened. Please enter your new serial number.")}
        className="bg-white hover:bg-slate-100 text-[#008a46] px-6 py-3 rounded-xl font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>Register New Product</span>
      </button>
    </div>
  );
}

