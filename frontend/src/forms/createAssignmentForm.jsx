import { useState } from "react";
import axios from "axios";

export default function CreateAssignmentForm({ onSuccess }) {
  const [form, setForm] = useState({
    asset: "",
    quantity: "",
    base: "",
    assignedTo: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = import.meta.env.VITE_APP_API_URL + "assignments";
    try {
      const res = await axios.post(url, form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForm({ asset: "", base: "", quantity: "", assignedTo: "" });
      onSuccess(res.data);
    } catch (err) {
      console.error("Error creating assignment:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div className="grid sm:grid-cols-2 gap-4">
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
          type="text"
          name="base"
          placeholder="Base"
          value={form.base}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="assignedTo"
          placeholder="Assigned To"
          value={form.assignedTo}
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
          className="border p-2 rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Assign/Expended
      </button>
    </form>
  );
}
