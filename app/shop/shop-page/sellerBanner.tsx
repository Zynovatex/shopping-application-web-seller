
// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// const SellerBanner = () => {
//   const [banners, setBanners] = useState<string[]>([]);
//   const [currentIndex, setCurrentIndex] = useState<number>(1);

//   useEffect(() => {
//     // Fetch banners dynamically (Replace with API call if needed)
//     setBanners([
//       "/b1.jpg",
//       "/b6.jpg",
//       "/b4.jpg",
//       "/b3.jpg",
//       "/b2.jpg",
//     ]);
//   }, []);

// //   // Auto-slide effect every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextBanner();
//     }, 5000);

//     return () => clearInterval(interval); // Cleanup interval on unmount
//   }, [currentIndex]);

//   const nextBanner = () => {
//     setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
//   };

//   const prevBanner = () => {
//     setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
//   };

//   return (
//     <div className="relative w-full flex flex-col items-center mt-6">
//       {/* Banner Container */}
//       <div className="relative w-full max-w-4xl h-[350px] flex justify-center items-center overflow-hidden">
//         {banners.length > 0 &&
//           banners.map((banner, index) => {
//             let position = index - currentIndex;
//             if (position < -2) position += banners.length;
//             if (position > 2) position -= banners.length;

//             return (
//               <div
//                 key={index}
//                 className={`absolute transition-all duration-700 ease-in-out ${
//                   position === 0
//                     ? "scale-110 z-20 opacity-100"
//                     : position === -1 || position === 1
//                     ? "scale-90 z-10 opacity-100" // Side banners
//                     : "scale-75 z-0 opacity-0" // Hide farthest banners
//                 }`}
//                 style={{
//                   transform: `translateX(${position * 40}%)`,
//                   clipPath: position === 0 ? "none" : "inset(0 10% 0 10%)", // Clip side banners
//                 }}
//               >
//                 <Image
//                   src={banner}
//                   alt={`Banner ${index + 1}`}
//                   width={500}
//                   height={200}
//                   className="rounded-2xl shadow-md object-cover"
//                   unoptimized
//                 />
//               </div>
//             );
//           })}
//       </div>

//       {/* Navigation Arrows */}
//       <button
//         onClick={prevBanner}
//         className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black transition hidden md:block"
//       >
//         <FiChevronLeft size={32} />
//       </button>
//       <button
//         onClick={nextBanner}
//         className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black transition hidden md:block"
//       >
//         <FiChevronRight size={32} />
//       </button>

//       {/* Dots Indicator */}
//       <div className="flex mt-4 space-x-2">
//         {banners.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-3 h-3 rounded-full transition ${
//               index === currentIndex ? "bg-[#5A31F5]" : "bg-gray-300"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SellerBanner;

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const SellerBanner = () => {
  const [banners, setBanners] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(1);

  useEffect(() => {
    setBanners(["/b1.jpg", "/b6.jpg", "/b4.jpg", "/b3.jpg", "/b2.jpg"]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextBanner();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextBanner = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevBanner = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full flex flex-col items-center mt-6">
      <div className="relative w-full max-w-4xl h-[300px] md:h-[400px] flex justify-center items-center overflow-hidden">
        {banners.length > 0 &&
          banners.map((banner, index) => {
            let position = index - currentIndex;
            if (position < -2) position += banners.length;
            if (position > 2) position -= banners.length;

            return (
              <div
                key={index}
                className={`absolute transition-all duration-700 ease-in-out ${
                  position === 0
                    ? "scale-110 z-20 opacity-100"
                    : position === -1 || position === 1
                    ? "scale-90 z-10 opacity-100"
                    : "scale-75 z-0 opacity-0"
                }`}
                style={{
                  transform: `translateX(${position * 40}%)`,
                  clipPath: position === 0 ? "none" : "inset(0 10% 0 10%)",
                }}
              >
                <Image
                  src={banner}
                  alt={`Banner ${index + 1}`}
                  width={500}
                  height={250}
                  className="rounded-2xl shadow-md object-cover"
                  unoptimized
                />
              </div>
            );
          })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevBanner}
        className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black transition"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={nextBanner}
        className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black transition"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="flex mt-4 space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentIndex ? "bg-[#5A31F5]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SellerBanner;
