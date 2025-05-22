"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface CustomerRowProps {
  customer: {
    id: string;
    name: string;
    profilePhoto: string;
    isVip: boolean;
    city: string;
    orderCount: number;
    totalSpent: number;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const CustomerRow = ({ customer, isSelected, onSelect }: CustomerRowProps) => {
  const router = useRouter();

  return (
    <tr
      className="hover:bg-gray-50 border-b text-sm transition cursor-pointer"
      onClick={() => router.push(`/customers/${customer.id}`)} // ✅ Go to details
    >
      {/* ✅ Only checkbox stops propagation */}
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(customer.id)}
          className="w-4 h-4 accent-[#5A31F5] cursor-pointer"
          onClick={(e) => e.stopPropagation()} // ✅ Prevent row navigation
        />
      </td>

      {/* ✅ Combined photo + name */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image
              src={customer.profilePhoto || "/default-avatar.png"}
              alt="Customer"
              fill
              className="rounded-full object-cover"
            />
            {customer.isVip && (
              <span className="absolute -bottom-1 -right-1 bg-yellow-400 text-[10px] font-bold px-1 rounded-full border border-white">
                VIP
              </span>
            )}
          </div>
          <span className="font-medium text-gray-800">{customer.name}</span>
        </div>
      </td>

      <td className="px-4 py-3 text-gray-700">{customer.city}</td>
      <td className="px-4 py-3 text-center text-gray-700">{customer.orderCount}</td>
      <td className="px-4 py-3 text-right text-gray-800 font-medium">
        LKR {customer.totalSpent.toLocaleString()}
      </td>
    </tr>
  );
};

export default CustomerRow;

