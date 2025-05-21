"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import { storage } from "@/config/firebase"; // Adjust path to your firebase config
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const categoryOptions = [
  "Fruits",
  "Vegetables",
  "Beverages",
  "Snacks",
  "Meat & Seafood",
  "Bakery",
  "Dairy",
  "Clothes",
  "Foods",
  "Electronics",
  "Home & Living",
  "Health & Beauty",
  "Toys & Games",
  "Sports & Outdoors",
  "Books & Stationery",
  "Automotive",
  "Jewelry & Accessories",
  "Pet Supplies",
  "Baby & Kids",
  "Gifts & Crafts",
  "Office Supplies",
  "Gardening",
  "Tools & Hardware",
  "Travel & Luggage",
  "Music & Movies",
  "Fashion & Apparel",
  "Watches",
  "Footwear",
  "Cosmetics",
  "Skincare",
];

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
const foodCategories = [
  "Fruits",
  "Vegetables",
  "Beverages",
  "Snacks",
  "Meat & Seafood",
  "Bakery",
  "Dairy",
];

const requiredFields = [
  "productName",
  "description",
  "brand",
  "quantity",
  "price",
  "categories",
  "images",
];

const ProductForm = () => {
  const [formData, setFormData] = useState<{
      productName: string;
      description: string;
      brand: string;
      quantity: number;
      price: number;
      discountPrice: number;
      taxPrice: number;
      ingredients: string;
      expireDate: string;
      seoTitle: string;
      seoDescription: string;
      tags: string[];
      sizes: string[];
      weight: number;
      height: number;
      volume: number;
      shippingCountries: string[];
      estimatedDeliveryTime: number;
      shippingCost: number;
      categories: string[];
      images: string[];
      hasTax: boolean;
      hasVariants: boolean;
      showCategoryDropdown: boolean;
  }>({
      productName: "",
      description: "",
      brand: "",
      quantity: 0,
      price: 0,
      discountPrice: 0,
      taxPrice: 0,
      ingredients: "",
      expireDate: "",
      seoTitle: "",
      seoDescription: "",
      tags: [],
      sizes: [],
      weight: 0,
      height: 0,
      volume: 0,
      shippingCountries: [],
      estimatedDeliveryTime: 0,
      shippingCost: 0,
      categories: [],
      images: [],
      hasTax: false,
      hasVariants: false,
      showCategoryDropdown: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    requiredFields.forEach((field) => {
      if (field === "images" && formData.images.length === 0) {
        newErrors[field] = "At least one image is required";
      } else if (field === "categories" && formData.categories.length === 0) {
        newErrors[field] = "At least one category must be selected";
      } else if (
        (field === "quantity" || field === "price") &&
        formData[field] <= 0
      ) {
        newErrors[field] = `Valid ${field} is required`;
      } else if (
        typeof formData[field as keyof typeof formData] === "string" &&
        !(formData[field as keyof typeof formData] as string).trim()
      ) {
        newErrors[field] = `${field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())} is required`;
      }
    });

    if (
      formData.discountPrice > 0 &&
      formData.discountPrice >= formData.price
    ) {
      newErrors.discountPrice = "Discount price must be less than regular price";
    }

    if (
      formData.categories.some((cat) => foodCategories.includes(cat)) &&
      !formData.ingredients.trim()
    ) {
      newErrors.ingredients = "Ingredients are required for food products";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleSize = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleCategoryToggle = (cat: string, checked: boolean) => {
    const updated = checked
      ? [...formData.categories, cat]
      : formData.categories.filter((c) => c !== cat);

    setFormData({
      ...formData,
      categories: updated,
      tags: updated,
      sizes: updated.includes("Clothes") ? formData.sizes : [],
      ingredients: updated.some((cat) => foodCategories.includes(cat))
        ? formData.ingredients
        : "",
    });

    if (updated.length > 0 && errors.categories) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.categories;
        return newErrors;
      });
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);
    
    if (errors.images) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.images;
        return newErrors;
      });
    }

    const uploadedUrls: string[] = [];
    const totalFiles = files.length;
    let processedFiles = 0;

    try {
      for (const file of Array.from(files)) {
        // Create a unique filename to avoid conflicts
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 15);
        const uniqueFileName = `products/${timestamp}_${randomId}_${file.name}`;
        
        // Create a storage reference
        const storageRef = ref(storage, uniqueFileName);
        
        // Create upload task
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        // Monitor upload progress
        uploadTask.on('state_changed', 
          (snapshot) => {
            // Calculate individual file progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // Calculate overall progress
            const overallProgress = ((processedFiles + (progress / 100)) / totalFiles) * 100;
            setUploadProgress(Math.round(overallProgress));
          }, 
          (error) => {
            console.error("Error uploading file:", error);
            setErrors(prev => ({
              ...prev,
              images: `Failed to upload ${file.name}: ${error.message}`,
            }));
          }, 
          async () => {
            // Upload completed successfully
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              uploadedUrls.push(downloadURL);
              processedFiles++;
              
              // Update progress
              setUploadProgress(Math.round((processedFiles / totalFiles) * 100));
              
              // If all files are processed, update form data
              if (processedFiles === totalFiles) {
                setFormData(prev => ({ 
                  ...prev, 
                  images: [...prev.images, ...uploadedUrls] 
                }));
              }
            } catch (err) {
              console.error("Error getting download URL:", err);
              setErrors(prev => ({
                ...prev,
                images: `Failed to get download URL for ${file.name}`,
              }));
            }
          }
        );
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      setErrors(prev => ({
        ...prev,
        images: `Failed to upload: ${err instanceof Error ? err.message : "Unknown error"}`,
      }));
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Add your auth token here
      const authToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZWxsZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDYzNDYwNTIsImV4cCI6MTc0NjM0OTY1Mn0.ofzaCfw6a1ufjeKJMqJNw_EDRkrGwRG96NEog9FHf-s"; // Replace with your actual token
      
      const response = await axios.post(
        "http://localhost:8080/api/seller/shop/product/add",
        formData,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      alert("Product registered successfully!");
      setFormData({
        productName: "",
        description: "",
        brand: "",
        quantity: 0,
        price: 0,
        discountPrice: 0,
        taxPrice: 0,
        ingredients: "",
        expireDate: "",
        seoTitle: "",
        seoDescription: "",
        tags: [],
        sizes: [],
        weight: 0,
        height: 0,
        volume: 0,
        shippingCountries: [],
        estimatedDeliveryTime: 0,
        shippingCost: 0,
        categories: [],
        images: [],
        hasTax: false,
        hasVariants: false,
        showCategoryDropdown: false,
      });
    } catch (err) {
      console.error("Error details:", err);
      if (axios.isAxiosError(err)) {
        if (err.response) {
          // Server responded with error status
          alert(`Failed to register product: ${err.response.data?.message || err.response.statusText}`);
        } else if (err.request) {
          // Request made but no response
          alert("Failed to connect to server");
        } else {
          // Error setting up request
          alert("Failed to register product");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFoodCategorySelected = formData.categories.some((cat) =>
    foodCategories.includes(cat)
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Register New Product
      </h2>

      {/* Basic Information Section */}
      <div className="bg-gray-50 p-4 rounded-md shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              name="productName"
              className={`w-full border rounded p-2 ${
                errors.productName ? "border-red-500" : ""
              }`}
              value={formData.productName}
              onChange={handleChange}
            />
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">{errors.productName}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">
              Brand <span className="text-red-500">*</span>
            </label>
            <input
              name="brand"
              className={`w-full border rounded p-2 ${
                errors.brand ? "border-red-500" : ""
              }`}
              value={formData.brand}
              onChange={handleChange}
            />
            {errors.brand && (
              <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              className={`w-full border rounded p-2 ${
                errors.description ? "border-red-500" : ""
              }`}
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              name="quantity"
              type="number"
              min="0"
              className={`w-full border rounded p-2 ${
                errors.quantity ? "border-red-500" : ""
              }`}
              value={formData.quantity}
              onChange={handleChange}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-gray-50 p-4 rounded-md shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">
              Product Price <span className="text-red-500">*</span>
            </label>
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter price"
              className={`w-full border p-2 rounded ${
                errors.price ? "border-red-500" : ""
              }`}
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Discount Price</label>
            <input
              name="discountPrice"
              type="number"
              min="0"
              step="0.01"
              placeholder="Price at Discount"
              className={`w-full border p-2 rounded ${
                errors.discountPrice ? "border-red-500" : ""
              }`}
              value={formData.discountPrice}
              onChange={handleChange}
            />
            {errors.discountPrice && (
              <p className="text-red-500 text-sm mt-1">{errors.discountPrice}</p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="hasTax"
              checked={formData.hasTax}
              onChange={handleChange}
              className="mr-2 text-purple-600"
            />
            <span className="text-sm">Add tax for this product</span>
          </label>
        </div>
        
        {/* Tax Price Field - shown when hasTax is checked */}
        {formData.hasTax && (
          <div className="mt-4">
            <label className="block mb-1">Tax Price</label>
            <input
              name="taxPrice"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter tax amount"
              className="w-full border p-2 rounded"
              value={formData.taxPrice}
              onChange={handleChange}
            />
          </div>
        )}
      </div>

      {/* Image Upload Section */}
      <div className="bg-gray-50 p-4 rounded-md shadow-sm">
        <h3 className="text-lg font-semibold mb-3">
          Product Images <span className="text-red-500">*</span>
        </h3>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          disabled={isUploading}
          className={`w-full border p-2 rounded ${
            errors.images ? "border-red-500" : ""
          } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
        />
        
        {isUploading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-purple-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        {errors.images && (
          <p className="text-red-500 text-sm mt-1">{errors.images}</p>
        )}

        <div className="flex flex-wrap gap-3 mt-3">
          {formData.images.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`Uploaded ${index}`}
                className="w-24 h-24 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {formData.images.length > 0 && (
          <p className="text-sm text-gray-500 mt-2">
            {formData.images.length} image(s) uploaded
          </p>
        )}
      </div>

      {/* Categories & Tags Section */}
      <div className="bg-gray-50 p-4 rounded-md shadow-sm">
        <h3 className="text-lg font-semibold mb-3">
          Categories & Tags <span className="text-red-500">*</span>
        </h3>
        <div className="relative w-full">
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                showCategoryDropdown: !prev.showCategoryDropdown,
              }))
            }
            className={`w-full text-left border rounded p-2 bg-white shadow-sm ${
              errors.categories ? "border-red-500" : ""
            }`}
          >
            {formData.categories.length > 0
              ? formData.categories.join(", ")
              : "Select Categories ▼"}
          </button>
          {errors.categories && (
            <p className="text-red-500 text-sm mt-1">{errors.categories}</p>
          )}

          {formData.showCategoryDropdown && (
            <div className="absolute mt-2 w-full border rounded bg-white shadow z-10">
              <div className="text-right p-2 border-b">
                <button
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      showCategoryDropdown: false,
                    }))
                  }
                  className="text-sm text-gray-500 hover:text-black"
                >
                  Close ✖
                </button>
              </div>
              {categoryOptions.map((cat) => (
                <label
                  key={cat}
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={formData.categories.includes(cat)}
                    onChange={(e) =>
                      handleCategoryToggle(cat, e.target.checked)
                    }
                  />
                  {cat}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4">
          <label className="block mb-1">Auto-filled Tags</label>
          <input
            name="tags"
            className="w-full border rounded p-2"
            value={formData.tags.join(", ")}
            readOnly
          />
        </div>
      </div>

      {/* Additional Product Information Section */}
      <div className="bg-gray-50 p-4 rounded-md shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Additional Information</h3>
        
        {/* Conditional Food Ingredients */}
        {isFoodCategorySelected && (
          <>
            <div className="mb-4">
              <label className="block mb-1">
                Food Ingredients
                {errors.ingredients && <span className="text-red-500">*</span>}
              </label>
              <input
                name="ingredients"
                className={`w-full border rounded p-2 ${
                  errors.ingredients ? "border-red-500" : ""
                }`}
                placeholder="Enter ingredients"
                value={formData.ingredients}
                onChange={handleChange}
              />
              {errors.ingredients && (
                <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1">Expire Date</label>
                <input
                  name="expireDate"
                  type="date"
                  className="w-full border rounded p-2"
                  value={formData.expireDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        )}

        {/* SEO Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">SEO Title</label>
            <input
              name="seoTitle"
              className="w-full border rounded p-2"
              placeholder="SEO Title"
              value={formData.seoTitle}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="block mb-1">SEO Description</label>
            <input
              name="seoDescription"
              className="w-full border rounded p-2"
              placeholder="SEO Description"
              value={formData.seoDescription}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Shipping Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">Weight (kg)</label>
            <input
              name="weight"
              type="number"
              min="0"
              step="0.1"
              className="w-full border rounded p-2"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="block mb-1">Height (cm)</label>
            <input
              name="height"
              type="number"
              min="0"
              step="0.1"
              className="w-full border rounded p-2"
              value={formData.height}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="block mb-1">Volume (L)</label>
            <input
              name="volume"
              type="number"
              min="0"
              step="0.1"
              className="w-full border rounded p-2"
              value={formData.volume}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="block mb-1">Shipping Cost</label>
            <input
              name="shippingCost"
              type="number"
              min="0"
              step="0.01"
              className="w-full border rounded p-2"
              value={formData.shippingCost}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="block mb-1">Estimated Delivery Time (days)</label>
            <input
              name="estimatedDeliveryTime"
              type="number"
              min="0"
              className="w-full border rounded p-2"
              value={formData.estimatedDeliveryTime}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="block mb-1">Shipping Countries</label>
            <input
              name="shippingCountries"
              className="w-full border rounded p-2"
              placeholder="e.g., Sri Lanka, India"
              value={formData.shippingCountries.join(", ")}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                shippingCountries: e.target.value.split(',').map(s => s.trim()).filter(s => s)
              }))}
            />
          </div>
        </div>
      </div>

      {/* Sizes Section (for Clothes) */}
      {formData.categories.includes("Clothes") && (
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold mb-3">Clothing Sizes</h3>
          <div className="flex flex-wrap gap-3">
            {sizeOptions.map((size) => (
              <label key={size} className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="mr-1"
                  checked={formData.sizes.includes(size)}
                  onChange={() => toggleSize(size)}
                />
                <span className="text-sm">{size}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className={`bg-purple-600 text-white py-2 px-6 rounded hover:bg-purple-700 ${
            isSubmitting || isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;