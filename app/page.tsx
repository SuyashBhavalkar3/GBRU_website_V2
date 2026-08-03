import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Categories from "@/components/Categories";

export default function Home() {
  return (
    <div 
      className="flex flex-col min-h-screen bg-[#0F291B] dark:bg-[#07140D]"
      style={{ zoom: "1.1" }}
    >
      <Navbar />
      <Hero />
      <Stats />
      <Categories />
      
      {/* Additional sections can be placed here as we build them */}
    </div>
  );
}
