import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAdminAuthHeader } from "../../../helpers/adminAuth";
import { adminLeaveAPI } from "../../../api/api";

const AdminLeaveRequestsTab = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedRequest, setExpandedRequest] = useState(null);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await adminLeaveAPI.getAll();

      setLeaveRequests(response.data);
    } catch (err) {
      console.error("Error fetching leave requests:", err.response?.data || err.message);
      setError("Failed to load leave requests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, newStatus) => {
    try {
      await adminLeaveAPI.update(id, { status: newStatus });

      fetchLeaveRequests();
    } catch (err) {
      console.error("Error updating leave request:", err.response?.data || err.message);
      alert("Failed to update leave request. Try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600">
          <h2 className="text-2xl font-bold text-white">Manage Leave Requests</h2>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <svg className="h-5 w-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-red-600">{error}</span>
          </div>
        )}

        <div className="px-6 py-4">
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-4 text-left text-sm font-semibold text-gray-600">Employee</th>
                  <th className="py-4 px-4 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="py-4 px-4 text-left text-sm font-semibold text-gray-600">Shift</th>
                  <th className="py-4 px-4 text-left text-sm font-semibold text-gray-600">Location</th>
                  <th className="py-4 px-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="py-4 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className="animate-pulse border-b border-gray-100">
                      <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-3/4"></div></td>
                      <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                      <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-1/3"></div></td>
                      <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                      <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-1/4"></div></td>
                      <td className="py-4 px-4"><div className="h-9 bg-gray-200 rounded w-20"></div></td>
                    </tr>
                  ))
                ) : leaveRequests.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <svg className="h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <p className="text-lg">No leave requests found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  leaveRequests.map((leave) => (
                    <tr key={leave.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">
                              {leave.employee_email?.charAt(0).toUpperCase() || "U"}
                            </span>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{leave.employee_email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">{leave.shift_date}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{leave.shift_time}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{leave.location}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          leave.status?.toLowerCase() === "approved" 
                            ? "bg-green-100 text-green-800" 
                            : leave.status?.toLowerCase() === "denied" 
                              ? "bg-red-100 text-red-800" 
                              : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {leave.status?.toLowerCase() === "approved" && (
                            <svg className="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                          {leave.status?.toLowerCase() === "denied" && (
                            <svg className="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          )}
                          {leave.status?.toLowerCase() === "pending" && (
                            <svg className="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                          )}
                          {leave.status || "Pending"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {leave.status?.toLowerCase() === "pending" ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleAction(leave.id, "approved")}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleAction(leave.id, "denied")}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                            >
                              Deny
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setExpandedRequest(expandedRequest === leave.id ? null : leave.id)}
                            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                          >
                            {expandedRequest === leave.id ? "Collapse" : "View Details"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse bg-white p-4 rounded-lg border border-gray-200">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))
            ) : leaveRequests.length === 0 ? (
              <div className="py-8 text-center">
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <svg className="h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-lg">No leave requests found</p>
                </div>
              </div>
            ) : (
              leaveRequests.map((leave) => (
                <div key={leave.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {leave.employee_email?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{leave.employee_email}</div>
                        <div className="text-xs text-gray-500">{leave.shift_date} • {leave.shift_time}</div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      leave.status?.toLowerCase() === "approved" 
                        ? "bg-green-100 text-green-800" 
                        : leave.status?.toLowerCase() === "denied" 
                          ? "bg-red-100 text-red-800" 
                          : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {leave.status || "Pending"}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-3">
                    <div className="flex items-center mb-1">
                      <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {leave.location}
                    </div>
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      {leave.reason || "No reason provided"}
                    </div>
                  </div>

                  {leave.status?.toLowerCase() === "pending" ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAction(leave.id, "approved")}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(leave.id, "denied")}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                      >
                        Deny
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">
                      <button 
                        onClick={() => setExpandedRequest(expandedRequest === leave.id ? null : leave.id)}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        {expandedRequest === leave.id ? "Collapse Details" : "View Details"}
                      </button>
                      {expandedRequest === leave.id && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-gray-700">{leave.reason}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLeaveRequestsTab;