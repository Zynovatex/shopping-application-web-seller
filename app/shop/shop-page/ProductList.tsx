
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FiEdit, FiTrash, FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  inventory: number;
  color: string;
  price: string;
  rating: number;
  votes: number;
  inStock: boolean;
  selected: boolean;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of products per page

  useEffect(() => {
    // Mock Fetch API Call (Replace with actual API)
    const fetchProducts = async () => {
      const mockData: Product[] = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        category: i % 2 === 0 ? "T-Shirt" : "Hoodie",
        image: "/rshirt.jpg",
        inventory: Math.floor(Math.random() * 100),
        color: i % 2 === 0 ? "White" : "Black",
        price: `Rs ${(Math.random() * 10000).toFixed(2)}`,
        rating: parseFloat((Math.random() * 5).toFixed(1)),
        votes: Math.floor(Math.random() * 100),
        inStock: i % 3 !== 0,
        selected: false,
      }));
      setProducts(mockData);
    };

    fetchProducts();
  }, []);

  // Filter Products Based on Search Query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate Total Pages Dynamically
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Ensure the current page does not go beyond total pages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Pagination Logic - Show only relevant page numbers
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
  
  // Handle Page Change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Pagination Logic
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-10 bg-white shadow-md rounded-md mx-auto max-w-7xl">
      {/* Search Bar with Edit & Delete Icons */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative flex items-center border border-gray-300 rounded-md px-3 py-2 w-80">
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none text-gray-700 text-sm bg-transparent placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch size={18} className="cursor-pointer text-gray-500 hover:text-black" />
        </div>

        {/* Edit & Delete Icons */}
        <div className="flex space-x-3 text-[#7B5AF7] ">
        <div className="items-center border border-gray-300 rounded-md px-3 py-2">
          <FiEdit size={20} className="cursor-pointer hover:text-blue-600 " />
          </div>
          <div className=" items-center border border-gray-300 rounded-md px-3 py-2">
          <FiTrash size={20} className="cursor-pointer hover:text-red-600  " />
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-gray-500 text-medium border-b h-12">
            <th className="p-3">
              <input type="checkbox" 
              className="w-4 h-4 text-white peer-checked:bg-[#5A31F5] border-gray-300 rounded focus:ring-[#4827c4]"/>
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
                  onChange={() => setProducts((prev) =>
                    prev.map((p) => (p.id === product.id ? { ...p, selected: !p.selected } : p))
                  )}
                  className="w-4 h-4 text-white peer-checked:bg-[#5A31F5] border-gray-300 rounded focus:ring-[#4827c4]"
                />
              </td>
              <td className="p-3 flex items-center space-x-3">
                <Image
                  src={product.image || "/default-image.jpg"} // Fallback demo image
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
                <span className={product.inStock ? "text-black font-medium" : "text-red-500 font-medium"}>
                  {product.inStock ? `${product.inventory} in stock` : "Out of Stock"}
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

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        {/* Left Arrow */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-md ${
            currentPage === 1 ? "text-gray-200 cursor-not-allowed" : "text-black"
          }`}
        >
          <FiChevronLeft size={20} />
        </button>

        {/* Page Numbers */}
        <div className="flex space-x-2">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && handlePageChange(page)}
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

        {/* Right Arrow */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md ${
            currentPage === totalPages ? "text-gray-200 cursor-not-allowed" : "text-black"
          }`}
        >
          <FiChevronRight size={20} />
        </button>

        {/* Total Items Count */}
        <span className="text-sm text-gray-500 ml-4">{filteredProducts.length} Results</span>
      </div>
    </div>
  );
};

export default ProductList;
