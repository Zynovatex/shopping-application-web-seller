"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // using next/navigation for client components
import { requestOtp } from "@/app/api/auth/authantication";

const RequestOTP = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRequestOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      const result = await requestOtp({ email });
      setMessage("OTP sent to your email.");
      setError(null);
      console.log("Request OTP result:", result);
      // Automatically redirect to the OTP verification page after a short delay.
      setTimeout(() => {
        router.push("/auth/verify-otp");
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send OTP.");
      setMessage(null);
    }
  };

  return (
    // Modal overlay container: fixed to cover the entire screen and center the modal
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay: semi-transparent dark background */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* Modal content container: white background, padding, rounded corners, and shadow */}
      <div className="relative bg-white max-w-md w-full p-6 rounded-2xl shadow-lg z-10">
        {/* --- New: Conditional Icon added at the top center of the modal --- */}
        {/* If OTP was sent, display green circle with a white tick */}
        {message && (
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        )}
        {/* If OTP request fails, display red circle with a white cross */}
        {error && (
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        )}
        {/* --- End of new icon addition --- */}

        <h1 className="text-2xl font-bold mb-4">Verify your email</h1>
        <div>
          <p className="text-center">
            We have send you an One Time Password(OTP) on this email
          </p>
        </div>

        <form onSubmit={handleRequestOTP}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <div className="h-14">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="h-full w-full p-2 border border-gray-300 rounded-xl"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#5A31F5] text-white rounded-xl"
            >
              Request OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestOTP;
