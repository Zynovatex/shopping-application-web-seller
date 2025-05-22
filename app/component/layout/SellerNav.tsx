
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FiSearch, FiUser, FiMenu, FiX } from "react-icons/fi";

const SellerNav = () => {
  const [profilePhoto, setProfilePhoto] = useState<string>("/propic.jpg");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      const response = await fetch("/api/seller/profile");
      const data = await response.json();
      setProfilePhoto(data.profilePhoto);
    };

    fetchProfilePhoto();
  }, []);

  const menuLinks = [
    
    { label: "Shop", path: "/shop" },
    { label: "Customer", path: "/customers" },
    { label: "Order", path: "/orders" },
    { label: "Reports", path: "/reports" },
    { label: "Coupuns", path: "/coupuns" },
    { label: "Delivery", path: "/delivery" },
    { label: "Help & Support", path: "/help" },
  ];

  return (
    <nav className="bg-white shadow-md px-4 md:px-6 py-4 flex justify-between items-center relative z-50">
      {/* Logo */}
      <div className="text-xl md:text-3xl font-bold flex items-center gap-0">
        <span className="text-[#7b5af7]">Virtual</span><span className="text-black">City</span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-16 text-gray-700 font-semibold">
        {menuLinks.map(link => (
          <a key={link.label} href={link.path} className={`hover:text-[#5A31F5] ${
            pathname.startsWith(link.path) ? "text-[#5A31F5]" : ""
          }`}>
            {link.label}
          </a>
        ))}
      </div>

      {/* Profile & Hamburger */}
      <div className="flex items-center space-x-4">
        {/* Profile Picture */}
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden focus:outline-none"
        >
          {mobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-white border-t shadow-md flex flex-col space-y-3 px-6 py-4 md:hidden">
          {menuLinks.map(link => (
            <a
              key={link.label}
              href={link.path}
              className={`text-gray-700 hover:text-[#5A31F5] ${
                pathname.startsWith(link.path) ? "text-[#5A31F5]" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)} // close on click
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default SellerNav;
