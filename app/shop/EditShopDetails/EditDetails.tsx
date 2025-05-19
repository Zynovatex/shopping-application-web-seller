// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const EditShopDetails = () => {
//   const [name, setName] = useState(""); // State for Shop Name
//   const [description, setDescription] = useState(""); // State for Shop Description
//   const [logo, setLogo] = useState<File | null>(null);
//   const [banner, setBanner] = useState<File | null>(null);
//   const [error, setError] = useState(""); // Error message state
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   // Handle Form Submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name.trim()) {
//       setError("Shop name is required."); // Show error if name is empty
//       return;
//     }

    
//     setLoading(true);
//     setError("");

//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("description", description);
//       if (logo) formData.append("logo", logo);
//       if (banner) formData.append("banner", banner);
    

//       const response = await fetch("/api/shops/seller", {
//         method: "PUT",
//         body: formData,
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // optional if secured
//         },
//       });

//       if (!response.ok) {
//         const res = await response.json();
//         throw new Error(res.message || "Failed to update shop.");
//       }

//       const updated = await response.json();
//       console.log("Shop updated:", updated);

//       // Navigate to seller shop view page
//       router.push("/shop");
//     } catch (err: any) {
//       console.error(err);
//       setError(err.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   }
  

// const handleCancel = () => {
//   router.push("/shop"); // Adjust if your folder is renamed (e.g., `/shop`)
// };


//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-xl font-semibold mb-4">Edit Shop Details</h2>

//       <form onSubmit={handleSubmit}>
//         {/* Shop Name */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Name <span className="text-red-500">**</span>
//           </label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className={`w-full p-2 border rounded-md ${
//               error ? "border-red-500" : "border-gray-300"
//             }`}
//             placeholder="Enter shop name"
//           />
//           {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//         </div>

//         {/* Shop Description */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Shop Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             placeholder="Enter shop description"
//             rows={4}
//           ></textarea>
//         </div>

//         {/* Upload Shop Image */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Update Shop Image</label>
//           <div className="border border-dashed border-gray-400 rounded-md p-6 text-center">
//             <button type="button" className="bg-[#5A31F5] text-white px-4 py-2 rounded-md">
//               Add File
//             </button>
//             <p className="text-gray-500 text-sm mt-2">Or drag and drop files</p>
//           </div>
//         </div>

//         {/* Upload Shop Banner */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700">Update Shop Banner</label>
//           <div className="border border-dashed border-gray-400 rounded-md p-6 text-center">
//             <button type="button" className="bg-[#5A31F5] text-white px-4 py-2 rounded-md">
//               Add File
//             </button>
//             <p className="text-gray-500 text-sm mt-2">Or drag and drop files</p>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end space-x-4">
//           <button
//             type="button"
//             onClick={handleCancel}
//             className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             onClick={handleSubmit}
//             disabled={!name.trim()} // Disable if name is empty
//             className={`px-4 py-2 rounded-md text-white ${
//               name.trim() ? "bg-[#5A31F5] hover:bg-[#4827C4]" : "bg-gray-300 cursor-not-allowed"
//             } transition`}
//           >
//             {loading ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditShopDetails;


// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// const EditShopPage = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [logo, setLogo] = useState<File | null>(null);
//   const [banner, setBanner] = useState<File | null>(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   // Fetch current shop data
//   useEffect(() => {
//     const fetchShop = async () => {
//       try {
//         const res = await fetch("/api/shops/seller", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//           },
//         });
//         const data = await res.json();
//         setName(data.shopName || "");
//         setDescription(data.description || "");
//       } catch (err) {
//         console.error("Failed to load shop info", err);
//       }
//     };
//     fetchShop();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!name.trim()) {
//       setError("Shop name is required.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("description", description);
//       if (logo) formData.append("logo", logo);
//       if (banner) formData.append("banner", banner);

//       const response = await fetch("/api/shops/seller", {
//         method: "PUT",
//         body: formData,
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//         },
//       });

//       if (!response.ok) throw new Error("Failed to update shop");

//       router.push("/shop/shop-page");
//     } catch (err: any) {
//       setError(err.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-xl font-semibold mb-4 text-center">Edit Shop Details</h2>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Shop Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Shop Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             className="w-full mt-1 p-2 border rounded-md"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//         </div>

