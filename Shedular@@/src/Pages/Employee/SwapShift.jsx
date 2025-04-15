import React, { useEffect, useState } from "react";
import axios from "axios";
import { getEmployeeAuthHeader } from "../../helpers/employeeAuth";

const SwapShift = () => {
  const [myShifts, setMyShifts] = useState([]);
  const [availableShifts, setAvailableShifts] = useState([]);
  const [giveUpShift, setGiveUpShift] = useState("");
  const [desiredShift, setDesiredShift] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchMyShifts();
    fetchAvailableShifts();
  }, []);

  const fetchMyShifts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/shifts/my-shifts/`,
        getEmployeeAuthHeader()
      );
      setMyShifts(res.data);
    } catch (err) {
      console.error("Error fetching my shifts:", err);
    }
  };

  const fetchAvailableShifts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/shifts/available-for-swap/`,
        getEmployeeAuthHeader()
      );
      setAvailableShifts(res.data);
    } catch (err) {
      console.error("Error fetching available shifts:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!giveUpShift || !desiredShift) {
      setErrorMsg("Please select both shifts.");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/swaps/`,
        {
          give_up_shift: giveUpShift,
          desired_shift: desiredShift,
        },
        getEmployeeAuthHeader()
      );
      setSuccessMsg("Swap request submitted successfully.");
      setGiveUpShift("");
      setDesiredShift("");
      setErrorMsg("");
    } catch (err) {
      console.error("Error submitting swap request:", err.response?.data || err.message);
      setErrorMsg("Failed to submit swap request.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Request a Shift Swap</h2>

      {/* Status Messages */}
      {successMsg && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <span className="text-green-600">✅</span>
          <p className="text-green-700">{successMsg}</p>
        </div>
      )}
      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <span className="text-red-600">❌</span>
          <p className="text-red-700">{errorMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <div className="space-y-6">
          {/* Give Up Shift */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shift You Want to Give Up
            </label>
            <select
              value={giveUpShift}
              onChange={(e) => setGiveUpShift(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm min-w-[300px]"
            >
              <option value="">-- Select Your Shift --</option>
              {myShifts.map((shift) => (
                <option 
                  key={shift.id} 
                  value={shift.id}
                  className="whitespace-normal"
                >
                  📅 {shift.date} | 📍 {shift.location}
                </option>
              ))}
            </select>
            {myShifts.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">No upcoming shifts found</p>
            )}
          </div>

          {/* Desired Shift */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shift You Want to Take
            </label>
            <select
              value={desiredShift}
              onChange={(e) => setDesiredShift(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm min-w-[300px]"
            >
              <option value="">-- Select Available Shift --</option>
              {availableShifts.map((shift) => (
                <option 
                  key={shift.id} 
                  value={shift.id}
                  className="whitespace-normal"
                >
                  📅 {shift.date} | 📍 {shift.location} | 👤 {shift.desired_shift_assigned_to_name} ({shift.desired_shift_assigned_to_id_code})
                </option>
              ))}
            </select>
            {availableShifts.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">No available shifts found</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium text-sm"
            >
              Submit Swap Request
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SwapShift;