"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

interface ProfileCardProps {
  customer: {
    name: string;
    city: string;
    profilePhoto?: string;
    createdAt: string;
    note: string;
    orderCount?: number;
  };
  onNoteChange: (newNote: string) => void;
}

const MAX_NOTE_LENGTH = 250;

const ProfileCard = ({ customer, onNoteChange }: ProfileCardProps) => {
  const [note, setNote] = useState(customer.note || "");
  const [charCount, setCharCount] = useState(0);
  const [preview, setPreview] = useState(customer.profilePhoto || "/default-avatar.png");

  useEffect(() => {
    setNote(customer.note || "");
    setCharCount((customer.note || "").length);
    setPreview(customer.profilePhoto || "/default-avatar.png");
  }, [customer.note, customer.profilePhoto]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_NOTE_LENGTH) {
      setNote(value);
      setCharCount(value.length);
      onNoteChange(value); // pass the updated note to the parent
    }
  };

  const customerSince = formatDistanceToNow(new Date(customer.createdAt), {
    addSuffix: false,
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-6">
        {/* Profile photo: non-editable, cursor pointer for modal */}
        <div
          className="w-16 h-16 relative ring-2 ring-[#5A31F5] rounded-full overflow-hidden cursor-pointer"
          title="Click to view full image"
        >
          <Image src={preview} alt="Profile" fill className="object-cover" />
        </div>

        <div className="flex flex-col">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-1">{customer.name}</h2>
          <p className="text-base text-gray-700 mb-1">{customer.city}</p>
          <p className="text-sm text-gray-500">
            {customer.orderCount || 0} Orders
            <br />
            Customer for {customerSince.replace("about ", "")}
          </p>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Customer Notes</p>
        <label className="text-xs text-gray-500 mb-1 block">Notes (max 250 characters)</label>
        <textarea
          value={note}
          onChange={handleNoteChange}
          placeholder="Add notes about customer"
          rows={3}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5A31F5]"
        />
        <div className="text-right text-xs text-gray-400 mt-1">{charCount}/{MAX_NOTE_LENGTH}</div>
      </div>
    </div>
  );
};

export default ProfileCard;
