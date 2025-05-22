

"use client";

import { useEffect, useState } from "react";
import Toolbar from "./component/Toolbar";
import CustomerTable from "./component/CustomerTable";
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
