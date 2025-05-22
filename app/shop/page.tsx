// "use client";

// import React, { useState, useEffect } from "react";
// import SellerNav from "@/app/component/layout/SellerNav";
// import SellerRating from "@/app/shop/shop-page/Sellerrating";
// import SellerBanner from "@/app/shop/shop-page/sellerBanner";
// import ProductHeader from "@/app/shop/shop-page/ProductHeader";
// import ProductList from "@/app/shop/shop-page/ProductList";
// import Footer from "@/app/component/layout/FullFooter";

// const Page = () => {

// const [shopDetails, setShopDetails] = useState<any>(null); // This will hold the shop details

//   // Fetch shop details from the backend
//   useEffect(() => {
//     const fetchShopDetails = async () => {
//       try {
//         const response = await fetch("/api/shops/details", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
//           },
//         });
  
//         if (response.ok) {
//           const data = await response.json();
//           setShopDetails(data); // Set the data to state
//         } else {
//           console.error("Failed to fetch shop details");
//         }
//       } catch (error) {
//         console.error("Error fetching shop details", error);
//       }
//     };

//     fetchShopDetails();
//   }, []);

//   if (!shopDetails) {
//     return <div>Loading...</div>; // Show loading text until the shop data is fetched
//   }
//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Seller Navigation Bar */}
//       <SellerNav />

//       {/* Shop Information Section */}
//       <div className="container mx-auto p-6">
//         <SellerRating
//         shop={{
//           name: shopDetails.shopName,
//             logo: shopDetails.shopImages ? shopDetails.shopImages[0] : "/default-logo.jpg", // Handle missing logo
//             description: shopDetails.description,
//             rating: shopDetails.rating || 0, // Default to 0 if no rating
//             reviews: shopDetails.reviews || 0,
//             ratingBreakdown: shopDetails.ratingBreakdown || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }, // Default rating breakdown
//           }}
//         />

//         {/* Banner Section */}
//         <div className="mt-8">
//           <SellerBanner />
//         </div>

