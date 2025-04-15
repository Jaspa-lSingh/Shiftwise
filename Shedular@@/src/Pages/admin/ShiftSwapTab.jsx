import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAdminAuthHeader } from "../../helpers/adminAuth";


const ShiftSwapTab = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSwapRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [requests, filter]);

  const fetchSwapRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/swaps/admin/`,
        getAdminAuthHeader()
      );
      setRequests(res.data);
    } catch (err) {
      setError("Failed to load swap requests.");
    } finally {
      setLoading(false);
    }
  };

  const filterRequests = () => {
    if (filter === "all") {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(requests.filter((req) => req.status === filter));
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    if (!window.confirm(`Are you sure you want to mark this as ${newStatus}?`)) return;
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/swaps/admin/${id}/`,
        { status: newStatus },
        getAdminAuthHeader()
      );
      fetchSwapRequests();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };

  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    denied: "bg-red-100 text-red-800"
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
    <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
  );

  if (error) return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg max-w-6xl mx-auto mt-8">
      <p className="text-red-600 font-medium">⚠️ {error}</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Shift Swap Requests</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="all">All Requests</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="denied">Denied</option>
        </select>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="p-6 bg-gray-50 rounded-xl text-center text-gray-500">
          No swap requests found matching your criteria
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
          {filteredRequests.map((req) => (
            <div key={req.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {/* Requested By */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Requested By</label>
                  <p className="font-medium">
                    {req.requested_by_name} <span className="text-gray-500">({req.requested_by_id_code})</span>
                  </p>
                  <p className="text-sm text-gray-600 break-all">{req.requested_by_email}</p>
                </div>

                {/* Shifts */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Give Up Shift</label>
                  <p className="text-sm">{req.give_up_shift_detail}</p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Desired Shift</label>
                  <p className="text-sm">{req.desired_shift_detail}</p>
                </div>

                {/* Assigned To */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Currently Assigned</label>
                  <p className="text-sm">
                    {req.desired_shift_assigned_to_name} <span className="text-gray-500">({req.desired_shift_assigned_to_id_code})</span>
                  </p>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[req.status]}`}>
                    {req.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">
                    Submitted: {new Date(req.created_at).toLocaleDateString()}
                  </span>
                </div>

                {req.status === "pending" && (
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleStatusChange(req.id, "approved")}
                      className="flex-1 sm:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <span>✓</span> Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(req.id, "denied")}
                      className="flex-1 sm:flex-none px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <span>✕</span> Deny
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShiftSwapTab;