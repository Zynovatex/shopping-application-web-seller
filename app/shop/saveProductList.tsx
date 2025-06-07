"use client";

import React from "react";
import jsPDF from "jspdf";

const demoProducts = [
  {
    id: 1,
    name: "T-Shirt",
    category: "Clothes",
    inventory: 150,
    inStock: true,
    color: "Red",
    price: "1200 LKR",
    rating: 4.8,
    votes: 230,
  },
  {
    id: 2,
    name: "Sneakers",
    category: "Shoes",
    inventory: 0,
    inStock: false,
    color: "Brown",
    price: "80 LKR",
    rating: 3.9,
    votes: 34,
  },
  {
      id: 3,
      name: "Sneakers",
      category: "Shoes",
      image: "/sneakers.jpeg",
      inventory: 0,
      inStock: false,
      color: "Brown",
      price: "8000 LKR",
      rating: 3.9,
      votes: 34,
      selected: false,
    },
    {
    id: 4,
      name: "T-Shirt",
      category: "Clothes",
      image: "/tshirt_2.jpeg",
      inventory: 150,
      inStock: true,
      color: "Red",
      price: "1200 LKR",
      rating: 4.8,
      votes: 230,
      selected: false,
    },
    {
      id: 5,
      name: "T-Shirt",
      category: "Sportswear",
      image: "/tshirt.jpeg",
      inventory: 50,
      inStock: true,
      color: "White",
      price: "4500 LKR",
      rating: 4.2,
      votes: 89,
      selected: false,
    },
    {
      id: 6,
      name: "Sneakers",
      category: "Shoes",
      image: "/sneakers.jpeg",
      inventory: 0,
      inStock: false,
      color: "Brown",
      price: "8000 LKR",
      rating: 3.9,
      votes: 34,
      selected: false,
    },
    {
      id: 7,
      name: "Sneakers",
      category: "Shoes",
      image: "/sneakers.jpeg",
      inventory: 0,
      inStock: false,
      color: "Brown",
      price: "8000 LKR",
      rating: 3.9,
      votes: 34,
      selected: false,
    },
     {
      id: 8,
      name: "T-Shirt",
      category: "Clothes",
      image: "/tshirt_2.jpeg",
      inventory: 150,
      inStock: true,
      color: "Red",
      price: "1200 LKR",
      rating: 4.8,
      votes: 230,
      selected: false,
    },
    {
      id: 9,
      name: "T-Shirt",
      category: "Sportswear",
      image: "/tshirt.jpeg",
      inventory: 50,
      inStock: true,
      color: "White",
      price: "4500 LKR",
      rating: 4.2,
      votes: 89,
      selected: false,
    },
    {
      id: 10,
      name: "Sneakers",
      category: "Shoes",
      image: "/sneakers.jpeg",
      inventory: 0,
      inStock: false,
      color: "Brown",
      price: "8000 LKR",
      rating: 3.9,
      votes: 34,
      selected: false,
    },
    {
    id: 11,
      name: "T-Shirt",
      category: "Clothes",
      image: "/tshirt_2.jpeg",
      inventory: 150,
      inStock: true,
      color: "Red",
      price: "1200 LKR",
      rating: 4.8,
      votes: 230,
      selected: false,
    },
    {
      id: 12,
      name: "T-Shirt",
      category: "Sportswear",
      image: "/tshirt.jpeg",
      inventory: 50,
      inStock: true,
      color: "White",
      price: "4500 LKR",
      rating: 4.2,
      votes: 89,
      selected: false,
    },
    {
      id: 13,
      name: "Sneakers",
      category: "Shoes",
      image: "/sneakers.jpeg",
      inventory: 0,
      inStock: false,
      color: "Brown",
      price: "8000 LKR",
      rating: 3.9,
      votes: 34,
      selected: false,
    },
    {
      id: 14,
      name: "Sneakers",
      category: "Shoes",
      image: "/sneakers.jpeg",
      inventory: 0,
      inStock: false,
      color: "Brown",
      price: "8000 LKR",
      rating: 3.9,
      votes: 34,
      selected: false,
    },
];

const SaveProductList = () => {
  const exportProductsToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Product List", 14, 22);

    const tableColumn = ["Product", "Category", "Inventory", "Color", "Price", "Rating"];
    const tableRows: any[] = [];

    demoProducts.forEach(product => {
      const productData = [
        product.name,
        product.category,
        product.inStock ? product.inventory.toString() : "Out of Stock",
        product.color,
        product.price,
        `${product.rating} (${product.votes} votes)`,
      ];
      tableRows.push(productData);
    });

    let startY = 30;
    doc.setFontSize(12);
    doc.text(tableColumn.join(" | "), 14, startY);

    startY += 8;
    tableRows.forEach(row => {
      doc.text(row.join(" | "), 14, startY);
      startY += 8;
      if (startY > 280) {
        doc.addPage();
        startY = 20;
      }
    });

    doc.save("product-list.pdf");
  };

  return (
    <div className="p-6">
      <button
        onClick={exportProductsToPDF}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
      >
        Export Product List to PDF
      </button>
    </div>
  );
};

export default SaveProductList;
