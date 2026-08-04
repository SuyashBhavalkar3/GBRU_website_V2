import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Assuming you have a footer

export const metadata = {
  title: 'Dashboard - GBRU',
  description: 'Your Farmer Dashboard',
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-4">Farmer Dashboard</h1>
          <p className="text-[#666666] text-lg">
            Welcome back! From here you can manage your machinery, view your orders, and access irrigation tools.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] p-6 rounded-lg border border-[#A5D6A7]">
              <h3 className="text-xl font-semibold text-[#2E7D32]">My Orders</h3>
              <p className="mt-2 text-[#4CAF50]">View and track your recent purchases.</p>
            </div>
            <div className="bg-gradient-to-br from-[#FFF3E0] to-[#FFE0B2] p-6 rounded-lg border border-[#FFCC80]">
              <h3 className="text-xl font-semibold text-[#EF6C00]">Machinery Status</h3>
              <p className="mt-2 text-[#FF9800]">Check the status of your farming equipment.</p>
            </div>
            <div className="bg-gradient-to-br from-[#E3F2FD] to-[#BBDEFB] p-6 rounded-lg border border-[#90CAF9]">
              <h3 className="text-xl font-semibold text-[#1565C0]">Irrigation Tools</h3>
              <p className="mt-2 text-[#2196F3]">Manage your smart irrigation systems.</p>
            </div>
          </div>
        </div>
      </main>
      {/* If you have a Footer component, you can uncomment it */}
      {/* <Footer /> */}
    </div>
  );
}
