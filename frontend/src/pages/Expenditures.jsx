import { useEffect, useState } from "react";
import axios from "axios";
import CreateExpenditureForm from "../forms/createExpenditureForm";

export default function Expenditures() {
  const [expenditures, setExpenditures] = useState([]);
  const [search, setSearch] = useState("");

  const fetchExpenditures = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = import.meta.env.VITE_APP_API_URL + "expenditures";
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenditures(res.data);
    } catch (error) {
      console.error("Error fetching expenditures:", error);
    }
  };

  useEffect(() => {
    fetchExpenditures();
  }, []);

  const filtered = expenditures.filter((e) =>
    e.asset?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Expenditures</h2>

      <CreateExpenditureForm onSuccess={fetchExpenditures} />

      <input
        type="text"
        placeholder="Search by asset name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded w-full sm:w-1/3"
      />

      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="text-left px-4 py-2">Asset</th>
              <th className="text-left px-4 py-2">Base</th>
              <th className="text-left px-4 py-2">Quantity</th>
              <th className="text-left px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No expenditures found
                </td>
              </tr>
            ) : (
              filtered.map((e, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2">{e.asset?.name}</td>
                  <td className="px-4 py-2">{e.base?.name}</td>
                  <td className="px-4 py-2">{e.quantity}</td>
                  <td className="px-4 py-2">
                    {new Date(e.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
