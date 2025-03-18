"use client";
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaInstagram, FaYoutube, FaFacebookF, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

const TopHeader = () => {
  const [copied, setCopied] = useState(false);

  // Function to copy phone number
  const copyPhoneNumber = () => {
    navigator.clipboard.writeText("011 234 5643");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // Hide message after 1.5 seconds
  };

  return (
    <div className="bg-gray-900 text-white px-4 md:px-10 py-3 flex flex-col md:flex-row justify-between items-center text-sm min-h-[50px]">
      {/* Left Section - Contact Info (Hidden on Mobile) */}
      <div className="hidden md:flex items-center gap-4">
        <div className="relative flex items-center gap-2">
          <FaPhoneAlt />
          <span className="cursor-pointer select-all" onClick={copyPhoneNumber}>
            011 234 5643
          </span>
          {copied && (
            <span className="absolute top-[-25px] left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              Copied!
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <FaEnvelope />
          <span>SyntexSqurd@Uom.lk</span>
        </div>
      </div>

      {/* Center Section - Promotional Message with Left-to-Right Animation */}
      <motion.div
        className="text-center text-sm font-medium whitespace-nowrap"
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "100%", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        Follow Us and get a chance to win greatest offers
      </motion.div>

      {/* Right Section - Social Media Icons */}
      <div className="flex items-center gap-3 mt-2 md:mt-0">
        <span className="font-semibold hidden md:inline">Follow Us :</span>
        <FaInstagram className="cursor-pointer hover:text-gray-400 transition-all duration-300" />
        <FaYoutube className="cursor-pointer hover:text-gray-400 transition-all duration-300" />
        <FaFacebookF className="cursor-pointer hover:text-gray-400 transition-all duration-300" />
        <FaTwitter className="cursor-pointer hover:text-gray-400 transition-all duration-300" />
      </div>
    </div>
  );
};

export default TopHeader;
