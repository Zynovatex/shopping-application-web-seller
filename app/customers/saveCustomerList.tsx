"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useRouter } from "next/navigation";

const SaveCustomerList = () => {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const generatePDF = () => {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Customer List", 14, 20);

      autoTable(doc, {
        startY: 30,
        head: [["ID", "Name", "Email", "Phone", "Total Orders"]],
        body: [
          [1, "Kamal Perera", "kamal@example.com", "077-1234567", "4"],
          [2, "Nisansala Gunawardena", "nisa@example.com", "071-9876543", "2"],
          [3, "Dilan Weerasinghe", "dilanw@example.com", "075-7654321", "7"],
        ],
      });

      doc.save("customer-list.pdf");
    };

    generatePDF();

    const timer = setTimeout(() => {
      setShowMessage(false);
      router.push("/customers");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {showMessage && (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold text-green-600 mb-2">Download Successful!</h2>
          <p className="text-gray-600">Redirecting to customers...</p>
        </div>
      )}
    </div>
  );
};

export default SaveCustomerList;
