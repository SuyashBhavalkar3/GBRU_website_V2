import Link from "next/link";
import Image from "next/image";
import { Plus, Heart } from "lucide-react";

export default function ProductCard({ item, type = "category" }) {
  if (!item) return null;

  if (type === "category") {
    const { slug, name, description, image } = item;
    const categoryHref = `/products/${slug}`;

    return (
      <div className="group bg-white rounded-[24px] border border-slate-200/80 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between h-full">
        <div>
          {/* Top Image Container */}
          <div className="relative w-full h-44 sm:h-48 bg-slate-100 overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Card Body */}
          <div className="p-6">
            <h3 className="font-extrabold text-[#1c2e22] text-xl sm:text-2xl mb-2.5 group-hover:text-[#00a859] transition-colors">
              {name}
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Card Footer Button */}
        <div className="px-6 pb-6 pt-0">
          <Link
            href={categoryHref}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full border border-slate-200 text-slate-700 font-semibold text-xs hover:border-[#00a859] hover:text-[#00a859] hover:bg-emerald-50/50 transition-all duration-200"
          >
            <span>View Products</span>
            <Plus className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#00a859]" />
          </Link>
        </div>
      </div>
    );
  }

  // Product Card (Page 2 style matching Screenshot 1)
  const { id, category, name, shortDescription, badge, favorite, image } = item;
  const productHref = `/products/${category || "seeder"}/${id}`;

  return (
    <div className="group bg-white rounded-[24px] border border-slate-200/80 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Top Image Container */}
        <div className="relative w-full h-48 sm:h-52 bg-slate-100 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {badge === "TOP RATED" && (
            <div className="absolute top-3 left-3 bg-[#00a859] text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
              TOP RATED
            </div>
          )}
          {badge === "NEW EDITION" && (
            <div className="absolute top-3 left-3 bg-slate-900 text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
              NEW EDITION
            </div>
          )}
          {favorite && (
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs">
              <Heart className="w-4 h-4 text-[#00a859] fill-[#00a859]" />
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6">
          <h3 className="font-extrabold text-[#1c2e22] text-lg sm:text-xl mb-2 group-hover:text-[#00a859] transition-colors">
            {name}
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {shortDescription}
          </p>
        </div>
      </div>

      {/* Card Footer Button */}
      <div className="px-6 pb-6 pt-0">
        <Link
          href={productHref}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full border border-slate-200 text-slate-700 font-semibold text-xs hover:border-[#00a859] hover:text-[#00a859] hover:bg-emerald-50/50 transition-all duration-200"
        >
          <span>View Details</span>
          <Plus className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#00a859]" />
        </Link>
      </div>
    </div>
  );
}
