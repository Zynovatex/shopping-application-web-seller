import { 
    FaTiktok, 
    FaFacebookF, 
    FaLinkedinIn, 
    FaInstagram, 
    FaPinterestP, 
    FaGlobe 
  } from "react-icons/fa";
  import { FaXTwitter } from "react-icons/fa6";
  
  const footerLinks = [
    {
      heading: "Shop",
      links: ["New Arrivals", "Best Sellers", "Top Deals", "Gift Cards"],
    },
    {
      heading: "Customer Service",
      links: ["Help Center", "Track Order", "Shipping & Delivery", "Returns & Refunds"],
    },
    {
      heading: "Company",
      links: ["About VirtualCity", "Careers", "Investor Relations", "Blog"],
    },
    {
      heading: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Intellectual Property"],
    },
    {
      heading: "Follow Us",
      links: ["Facebook", "Instagram", "Twitter", "LinkedIn"],
    },
  ];
  
  export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white">
  
        {/* Top Section with Links */}
        <div className="bg-[url('/footer.jpg')] bg-cover bg-center bg-no-repeat py-10 px-6 md:px-12 lg:px-24 rounded-t-lg">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center md:text-left">
            {footerLinks.map((section, i) => (
              <div key={i} className="space-y-3">
                <h3 className="font-semibold text-lg text-white mb-2 relative after:content-[''] after:block after:w-12 after:h-1 after:bg-[#7b5af7] after:mt-2 after:mx-auto md:after:mx-0">
                  {section.heading}
                </h3>
                <ul className="space-y-1">
                  {section.links.map((link, j) => (
                    <li key={j} className="text-gray-400 text-sm cursor-pointer hover:text-[#7b5af7] transition duration-300">
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
  
        {/* Bottom Section with Branding & Social Media */}
        <div className="border-t border-gray-700 py-2 px-4 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between text-gray-400 space-y-2 md:space-y-0 bg-black text-center md:text-left">
          
          {/* Branding */}
          <div className="text-2xl md:text-3xl font-bold text-white flex items-center gap-0">
            <span className="text-[#7b5af7]">Virtual</span><span className="text-white">City</span>
          </div>

          {/* Copyright */}
          <p className="text-sm">&copy; {new Date().getFullYear()} VirtualCity. All Rights Reserved.</p>
  
          {/* Social Icons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-xl">
            <FaTiktok className="hover:text-[#7b5af7] transition duration-300 cursor-pointer" />
            <FaFacebookF className="hover:text-[#7b5af7] transition duration-300 cursor-pointer" />
            <FaLinkedinIn className="hover:text-[#7b5af7] transition duration-300 cursor-pointer" />
            <FaInstagram className="hover:text-[#7b5af7] transition duration-300 cursor-pointer" />
            <FaPinterestP className="hover:text-[#7b5af7] transition duration-300 cursor-pointer" />
            <FaXTwitter className="hover:text-[#7b5af7] transition duration-300 cursor-pointer" />
            <FaGlobe className="hover:text-[#7b5af7] transition duration-300 cursor-pointer" />
            <span className="text-sm cursor-pointer hover:text-[#7b5af7]">English (UK)</span>
          </div>
        </div>
      </footer>
    );
  }
  