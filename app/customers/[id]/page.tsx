"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SellerNav from "@/app/component/layout/SellerNav";
import FullFooter from "@/app/component/layout/FullFooter";
import ProfileCard from "./component/ProfileCard";
import OverviewCard from "./component/OverviewCard";
import OrdersTable from "./component/OrdersTable";
import TagsCard from "./component/TagsCard";

const CustomerDetailsPage = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState<any>(null);
  const [note, setNote] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [initialNote, setInitialNote] = useState("");
  const [initialTags, setInitialTags] = useState<string[]>([]);
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      setCustomer({
        name: "Trisha Krishnan",
        city: "Colombo",
        profilePhoto: "/profile.jpg",
        createdAt: "2022-01-01",
        note: "VIP customer",
        address: "No, 50 Galle Road, Wellawatha, Colombo, Srilanka",
        email: "trisha@gmail.com",
        phone: "+94 123456789",
        bankDetails: "Bank of Ceylon - A/C 123456789",
        orders: [
            { id: "#23534D", placedAt: "2024-05-25T15:12:00", status: "Processing", amount: 50320 },
            { id: "#12512B", placedAt: "2024-05-10T14:00:00", status: "Processing", amount: 3000 },
            { id: "#23634D", placedAt: "2024-04-18T08:00:00", status: "Completed", amount: 8400 },
            { id: "#76543E", placedAt: "2024-04-12T08:00:00", status: "Completed", amount: 45000 },
            { id: "#51323C", placedAt: "2024-04-10T16:12:00", status: "Completed", amount: 150 },
          ],
          
        tags: ["Vip Customer", "Europe"],
        orderCount: 5,
      });
      setNote("VIP customer");
      setTags(["Vip Customer", "Europe"]);
      setInitialNote("VIP customer");
      setInitialTags(["Vip Customer", "Europe"]);
    }
  }, [id]);

  const handleNoteChange = (newNote: string) => setNote(newNote);
  const handleAddTag = (tag: string) => setTags([...tags, tag]);
  const handleRemoveTag = (tag: string) => setTags(tags.filter(t => t !== tag));

  const handleCancel = () => {
    setNote(initialNote);
    setTags(initialTags);
  };

  const handleSave = () => {
    // Send note/tags to backend here
    setInitialNote(note);
    setInitialTags(tags);
    alert("Customer details saved ✅");
  };

  const handleProfilePhotoChange = (file: File) => {
    setProfilePhotoFile(file);
  };
  

//   const handleNoteChange = (newNote: string) => {
//     setCustomer({ ...customer, note: newNote });
//     // You can send this note back to DB using PUT if needed
//   };

//   const handleAddTag = (tag: string) => setTags([...tags, tag]);
//   const handleRemoveTag = (tag: string) => setTags(tags.filter(t => t !== tag));

  if (!customer) return <p className="text-center p-10">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <SellerNav />

      <main className="flex-1 px-4 sm:px-10 py-8 max-w-6xl mx-auto w-full space-y-8">
        <h1 className="text-2xl font-bold mb-4">Customer Details</h1>

        {/* Top Grid */}
<div className="grid md:grid-cols-3 gap-6">
  {/* Left (2/3 width) */}
  <div className="md:col-span-2">
  <ProfileCard
        customer={{ ...customer, profilePhoto: customer.profilePhoto }}
        onNoteChange={handleNoteChange}
        onProfilePhotoChange={handleProfilePhotoChange}
      />
  </div>

  {/* Right (1/3 width) */}
  <div>
    <OverviewCard customer={customer} />
  </div>
</div>

{/* Bottom Grid */}
<div className="grid md:grid-cols-3 gap-6 mt-6">
  {/* Left (2/3 width) */}
  <div className="md:col-span-2">
    <OrdersTable orders={customer.orders || []} />
  </div>

  {/* Right (1/3 width) */}
  <div>
    <TagsCard tags={tags} onAddTag={handleAddTag} onRemoveTag={handleRemoveTag} />
  </div>
</div>

   {/* Action Buttons */}
   <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={handleCancel}
            className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-md bg-[#5A31F5] text-white hover:bg-[#4824d0]"
          >
            Save
          </button>
        </div>
      </main>

      <FullFooter />
    </div>
  );
};

export default CustomerDetailsPage;
