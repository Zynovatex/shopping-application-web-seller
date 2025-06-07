

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductForm from "../components/productForm";

// Define product type
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
}

// Define expected params structure from route
interface ParamsType {
  productId: string;
}

export default function ProductDetailPage({ params }: { params: ParamsType }) {
  const { productId } = params;
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  // Fetch product on mount
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err: any) {
        alert(err?.message || "Something went wrong");
        router.push("/products");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId, router]);

  const handleUpdate = async (updatedData: Product) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error("Failed to update product");
      const updatedProduct = await res.json();
      setProduct(updatedProduct);
      setEditMode(false);
    } catch (err: any) {
      alert(err?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      router.push("/products");
    } catch (err: any) {
      alert(err?.message || "Delete failed");
    }
  };

  if (loading) return <p className="p-6">Loading product...</p>;
  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

      {editMode ? (
        <ProductForm
          initialData={product}
          onSubmit={(data: { name: string; category: string; price: string | number; stock: string | number; description: string; }) =>
            handleUpdate({
              id: product.id,
              name: data.name,
              category: data.category,
              price: typeof data.price === "string" ? parseFloat(data.price) : data.price,
              stock: typeof data.stock === "string" ? parseInt(data.stock as string, 10) : data.stock,
              description: data.description,
            })
          }
          loading={saving}
        />
      ) : (
        <div className="space-y-2 mb-6">
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> LKR {product.price.toFixed(2)}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Description:</strong></p>
          <p>{product.description}</p>
        </div>
      )}

      <div className="flex space-x-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Cancel" : "Edit"}
        </button>
        {!editMode && (
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}


