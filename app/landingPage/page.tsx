'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "next/link"
import { useRouter } from 'next/navigation';
import { 
  Home, 
  ShoppingBag, 
  Settings, 
  Bell, 
  ChevronRight, 
  User, 
  Package, 
  CreditCard, 
  BarChart2,
  Menu,
  X,
} from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  id: string;
  link?: string; // Optional link property
}

const SellerLandingPage: React.FC = () => {
  const router = useRouter();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [sellerEmail, setSellerEmail] = useState<string>("");

  // Mobile viewport check
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Fetch seller email
  useEffect(() => {
    const fetchSellerEmail = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("Token not found");
          return;
        }
        const response = await axios.get(
          "http://localhost:8080/api/seller/shop/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data && response.data.email) {
          setSellerEmail(response.data.email);
        }
      } catch (error) {
        console.error("Failed to fetch seller email:", error);
      }
    };

    fetchSellerEmail();
  }, []);

  const navItems: NavItem[] = [
    { icon: <Home size={24} />, label: "Dashboard", id: "dashboard" },
    { icon: <ShoppingBag size={24} />, label: "Products", id: "products", link: "/products" },
    { icon: <Package size={24} />, label: "Orders", id: "orders", link: "/orders" },
    { icon: <Settings size={24} />, label: "Customers", id: "customers", link: "/customers" },
    { icon: <CreditCard size={24} />, label: "Payments", id: "payments" },
    { icon: <BarChart2 size={24} />, label: "Analytics", id: "analytics" }, 
    { icon: <User size={24} />, label: "Profile", id: "profile", link: "/shop" },
    { icon: <Settings size={24} />, label: "Settings", id: "settings" }
  ];

  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const handleNavItemClick = (id: string, link?: string) => {
    setActiveTab(id);

    if (link) {
      router.push(link);
    }

    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 relative">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-white p-4 border-b">
        <h1 className="text-xl font-bold text-indigo-600">Seller Hub</h1>
        <button
          className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <div
        className={`${
          isMobile
            ? `fixed top-0 left-0 h-full z-50 transform ${
                mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : "relative"
        } flex flex-col bg-white shadow-lg md:shadow-none transition-all duration-300 ease-in-out ${
          isMobile ? "w-64" : expanded ? "w-64" : "w-16"
        }`}
        onMouseEnter={() => !isMobile && setExpanded(true)}
        onMouseLeave={() => !isMobile && setExpanded(false)}
      >
        {/* Logo */}
        <div className="hidden md:flex items-center justify-center h-16 border-b">
          {expanded ? (
            <h1 className="text-xl font-bold text-indigo-600 transition-opacity duration-200">
              Seller Hub
            </h1>
          ) : (
            <h1 className="text-xl font-bold text-indigo-600">SH</h1>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 mt-4 md:mt-0">
          <ul className="py-4">
            {navItems.map((item) => (
              <li key={item.id} className="mb-2 px-2">
                <button
                  onClick={() => handleNavItemClick(item.id, item.link)}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-indigo-100 text-indigo-600 shadow-sm transform scale-102"
                      : "text-gray-600 hover:bg-gray-100 hover:shadow-sm"
                  }`}
                >
                  <span className="flex items-center justify-center transition-transform duration-200 hover:scale-110">
                    {item.icon}
                  </span>

                  {(expanded || isMobile) && (
                    <>
                      <span className="ml-3 transition-opacity duration-200">
                        {item.label}
                      </span>
                      <ChevronRight
                        size={16}
                        className={`ml-auto transition-transform duration-200 ${
                          activeTab === item.id ? "transform translate-x-1" : ""
                        }`}
                      />
                    </>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="border-t p-4 flex items-center">
          <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center transition-transform duration-200 hover:scale-110">
            <User size={18} className="text-indigo-600" />
          </div>
          {(expanded || isMobile) && (
            <div className="ml-3 transition-opacity duration-200">
              <p className="text-sm font-medium">Seller Name</p>
              <p className="text-xs text-gray-500">{sellerEmail}</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            Welcome to your Seller Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <Bell size={24} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center transform transition-transform duration-200 hover:scale-110 animate-pulse">
                3
              </span>
            </button>
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 transition-all duration-300 hover:shadow-lg">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Getting Started</h2>
          <p className="text-gray-600 mb-4 text-sm md:text-base">
            Complete these steps to set up your seller account:
          </p>

          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center p-3 bg-green-50 rounded-lg border border-green-200 transition-all duration-200 hover:shadow-sm hover:bg-green-100">
              <div className="flex items-center mb-2 md:mb-0">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 transition-transform duration-200 hover:scale-110">
                  <span className="text-green-600">✓</span>
                </div>
                <div>
                  <h3 className="font-medium">Account Created</h3>
                  <p className="text-sm text-gray-500">
                    Your seller account has been successfully created
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200 transition-all duration-200 hover:shadow-sm hover:bg-yellow-100">
              <div className="flex items-center mb-2 md:mb-0">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3 transition-transform duration-200 hover:scale-110">
                  <span className="text-yellow-600">!</span>
                </div>
                <div>
                  <h3 className="font-medium">Complete Your Profile</h3>
                  <p className="text-sm text-gray-500">
                    Add your business details and contact information
                  </p>
                </div>
              </div>
              <button 
              onClick={() => router.push("/shop-registrations")}
              className="md:ml-auto bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md text-sm transition-all duration-200 hover:bg-yellow-200 hover:shadow hover:scale-105">
                Complete
              </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center p-3 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-sm hover:bg-gray-100">
              <div className="flex items-center mb-2 md:mb-0">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 transition-transform duration-200 hover:scale-110">
                  <span className="text-gray-600">2</span>
                </div>
                <div>
                  <h3 className="font-medium">Add Your First Product</h3>
                  <p className="text-sm text-gray-500">
                    Start selling by adding your first product
                  </p>
                </div>
              </div>
              <button
                onClick={() => router.push("/product-listing")}
                className="md:ml-auto bg-indigo-600 text-white px-3 py-1 rounded-md text-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow hover:scale-105"
              >
                Add Product
              </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center p-3 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-sm hover:bg-gray-100">
              <div className="flex items-center mb-2 md:mb-0">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 transition-transform duration-200 hover:scale-110">
                  <span className="text-gray-600">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Set Up Payment Method</h3>
                  <p className="text-sm text-gray-500">Connect your bank account to receive payments</p>
                </div>
              </div>
              <button 
              onClick={() => router.push("/CollectBankDetails")}
              className="md:ml-auto bg-indigo-600 text-white px-3 py-1 rounded-md text-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow hover:scale-105">
                Set Up
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-102 cursor-pointer">
            <h3 className="text-gray-500 text-sm mb-1">Products</h3>
            <p className="text-xl md:text-2xl font-bold">0</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-102 cursor-pointer">
            <h3 className="text-gray-500 text-sm mb-1">Orders</h3>
            <p className="text-xl md:text-2xl font-bold">0</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-102 cursor-pointer">
            <h3 className="text-gray-500 text-sm mb-1">Revenue</h3>
            <p className="text-xl md:text-2xl font-bold">$0.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLandingPage;
