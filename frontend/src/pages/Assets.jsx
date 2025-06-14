import { useEffect, useState } from "react";
import axios from "axios";
import CreateAssetForm from "../forms/createAssetForm";

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [assetUpdate, setAssetUpdate] = useState(null);

  const fetchAssets = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = import.meta.env.VITE_APP_API_URL + "assets";
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssets(res.data);
    } catch (err) {
      console.error("Error fetching assets:", err);
      setError("Failed to load assets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(assetUpdate);
    fetchAssets();
  }, [assetUpdate]);

  if (loading) return <p>Loading assets...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Assets</h2>
      <CreateAssetForm
        onAssetCreated={fetchAssets}
        onSuccess={setAssetUpdate}
      />
      {loading ? (
        <p>Loading assets...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : assets.length === 0 ? (
        <p className="text-gray-500">No assets available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Category</th>
                <th className="py-2 px-4">Unit</th>
                <th className="py-2 px-4">Created</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{asset.name}</td>
                  <td className="py-2 px-4">{asset.type}</td>
                  <td className="py-2 px-4">{asset.unit}</td>
                  <td className="py-2 px-4">
                    {new Date(asset.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
