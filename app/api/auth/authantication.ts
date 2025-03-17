import axios from "axios";
import { BASE_URL } from "@/config/baseUrl";

// Create an axios instance with the base URL and default headers
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ----------------------
// Login API Call
// ----------------------
export interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async ({ email, password }: LoginData) => {
  try {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    // You can further process the error here if needed
    throw error;
  }
};

// ----------------------
// Registration API Call
// ----------------------
export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export const registerUser = async (data: RegistrationData) => {
  try {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
// ----------------------
// Request OTP API Call
// ----------------------
export interface RequestOtpData {
  email: string;
}

export const requestOtp = async ({ email }: RequestOtpData) => {
  try {
    // This endpoint should trigger the server to generate an OTP and send it via email.
    const response = await apiClient.post("/auth/send-otp", { email });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// ----------------------
// Reset Password With OTP API Call
// ----------------------
export interface ResetPasswordWithOTPData {
  email: string;
  otp: string;
  newPassword: string;
}

export const resetPasswordWithOTP = async ({
  email,
  otp,
  newPassword,
}: ResetPasswordWithOTPData) => {
  try {
    const response = await apiClient.post("/auth/reset-password-otp", {
      email,
      otp,
      newPassword,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
// ----------------------
// Logout API Call
// ----------------------
// export const logoutUser = async () => {
//   try {
//     // Call your server endpoint that handles logout (e.g. clears session, updates the database, etc.)
//     const response = await apiClient.post("/auth/logout");
//     return response.data;
//   } catch (error: any) {
//     throw error;
//   }
// };
