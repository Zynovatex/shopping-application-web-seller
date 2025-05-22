import { FiDownload, FiSearch } from "react-icons/fi";

interface ToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onExport: () => void;
}

const Toolbar = ({ searchQuery, onSearchChange, onExport }: ToolbarProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-4 gap-4">
      {/* Search Field */}
      <div className="relative w-full sm:w-80">
        <input
          type="text"
          placeholder="Search by name or city"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#5A31F5]"
        />
        <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
      </div>

      {/* Export PDF Button */}
      <button
        onClick={onExport}
        className="flex items-center gap-2 bg-[#5A31F5] text-white px-4 py-2 rounded-md hover:bg-[#4827C4] transition text-sm"
      >
        <FiDownload size={16} />
        Export PDF
      </button>
    </div>
  );
};

export default Toolbar;
