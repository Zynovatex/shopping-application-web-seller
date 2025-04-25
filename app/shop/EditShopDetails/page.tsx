"use client";

import SellerNav from "@/app/component/layout/SellerNav";
import EditShopDetails from "@/app/shop/EditShopDetails/EditDetails";
import Footer from "@/app/component/layout/FullFooter";

const Page = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Seller Navigation Bar */}
      <SellerNav />

      {/* Edit Shop Details Section */}
      <div className="container mx-auto p-6">
        <EditShopDetails />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;