"use client";

import SellerNav from "@/app/component/layout/SellerNav";
import Footer from "@/app/component/layout/FullFooter";

export default function ReportsPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <SellerNav />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[#5A31F5]">Reports</h1>
        <p className="mt-4 text-gray-700">This is where seller reports will appear.</p>
      </main>
      <Footer />
    </div>
  );
}
