"use client";
import React, { useState } from "react";
import { uploadFileToFirebase } from "../api/auth/firebaseUpload";

interface RegistrationFormProps {
  registrationNumber: string;
  taxNumber: string;
  vatRegistered: boolean;
  registrationType: string;
  registrationDocuments: string[];
  onChange: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  registrationNumber,
  taxNumber,
  vatRegistered,
  registrationType,
  registrationDocuments,
  onChange,
  onNext,
  onBack,
}) => {
  const [docFiles, setDocFiles] = useState<File[]>([]);

  const handleMultipleUpload = async (files: File[]) => {
    const uploadedURLs: string[] = [];
    for (let file of files) {
      const url = await uploadFileToFirebase(file, "registrationDocs");
      uploadedURLs.push(url);
    }
    onChange("registrationDocuments", [
      ...registrationDocuments,
      ...uploadedURLs,
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (docFiles.length > 0) {
      await handleMultipleUpload(docFiles);
    }
    onNext();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-4xl px-4 py-8">
        {/* Top Tab Navigation */}
        <div className="flex items-center space-x-8 border-b border-gray-300 mb-8">
          <button className="text-gray-500 font-medium pb-2">Profile</button>
          <button className="text-gray-500 font-medium pb-2">
            Shop Details
          </button>
          <button className="text-indigo-600 font-medium pb-2 border-b-2 border-indigo-600">
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
          <h2 className="text-2xl font-semibold mb-1">Registration Details</h2>
          <p className="text-gray-500 text-sm mb-6">
            Enter your shop registration information
          </p>

          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Registration Number<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={registrationNumber}
                onChange={(e) => onChange("registrationNumber", e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Tax Number<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={taxNumber}
                onChange={(e) => onChange("taxNumber", e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                VAT Registered<span className="text-red-500">*</span>
              </label>
              <select
                value={vatRegistered ? "Yes" : "No"}
                onChange={(e) =>
                  onChange("vatRegistered", e.target.value === "Yes")
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-500"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Select Registration Type<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={registrationType}
                onChange={(e) => onChange("registrationType", e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="mb-6 border-b border-gray-300">
            <label className="block text-gray-700 font-medium mb-1">
              Upload Registration Documents
              <span className="text-red-500">*</span>
            </label>

            {/* Dotted, drag-and-drop style container */}
            <div className="relative mb-6 w-full h-36 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-center hover:border-indigo-500 transition-colors">
              {/* Hidden file input covering the entire container */}
              <input
                type="file"
                multiple
                onChange={(e) =>
                  setDocFiles(e.target.files ? Array.from(e.target.files) : [])
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

            {/* Display uploaded documents as links */}
            <ul className="mt-2 space-y-1">
              {registrationDocuments.map((docUrl, idx) => (
                <li key={idx}>
                  <a
                    href={docUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    Document {idx + 1}
                  </a>
                </li>
              ))}
            </ul>
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

export default RegistrationForm;
