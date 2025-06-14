import { useState } from "react";
import axios from "axios";

export default function CreateTransferForm({ onSuccess }) {
  const [form, setForm] = useState({
    asset: "",
    quantity: "",
    fromBase: "",
    toBase: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = import.meta.env.VITE_APP_API_URL + "transfers";
    try {
      const res = await axios.post(url, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ asset: "", quantity: "", fromBase: "", toBase: "" });
      onSuccess(res.data);
    } catch (err) {
      console.error("Transfer creation error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
      <div className="grid sm:grid-cols-3 gap-4">
        <input 
          type="text"
          name="asset"
          placeholder="Asset"
          value={form.asset}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="fromBase"
          placeholder="From Base"
          value={form.fromBase}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="toBase"
          placeholder="To Base"
          value={form.toBase}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Submit Transfer
      </button>
    </form>
  );
}
