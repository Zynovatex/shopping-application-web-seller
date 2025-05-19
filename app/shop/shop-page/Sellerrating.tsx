
  
"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface ShopProps {
  shop: {
    name: string;
    logo?: string;
    description: string;
    rating: number;
    reviews: number;
    ratingBreakdown: { [key: number]: number };
  };
}

const ShopRating: React.FC<ShopProps> = ({ shop }) => {
  const router = useRouter();

  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-6 flex flex-col lg:flex-row items-center text-center lg:text-left gap-6">
      {/* Left Section: Shop Logo */}
      <div className="w-full lg:w-1/3 flex justify-center">
        <Image
          src={shop.logo || "/default-image.jpg"}
          alt="Shop Logo"
          width={200}
          height={200}
          className="rounded-lg object-cover"
          unoptimized
        />
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-2/3 space-y-4">
        {/* Title & Button */}
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

        {/* Description */}
        <p className="text-gray-800 text-sm sm:text-base">{shop.description}</p>

        {/* Rating Section */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-6">
          {/* Left: Rating */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <span className="text-4xl sm:text-5xl font-bold text-black">{shop.rating}</span>
              <FaStar className="text-[#5A31F5]" size={28} />
            </div>
            <span className="mt-2 bg-black text-white text-xs sm:text-sm px-3 py-1 rounded-md">
              {shop.reviews} reviews
            </span>
          </div>

          {/* Right: Graph */}
          <div className="space-y-1 ml-4 w-full ">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center space-x-2">
                <span className="text-sm">{star}</span>
                <FaStar className="text-[#5A31F5]" size={12} />
                <div className="w-40 h-1.5 bg-gray-200 rounded overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                    style={{ width: `${shop.ratingBreakdown[star] || 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopRating;
