// api/productApi.ts
import axios from "axios";
import { BASE_URL } from "@/config/baseUrl";



export const addProduct = async (productData: any) => {
  try {
    const token = localStorage.getItem("authToken"); // Get token from localStorage (make sure it's stored after login)
    
    const response = await axios.post(`${BASE_URL}/seller/shop/product/add`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
