
"use client";

import { useState } from "react";
import { FiClock, FiCheckCircle, FiTruck, FiPackage, FiX } from "react-icons/fi";
import SellerNav from "@/app/component/layout/SellerNav";
import Footer from "@/app/component/layout/FullFooter";

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  quantity: number;
  details: Record<string, string>; // dynamic key-value details, e.g., { Color: "Red", Size: "M", GiftWrap: "Yes" }
}

interface OrderType {
  id: string;
  customer: string;
  date: string;
  status: "pending" | "accepted" | "shipped" | "delivered" | "cancelled";
  products: ProductDetail[];
}

const mockOrders: OrderType[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2024-05-01",
    status: "pending",
    products: [
      {
        id: "P001",
        name: "T-Shirt",
        price: 500,
        quantity: 2,
        details: {
          Color: "Red",
          Size: "M",
          "Gift Wrap": "Yes",
        },
      },
      {
        id: "P002",
        name: "Jeans",
        price: 1500,
        quantity: 1,
        details: {
          Size: "32",
          Fit: "Slim",
        },
      },
    ],
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2024-05-02",
    status: "accepted",
    products: [
      {
        id: "P003",
        name: "Sneakers",
        price: 1800,
        quantity: 1,
        details: {
          Color: "White",
          Brand: "Nike",
        },
      },
    ],
  },
  {
    id: "ORD-003",
    customer: "Jane Smith",
    date: "2024-05-02",
    status: "accepted",
    products: [
      {
        id: "P003",
        name: "Sneakers",
        price: 1800,
        quantity: 1,
        details: {
          Color: "White",
          Brand: "Nike",
        },
      },
    ],
  },
  {
    id: "ORD-004",
    customer: "Jane Smith",
    date: "2024-05-02",
    status: "pending",
    products: [
      {
        id: "P003",
        name: "Sneakers",
        price: 1800,
        quantity: 1,
        details: {
          Color: "White",
          Brand: "Nike",
        },
      },
    ],
  },
  {
    id: "ORD-005",
    customer: "Jane Smith",
    date: "2024-05-02",
    status: "pending",
    products: [
      {
        id: "P003",
        name: "Sneakers",
        price: 1800,
        quantity: 1,
        details: {
          Color: "White",
          Brand: "Nike",
        },
      },
    ],
  },
  // add more mock orders as needed
];

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState<"all" | OrderType["status"]>("all");
  const [orders, setOrders] = useState<OrderType[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  const calculateTotal = (products: ProductDetail[]) => {
    return products.reduce((acc, prod) => acc + prod.price * prod.quantity, 0);
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderType["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setSelectedOrder(null);
  };

  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <SellerNav />

      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Orders</h1>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-4 mb-6">
          {[
            { label: "All", value: "all", icon: <FiPackage /> },
            { label: "Pending", value: "pending", icon: <FiClock />, style: "bg-yellow-100 text-yellow-800" },
            { label: "Accepted", value: "accepted", icon: <FiCheckCircle />, style: "bg-blue-100 text-blue-800" },
            { label: "Shipped", value: "shipped", icon: <FiTruck />, style: "bg-purple-100 text-purple-800" },
            { label: "Delivered", value: "delivered", icon: <FiPackage />, style: "bg-green-100 text-green-800" },
            { label: "Cancelled", value: "cancelled", icon: <FiX />, style: "bg-red-100 text-red-800" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedStatus(tab.value as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedStatus === tab.value
                  ? tab.style || "bg-gray-300 text-black"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    No {selectedStatus} orders found.
                  </td>
                </tr>
              )}
              {filteredOrders.map((order) => {
                const total = calculateTotal(order.products);
                return (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      Rs {total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`inline-block px-3 py-1 text-sm rounded-full capitalize ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "accepted"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "shipped"
                            ? "bg-purple-100 text-purple-800"
                            : order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-[#5A31F5] hover:underline"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Order Detail Popup */}
        {selectedOrder && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-black"
                aria-label="Close details"
              >
                <FiX size={20} />
              </button>

              <h3 className="text-xl font-semibold mb-4">Order Details</h3>
              <p className="text-sm text-gray-700">Order ID: {selectedOrder.id}</p>
              <p className="text-sm text-gray-700">Customer: {selectedOrder.customer}</p>
              <p className="text-sm text-gray-700 mb-4">Date: {selectedOrder.date}</p>

              {/* List all products and their details */}
              {selectedOrder.products.map((product) => (
                <div key={product.id} className="mb-4 border-b pb-2">
                  <p className="font-semibold">{product.name}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Price per item: Rs {product.price.toLocaleString()}</p>

                  {/* Display dynamic details */}
                  <div className="ml-4 mt-2">
                    {Object.entries(product.details).map(([key, value]) => (
                      <p key={key}>
                        <span className="font-medium">{key}:</span> {value}
                      </p>
                    ))}
                  </div>

                  <p className="font-semibold mt-2">
                    Subtotal: Rs {(product.price * product.quantity).toLocaleString()}
                  </p>
                </div>
              ))}

              {/* Total Amount */}
              <p className="font-bold text-lg border-t pt-4">
                Total Amount: Rs {calculateTotal(selectedOrder.products).toLocaleString()}
              </p>

              {/* Buttons based on status */}
              {selectedOrder.status === "pending" && (
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, "accepted")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, "cancelled")}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {selectedOrder.status === "accepted" && (
                <button
                  onClick={() => updateOrderStatus(selectedOrder.id, "shipped")}
                  className="mt-6 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  Ship
                </button>
              )}

              {selectedOrder.status === "shipped" && (
                <button
                  onClick={() => updateOrderStatus(selectedOrder.id, "delivered")}
                  className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Deliver
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
