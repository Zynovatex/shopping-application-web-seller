
"use client";

import { useState } from "react";
import { FiClock, FiCheckCircle, FiTruck, FiPackage, FiX } from "react-icons/fi";
import SellerNav from "@/app/component/layout/SellerNav";
import Footer from "@/app/component/layout/FullFooter";

interface OrderType {
  id: string;
  customer: string;
  date: string;
  total: string;
  status: "pending" | "accepted" | "shipped" | "delivered";
}

const mockOrders: OrderType[] = [
  { id: "ORD-001", customer: "John Doe", date: "2024-05-01", total: "Rs 3,500.00", status: "pending" },
  { id: "ORD-002", customer: "Jane Smith", date: "2024-05-02", total: "Rs 1,800.00", status: "accepted" },
  { id: "ORD-003", customer: "Alice Johnson", date: "2024-05-03", total: "Rs 5,000.00", status: "shipped" },
  { id: "ORD-004", customer: "Bob Brown", date: "2024-05-04", total: "Rs 2,000.00", status: "delivered" },
];

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  interface OrderType {
    id: string;
    customer: string;
    date: string;
    total: string;
    status: "pending" | "accepted" | "shipped" | "delivered";
  }

  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  const handleStatusFilter = (status: string) => setSelectedStatus(status);

  const filteredOrders =
    selectedStatus === "all"
      ? mockOrders
      : mockOrders.filter((order) => order.status === selectedStatus);

  const handleShipOrder = () => {
    alert("Order has been shipped. Notification sent to customer.");
    setSelectedOrder(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <SellerNav />

      <main className="flex-grow container mx-auto px-4 py-6">
        <div>
          <h1 className="text-2xl font-bold mb-6">Orders</h1>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4 mb-6">
            {[
              { label: "All", value: "all", icon: <FiPackage />  },
              { label: "Pending", value: "pending", icon: <FiClock />, style: "bg-yellow-100 text-yellow-800" },
              { label: "Accepted", value: "accepted", icon: <FiCheckCircle />, style: "bg-blue-100 text-blue-800" },
              { label: "Shipped", value: "shipped", icon: <FiTruck />, style: "bg-purple-100 text-purple-800" },
              { label: "Delivered", value: "delivered", icon: <FiPackage />, style: "bg-green-100 text-green-800"},
            ].map((tab) => (
              <button
              key={tab.value}
              onClick={() => handleStatusFilter(tab.value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedStatus === tab.value
                  ? selectedStatus === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : selectedStatus === "accepted"
                    ? "bg-blue-100 text-blue-800"
                    : selectedStatus === "shipped"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-green-100 text-green-800"
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
                {filteredOrders.map((order) => (
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
                      {order.total}
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
                            : "bg-green-100 text-green-800"
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
                ))}
              </tbody>
            </table>

            {filteredOrders.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No {selectedStatus} orders found.
              </div>
            )}
          </div>
        </div>

        {/* Order Detail Popup */}
        {selectedOrder && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-black"
              >
                <FiX size={20} />
              </button>
              <h3 className="text-lg font-semibold mb-2">Order Details</h3>
              <p className="text-sm text-gray-700">Order ID: {selectedOrder.id}</p>
              <p className="text-sm text-gray-700">Customer: {selectedOrder.customer}</p>
              <p className="text-sm text-gray-700">Date: {selectedOrder.date}</p>
              <p className="text-sm text-gray-700">Total: {selectedOrder.total}</p>
              <p className="text-sm text-gray-700 capitalize mb-4">
                Status: <strong>{selectedOrder.status}</strong>
              </p>
              {(selectedOrder.status === "accepted" || selectedOrder.status === "pending") && (
                <button
                  onClick={handleShipOrder}
                  className="mt-4 bg-[#5A31F5] text-white px-4 py-2 rounded-md hover:bg-[#4827C4]"
                >
                  Ship Order
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
