"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser, RegistrationData } from "@/app/api/auth/authantication";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/app/component/layout/Footer";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create registration data and automatically set the role to "BUYER"
    const registrationData: RegistrationData = {
      name,
      email,
      password,
      role: "SELLER", // Automatically set role for buyer registration
    };

    try {
      const result = await registerUser(registrationData);
      setMessage("Registration successful!");
      setError(null);
      console.log("Registration result:", result);
      // Redirect to the login page or another page after successful registration
      router.push("/auth/login");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      setMessage(null);
    }
  };
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Left side: Image element (hidden on small screens) */}
        <div className="hidden md:block md:w-1/2">
          {/* Changed: Added image element with Tailwind styling */}
          <img
            src="/SignUp.png" // <-- Change to your actual image path
            alt="SignUp Illustration"
            className="mt-[131px] ml-[283px]"
            width={409}
            height={417}
          />
        </div>

        {/* Right side: Form container */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          {/* Wrapper for the form with a max-width */}
          <div className="w-full max-w-md pr-10">
            <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}
            {/* Form with Tailwind spacing */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div style={{ marginBottom: "1rem" }}>
                <label
                  htmlFor="name"
                  className="block mb-1 text-sm font-medium text-[#5A31F5]"
                >
                  Name
                </label>
                <div className="h-14">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-full w-full p-2 border border-gray-300 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-[#5A31F5]"
                >
                  Email Address
                </label>
                <div className="h-14 relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-full w-full p-2 border border-gray-300 rounded-xl"
                    placeholder="you@example.com"
                  />
                  {/* 3) Conditionally render the icon if the email is valid & not empty */}
                  {email && isValidEmail(email) && (
                    <div className="absolute inset-y-0 right-3 flex items-center">
                      {/* Example: A black circle with a white check inside (24x24 viewBox) */}
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="black" />
                        <path
                          d="M9.5 13.7l-2.2-2.2-.9.9 3.1 3.1 6.1-6.1-.9-.9z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium"
                >
                  Password
                </label>
                <div className="h-14">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-full w-full p-2 border border-gray-300 rounded-xl"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <Link
                  href="/auth/login"
                  className="text-[#000000] hover:underline"
                >
                  Alraday have an account ?
                </Link>
              </div>
              {/* Button group */}
              <div className="h-14 flex gap-4">
                <button
                  type="submit"
                  className="h-full w-full px-4 py-2 bg-[#5A31F5] text-white rounded-xl"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className="text-center text-sm mt-4 mb-4">Or Login with</div>
            {/* Icon group */}
            <div className="h-23 mt-3 flex justify-between">
              <button className="flex items-center justify-center px-10 py-5 bg-[#fff] text-[#000000] rounded-xl border border-[#000000]">
                <Image
                  src="/Apple.png" // Replace with your actual image path in the public folder
                  alt="Button Image"
                  width={25} // Set the desired width
                  height={25} // Set the desired height
                />
              </button>
              <button className="flex items-center justify-center px-10 py-5 bg-[#fff] text-[#000000] rounded-xl border border-[#000000]">
                <Image
                  src="/Google.png" // Replace with your actual image path in the public folder
                  alt="Button Image"
                  width={25} // Set the desired width
                  height={25} // Set the desired height
                />
              </button>
              <button className="flex items-center justify-center px-10 py-5 bg-[#fff] text-[#000000] rounded-xl border border-[#000000]">
                <Image
                  src="/Facebook.png" // Replace with your actual image path in the public folder
                  alt="Button Image"
                  width={25} // Set the desired width
                  height={25} // Set the desired height
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
