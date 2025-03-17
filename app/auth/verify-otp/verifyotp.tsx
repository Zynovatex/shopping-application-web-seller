"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPasswordWithOTP } from "@/app/api/auth/authantication";

const ResetPassword = () => {
  const router = useRouter();

  // Form state
  const [email, setEmail] = useState("");
  // OTP is now split into 6 boxes (as in your previous update)
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Handler for individual OTP boxes
  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if available
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setMessage(null);
      return;
    }

    // Join OTP boxes into a single string
    const otpString = otp.join("");
    // Ensure all fields are filled
    if (!email || !otpString || !newPassword) {
      setError("All fields are required.");
      setMessage(null);
      return;
    }

    try {
      // Call API function to reset the password using email, otpString, and newPassword
      await resetPasswordWithOTP({ email, otp: otpString, newPassword });
      setMessage("Password reset successful. You can now log in.");
      setError(null);
      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password.");
      setMessage(null);
    }
  };

  return (
    // --- Modal overlay container: covers full screen and centers modal content ---
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* --- Background overlay: semi-transparent black background --- */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* --- Modal content container with white background, padding, rounded corners, and shadow --- */}
      <div className="relative bg-white max-w-md w-full p-6 rounded-2xl shadow-lg z-10">
        {/* --- New: Conditional Icon at top center of the modal --- */}
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
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {message && <p className="text-green-500 mb-2">{message}</p>}
        <form onSubmit={handleSubmit}>
          {/* --- Email Input Field --- */}
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
          {/* --- OTP Input Fields changed to 6 separate boxes --- */}
          <div className="mb-4">
            <label htmlFor="otp" className="block mb-1 font-medium">
              OTP
            </label>
            <div className="flex gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`} // --- Added id for focus management ---
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  required
                  placeholder="-"
                  className="w-12 h-14 text-center border border-gray-300 rounded-xl"
                />
              ))}
            </div>
          </div>
          {/* --- New Password Input Field --- */}
          <div className="mb-4">
            <label htmlFor="newPassword" className="block mb-1 font-medium">
              New Password
            </label>
            <div className="h-14">
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="New Password"
                className="h-full w-full p-2 border border-gray-300 rounded-xl"
              />
            </div>
          </div>
          {/* --- Confirm Password Input Field --- */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-1 font-medium">
              Confirm Password
            </label>
            <div className="h-14">
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm Password"
                className="h-full w-full p-2 border border-gray-300 rounded-xl"
              />
            </div>
          </div>
          {/* --- Submit Button --- */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
