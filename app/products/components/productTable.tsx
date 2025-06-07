"use client";

type Product = {
  id: string | number;
  name: string;
  category: string;
  price: number;
  stock: number;
};

interface ProductTableProps {
  products: Product[];
  onRowClick: (id: Product['id']) => void;
}

export default function ProductTable({ products, onRowClick }: ProductTableProps) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2 text-left">Name</th>
          <th className="border border-gray-300 p-2 text-left">Category</th>
          <th className="border border-gray-300 p-2 text-right">Price</th>
          <th className="border border-gray-300 p-2 text-right">Stock</th>
        </tr>
      </thead>
      <tbody>
        {products.map((prod) => (
          <tr
            key={prod.id}
            className="cursor-pointer hover:bg-gray-200"
            onClick={() => onRowClick(prod.id)}
          >
            <td className="border border-gray-300 p-2">{prod.name}</td>
            <td className="border border-gray-300 p-2">{prod.category}</td>
            <td className="border border-gray-300 p-2 text-right">
              ${prod.price.toFixed(2)}
            </td>
            <td className="border border-gray-300 p-2 text-right">{prod.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
