import { useEffect, useState } from "react";
import axios from "axios";

const DashboardFilterModal = ({ isOpen, onClose, onApply, filterOptions }) => {
  const [bases, setBases] = useState([]);
  const [assets, setAssets] = useState([]);
  const [selectedBase, setSelectedBase] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("");
  const [startDate, setStartDate] = useState("");

  const applyFilter = (e) => {
    onApply({
      baseId: selectedBase,
      assetId: selectedAsset,
      startDate: startDate || undefined,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Filter Dashboard</h2>

        <label className="block mb-2 font-medium">Select Base:</label>
        <select
          value={selectedBase}
          onChange={(e) => setSelectedBase(e.target.value)}
          className="w-full mb-4 border p-2 rounded"
        >
          <option value="">All Bases</option>
          {filterOptions?.base?.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Select Asset:</label>
        <select
          value={selectedAsset}
          onChange={(e) => setSelectedAsset(e.target.value)}
          className="w-full mb-4 border p-2 rounded"
        >
          <option value="">All Assets</option>
          {filterOptions?.assets?.map((a) => (
            <option key={a._id} value={a._id}>
              {a.name}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full mb-4 border p-2 rounded"
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={applyFilter}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardFilterModal;
