import Link from "next/link";
import { PhoneCall, MessageSquare, MapPin } from "lucide-react";

export default function NeedHelpBanner({ variant = "grid" }) {
  if (variant === "banner") {
    return (
      <section className="my-14" id="support">
        <div className="bg-[#00a859] rounded-[24px] p-8 md:p-10 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left max-w-xl">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">Need Help?</h2>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              Our dedicated team is ready to assist you with installation, troubleshooting, or finding your local specialist.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="tel:18002474776"
              className="inline-flex items-center gap-2 bg-white text-slate-800 hover:bg-slate-100 px-5 py-2.5 rounded-full font-bold text-xs shadow-xs transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#00a859]" />
              Call Support
            </a>
            <a
              href="https://wa.me/18002474776"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#007a41] hover:bg-[#006837] text-white px-5 py-2.5 rounded-full font-bold text-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-200" />
              WhatsApp
            </a>
            <Link
              href="/find-dealer"
              className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white border border-white/60 px-5 py-2.5 rounded-full font-bold text-xs transition-colors"
            >
              <MapPin className="w-4 h-4 text-emerald-200" />
              Find Dealer
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Grid variant for Page 1
  return (
    <section className="my-16" id="support">
      <div className="bg-[#f2f6f2] rounded-[32px] p-8 md:p-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c3a27] text-center mb-10">
          Need Help?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white rounded-[24px] p-8 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-center flex flex-col items-center justify-center min-h-[200px]">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#00a859] flex items-center justify-center mb-4">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm mb-1">Call Support</h3>
            <p className="text-xs text-slate-500 mb-4">Speak to a machine expert</p>
            <a
              href="tel:18002474776"
              className="text-xs font-semibold text-slate-600 hover:text-[#00a859] transition-colors"
            >
              1-800-AGRI-PRO
            </a>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[24px] p-8 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-center flex flex-col items-center justify-center min-h-[200px]">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#00a859] flex items-center justify-center mb-4">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm mb-1">WhatsApp Support</h3>
            <p className="text-xs text-slate-500 mb-4">Quick chat for fast quotes</p>
            <a
              href="https://wa.me/18002474776"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-slate-600 hover:text-[#00a859] transition-colors"
            >
              Chat Now
            </a>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[24px] p-8 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-center flex flex-col items-center justify-center min-h-[200px]">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#00a859] flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm mb-1">Find Dealer</h3>
            <p className="text-xs text-slate-500 mb-4">Locate authorized local service</p>
            <Link
              href="/find-dealer"
              className="text-xs font-semibold text-slate-600 hover:text-[#00a859] transition-colors"
            >
              Search Map
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
