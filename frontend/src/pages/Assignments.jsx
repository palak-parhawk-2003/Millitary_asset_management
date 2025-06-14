import { useEffect, useState } from "react";
import axios from "axios";
import CreateAssignmentForm from "../forms/createAssignmentForm";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [assignmentUpdate, setAssignmentUpdate] = useState(null);

  const fetchAssignments = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = import.meta.env.VITE_APP_API_URL + "assignments";
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssignments(res.data);
    } catch (err) {
      console.error("Error fetching assignments:", err);
      setError("Failed to load assignments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(assignmentUpdate);
    fetchAssignments();
  }, [assignmentUpdate]);

  if (loading) return <p>Loading assignments...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Assignments</h2>

      <CreateAssignmentForm 
        onSuccess={fetchAssignments} 
        onAssignmentCreated={setAssignmentUpdate}
      />

      {loading ? (
        <p>Loading assignments...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
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
              {assignments.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No assignments found
                  </td>
                </tr>
              ) : (
                assignments.map((a, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{a.asset?.name}</td>
                    <td className="px-4 py-2">{a.base?.name}</td>
                    <td className="px-4 py-2">{a.quantity}</td>
                    <td className="px-4 py-2">
                      {new Date(a.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