//         {/* Shop Description */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Shop Description</label>
//           <textarea
//             rows={4}
//             className="w-full mt-1 p-2 border rounded-md"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         {/* Logo Upload */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Upload Logo</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setLogo(e.target.files?.[0] || null)}
//             className="mt-1 w-full border p-2 rounded-md"
//           />
//           {logo && <p className="text-sm text-gray-500 mt-1">Selected: {logo.name}</p>}
//         </div>

//         {/* Banner Upload */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Upload Banner</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setBanner(e.target.files?.[0] || null)}
//             className="mt-1 w-full border p-2 rounded-md"
//           />
//           {banner && <p className="text-sm text-gray-500 mt-1">Selected: {banner.name}</p>}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-between">
//           <button
//             type="button"
//             onClick={() => router.push("/shop/shop-page")}
//             className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className={`px-4 py-2 text-white rounded-md ${
//               loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#5A31F5] hover:bg-[#4827C4]"
//             }`}
//           >
//             {loading ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditShopPage;


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const EditShopPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [bannerFiles, setBannerFiles] = useState<File[]>([]);

  // Load current shop info
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await fetch("/api/shops/seller", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });
        const data = await res.json();
        setName(data.shopName || "");
        setDescription(data.description || "");
      } catch (err) {
        console.error("Failed to load shop info", err);
      }
    };
    fetchShop();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Shop name is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (logo) formData.append("logo", logo);
      if (banner) formData.append("banner", banner);

      const res = await fetch("/api/shops/seller", {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!res.ok) throw new Error("Failed to update shop");
      router.push("/shop/shop-page");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/shop/shop-page");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Edit Shop Details</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Shop Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter shop name"
            className={`w-full p-2 border rounded-md ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Description */}
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Shop Description <span className="text-gray-400">(Max 250 characters)</span>
          </label>
          <textarea
           rows={4}
           maxLength={250}
           value={description}
           onChange={(e) => setDescription(e.target.value)}
           placeholder="Enter shop description"
           className="w-full p-2 border border-gray-300 rounded-md"
          />
          <p className="text-right text-sm text-gray-500 mt-1">
           {description.length} / 250 characters
          </p>
        </div>


        {/* Logo Upload */}
        
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Upload Shop Logo
  </label>
  <div
    onDrop={(e) => {
      e.preventDefault();
      setLogo(e.dataTransfer.files?.[0] || null);
    }}
    onDragOver={(e) => e.preventDefault()}
    className="border-2 border-dashed border-gray-400 rounded-md p-6 text-center cursor-pointer hover:border-[#5A31F5]"
  >
    <label className="inline-block bg-[#5A31F5] text-white px-4 py-2 rounded-md cursor-pointer">
      Add File
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => setLogo(e.target.files?.[0] || null)}
      />
    </label>
    {logo && <p className="text-sm text-gray-600 mt-2">Selected: {logo.name}</p>}
    <p className="text-gray-500 text-sm mt-2">Or drag and drop files</p>
  </div>
</div>


        {/* Banner Upload */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Upload Shop Banners
  </label>
  <div
    onDrop={(e) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      setBannerFiles(files);
    }}
    onDragOver={(e) => e.preventDefault()}
    className="border-2 border-dashed border-gray-400 rounded-md p-6 text-center cursor-pointer hover:border-[#5A31F5]"
  >
    <label className="inline-block bg-[#5A31F5] text-white px-4 py-2 rounded-md cursor-pointer">
      Add Files
      <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) =>
          setBannerFiles(e.target.files ? Array.from(e.target.files) : [])
        }
      />
    </label>

    {bannerFiles.length > 0 && (
      <ul className="text-sm text-gray-600 mt-2">
        {bannerFiles.map((file, i) => (
          <li key={i}>• {file.name}</li>
        ))}
      </ul>
    )}
    <p className="text-gray-500 text-sm mt-2">
      Or drag and drop files here
    </p>
    <p className="text-xs text-gray-400 mt-1 italic">
      Recommended size: 1200×400 pixels. You can upload multiple banners.
    </p>
  </div>
</div>


        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !name.trim()}
            className={`px-4 py-2 rounded-md text-white ${
              name.trim()
                ? "bg-[#5A31F5] hover:bg-[#4827C4]"
                : "bg-gray-300 cursor-not-allowed"
            } transition`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditShopPage;
