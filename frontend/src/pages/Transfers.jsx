import { useEffect, useState } from "react";
import axios from "axios";
import CreateTransferForm from "../forms/createTransferForm";

export default function Transfers() {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [transferUpdate, setTransferUpdate] = useState(null);

  const fetchTransfers = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = import.meta.env.VITE_APP_API_URL + "transfers";
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransfers(res.data);
    } catch (err) {
      console.error("Error fetching transfers:", err);
      setError("Failed to load transfers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(transferUpdate);
    fetchTransfers();
  }, [transferUpdate]);

  if (loading) return <p>Loading transfers...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Transfers</h2>

      <CreateTransferForm 
        onTransferCreated={fetchTransfers}
        onSuccess={setTransferUpdate}
      />

      {loading ? (
        <p>Loading transfers...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : transfers.length === 0 ? (
        <p className="text-gray-500">No transfers available.</p>
      ) : (
        <div className="bg-white shadow rounded-xl overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="text-left px-4 py-2">Asset</th>
                <th className="text-left px-4 py-2">Quantity</th>
                <th className="text-left px-4 py-2">Date</th>
                <th className="text-left px-4 py-2">From</th>
                <th className="text-left px-4 py-2">To</th>
                <th className="text-left px-4 py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer) => (
                <tr key={transfer._id} className="border-t">
                  <td className="px-4 py-2">{transfer.asset?.name || "-"}</td>
                  <td className="px-4 py-2">{transfer.quantity}</td>
                  <td className="px-4 py-2">
                    {new Date(transfer.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{transfer.fromBase?.name || "-"}</td>
                  <td className="px-4 py-2">{transfer.toBase?.name || "-"}</td>
                  <td className="px-4 py-2">
                    {new Date(transfer.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}