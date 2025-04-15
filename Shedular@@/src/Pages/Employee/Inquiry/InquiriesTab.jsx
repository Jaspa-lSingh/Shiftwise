import React, { useState, useEffect } from "react";
import axios from "axios";
import { getEmployeeAuthHeader } from "../../../helpers/employeeAuth";
import { employeeInquiryAPI } from "../../../api/api";


const InquiriesTab = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await employeeInquiryAPI.getAll();
      setInquiries(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!subject.trim() || !message.trim()) {
      setError("Subject and message are required.");
      return;
    }

    try {
      const response = await employeeInquiryAPI.create({ subject, message });
      setError("");
      setSubject("");
      setMessage("");
      setShowForm(false);
      fetchInquiries();
      
      setError("Inquiry submitted successfully!");
      setTimeout(() => setError(""), 3000);
    } catch (error) {
      console.error("Error submitting inquiry:", error.response?.data || error.message);
      setError("Failed to submit inquiry. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Inquiries</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all w-full sm:w-auto ${
            showForm 
              ? "bg-red-100 text-red-600 hover:bg-red-200"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {showForm ? "Cancel" : "New Inquiry"}
        </button>
      </div>
      {error && (
  <div className={`mb-6 p-4 rounded-lg ${
    error.includes("success") // <-- Now safe, since error is always a string
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700"
  }`}
  >
    {error}
  </div>
)}


      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What's your question about?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please describe your inquiry in detail..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Inquiry
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Responsive Table Container */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        {/* Desktop Table */}
        <div className="hidden sm:block">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Admin Reply</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Loading inquiries...</td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No inquiries found.</td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{inq.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{inq.employee_email}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{inq.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {inq.status === "answered" ? (
                        <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          Replied
                        </span>
                      ) : (
                        <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {inq.answer ? inq.answer : <span className="text-gray-400 italic">No reply yet</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InquiriesTab;
