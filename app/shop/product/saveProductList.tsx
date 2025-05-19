"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useRouter } from "next/navigation";

const SaveProductList = () => {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const generatePDF = () => {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Product List", 14, 20);

      autoTable(doc, {
        startY: 30,
        head: [["ID", "Product Name", "Category", "Price", "Stock"]],
        body: [
          [1, "T-Shirt", "Apparel", "Rs 1,200.00", "In Stock"],
          [2, "Hoodie", "Winter", "Rs 2,800.00", "Out of Stock"],
          [3, "Shoes", "Footwear", "Rs 4,500.00", "In Stock"],
        ],
      });

      doc.save("product-list.pdf");
    };

    generatePDF();

    // Hide message and return after 3 seconds
    const timer = setTimeout(() => {
      setShowMessage(false);
      router.push("/shop"); // Redirect to shop page
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {showMessage && (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold text-green-600 mb-2">Download Successful!</h2>
          <p className="text-gray-600">Redirecting to shop...</p>
        </div>
      )}
    </div>
  );
};

export default SaveProductList;
