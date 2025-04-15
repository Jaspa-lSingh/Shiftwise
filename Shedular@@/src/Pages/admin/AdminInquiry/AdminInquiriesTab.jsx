import React, { useState } from "react";
import { adminInquiryAPI } from "../../../api/api";


const AdminInquiriesTab = ({ inquiries, loading, fetchInquiries }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Group inquiries by time categories
  const groupInquiries = () => {
    const now = new Date();
    const groups = {
      today: [],
      yesterday: [],
      last7Days: [],
      older: [],
    };

    inquiries.forEach(inquiry => {
      const createdDate = new Date(inquiry.created_at);
      const diffTime = now - createdDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        groups.today.push(inquiry);
      } else if (diffDays === 1) {
        groups.yesterday.push(inquiry);
      } else if (diffDays <= 7) {
        groups.last7Days.push(inquiry);
      } else {
        groups.older.push(inquiry);
      }
    });

    return Object.entries(groups)
      .filter(([_, items]) => items.length > 0)
      .map(([key, items]) => ({
        title: key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase()),
        items: items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      }));
  };

  // PATCH request to update (answer) an inquiry
  const handleReply = async (id, currentReply = "") => {
    const reply = prompt("Enter your reply:", currentReply);
    if (reply === null || reply.trim() === "") return;

    try {
      const response = await adminInquiryAPI.update(id, { answer: reply, status: "answered" });
      alert("Reply submitted!");
      fetchInquiries(); // Refresh the inquiry list in the parent
    } catch (error) {
      console.error("Reply error:", error);
      alert("Failed to submit reply");
    }
  };

  // DELETE request to remove an inquiry
  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this inquiry?")) return;

    try {
      const response = await adminInquiryAPI.delete(id);
      alert("Inquiry deleted!");
      fetchInquiries(); // Refresh the inquiry list in the parent
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed");
    }
  };

  // Modal to show the full message
  const MessageModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Full Message</h3>
          <button
            onClick={() => setSelectedMessage(null)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="whitespace-pre-wrap break-words">{selectedMessage}</p>
        </div>
      </div>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  // No inquiries
  if (!inquiries.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        <svg className="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-lg">No inquiries found</p>
      </div>
    );
  }

  const groups = groupInquiries();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {selectedMessage && <MessageModal />}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Response</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>

          {groups.map((group) => (
            <tbody key={group.title} className="divide-y divide-gray-200">
              <tr className="bg-blue-50">
                <td colSpan="7" className="px-6 py-3 font-semibold text-gray-700">
                  {group.title}
                </td>
              </tr>
              
              {group.items.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(inquiry.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {inquiry.employee_name || inquiry.employee_email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {inquiry.subject}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-[300px]">
                    <div className="flex items-center gap-2">
                      <span className="line-clamp-2">{inquiry.message}</span>
                      <button
                        onClick={() => setSelectedMessage(inquiry.message)}
                        className="text-blue-600 hover:text-blue-800 text-sm whitespace-nowrap"
                      >
                        View Full
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-[300px]">
                    {inquiry.answer ? (
                      <span className="bg-green-50 text-green-700 px-2 py-1 rounded">
                        {inquiry.answer}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">No response</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      inquiry.status === "answered" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-orange-100 text-orange-800"
                    }`}>
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === inquiry.id ? null : inquiry.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Actions
                      <svg className="ml-2 -mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    </button>

                    {dropdownOpen === inquiry.id && (
                      <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              handleReply(inquiry.id, inquiry.answer);
                              setDropdownOpen(null);
                            }}
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                          >
                            {inquiry.answer ? "Edit Reply" : "Add Reply"}
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(inquiry.id);
                              setDropdownOpen(null);
                            }}
                            className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                          >
                            Delete Inquiry
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AdminInquiriesTab;