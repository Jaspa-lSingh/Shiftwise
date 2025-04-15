import React, { useState, useEffect } from "react";
import axios from "axios";
import { getEmployeeAuthHeader } from "../../../helpers/employeeAuth";
import { employeeLeaveAPI } from "../../../api/api";
import { shiftAPI } from "../../../api/api";

const LeaveRequestsTab = ({ leaveRequests, loading, fetchLeaveRequests }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [myShifts, setMyShifts] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Fetch employee's assigned shifts
  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const res = await shiftAPI.getEmployeeShifts();
        console.log("Fetched Shifts:", res.data);
        const formattedShifts = res.data.map((shift) => ({
          id: shift.id,
          date: shift.date,
          shift_time: `${shift.start_time} - ${shift.end_time}`,
          location: shift.location,
          start_time: shift.start_time,
          end_time: shift.end_time
        }));
        setMyShifts(formattedShifts);
      } catch (err) {
        console.error("Error fetching shifts:", err.response?.data || err.message);
        setError("Failed to load shifts. Please try again.");
      }
    };
    fetchShifts();
  }, []);

  // ✅ Handle leave request submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setSubmitting(true);

    try {
      if (!selectedShift || !reason.trim()) {
        throw new Error("Shift and Reason are required.");
      }

      if (!selectedShift.date || !selectedShift.start_time || !selectedShift.end_time || !selectedShift.location) {
        throw new Error("Invalid shift selection. Please try again.");
      }

      const requestData = {
        shift: selectedShift.id,
        reason: reason.trim(),
        status: "pending"
      };

      console.log("Submitting Leave Request:", requestData);
      const response = await employeeLeaveAPI.create(requestData);
      console.log("Leave request response:", response);

      setSuccessMessage("Leave request submitted successfully!");
      setTimeout(() => {
        setShowForm(false);
        setReason("");
        setSelectedShift(null);
        setSuccessMessage("");
        if (typeof fetchLeaveRequests === 'function') {
          fetchLeaveRequests();
        }
      }, 2000);
    } catch (err) {
      console.error("Leave request error:", err);
      setError(err.response?.data?.error || err.message || "Failed to submit leave request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Render leave request form
  const renderLeaveRequestForm = () => {
    return (
      <div className="mt-6 transition-all duration-300 ease-in-out">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Submit Leave Request</h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Shift
              </label>
              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg transition-shadow duration-200 ease-in-out shadow-sm hover:shadow-md"
                  value={selectedShift ? selectedShift.id : ""}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const shift = myShifts.find((s) => String(s.id) === String(selectedId));
                    console.log("Selected shift:", shift);
                    setSelectedShift(shift || null);
                  }}
                  required
                >
                  <option value="">Select a shift</option>
                  {myShifts.map((shift) => (
                    <option key={shift.id} value={shift.id}>
                      {shift.date} | {shift.shift_time} | {shift.location}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Leave
              </label>
              <textarea
                className="w-full px-3 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg transition-shadow duration-200 ease-in-out shadow-sm hover:shadow-md"
                rows="4"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                placeholder="Please provide a detailed reason for your leave request..."
              />
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {successMessage && (
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">{successMessage}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out hover:shadow-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className={`px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm 
                  ${!submitting ? 'hover:bg-indigo-700 hover:shadow-md' : 'opacity-75 cursor-not-allowed'} 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out
                  flex items-center space-x-2`}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  'Submit Request'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Render leave requests list
  const renderLeaveRequests = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      );
    }

    if (!leaveRequests?.length) {
      return (
        <div className="text-center py-8">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg className="h-full w-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No leave requests</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new leave request.</p>
        </div>
      );
    }

    return (
      <div className="mt-6">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shift Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaveRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.shift_date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.shift_time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {request.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${request.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        request.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}
                      transition-all duration-200 ease-in-out transform hover:scale-105`}
                    >
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Leave Requests</h2>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out hover:shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Leave Request
              </button>
            )}
          </div>

          {showForm ? renderLeaveRequestForm() : renderLeaveRequests()}
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestsTab; 