// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { FiDownload } from "react-icons/fi";
// import SellerNav from "@/app/component/layout/SellerNav";
// import Footer from "@/app/component/layout/FullFooter";

// interface Customer {
//   id: number;
//   name: string;
//   location: string;
//   orders: number;
//   spent: number;
//   avatar: string;
// }

// export default function CustomerTablePage() {
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 15;

//   useEffect(() => {
//     // Replace this with real API call
//     const fetchCustomers = async () => {
//       const mockData: Customer[] = Array.from({ length: 154 }, (_, i) => ({
//         id: i + 1,
//         name: `Customer ${i + 1}`,
//         location: i % 3 === 0 ? "Badulla" : i % 2 === 0 ? "Colombo" : "Kandy",
//         orders: Math.floor(Math.random() * 20),
//         spent: Math.floor(Math.random() * 100000),
//         avatar: i % 4 === 0 ? "/avatar.png" : ""
//       }));
//       setCustomers(mockData);
//     };
//     fetchCustomers();
//   }, []);

//   const totalPages = Math.ceil(customers.length / itemsPerPage);
//   const paginatedCustomers = customers.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <SellerNav />

//       <main className="flex-grow px-4 sm:px-6 lg:px-16 py-6">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-xl font-bold">Customer</h1>
//           <button className="flex items-center space-x-2 border border-[#5A31F5] text-[#5A31F5] px-4 py-2 rounded-md hover:bg-[#5A31F5] hover:text-white transition">
//             <FiDownload size={16} />
//             <span>Export</span>
//           </button>
//         </div>

