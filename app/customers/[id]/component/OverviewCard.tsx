// "use client";

// interface OverviewCardProps {
//   customer: {
//     address: string;
//     email: string;
//     phone: string;
//     bankDetails: string;
//   };
// }

// const OverviewCard = ({ customer }: OverviewCardProps) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 w-full">
//       <h3 className="text-lg font-semibold text-gray-800 mb-4">Overview</h3>

//       <div className="text-sm text-gray-700 space-y-3">
//         <div>
//           <p className="text-gray-500 font-medium">Address</p>
//           <p>{customer.address}</p>
//         </div>
//         <div>
//           <p className="text-gray-500 font-medium">Email Address</p>
//           <p>{customer.email}</p>
//         </div>
//         <div>
//           <p className="text-gray-500 font-medium">Phone</p>
//           <p>{customer.phone}</p>
//         </div>
//         <div>
//           <p className="text-gray-500 font-medium">Bank Details</p>
//           <p>{customer.bankDetails}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OverviewCard;

"use client";

interface OverviewCardProps {
  customer: {
    address: string;
    email: string;
    phone: string;
    bankDetails: string;
  };
}

const OverviewCard = ({ customer }: OverviewCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Overview</h3>
      <div className="text-sm text-gray-700 space-y-5">
        <div>
          <p className="text-gray-500 font-semibold mb-1">Address</p>
          <p>{customer.address}</p>
        </div>
        <div>
          <p className="text-gray-500 font-semibold mb-1">Email Address</p>
          <p>{customer.email}</p>
        </div>
        <div>
          <p className="text-gray-500 font-semibold mb-1">Phone</p>
          <p>{customer.phone}</p>
        </div>
        <div>
          <p className="text-gray-500 font-semibold mb-1">Bank Details</p>
          <p>{customer.bankDetails}</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
