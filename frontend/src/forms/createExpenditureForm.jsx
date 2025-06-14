import { useEffect, useState } from "react";
import axios from "axios";

export default function CreateExpenditureForm({ onSuccess }) {
  const [assets, setAssets] = useState([]);
  const [bases, setBases] = useState([]);
  const [formData, setFormData] = useState({
    asset: "",
    base: "",
    quantity: "",
    date: "",
  });
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const apiBase = import.meta.env.VITE_APP_API_URL;

  const fetchData = async () => {
    try {
      const [assetRes, baseRes] = await Promise.all([
        axios.get(apiBase + "assets", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(apiBase + "bases", { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setAssets(assetRes.data);
      setBases(baseRes.data);
    } catch (err) {
      console.error("Error loading dropdown data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(apiBase + "expenditures", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ asset: "", base: "", quantity: "", date: "" });
      onSuccess();
    } catch (err) {
      console.error("Error creating expenditure:", err);
      setError("Failed to create expenditure.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select name="asset" value={formData.asset} onChange={handleChange} required className="border p-2 rounded">
          <option value="">Select Asset</option>
          {assets.map((a) => (
            <option key={a._id} value={a._id}>
              {a.name}
            </option>
          ))}
        </select>

        <select name="base" value={formData.base} onChange={handleChange} required className="border p-2 rounded">
          <option value="">Select Base</option>
          {bases.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Submit Expenditure
      </button>
    </form>
  );
}