//         <div className="overflow-x-auto bg-white rounded-lg shadow">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-6 py-3">
//                   <input type="checkbox" />
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {paginatedCustomers.map((customer) => (
//                 <tr key={customer.id}>
//                   <td className="px-6 py-4">
//                     <input type="checkbox" />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
//                     {customer.avatar ? (
//                       <Image
//                         src={customer.avatar}
//                         alt="avatar"
//                         width={32}
//                         height={32}
//                         className="rounded-full"
//                       />
//                     ) : (
//                       <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
//                         {customer.name[0]}
//                       </div>
//                     )}
//                     <span>{customer.name}</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">{customer.location}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{customer.orders}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">Rs. {customer.spent.toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {customers.length === 0 && (
//             <div className="text-center text-gray-500 py-8">There are no customers yet.</div>
//           )}
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-between items-center px-4 py-3 text-sm text-gray-600">
//           <div className="space-x-2">
//             <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>&larr;</button>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={i + 1 === currentPage ? "font-bold text-[#5A31F5]" : ""}
//               >
//                 {i + 1}
//               </button>
//             )).slice(0, 5)}
//             <span>...</span>
//             <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
//             <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>&rarr;</button>
//           </div>
//           <div>{customers.length} Results</div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import Toolbar from "./component/Toolbar";
// import CustomerTable from "./component/CustomerTable";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// // 👇 Dummy backend fetch (replace with real API)
// const fetchCustomersFromBackend = async () => {
//   // Simulate API call
//   return Array.from({ length: 53 }, (_, i) => ({
//     id: `${i + 1}`,
//     name: `Customer ${i + 1}`,
//     profilePhoto: "/propic.jpg",
//     isVip: i % 10 === 0,
//     city: i % 3 === 0 ? "Colombo" : i % 3 === 1 ? "Kandy" : "Galle",
//     orderCount: Math.floor(Math.random() * 10) + 1,
//     totalSpent: Math.floor(Math.random() * 10000) + 1000,
//   }));
// };

// const CustomerPage = () => {
//   const [customers, setCustomers] = useState<any[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filtered, setFiltered] = useState<any[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 15;

//   useEffect(() => {
//     const loadCustomers = async () => {
//       const data = await fetchCustomersFromBackend(); // Replace with real API call
//       setCustomers(data);
//     };
//     loadCustomers();
//   }, []);

//   useEffect(() => {
//     const lower = searchQuery.toLowerCase();
//     setFiltered(
//       customers.filter((c) =>
//         c.name.toLowerCase().includes(lower) || c.city.toLowerCase().includes(lower)
//       )
//     );
//     setCurrentPage(1);
//   }, [searchQuery, customers]);

//   const pagedCustomers = filtered.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );
//   const totalPages = Math.ceil(filtered.length / pageSize);

//   // ✅ PDF Export Handler
//   const handleExportPDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(14);
//     doc.text("Customer List", 14, 16);
//     autoTable(doc, {
//       head: [["Name", "City", "Orders", "Total Spent"]],
//       body: filtered.map((c) => [
//         c.name,
//         c.city,
//         c.orderCount,
//         `LKR ${c.totalSpent.toLocaleString()}`,
//       ]),
//       startY: 22,
//     });
//     doc.save("customer_list.pdf");
//   };

//   return (
//     <div className="px-4 sm:px-10 py-8">
//       <h1 className="text-2xl font-bold mb-6">Customer List</h1>

//       <Toolbar
//         searchQuery={searchQuery}
//         onSearchChange={setSearchQuery}
//         onExport={handleExportPDF}
//       />

//       <CustomerTable
//         customers={pagedCustomers}
//         currentPage={currentPage}
//         totalPages={totalPages}
//         totalCount={filtered.length}
//         onPageChange={setCurrentPage}
//       />
//     </div>
//   );
// };

// export default CustomerPage;


"use client";

import { useEffect, useState } from "react";
import Toolbar from "./component/Toolbar";
import CustomerTable from "./component/CustomerTable";
import SellerNav from "@/app/component/layout/SellerNav";
import FullFooter from "@/app/component/layout/FullFooter";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Dummy data fetch (replace with real API)
const fetchCustomersFromBackend = async () => {
  return Array.from({ length: 53 }, (_, i) => ({
    id: `${i + 1}`,
    name: `Customer ${i + 1}`,
    profilePhoto: "/propic.jpg",
    isVip: i % 10 === 0,
    city: i % 3 === 0 ? "Colombo" : i % 3 === 1 ? "Kandy" : "Galle",
    orderCount: Math.floor(Math.random() * 10) + 1,
    totalSpent: Math.floor(Math.random() * 10000) + 1000,
  }));
};

const CustomerPage = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFiltered] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    const loadCustomers = async () => {
      const data = await fetchCustomersFromBackend();
      setCustomers(data);
    };
    loadCustomers();
  }, []);

  useEffect(() => {
    const lower = searchQuery.toLowerCase();
    setFiltered(
      customers.filter(
        (c) =>
          c.name.toLowerCase().includes(lower) ||
          c.city.toLowerCase().includes(lower)
      )
    );
    setCurrentPage(1);
  }, [searchQuery, customers]);

  const pagedCustomers = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(filtered.length / pageSize);

  const toggleSelection = (id: string) => {
    const newSet = new Set(selected);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelected(newSet);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Customer List", 14, 16);

    const rows = (selected.size > 0 ? customers.filter(c => selected.has(c.id)) : filtered).map(
      (c) => [c.name, c.city, c.orderCount, `LKR ${c.totalSpent.toLocaleString()}`]
    );

    autoTable(doc, {
      head: [["Name", "City", "Orders", "Total Spent"]],
      body: rows,
      startY: 22,
    });
    doc.save("customer_list.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SellerNav />

      <main className="flex-1 px-4 sm:px-10 py-8 max-w-6xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6">Customer List</h1>

        <Toolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onExport={handleExportPDF}
        />

        <CustomerTable
          customers={pagedCustomers}
          selected={selected}
          toggleSelection={toggleSelection}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={filtered.length}
          onPageChange={setCurrentPage}
        />
      </main>

      <FullFooter />
    </div>
  );
};

export default CustomerPage;
