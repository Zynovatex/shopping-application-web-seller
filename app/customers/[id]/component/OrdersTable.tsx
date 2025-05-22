// "use client";

// interface OrdersTableProps {
//   orders: {
//     id: string;
//     placedAt: string; // ISO string
//     status: "Processing" | "Completed";
//     amount: number; // 💰 New field from DB
//   }[];
// }

// const OrdersTable = ({ orders }: OrdersTableProps) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 w-full overflow-x-auto">
//       <h3 className="text-lg font-semibold text-gray-800 mb-4">Order History</h3>
//       {orders.length === 0 ? (
//         <p className="text-sm text-gray-500">No accepted orders available.</p>
//       ) : (
//         <table className="min-w-full text-sm text-left">
//           <thead className="text-gray-500 border-b text-xs">
//             <tr>
//               <th className="px-4 py-2">Order ID</th>
//               <th className="px-4 py-2">Placed Date & Time</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Price</th> {/* ✅ New */}
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.id} className="border-b hover:bg-gray-50">
//                 <td className="px-4 py-3 text-gray-700 font-medium">{order.id}</td>
//                 <td className="px-4 py-3 text-gray-700">
//                   {new Date(order.placedAt).toLocaleString("en-GB", {
//                     dateStyle: "medium",
//                     timeStyle: "short",
//                   })}
//                 </td>
//                 <td className="px-4 py-3">
//                   <span
//                     className={`px-2 py-1 rounded-full text-s font-medium 
//                       ${order.status === "Completed" ? " text-green-600" : " text-blue-600"}`}
//                   >
//                     {order.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 text-left font-medium text-gray-700">
//                 Rs. {order.amount ? order.amount.toLocaleString() : "0.00"}

//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default OrdersTable;

"use client";

interface OrdersTableProps {
  orders: {
    id: string;
    placedAt: string; // ISO string
    status: "Processing" | "Completed";
    amount: number;
  }[];
}

const OrdersTable = ({ orders }: OrdersTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full overflow-x-auto hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Order History</h3>
      {orders.length === 0 ? (
        <p className="text-sm text-gray-500">No accepted orders available.</p>
      ) : (
        <table className="min-w-full text-sm text-center">
          <thead className="text-gray-500 border-b text-medium">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Placed Date & Time</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-black font-medium">{order.id}</td>
                <td className="px-4 py-3 text-black">
                  {new Date(order.placedAt).toLocaleString("en-GB", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-medium font-medium ${
                      order.status === "Completed"
                        ? " text-green-600"
                        : " text-blue-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-medium text-gray-700">
                  Rs. {order.amount ? order.amount.toLocaleString() : "0.00"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersTable;
