"use client";
import React, { useState } from "react";
import { uploadFileToFirebase } from "../api/auth/firebaseUpload";

interface ProfileFormProps {
  // Data
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  language: string;
  profilePicture: string | undefined;

  // Handlers
  onChange: (field: string, value: any) => void;
  onNext: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  firstName,
  lastName,
  contactNumber,
  email,
  language,
  profilePicture,
  onChange,
  onNext,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = async (file: File) => {
    try {
      const url = await uploadFileToFirebase(file, "profileImages");
      onChange("profilePicture", url);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      handleFileUpload(selectedFile).then(() => {
        onNext();
      });
    } else {
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Container for the content */}
      <div className="mx-auto w-full max-w-4xl px-4 py-8">
        {/* Top Tab Navigation */}
        <div className="flex items-center space-x-8 border-b border-gray-300 mb-8">
          {/* Active Tab: Profile */}
          <button className="text-indigo-600 font-medium pb-2 border-b-2 border-indigo-600">
            Profile
          </button>
          {/* Inactive Tabs (placeholders) */}
          <button className="text-gray-500 font-medium pb-2">
            Shop Details
          </button>
          <button className="text-gray-500 font-medium pb-2">
            Registration
          </button>
          <button className="text-gray-500 font-medium pb-2">
            Payment &amp; Others
          </button>
        </div>

        {/* The Profile Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl font-semibold mb-1">Seller Details</h2>
          <p className="text-gray-500 text-sm mb-6">
            Enter your seller information
          </p>

          <div className="flex space-x-4 mb-4">
            {/* First Name Field */}
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => onChange("firstName", e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>

            {/* Last Name Field */}
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => onChange("lastName", e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Contact Number<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => onChange("contactNumber", e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => onChange("email", e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="w-1/2 mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Language<span className="text-red-500">*</span>
            </label>
            <select
              value={language}
              onChange={(e) => onChange("language", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-500"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="mb-6 border-b border-gray-300">
            <label className="block text-gray-700 font-medium mb-1">
              Upload Your Profile Picture
              <span className="text-red-500">*</span>
            </label>

            {/* Container for the upload area */}
            <div className="relative w-full h-36 mb-6 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-center hover:border-indigo-500 transition-colors">
              {/* Hidden input for file selection */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setSelectedFile(e.target.files ? e.target.files[0] : null)
                }
                className="absolute w-full h-full opacity-0 cursor-pointer"
              />

              {/* Visible UI for the "Add File" button */}
              <div className=" flex flex-col items-center pointer-events-none">
                <button
                  type="button"
                  className="mb-2 px-4 py-2 bg-white text-indigo-600 font-semibold border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors pointer-events-auto"
                >
                  Add File
                </button>
                <p className="text-gray-500 text-sm">Or drag and drop files</p>
              </div>
            </div>

            {/* Preview if a file has been uploaded */}
            {profilePicture && (
              <img
                src={profilePicture}
                alt="Profile Preview"
                className="mt-4 w-32 h-32 object-cover rounded-full mx-auto"
              />
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="mt-9 w-[104px] py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
