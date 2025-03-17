import {
  FaTiktok,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaPinterestP,
  FaGlobe,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  // Add return statement to return the JSX element.
  return (
    <div className="border-t border-gray-700 py-2 px-4 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between text-gray-400 space-y-2 md:space-y-0 bg-black text-center md:text-left">
      {/* Branding */}
      <div className="text-2xl md:text-3xl font-bold text-white flex items-center gap-0">
        <span className="text-blue-700">Virtual</span>
        <span className="text-white">City</span>
      </div>
      {/* Copyright */}
      <p className="text-sm">
        &copy; {new Date().getFullYear()} VirtualCity. All Rights Reserved.
      </p>
      {/* Social Icons */}
      <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-xl">
        <FaTiktok className="hover:text-blue-600 transition duration-300 cursor-pointer" />
        <FaFacebookF className="hover:text-blue-600 transition duration-300 cursor-pointer" />
        <FaLinkedinIn className="hover:text-blue-600 transition duration-300 cursor-pointer" />
        <FaInstagram className="hover:text-blue-600 transition duration-300 cursor-pointer" />
        <FaPinterestP className="hover:text-blue-600 transition duration-300 cursor-pointer" />
        <FaXTwitter className="hover:text-blue-600 transition duration-300 cursor-pointer" />
        <FaGlobe className="hover:text-blue-600 transition duration-300 cursor-pointer" />
        <span className="text-sm cursor-pointer hover:text-blue-600">
          English (UK)
        </span>
      </div>
    </div>
  );
}

export default Footer;