//         {/* Product Section */}
//         <div className="mt-6">
//           <ProductHeader />
//           <ProductList />
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default Page;

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FiDownload,
  FiPlus,
  FiEdit,
  FiTrash,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const Page = () => {
  const router = useRouter();

  const [shopDetails, setShopDetails] = useState<any>(null);

  // Fetch shop details from backend
  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const response = await fetch("/api/shops/details", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setShopDetails(data);
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
    return <div>Loading...</div>;
  }

  // --- SellerNav Component ---
  const SellerNav = () => (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-30">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-xl text-[#5A31F5] cursor-pointer" onClick={() => router.push("/")}>
          Seller Dashboard
        </h1>
        {/* Add more nav items if needed */}
      </div>
    </nav>
  );

  // --- ShopRating Component ---
  const SellerRating = ({ shop }: { shop: any }) => (
    <div className="w-full bg-white shadow-lg rounded-lg p-6 flex flex-col lg:flex-row items-center text-center lg:text-left gap-6">
      <div className="w-full lg:w-1/3 flex justify-center">
        <Image
          src={shop.logo || "/default-logo.jpg"}
          alt="Shop Logo"
          width={200}
          height={200}
          className="rounded-lg object-cover"
          unoptimized
        />
      </div>

      <div className="w-full lg:w-2/3 space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-black font-bold">
            {shop.name} <span className="text-2xl md:text-4xl">®</span>
          </h2>
          <button
            onClick={() => router.push("/shop/EditShopDetails")}
            className="flex items-center text-[#5A31F5] bg-gray-100 px-3 py-2 rounded-md text-sm hover:bg-[#5A31F5] hover:text-white transition"
          >
            <FiEdit className="mr-1" size={18} />
            Manage
          </button>
        </div>

        <p className="text-gray-800 text-sm sm:text-base">{shop.description}</p>

        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <span className="text-4xl sm:text-5xl font-bold text-black">{shop.rating || 0}</span>
              <FaStar className="text-[#5A31F5]" size={28} />
            </div>
            <span className="mt-2 bg-black text-white text-xs sm:text-sm px-3 py-1 rounded-md">
              {shop.reviews || 0} reviews
            </span>
          </div>

          <div className="space-y-1 ml-4 w-full">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center space-x-2">
                <span className="text-sm">{star}</span>
                <FaStar className="text-[#5A31F5]" size={12} />
                <div className="w-40 h-1.5 bg-gray-200 rounded overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                    style={{ width: `${shop.ratingBreakdown?.[star] || 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // --- ShopBanner Component ---
  const SellerBanner = () => {
    const [banners, setBanners] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
      // Use shopDetails banners if available, else fallback
      setBanners(shopDetails.banners && shopDetails.banners.length > 0
        ? shopDetails.banners
        : ["/b1.jpg", "/b6.jpg", "/b4.jpg", "/b3.jpg", "/b2.jpg"]);
    }, [shopDetails]);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearInterval(interval);
    }, [currentIndex, banners]);

    if (!banners || banners.length === 0) {
      return (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 rounded-2xl">
          No banners available
        </div>
      );
    }

    const nextBanner = () => {
      setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    };

    const prevBanner = () => {
      setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    };

    return (
      <div className="relative w-full flex flex-col items-center mt-6">
        <div className="relative w-full max-w-4xl h-[300px] md:h-[400px] flex justify-center items-center overflow-hidden rounded-2xl">
          {banners.map((banner, index) => {
            let position = index - currentIndex;
            if (position < -2) position += banners.length;
            if (position > 2) position -= banners.length;

            return (
              <div
                key={index}
                className={`absolute transition-all duration-700 ease-in-out ${
                  position === 0
                    ? "scale-110 z-20 opacity-100"
                    : position === -1 || position === 1
                    ? "scale-90 z-10 opacity-100"
                    : "scale-75 z-0 opacity-0"
                }`}
                style={{
                  transform: `translateX(${position * 40}%)`,
                  clipPath: position === 0 ? "none" : "inset(0 10% 0 10%)",
                }}
              >
                <Image
                  src={banner}
                  alt={`Banner ${index + 1}`}
                  width={500}
                  height={250}
                  className="rounded-2xl shadow-md object-cover"
                  unoptimized
                />
              </div>
            );
          })}
        </div>

        <button
          onClick={prevBanner}
          className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black transition"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={nextBanner}
          className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black transition"
        >
          <FiChevronRight size={24} />
        </button>

        <div className="flex mt-4 space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentIndex ? "bg-[#5A31F5]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  // --- ProductHeader Component ---
  const ProductHeader = () => (
    <div className="flex justify-between items-center w-full py-4 px-6">
      <h2 className="text-xl font-bold text-black">Products</h2>
      <div className="flex h-8 space-x-3">
        <button
          onClick={() => router.push("/app/product/saveProductList")}
          className="flex items-center space-x-2 border border-[#7B5AF7] text-[#7B5AF7] px-4 py-2 rounded-md hover:bg-[#7B5AF7] hover:text-white transition"
        >
          <FiDownload size={16} />
          <span>Export</span>
        </button>
        <button
          onClick={() => router.push("/app/product/addProduct")}
          className="flex items-center space-x-2 bg-[#7B5AF7] text-white px-4 py-2 rounded-md hover:bg-[#6937F5] transition"
        >
          <FiPlus size={16} />
          <span>Add Product</span>
        </button>
      </div>
    </div>
  );

  // --- ProductList Component ---
  const ProductList = () => {
    // Example product state and search state (add these if not already present)
    const [products, setProducts] = useState<any[]>([
      // Example product structure; replace with real data or fetch from backend
      // { id, name, category, image, inventory, inStock, color, price, rating, votes, selected }
    ]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const productsPerPage = 10;

    // Filter products based on search query
    const filteredProducts = products.filter(
      (product) =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const displayedProducts = filteredProducts.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
    );

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };

    const getPageNumbers = () => {
      if (totalPages <= 10) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      } else {
        const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "...", totalPages];
        if (currentPage > 10 && currentPage < totalPages - 2) {
          pages.splice(10, 1, currentPage - 1, currentPage, currentPage + 1, "...");
        }
        return pages;
      }
    };

    return (
      <div className="p-4 sm:p-6 bg-white shadow-md rounded-md mx-auto max-w-7xl mt-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <div className="relative flex items-center border border-gray-300 rounded-md px-3 py-2 w-full sm:w-80">
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-none text-gray-700 text-sm bg-transparent placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch
              size={18}
              className="cursor-pointer text-gray-500 hover:text-black"
            />
          </div>

          <div className="flex space-x-3 text-[#7B5AF7]">
            <div className="items-center border border-gray-300 rounded-md px-3 py-2">
              <FiEdit size={20} className="cursor-pointer hover:text-blue-600" />
            </div>
            <div className="items-center border border-gray-300 rounded-md px-3 py-2">
              <FiTrash size={20} className="cursor-pointer hover:text-red-600" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-gray-500 text-medium border-b h-12">
                <th className="p-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-white peer-checked:bg-[#5A31F5] border-gray-300 rounded focus:ring-[#4827c4]"
                  />
                </th>
                <th className="p-3">Product</th>
                <th className="p-3">Inventory</th>
                <th className="p-3">Color</th>
                <th className="p-3">Price</th>
                <th className="p-3">Rating</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.map((product) => (
                <tr key={product.id} className="border-b h-14">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={product.selected}
                      onChange={() =>
                        setProducts((prev) =>
                          prev.map((p) =>
                            p.id === product.id
                              ? { ...p, selected: !p.selected }
                              : p
                          )
                        )
                      }
                      className="w-4 h-4 text-white peer-checked:bg-[#5A31F5] border-gray-300 rounded focus:ring-[#4827c4]"
                    />
                  </td>
                  <td className="p-3 flex items-center space-x-3">
                    <Image
                      src={product.image || "/default-image.jpg"}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                    <div>
                      <span className="font-medium text-black">{product.name}</span>
                      <p className="text-sm text-gray-700">{product.category}</p>
                    </div>
                  </td>
                  <td className="p-3">
                    <span
                      className={
                        product.inStock
                          ? "text-black font-medium"
                          : "text-red-500 font-medium"
                      }
                    >
                      {product.inStock
                        ? `${product.inventory} in stock`
                        : "Out of Stock"}
                    </span>
                  </td>
                  <td className="p-3 text-black">{product.color}</td>
                  <td className="p-3 text-black">{product.price}</td>
                  <td className="p-3 text-gray-900">
                    {product.rating} ({product.votes} Votes)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${
                currentPage === 1
                  ? "text-gray-200 cursor-not-allowed"
                  : "text-black"
              }`}
            >
              <FiChevronLeft size={20} />
            </button>

            <div className="flex space-x-2">
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && handlePageChange(page)
                  }
                  className={`px-3 py-1 rounded-md ${
                    currentPage === page
                      ? "bg-blue-100 text-blue-600 font-bold"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                  disabled={page === "..."}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${
                currentPage === totalPages
                  ? "text-gray-200 cursor-not-allowed"
                  : "text-black"
              }`}
            >
              <FiChevronRight size={20} />
            </button>
          </div>

          <span className="text-sm text-gray-500">
            {filteredProducts.length} Results
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Seller Navigation Bar */}
      <SellerNav />

      {/* Shop Information Section */}
      <div className="container mx-auto p-6">
        <SellerRating
          shop={{
            name: shopDetails.shopName,
            logo: shopDetails.shopImages ? shopDetails.shopImages[0] : "/default-logo.jpg",
            description: shopDetails.description,
            rating: shopDetails.rating || 0,
            reviews: shopDetails.reviews || 0,
            ratingBreakdown: shopDetails.ratingBreakdown || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
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
      {/* Assuming you want Footer - if you want it inline too, let me know */}
    </div>
  );
};

export default Page;
