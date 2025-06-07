"use client";

import { useState, useEffect } from "react";

type ProductFormProps = {
  onSubmit: (data: {
    name: string;
    category: string;
    price: number | string;
    stock: number | string;
    description: string;
  }) => void;
  initialData?: {
    name?: string;
    category?: string;
    price?: number | string;
    stock?: number | string;
    description?: string;
  };
  loading?: boolean;
};

export default function ProductForm({ onSubmit, initialData = {}, loading }: ProductFormProps) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    ...initialData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validation example
    if (!form.name || !form.price) {
      alert("Please fill in product name and price");
      return;
    }

    onSubmit({
      ...form,
      price: parseFloat(form.price.toString()),
      stock: parseInt(form.stock?.toString() || "0", 10),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold mb-1" htmlFor="name">
          Product Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="category">
          Category
        </label>
        <input
          id="category"
          name="category"
          type="text"
          value={form.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="price">
          Price *
        </label>
        <input
          id="price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="stock">
          Stock Quantity
        </label>
        <input
          id="stock"
          name="stock"
          type="number"
          min="0"
          value={form.stock}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
}
