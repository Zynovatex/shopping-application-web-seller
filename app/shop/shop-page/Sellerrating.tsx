"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/navigation"; // To navigate on button click


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
  const router = useRouter(); // Navigation hook
  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-6 flex flex-col lg:flex-row items-center text-center lg:text-left mr-12">
      {/* Left Section: Shop Logo */}
      <div className="w-1/3 flex justify-center">
        <Image
          src={shop.logo || "/default-image.jpg"} // Fallback Image
          alt="Shop Logo"
          width={200} // Adjust size
          height={200}
          className="rounded-lg object-cover"
          unoptimized
        />
      </div>

      {/* Right Section: Shop Name & Description */}
      <div className="w-2/3">
      <div className="flex justify-between items-center">
        <h2 className="flex justify-center text-5xl  text-black font-bold flex items-center">
          {shop.name} <span className="text-4xl ml-2">®</span>
        </h2>
        {/* Edit Button */}
        <button
            onClick={() => router.push("/shop/EditShopDetails")} // Navigate to Edit Page
            className="flex items-center text-[#5A31F5] bg-gray-100 px-3 py-1 rounded-md text-sm md:text-base hover:bg-[#5A31F5] hover:text-white transition"
          >
            <FiEdit className="mr-1" size={18} />
            Manage
          </button>
          </div>
        <p className="flex justify-center text-gray-800 text-medium mt-2 leading-tight">{shop.description}</p>

        
{/* Below Description: Rating & Star Graph */}
<div className="flex justify-center mr-20 items-center mt-4 space-x-8">
  
  {/* Left: Rating & Review */}
  <div className="flex flex-col items-center space-y-2">
    <div className="flex space-x-2 items-center">
      <span className="text-6xl text-black font-bold">{shop.rating}</span>
      <FaStar className="text-[#5A31F5]" size={32} />
    </div>
    <span className="bg-black text-white text-sm px-4 py-1 rounded-md mt-2 inline-block">
      {shop.reviews} reviews
    </span>
  </div>

  {/* Right: Star Rating Graph */}
  <div className=" ml-4 ">
    {[5, 4, 3, 2, 1].map((star) => (
      <div key={star} className="flex items-center space-x-2">
        <span className="text-sm text-black ">{star}</span>
        <FaStar className="text-[#5A31F5]" size={12} />
        <div className="w-36 h-1.5   overflow-hidden">
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
  
