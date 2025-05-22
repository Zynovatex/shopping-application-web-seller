"use client";
import React, { useState } from "react";
import ProfileForm from "./ProfileForm";
import ShopDetailsForm from "./ShopDetailsForm";
import RegistrationForm from "./RegistrationForm";
import PaymentOthersForm from "./PaymentOthersForm";
import { ShopDTO, registerShop } from "../api/auth/shopRegistration";
import Footer from "../component/layout/FullFooter";

const ShopRegistrationPage: React.FC = () => {
  const [step, setStep] = useState(1);

  // State matching your ShopDTO structure
  const [shopData, setShopData] = useState<ShopDTO>({
    // Profile
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    language: "English",
    profilePicture: "",

    // Shop Details
    shopName: "",
    address: "",
    category: "",
    district: "",
    area: "",
    shopType: "",
    deliveryAvailable: true,
    description: "",
    shopImages: [],

    // Registration
    registrationNumber: "",
    taxNumber: "",
    vatRegistered: true,
    registrationType: "",
    registrationDocuments: [],

    // Payment & Others
    cashOnDelivery: false,
    onlinePayment: false,
    mobilePayment: false,
    additionalPhotos: [],
  });

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle input changes from child forms
  const handleChange = (field: string, value: any) => {
    setShopData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Step navigation
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  // Final save on last form
  const handleFinalSave = async () => {
    try {
      const token = localStorage.getItem("authToken") || "";
      const response = await registerShop(shopData, token);
      console.log("Shop registration successful:", response);

      // Show success modal
      setIsSuccess(true);
      setShowModal(true);
    } catch (error) {
      console.error("Error registering shop:", error);

      // Show failure modal
      setIsSuccess(false);
      setShowModal(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Step Forms */}
      {step === 1 && (
        <ProfileForm
          firstName={shopData.firstName}
          lastName={shopData.lastName}
          contactNumber={shopData.contactNumber}
          email={shopData.email}
          language={shopData.language}
          profilePicture={shopData.profilePicture}
          onChange={handleChange}
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <ShopDetailsForm
          shopName={shopData.shopName}
          address={shopData.address}
          category={shopData.category}
          district={shopData.district}
          area={shopData.area}
          shopType={shopData.shopType}
          deliveryAvailable={shopData.deliveryAvailable}
          description={shopData.description}
          shopImages={shopData.shopImages}
          onChange={handleChange}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <RegistrationForm
          registrationNumber={shopData.registrationNumber}
          taxNumber={shopData.taxNumber}
          vatRegistered={shopData.vatRegistered}
          registrationType={shopData.registrationType}
          registrationDocuments={shopData.registrationDocuments}
          onChange={handleChange}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 4 && (
        <PaymentOthersForm
          cashOnDelivery={shopData.cashOnDelivery}
          onlinePayment={shopData.onlinePayment}
          mobilePayment={shopData.mobilePayment}
          additionalPhotos={shopData.additionalPhotos}
          onChange={handleChange}
          onSave={handleFinalSave}
          onBack={handleBack}
        />
      )}

      {/* Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* Modal Content */}
          <div className="bg-white p-6 rounded shadow-md text-center w-80 relative">
            {isSuccess ? (
              <>
                {/* Circle with Check Icon */}
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100">
                  <svg
                    className="w-8 h-8 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-4">
                  Pending for Approval
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors"
                >
                  Continue
                </button>
              </>
            ) : (
              <>
                {/* Circle with Cross Icon */}
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-4">Save Failed</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition-colors"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ShopRegistrationPage;
