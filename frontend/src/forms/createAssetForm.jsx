import { useState } from "react";
import axios from "axios";

export default function CreateAssetForm({ onSuccess }) {
  const [form, setForm] = useState({ name: "", category: "", unit: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        import.meta.env.VITE_APP_API_URL + "assets",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setForm({ name: "", category: "", unit: "" });
      onSuccess(res.data);
    } catch (err) {
      console.error("Error creating asset:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-gray-50 rounded-lg"
    >
      <div className="grid sm:grid-cols-3 gap-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="unit"
          placeholder="Unit"
          value={form.unit}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Asset
      </button>
    </form>
  );
}
