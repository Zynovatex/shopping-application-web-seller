"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EditShopDetails = () => {
  const [name, setName] = useState(""); // State for Shop Name
  const [description, setDescription] = useState(""); // State for Shop Description
  const [error, setError] = useState(""); // Error message state

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Shop name is required."); // Show error if name is empty
      return;
    }

    // Perform form submission (Replace this with actual API call)
    console.log("Form submitted with:", { name, description });
    setError(""); // Clear error after successful submission
  };

  const router = useRouter();

const handleCancel = () => {
  router.push("/shop/shop-page"); // Adjust if your folder is renamed (e.g., `/shop`)
};


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Edit Shop Details</h2>

      <form onSubmit={handleSubmit}>
        {/* Shop Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">**</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-2 border rounded-md ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter shop name"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Shop Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Shop Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter shop description"
            rows={4}
          ></textarea>
        </div>

        {/* Upload Shop Image */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Update Shop Image</label>
          <div className="border border-dashed border-gray-400 rounded-md p-6 text-center">
            <button type="button" className="bg-[#5A31F5] text-white px-4 py-2 rounded-md">
              Add File
            </button>
            <p className="text-gray-500 text-sm mt-2">Or drag and drop files</p>
          </div>
        </div>

        {/* Upload Shop Banner */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Update Shop Banner</label>
          <div className="border border-dashed border-gray-400 rounded-md p-6 text-center">
            <button type="button" className="bg-[#5A31F5] text-white px-4 py-2 rounded-md">
              Add File
            </button>
            <p className="text-gray-500 text-sm mt-2">Or drag and drop files</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!name.trim()} // Disable if name is empty
            className={`px-4 py-2 rounded-md text-white ${
              name.trim() ? "bg-[#5A31F5] hover:bg-[#4827C4]" : "bg-gray-300 cursor-not-allowed"
            } transition`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditShopDetails;
