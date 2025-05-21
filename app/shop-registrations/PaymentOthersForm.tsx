"use client";
import React, { useState } from "react";
import { uploadFileToFirebase } from "../api/auth/firebaseUpload";

interface PaymentOthersFormProps {
  cashOnDelivery: boolean;
  onlinePayment: boolean;
  mobilePayment: boolean;
  additionalPhotos: string[];
  onChange: (field: string, value: any) => void;
  onSave: () => void; // final save
  onBack: () => void;
}

const PaymentOthersForm: React.FC<PaymentOthersFormProps> = ({
  cashOnDelivery,
  onlinePayment,
  mobilePayment,
  additionalPhotos,
  onChange,
  onSave, 
  onBack,
}) => {
  const [photos, setPhotos] = useState<File[]>([]);

  const handleMultipleUpload = async (files: File[]) => {
    const uploadedURLs: string[] = [];
    for (let file of files) {
      const url = await uploadFileToFirebase(file, "shopAdditionalPhotos");
      uploadedURLs.push(url);
    }
    onChange("additionalPhotos", [...additionalPhotos, ...uploadedURLs]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (photos.length > 0) {
      await handleMultipleUpload(photos);
    }
    // After uploading, call onSave to send final data to the backend
    onSave();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-4xl px-4 py-8">
        {/* Top Tab Navigation */}
        <div className="flex items-center space-x-8 border-b border-gray-300 mb-8">
          <button className="text-gray-500 font-medium pb-2">Profile</button>
          <button className="text-gray-500 font-medium pb-2">
            Registration
          </button>
          <button className="text-indigo-600 font-medium pb-2 border-b-2 border-indigo-600">
            Payment &amp; Others
          </button>
        </div>

        {/* The Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl font-semibold mb-1">Payment &amp; Others</h2>
          <p className="text-gray-500 text-sm mb-6">
            Enter your payment information
          </p>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">
              Select the payment methods
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-indigo-600"
                  checked={cashOnDelivery}
                  onChange={(e) => onChange("cashOnDelivery", e.target.checked)}
                />
                <span>Cash On Delivery</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-indigo-600"
                  checked={onlinePayment}
                  onChange={(e) => onChange("onlinePayment", e.target.checked)}
                />
                <span>Online Payment</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-indigo-600"
                  checked={mobilePayment}
                  onChange={(e) => onChange("mobilePayment", e.target.checked)}
                />
                <span>Mobile Payment</span>
              </label>
            </div>
          </div>

          <div className="mb- border-b border-gray-300">
            <label className="block text-lg font-medium mb-2">
              Shop Photos (up to 10 photos)
            </label>

            {/* Dotted, drag-and-drop style container */}
            <div className="mb-6 relative w-full h-36 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-center hover:border-indigo-500 transition-colors">
              {/* Hidden file input covering the entire container */}
              <input
                type="file"
                multiple
                onChange={(e) =>
                  setPhotos(e.target.files ? Array.from(e.target.files) : [])
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

            {/* Display uploaded photos in a grid */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              {additionalPhotos.map((photoUrl, idx) => (
                <img
                  key={idx}
                  src={photoUrl}
                  alt={`Extra Photo ${idx}`}
                  className="w-full h-32 object-cover rounded"
                />
              ))}
            </div>
          </div>

          <div className="pt-10 flex justify-end space-x-4">
            {/* Back Button: Outlined Style */}
            <button
              type="button"
              onClick={onBack}
              className="w-24 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors"
            >
              Back
            </button>

            {/* Save Button: Solid Purple Style */}
            <button
              type="submit"
              className="w-24 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentOthersForm;
