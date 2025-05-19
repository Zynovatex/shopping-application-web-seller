import { FiDownload, FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";

const ProductHeader = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center w-full py-4 px-16">
      {/* Left: Section Title */}
      <h2 className="text-xl font-bold text-black">Products</h2>

      {/* Right: Action Buttons */}
      <div className="flex h-8 space-x-3">
        {/* Export Button */}
        <button onClick={() => router.push("/app/product/saveProductList")} className="flex items-center space-x-2 border border-[#7B5AF7] text-[#7B5AF7] px-4 py-2 rounded-md hover:bg-[#7B5AF7] hover:text-white transition">
          <FiDownload size={16} />
          <span>Export</span>
        </button>

        {/* Add Product Button */}
        <button onClick={() => router.push("/app/product/addProduct")} className="flex items-center space-x-2 bg-[#7B5AF7] text-white px-4 py-2 rounded-md hover:bg-[#6937F5] transition">
          <FiPlus size={16} />
          <span>Add Product</span>
        </button>
      </div>
    </div>
  );
};

export default ProductHeader;
