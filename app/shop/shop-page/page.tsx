"use client";

import SellerNav from "@/app/component/layout/SellerNav";
import SellerRating from "@/app/shop/shop-page/Sellerrating";
import SellerBanner from "@/app/shop/shop-page/sellerBanner";
import ProductHeader from "@/app/shop/shop-page/ProductHeader";
import ProductList from "@/app/shop/shop-page/ProductList";
import Footer from "@/app/component/layout/FullFooter";

const Page = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Seller Navigation Bar */}
      <SellerNav />

      {/* Shop Information Section */}
      <div className="container mx-auto p-6">
        <SellerRating
          shop={{
            name: "Nike",
            logo: "/loogo.jpg",
            description:
              "Welcome to Nike – Elevate Your Game with Premium Athletic Wear. At Nike, we believe in the power of sport to inspire and transform lives. Our shop offers a wide range of premium athletic footwear, apparel, and accessories designed to enhance performance and style. Whether you're a professional athlete, a fitness enthusiast, or just love trendy, comfortable sportswear, we have something for you.",
            rating: 4.5,
            reviews: 3257,
            ratingBreakdown: { 5: 70, 4: 50, 3: 30, 2: 10, 1: 5 },
          }}
        />

        {/* Banner Section */}
        <div className="mt-8">
          <SellerBanner />
        </div>

        {/* Product Section */}
        <div className="mt-6">
          <ProductHeader />
          <ProductList />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;
