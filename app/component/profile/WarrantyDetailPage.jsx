"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/component/all_products/Navbar";
import Footer from "@/app/component/all_products/Footer";
import WarrantyTimeline from "@/app/component/shared/WarrantyTimeline";
import MaintenanceRow from "@/app/component/shared/MaintenanceRow";
import { warrantiesData } from "@/data/warranties";
import {
  Download,
  Headset,
  CheckCircle2,
  ChevronRight,
  FileText,
  Shield,
  Layers,
  Radio,
} from "lucide-react";

export default function WarrantyDetailPage({ productId }) {
  // Find product by ID or default to first product
  const product =
    warrantiesData.find((p) => p.id === productId) || warrantiesData[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] text-slate-800 antialiased font-sans">
      {/* Shared Navbar */}
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Breadcrumb */}
        <div className="text-xs font-semibold text-slate-500 mb-6 flex items-center gap-1.5">
          <Link href="/profile/warranty" className="hover:text-[#00a859]">
            My Warranty
          </Link>
          <span>&gt;</span>
          <span className="text-slate-800 font-bold">{product.name}</span>
        </div>

        {/* Top Header Card Group matching attached screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Left Summary Box + Middle Image Box (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-[28px] border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col sm:flex-row">
            {/* Left Summary Box */}
            <div className="p-6 sm:p-8 flex-1 space-y-4">
              {/* Active Status Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00a859] text-white text-xs font-extrabold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>ACTIVE</span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3a27] mb-1">
                  {product.name}
                </h1>
                <p className="text-xs text-slate-400 font-medium">
                  Model ID: {product.fullModelId}
                </p>
              </div>

              {/* Expiry Box */}
              <div className="flex items-start gap-2 pt-1">
                <div className="w-5 h-5 rounded-full bg-[#e8f7eb] text-[#00a859] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[#00a859] font-extrabold text-xs block">
                    Expires in {product.daysRemaining} days
                  </span>
                  <span className="text-slate-400 text-xs font-medium block">
                    Until {product.expiryFullDate}
                  </span>
                </div>
              </div>

              {/* Registration Date Block */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-slate-400 text-[10px] font-bold uppercase block mb-0.5">
                  Registration Date
                </span>
                <span className="font-extrabold text-slate-800 text-xs">
                  {product.registrationDate}
                </span>
              </div>
            </div>

            {/* Middle Image Box with real registration.jpg image */}
            <div className="w-full sm:w-72 h-56 sm:h-auto bg-[#e9eae8] relative flex items-center justify-center p-4 shrink-0">
              <Image
                src="/all_products/registration.jpg"
                alt="GBRU Warranty Registration"
                fill
                priority
                sizes="288px"
                className="object-contain p-2"
              />
            </div>
          </div>

          {/* Right Quick Actions Card (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-[28px] border border-slate-200/80 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-6">
            <div>
              <h3 className="font-extrabold text-[#1c3a27] text-lg mb-6">
                Quick Actions
              </h3>

              <button
                onClick={() => alert(`Downloading Warranty Certificate for ${product.name}...`)}
                className="w-full border-2 border-[#00a859] text-[#00a859] hover:bg-[#e8f7eb] py-3 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer bg-white"
              >
                <Download className="w-4 h-4" />
                <span>Download Certificate</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 text-center space-y-1">
              <p className="text-xs text-slate-400 font-medium">Need technical help?</p>
              <Link
                href="/support"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00a859] hover:underline"
              >
                <Headset className="w-3.5 h-3.5" />
                <span>Contact Expert Support</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Warranty Timeline Component */}
        <WarrantyTimeline
          registrationDate={product.registrationDate}
          todayDate="Oct 24, 2024"
          expiryDate={product.expiryFullDate}
        />

        {/* Two-Column Section: Coverage Details vs Documents & Maintenance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
          {/* Left Column: Coverage Details (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-xl font-extrabold text-[#1c3a27] mb-4">
              Coverage Details
            </h2>

            {/* Item 1 */}
            <div className="bg-white rounded-[20px] p-5 border-l-4 border-l-[#00a859] border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#00a859] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">
                  Frame &amp; Structure
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Full structural integrity coverage for main chassis and load-bearing components.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="bg-white rounded-[20px] p-5 border-l-4 border-l-[#00a859] border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#00a859] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">
                  Hydraulic Systems
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Covers pumps, valves, and cylinders against manufacturing defects and leakage.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="bg-white rounded-[20px] p-5 border-l-4 border-l-[#00a859] border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#00a859] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">
                  Electronic Sensors
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Advanced IoT sensors and telemetry modules included in full diagnostic coverage.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Documents & Maintenance History (6 Cols) */}
          <div className="lg:col-span-6 space-y-8">
            {/* Documents Sub-section */}
            <div>
              <h2 className="text-xl font-extrabold text-[#1c3a27] mb-4">
                Documents
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* PDF Doc */}
                <div className="bg-white rounded-[20px] p-4 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs">Warranty-Cert.pdf</span>
                  </div>
                  <button
                    onClick={() => alert("Downloading Warranty-Cert.pdf...")}
                    className="w-7 h-7 rounded-full bg-slate-100 hover:bg-[#e8f7eb] text-slate-600 hover:text-[#00a859] flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Download Warranty-Cert.pdf"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Product Manual */}
                <div className="bg-white rounded-[20px] p-4 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#e8f7eb] text-[#00a859] flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs">Product Manual</span>
                  </div>
                  <button
                    onClick={() => alert("Downloading Product Manual...")}
                    className="w-7 h-7 rounded-full bg-slate-100 hover:bg-[#e8f7eb] text-slate-600 hover:text-[#00a859] flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Download Product Manual"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Maintenance History Sub-section */}
            <div>
              <h2 className="text-xl font-extrabold text-[#1c3a27] mb-4">
                Maintenance History
              </h2>

              <div className="bg-white rounded-[24px] border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.maintenanceHistory.map((row) => (
                      <MaintenanceRow
                        key={row.id}
                        date={row.date}
                        service={row.service}
                        status={row.status}
                        statusType={row.statusType}
                      />
                    ))}
                  </tbody>
                </table>

                <div className="p-4 border-t border-slate-100 text-center">
                  <button
                    onClick={() => alert("Loading full service logs...")}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#00a859] hover:underline cursor-pointer"
                  >
                    <span>View Full Service Logs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

