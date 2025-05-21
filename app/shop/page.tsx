"use client";

import React, { useState, useEffect } from "react";
import SellerNav from "@/app/component/layout/SellerNav";
import SellerRating from "@/app/shop/shop-page/Sellerrating";
import SellerBanner from "@/app/shop/shop-page/sellerBanner";
import ProductHeader from "@/app/shop/shop-page/ProductHeader";
import ProductList from "@/app/shop/shop-page/ProductList";
import Footer from "@/app/component/layout/FullFooter";

const Page = () => {

const [shopDetails, setShopDetails] = useState<any>(null); // This will hold the shop details

  // Fetch shop details from the backend
  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const response = await fetch("/api/shops/details", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setShopDetails(data); // Set the data to state
        } else {
          console.error("Failed to fetch shop details");
        }
      } catch (error) {
        console.error("Error fetching shop details", error);
      }
    };

    fetchShopDetails();
  }, []);

  if (!shopDetails) {
    return <div>Loading...</div>; // Show loading text until the shop data is fetched
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Seller Navigation Bar */}
      <SellerNav />

      {/* Shop Information Section */}
      <div className="container mx-auto p-6">
        <SellerRating
        shop={{
          name: shopDetails.shopName,
            logo: shopDetails.shopImages ? shopDetails.shopImages[0] : "/default-logo.jpg", // Handle missing logo
            description: shopDetails.description,
            rating: shopDetails.rating || 0, // Default to 0 if no rating
            reviews: shopDetails.reviews || 0,
            ratingBreakdown: shopDetails.ratingBreakdown || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }, // Default rating breakdown
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
