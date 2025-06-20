import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { useEffect } from "react";

function SignupPage() {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    base: "",
  });
  const [error, setError] = useState("");
  const [bases, setBases] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchBases = async () => {
      try {
        const res = await axios.get("/bases/names");
        setBases(res.data);
      } catch (e) {
        console.error("Failed to fetch base names: ", e);
      }
    };
    fetchBases();
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const success = await signup(formData);
      if (!success) setError("Signup failed. Please check your inputs.");
    } catch (err) {
      setError("Something went wrong. Try again.", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg p-6 rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="w-full p-2 border rounded"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="Admin">Admin</option>
            <option value="BaseCommander">Base Commander</option>
            <option value="LogisticsOfficer">Logistics Officer</option>
          </select>
          {formData.role !== "Admin" && (
            <select
              name="base"
              value={formData.base}
              onChange={handleChange}
              className="w-full mb-4 border p-2 rounded"
            >
              <option value="">Select Base</option>
              {bases.map((b) => (
                <option key={b._id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
