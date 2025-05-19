// "use client";

// import { useState } from "react";

// interface TagsCardProps {
//   tags: string[];
//   onAddTag: (tag: string) => void;
//   onRemoveTag: (tag: string) => void;
// }

// const TagsCard = ({ tags, onAddTag, onRemoveTag }: TagsCardProps) => {
//   const [input, setInput] = useState("");

//   const handleAdd = () => {
//     const tag = input.trim();
//     if (tag && !tags.includes(tag)) {
//       onAddTag(tag);
//       setInput("");
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 w-full">
//       <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags</h3>

//       <div className="flex flex-wrap gap-2 mb-3">
//         {tags.length === 0 && (
//           <p className="text-sm text-gray-400 italic">No tags assigned.</p>
//         )}
//         {tags.map((tag) => (
//           <span
//             key={tag}
//             className="bg-[#E0E7FF] text-[#5A31F5] px-3 py-1 rounded-full text-xs flex items-center gap-2"
//           >
//             {tag}
//             <button
//               className="text-xs text-[#5A31F5] hover:text-red-500"
//               onClick={() => onRemoveTag(tag)}
//             >
//               ×
//             </button>
//           </span>
//         ))}
//       </div>

//       <div className="flex gap-2">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Add new tag"
//           className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full"
//         />
//         <button
//           onClick={handleAdd}
//           className="bg-[#5A31F5] text-white px-3 py-1 rounded-md text-sm hover:bg-[#4a26d4]"
//         >
//           Add
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TagsCard;

"use client";

import { useState } from "react";

interface TagsCardProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

const TagsCard = ({ tags, onAddTag, onRemoveTag }: TagsCardProps) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const tag = input.trim();
    if (tag && !tags.includes(tag)) {
      onAddTag(tag);
      setInput("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Tags</h3>

      <div className="flex flex-wrap gap-2 mb-3">
        {tags.length === 0 && (
          <p className="text-sm text-gray-400 italic">No tags assigned.</p>
        )}
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-[#E0E7FF] text-[#5A31F5] px-3 py-1 rounded-full text-xs flex items-center gap-2"
          >
            {tag}
            <button
              className="text-xs text-[#5A31F5] hover:text-red-500"
              onClick={() => onRemoveTag(tag)}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add new tag"
          className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full"
        />
        <button
          onClick={handleAdd}
          className="bg-[#5A31F5] text-white px-3 py-1 rounded-md text-sm hover:bg-[#4a26d4]"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TagsCard;
