import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAdminAuthHeader } from "../../helpers/adminAuth";
import { FiClock, FiUser, FiAlertCircle, FiRefreshCw } from "react-icons/fi";

const CoverupShiftsTab = () => {
  const [coverShifts, setCoverShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCoverShifts();
  }, []);

  const fetchCoverShifts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/coverup/admin/`,
        getAdminAuthHeader()
      );
      setCoverShifts(response.data);
    } catch (err) {
      console.error("Error fetching cover-up shifts:", err);
      setError("Failed to load cover-up shifts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-[200px] flex items-center justify-center">
      <FiRefreshCw className="animate-spin text-3xl text-blue-600" />
    </div>
  );

  if (error) return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-red-50 p-4 rounded-lg flex items-center gap-3">
        <FiAlertCircle className="text-red-600 text-xl" />
        <p className="text-red-600">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Cover-Up Shifts</h2>
        <button 
          onClick={fetchCoverShifts}
          className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 flex items-center gap-2"
        >
          <FiRefreshCw className="text-sm" /> Refresh
        </button>
      </div>

      {coverShifts.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
          No cover-up shifts available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coverShifts.map((item) => (
            <div 
              key={item.id} 
              className="bg-white border rounded-xl shadow-sm p-4 relative hover:shadow-md transition-shadow"
            >
              {/* Status Badge */}
              <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-medium
                ${item.status === 'open' ? 'bg-yellow-100 text-yellow-800' : ''}
                ${item.status === 'claimed' ? 'bg-green-100 text-green-800' : ''}
                ${item.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
              `}>
                {item.status}
              </span>

              {/* Shift Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FiClock className="text-gray-400" />
                  <h3 className="font-semibold text-gray-800 truncate">{item.shift_details}</h3>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <FiUser className="flex-shrink-0" />
                    <span className="font-medium">Posted By:</span>
                  </div>
                  <div className="text-gray-700 truncate">{item.posted_by_email}</div>

                  <div className="flex items-center gap-2 text-gray-500">
                    <FiUser className="flex-shrink-0" />
                    <span className="font-medium">Claimed By:</span>
                  </div>
                  <div className="text-gray-700 truncate">{item.claimed_by_email || '—'}</div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <FiClock className="text-sm" />
                    Posted on: {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoverupShiftsTab;