import React, { useState, useEffect } from "react";
import api from "../../../api/api"; 
import { getAdminAuthHeader } from "../../../helpers/adminAuth";
import { adminAnnouncementAPI } from "../../../api/api";

const AdminAnnouncementsTab = () => {
  // Announcement form fields
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");

  // Users
  const [allUsers, setAllUsers] = useState([]);         // All users from the backend
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered list for display
  const [selectedRecipients, setSelectedRecipients] = useState([]); // Array of user PKs

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Announcements
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // On mount, fetch announcements & all users
  useEffect(() => {
    fetchAnnouncements();
    fetchAllUsers();
  }, []);

  // 1) Fetch announcements
  const fetchAnnouncements = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await adminAnnouncementAPI.getAll();

      setAnnouncements(response.data);
    } catch (err) {
      console.error("Error fetching announcements:", err.response?.data || err.message);
      setError("Failed to load announcements.");
    } finally {
      setLoading(false);
    }
  };

  // 2) Fetch all users (admin endpoint)
  const fetchAllUsers = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/admin/users/`,
        getAdminAuthHeader()
      );
      // Store all users
      setAllUsers(response.data);
      // By default, show them all in filtered list
      setFilteredUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
    }
  };

  // 3) Handle local search in the UI
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter allUsers by employee_id, email, or name
    const results = allUsers.filter((user) => {
      // We'll assume user.employee_id, user.email, user.first_name, user.last_name exist
      const code = user.id_code?.toLowerCase() || "";
      const userEmail = user.email?.toLowerCase() || "";
      const firstName = user.first_name?.toLowerCase() || "";
      const lastName = user.last_name?.toLowerCase() || "";

      return (
        code.includes(term) ||
        userEmail.includes(term) ||
        firstName.includes(term) ||
        lastName.includes(term)
      );
    });

    setFilteredUsers(results);
  };

  // 4) Toggle user PK in selectedRecipients
  //    We'll store user.id as the primary key in the recipients array,
  //    even though we search by user.employee_id
  const toggleRecipient = (userId) => {
    if (selectedRecipients.includes(userId)) {
      // remove
      setSelectedRecipients(selectedRecipients.filter((id) => id !== userId));
    } else {
      // add
      setSelectedRecipients([...selectedRecipients, userId]);
    }
  };

  // 5) Create announcement
  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    if (!topic.trim() || !message.trim() || selectedRecipients.length === 0) {
      alert("Topic, message, and at least one recipient are required.");
      return;
    }
    try {
      const requestData = {
        topic: topic.trim(),
        message: message.trim(),
        recipients: selectedRecipients, 
      };
      await adminAnnouncementAPI.create(requestData);

      alert("Announcement created successfully!");
      // Reset form
      setTopic("");
      setMessage("");
      setSearchTerm("");
      setFilteredUsers(allUsers); // Reset search results to all
      setSelectedRecipients([]);
      // Refresh announcements
      fetchAnnouncements();
    } catch (err) {
      console.error("Error creating announcement:", err.response?.data || err.message);
      alert("Failed to create announcement.");
    }
  };

  // 6) Delete an announcement
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await adminAnnouncementAPI.delete(id);

      alert("Announcement deleted!");
      fetchAnnouncements();
    } catch (err) {
      console.error("Error deleting announcement:", err.response?.data || err.message);
      alert("Failed to delete announcement.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Admin Announcements</h2>
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>

      {/* Create Announcement Form */}
      <form onSubmit={handleCreateAnnouncement} className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Announcement topic..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Users</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search by ID, email, or name..."
                  className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <svg 
                  className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your announcement..."
              rows="4"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {filteredUsers.length > 0 && (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2.5 border-b">
                <h3 className="text-sm font-medium text-gray-700">Select Recipients</h3>
              </div>
              <div className="max-h-64 overflow-y-auto p-2 space-y-2">
                {filteredUsers.map((user) => {
                  const isSelected = selectedRecipients.includes(user.id);
                  return (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => toggleRecipient(user.id)}
                      className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                        isSelected 
                          ? 'bg-blue-50 border-2 border-blue-200'
                          : 'hover:bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <div className={`h-5 w-5 rounded-sm border-2 mr-3 flex items-center justify-center ${
                        isSelected 
                          ? 'bg-blue-600 border-blue-600'
                          : 'bg-white border-gray-300'
                      }`}>
                        {isSelected && (
                          <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                          </svg>
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-700">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-xs text-gray-500">{user.email} • ID: {user.id_code}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {selectedRecipients.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-blue-800">
                Selected {selectedRecipients.length} recipient{selectedRecipients.length > 1 ? 's' : ''}
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Create Announcement
            </button>
          </div>
        </div>
      </form>

      {/* Announcements List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Existing Announcements</h3>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="flex justify-center items-center space-x-2 text-gray-500">
              <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
        ) : announcements.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="flex flex-col items-center justify-center space-y-2">
              <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>No announcements found</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-800 mb-1">{ann.topic}</h4>
                    <p className="text-gray-600 mb-4">{ann.message}</p>
                    <div className="flex flex-wrap gap-2">
                      {ann.recipients_emails?.map((email) => (
                        <span 
                          key={email}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          {email}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleDelete(ann.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnnouncementsTab;