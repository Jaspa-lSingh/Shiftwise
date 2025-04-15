import React, { useEffect, useState } from "react";
import axios from "axios";
import { getEmployeeAuthHeader } from "../../helpers/employeeAuth";
import { formatDistanceToNow } from "date-fns";

const EmployeeCoverupShift = () => {
  const [coverShifts, setCoverShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchCoverShifts();
  }, []);

  const fetchCoverShifts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/coverup/open/`,
        getEmployeeAuthHeader()
      );
      setCoverShifts(response.data);
    } catch (err) {
      setError("Failed to load cover-up shifts. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimShift = async (id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/coverup/claim/${id}/`,
        {},
        getEmployeeAuthHeader()
      );
      setSuccessMsg("Shift claimed successfully!");
      fetchCoverShifts();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to claim shift. Please try again.";
      setError(msg);
      setTimeout(() => setError(""), 3000);
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Status Messages */}
      {successMsg && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <span className="text-green-600">✅</span>
          <p className="text-green-700 font-medium">{successMsg}</p>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <span className="text-red-600">⚠️</span>
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : coverShifts.length === 0 ? (
        <div className="p-6 bg-gray-50 rounded-xl text-center text-gray-500">
          No cover-up shifts currently available
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
          {coverShifts.map((shift) => (
            <div
              key={shift.id}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="space-y-3">
                {/* Shift Details */}
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-800 text-lg">
                    {shift.shift_details}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>🕒</span>
                    <span>
                      Posted {formatDistanceToNow(new Date(shift.created_at))} ago
                    </span>
                  </div>
                </div>

                {/* Claimed Info */}
                {shift.claimed_by_email && (
                  <div className="p-3 bg-yellow-50 rounded-lg text-sm text-yellow-700">
                    <p>Claimed by: {shift.claimed_by_email}</p>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() => handleClaimShift(shift.id)}
                  className={`w-full px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                    shift.claimed_by_email
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md"
                  }`}
                  disabled={!!shift.claimed_by_email}
                >
                  {shift.claimed_by_email ? (
                    "Shift Claimed"
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>✋</span>
                      Claim This Shift
                    </div>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeCoverupShift;
