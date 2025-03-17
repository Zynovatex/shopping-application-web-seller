import axios from "axios";
import { BASE_URL } from "@/config/baseUrl";

// Create an axios instance with the base URL and default headers
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// A type matching your ShopDTO fields (example based on your UI)
export interface ShopDTO {
  // --- Profile ---
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  language: string;
  profilePicture?: string; // URL after Firebase upload

  // --- Shop Details ---
  shopName: string;
  address: string;
  category: string;
  district: string;
  area: string;
  shopType: string;
  deliveryAvailable: boolean;
  description: string;
  shopImages: string[]; // array of URLs after Firebase upload

  // --- Registration ---
  registrationNumber: string;
  taxNumber: string;
  vatRegistered: boolean;
  registrationType: string;
  registrationDocuments: string[]; // array of URLs after Firebase upload

  // --- Payment & Others ---
  cashOnDelivery: boolean;
  onlinePayment: boolean;
  mobilePayment: boolean;
  additionalPhotos: string[]; // up to 10 photos from Payment & Others section
}

// Example: Function to register a shop
export const registerShop = async (shopData: ShopDTO, token: string) => {
  // Optionally, if your backend expects a Bearer token:
  const response = await apiClient.post("/seller/shop/register", shopData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // returns the Shop object or success message
};
