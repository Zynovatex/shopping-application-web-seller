"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

const CustomerDetailsPage = () => {
  const router = useRouter();
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState(["VIP Customer", "Europe"]);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Back Button */}
      <div
        className="flex items-center mb-6 text-[#5A31F5] cursor-pointer"
        onClick={() => router.push("/customers")}
      >
        <FiArrowLeft size={20} />
        <span className="ml-2 font-medium">Back</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Header Card */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center sm:items-start">
            <Image
              src="/propic.jpg"
              alt="Customer Profile"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="ml-4 mt-4 sm:mt-0">
              <h2 className="text-xl font-semibold">Trisha Krishnan</h2>
              <p className="text-gray-600">Colombo</p>
              <p className="text-gray-600">5 Orders · Customer for 2 years</p>
              <div className="text-yellow-500 mt-1">★★★★★</div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-medium mb-2">Customer Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add notes about customer"
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* Customer Orders Table */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-medium mb-4">Customer Orders</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2">Order</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Order Status</th>
                  <th className="pb-2">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">#23534D</td>
                  <td>May 25, 3:12 PM</td>
                  <td className="text-blue-600 font-medium">Processing</td>
                  <td>Rs. 50,320</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">#12512B</td>
                  <td>May 10, 2:00 PM</td>
                  <td className="text-blue-600 font-medium">Processing</td>
                  <td>Rs. 3,000</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">#23634D</td>
                  <td>April 18, 8:00 AM</td>
                  <td className="text-green-600 font-medium">Completed</td>
                  <td>Rs. 8,400</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Overview Card */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Overview</h3>
              <button className="text-[#5A31F5] text-sm">Edit</button>
            </div>
            <p className="text-gray-600 text-sm">No, 50 Galle Road, Wellawatha, Colombo, Srilanka.</p>
            <p className="text-sm mt-2 text-gray-800">trisha@gmail.com</p>
            <p className="text-sm text-gray-800">+94 123456789</p>
          </div>

          {/* Tags */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-medium mb-2">Tags</h3>
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              placeholder="Enter tag name"
              className="w-full border px-2 py-1 rounded-md mb-2"
            />
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-purple-100 text-purple-800 text-sm rounded-full cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                >
                  {tag} ×
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => router.push("/customers")}
              className="px-4 py-2 bg-gray-200 rounded-md text-black hover:bg-gray-300"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-[#5A31F5] text-white rounded-md hover:bg-[#4827C4]">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;
