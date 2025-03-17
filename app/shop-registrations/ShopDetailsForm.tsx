"use client";
import React, { useState } from "react";
import { uploadFileToFirebase } from "../api/auth/firebaseUpload";

interface ShopDetailsFormProps {
  shopName: string;
  address: string;
  category: string;
  district: string;
  area: string;
  shopType: string;
  deliveryAvailable: boolean;
  description: string;
  shopImages: string[];
  onChange: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const ShopDetailsForm: React.FC<ShopDetailsFormProps> = ({
  shopName,
  address,
  category,
  district,
  area,
  shopType,
  deliveryAvailable,
  description,
  shopImages,
  onChange,
  onNext,
  onBack,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleMultipleUpload = async (files: File[]) => {
    const uploadedURLs: string[] = [];
    for (let file of files) {
      const url = await uploadFileToFirebase(file, "shopImages");
      uploadedURLs.push(url);
    }
    onChange("shopImages", [...shopImages, ...uploadedURLs]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length > 0) {
      await handleMultipleUpload(selectedFiles);
    }
    onNext();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-4xl px-4 py-8">
        {/* Top Tab Navigation */}
        <div className="flex items-center space-x-8 border-b border-gray-300 mb-8">
          <button className="text-gray-500 font-medium pb-2">Profile</button>
          <button className="text-indigo-600 font-medium pb-2 border-b-2 border-indigo-600">
            Shop Details
          </button>
          <button className="text-gray-500 font-medium pb-2">
            Registration
          </button>
          <button className="text-gray-500 font-medium pb-2">
            Payment &amp; Others
          </button>
        </div>

        {/* The Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl font-semibold mb-1">Shop Details</h2>
          <p className="text-gray-500 text-sm mb-6">
            Enter your shop information
          </p>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={shopName}
                onChange={(e) => onChange("shopName", e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Address<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => onChange("address", e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Category<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => onChange("category", e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                District<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => onChange("district", e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Area
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => onChange("area", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Shop Type<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={shopType}
                onChange={(e) => onChange("shopType", e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Have Delivery Option<span className="text-red-500">*</span>
              </label>
              <select
                value={deliveryAvailable ? "Yes" : "No"}
                onChange={(e) =>
                  onChange("deliveryAvailable", e.target.value === "Yes")
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-500"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Shop Description
            </label>
            <textarea
              value={description}
              onChange={(e) => onChange("description", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-500"
              rows={4}
            />
          </div>

          <div className="mb-6 border-b border-gray-300">
            <label className="block text-gray-700 font-medium mb-1">
              Upload Shop Images<span className="text-red-500">*</span>
            </label>

            {/* Dotted, drag-and-drop style container */}
            <div className="relative w-full h-36 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-center hover:border-indigo-500 transition-colors">
              {/* Hidden file input covering the entire container */}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  setSelectedFiles(
                    e.target.files ? Array.from(e.target.files) : []
                  )
                }
                className="absolute w-full h-full opacity-0 cursor-pointer"
              />

              {/* Visible UI with "Add File" button and drag-and-drop hint */}
              <div className="flex flex-col items-center pointer-events-none">
                <button
                  type="button"
                  className="mb-2 px-4 py-2 bg-white text-indigo-600 font-semibold border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors pointer-events-auto"
                >
                  Add File
                </button>
                <p className="text-gray-500 text-sm">Or drag and drop files</p>
              </div>
            </div>

            {/* Display uploaded image previews */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              {shopImages.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt={`Shop Img ${idx}`}
                  className="w-full h-32 object-cover rounded"
                />
              ))}
            </div>
          </div>

          <div className="pt-5 flex justify-end space-x-4">
            {/* Back Button: Outlined Style */}
            <button
              type="button"
              onClick={onBack}
              className="w-24 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors"
            >
              Back
            </button>

            {/* Next Button: Solid Purple Style */}
            <button
              type="submit"
              className="w-24 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopDetailsForm;
