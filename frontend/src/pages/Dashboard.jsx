import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardFilterModal from "../components/DashboardFilterModel";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({});

  const fetchMetrics = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Sending request to dashboard metrics");
      const url = import.meta.env.VITE_APP_API_URL + "dashboard/metrics";
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        params: filters,
      });
      console.log("Received dashboard metrics:", res.data);
      setMetrics(res.data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Failed to load dashboard data.");
    }
  };

  useEffect(() => {
    console.log("Fetching dashboard metrics on mount");
    fetchMetrics();
  }, [filters]);

  const handleApplyFilters = (newFilters) => {
    console.log("Applying filters:", newFilters);
    setFilters(newFilters);
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!metrics) return <p>Loading dashboard...</p>;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h3>Purchases</h3>
            <ul>
              {metrics?.dashboardData?.netQuantity?.purchase?.map(
                (purchase, index) => (
                  <li key={index}>
                    Date: {new Date(purchase.date).toLocaleDateString()}, Asset:{" "}
                    {purchase.asset.name}, Qty: {purchase.quantity}
                  </li>
                )
              )}
            </ul>

            <h3>Transfer In</h3>
            <ul>
              {metrics?.dashboardData?.netQuantity?.fromBase?.map(
                (transfer, index) => (
                  <li key={index}>
                    Date: {new Date(transfer.date).toLocaleDateString()}, Asset:{" "}
                    {transfer.asset.name}, Qty: {transfer.quantity}, From:
                    {transfer?.fromBase?.name || "-Nil-"}
                  </li>
                )
              )}
            </ul>

            <h3>Transfer Out</h3>
            <ul>
              {metrics?.dashboardData?.netQuantity?.toBase?.map(
                (transfer, index) => (
                  <li key={index}>
                    Date: {new Date(transfer.date).toLocaleDateString()}, Asset:{" "}
                    {transfer.asset.name}, Qty: {transfer.quantity}, To:
                    {transfer?.toBase?.name || "-Nil-"}
                  </li>
                )
              )}
            </ul>
          </div>
        </Box>
      </Modal>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Filter Dashboard
        </button>
      </div>

      <DashboardFilterModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onApply={handleApplyFilters}
        filterOptions={metrics.filtersData}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(metrics.dashboardData).map(([label, count]) => (
          <div key={label}>
            {label === "netQuantity" ? (
              <div
                key={label}
                className="bg-white rounded-xl shadow p-4 text-center cursor-pointer"
              >
                <h3 className="text-gray-600 capitalize" onClick={handleOpen}>
                  {label.replace(/total/i, "")}
                </h3>
                <p className="text-2xl font-bold">{count.total}</p>
              </div>
            ) : (
              <div
                key={label}
                className="bg-white rounded-xl shadow p-4 text-center"
              >
                <h3 className="text-gray-600 capitalize">
                  {label.replace(/total/i, "")}
                </h3>
                <p className="text-2xl font-bold">{count}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
