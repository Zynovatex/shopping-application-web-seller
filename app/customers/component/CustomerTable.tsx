"use client";

import CustomerRow from "./CustomerRow";

interface Customer {
  id: string;
  name: string;
  profilePhoto: string;
  isVip: boolean;
  city: string;
  orderCount: number;
  totalSpent: number;
}

interface CustomerTableProps {
  customers: Customer[];
  selected: Set<string>;
  toggleSelection: (id: string) => void;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

const CustomerTable = ({
  customers,
  selected,
  toggleSelection,
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
}: CustomerTableProps) => {
  return (
    <div className="w-full bg-white shadow-md rounded-md p-4 overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className="text-gray-500 text-xs border-b">
          <tr className="h-10">
            <th className="px-4">Select</th>
            <th className="px-4">Name</th>
            <th className="px-4">City</th>
            <th className="px-4 text-center">Orders</th>
            <th className="px-4 text-right">Total Spent</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No customers found.
              </td>
            </tr>
          ) : (
            customers.map((customer) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                isSelected={selected.has(customer.id)}
                onSelect={toggleSelection}
              />
            ))
          )}
        </tbody>
      </table>

      {/* Footer: Pagination & Total Count */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-600">
        <span>Total: {totalCount} customers</span>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-2">
            Page {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;
