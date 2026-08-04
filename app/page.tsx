import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Categories from "@/components/Categories";
import FieldExperiences from "@/components/FieldExperiences";
import BestSellingTools from "@/components/BestSellingTools";
import AppDownload from "@/components/AppDownload";
import GbRUOnField from "@/components/GbRUOnField";
import WhyGBRU from "@/components/WhyGBRU";
import Testimonials from "@/components/Testimonials";
import Login from '@/components/Login';

export default function Home() {
  return (
    <div
      className="flex flex-col min-h-screen bg-[#0F291B] dark:bg-[#07140D]"
    >
      <Navbar />
      <Hero />
      <Stats />
      <Categories />
      <FieldExperiences />
      <BestSellingTools />
      <AppDownload />
      <GbRUOnField />
      <WhyGBRU />
      <Testimonials />

      {/* Additional sections can be placed here as we build them */}
    </div>
  );
}
