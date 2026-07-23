import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-10 mt-16" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand Logo & Copyright */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <Link href="/products">
              <div className="relative h-8 w-32">
                <Image
                  src="/all_products/logo.png"
                  alt="GBRU Logo"
                  fill
                  sizes="128px"
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-xs text-slate-500 font-medium">
              © {new Date().getFullYear()} GBRU. All rights reserved.
            </p>
          </div>

          {/* Footer Nav Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#legal" className="hover:text-[#00a859] transition-colors">
              Legal
            </a>
            <a href="#privacy" className="hover:text-[#00a859] transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-[#00a859] transition-colors">
              Terms of Service
            </a>
            <a href="#support" className="hover:text-[#00a859] transition-colors">
              Support
            </a>
            <a href="#contact" className="hover:text-[#00a859] transition-colors">
              Contact Us
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

