"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FiSearch, FiUser } from "react-icons/fi";

const SellerNav = () => {
  const [profilePhoto, setProfilePhoto] = useState<string>("/propic.jpg");

  // Simulating a fetch request from the database
  useEffect(() => {
    const fetchProfilePhoto = async () => {
      // Replace with actual API request
      const response = await fetch("/api/seller/profile"); 
      const data = await response.json();
      setProfilePhoto(data.profilePhoto);
    };

    fetchProfilePhoto();
  }, []);

  return (
    <nav className="bg-white shadow-md h-[60px] px-6 py-4 flex justify-between items-center">
      {/* Left Section: Logo & Navigation */}
      <div className="text-xl md:text-3xl font-bold text-white flex items-center gap-0">
            <span className="text-[#7b5af7]">Virtual</span><span className="text-black">City</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <a href="/shop" className="flex items-center space-x-1 hover:text-[#5A31F5]">
             <span>Dashboard</span>
          </a>
          <a href="/shop" className="flex items-center space-x-1 hover:text-[#5A31F5]">
             <span>Shop</span>
          </a>
          <a href="/orders" className="flex items-center space-x-1 hover:text-[#5A31F5]">
             <span>Customer</span>
          </a>
          <a href="/reports" className="flex items-center space-x-1 hover:text-[#5A31F5]">
             <span>Order</span>
          </a>
          
        </div>
      

      {/* Middle Section: Search Bar */}
      <div className="relative w-80 hidden md:block">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pr-10 pl-3 py-2  border border-black rounded-md focus:ring-[#5A31F5] focus:border-[#5A31F5]"
          id="searchInput"
        />
        {/* Search Icon Button */}
  <button 
    onClick={() => {
      const searchValue = (document.getElementById("searchInput") as HTMLInputElement).value;
      console.log("Searching for:", searchValue);
      // You can replace this console.log with an actual search function
    }} 
    className="absolute right-3 top-3 text-black-400 cursor-pointer"
  >
    <FiSearch size={18} />
  </button>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <a href="/reports" className="flex items-center space-x-1 hover:text-[#5A31F5]">
             <span>Reports</span>
          </a>
          <a href="/coupuns" className="flex items-center space-x-1 hover:text-[#5A31F5]">
             <span>Coupuns</span>
          </a>
          <a href="/delivery" className="flex items-center space-x-1 hover:text-[#5A31F5]">
             <span>Delivery</span>
          </a>
          <a href="/help" className="flex items-center space-x-1 hover:text-[#5A31F5]">
             <span>Help & Support</span>
          </a>
          
        </div>

      {/* Right Section: Profile */}
      <div className="flex items-center space-x-4">
        {profilePhoto ? (
          <Image
            src={profilePhoto}
            alt="Seller Profile"
            width={40}
            height={40}
            className="rounded-full border-2 border-gray-300"
          />
        ) : (
          <FiUser size={30} className="text-gray-600" />
        )}
      </div>
    </nav>
    
  );
};

export default SellerNav;
