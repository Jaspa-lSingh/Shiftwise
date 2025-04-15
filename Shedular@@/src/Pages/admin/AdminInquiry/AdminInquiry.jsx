import React, { useState, useEffect } from "react";
import { adminInquiryAPI, adminLeaveAPI, adminAnnouncementAPI } from "../../../api/api";
import AdminInquiriesTab from "./AdminInquiriesTab";
import AdminLeaveRequestsTab from "./AdminLeaveRequestsTab";
import AdminAnnouncementsTab from "./AdminAnnouncementsTab";


const AdminInquiry = () => {
  const [activeTab, setActiveTab] = useState("inquiries");

  // Data states
  const [inquiries, setInquiries] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  // Loading states
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [loadingLeaves, setLoadingLeaves] = useState(true);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);

  // Function to fetch all admin data (inquiries, leaves, announcements)
  const fetchAdminData = async () => {
    try {
      // Fetch Inquiries (Fixed Endpoint)
      setLoadingInquiries(true);
      const inquiriesRes = await adminInquiryAPI.getAll();
      setInquiries(inquiriesRes.data);
    } catch (err) {
      console.error("Error fetching admin inquiries:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        alert("Unauthorized: Please log in again.");
      } else if (err.response?.status === 403) {
        alert("Access Denied: Admin privileges required.");
      }
    } finally {
      setLoadingInquiries(false);
    }

    try {
      // Fetch Leave Requests
      setLoadingLeaves(true);
      const leavesRes = await adminLeaveAPI.getAll();
      setLeaveRequests(leavesRes.data);
    } catch (err) {
      console.error("Error fetching admin leaves:", err.response?.data || err.message);
    } finally {
      setLoadingLeaves(false);
    }

    try {
      // Fetch Announcements
      setLoadingAnnouncements(true);
      const announcementsRes = await adminAnnouncementAPI.getAll();
      setAnnouncements(announcementsRes.data);
    } catch (err) {
      console.error("Error fetching admin announcements:", err.response?.data || err.message);
    } finally {
      setLoadingAnnouncements(false);
    }
  };

  // Fetch all admin data on mount
  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold">Admin Inquiries & Management</h1>

      {/* Tabs */}
      <div className="flex space-x-4 border-b pb-2">
        <button
          onClick={() => setActiveTab("inquiries")}
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "inquiries" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
          }`}
        >
          All Inquiries
        </button>
        <button
          onClick={() => setActiveTab("leaves")}
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "leaves" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
          }`}
        >
          Leave Requests
        </button>
        <button
          onClick={() => setActiveTab("announcements")}
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "announcements" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
          }`}
        >
          Announcements
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "inquiries" && (
        <AdminInquiriesTab
          inquiries={inquiries}
          loading={loadingInquiries}
          fetchInquiries={fetchAdminData} // ✅ Pass function to refresh data after reply
        />
      )}
      {activeTab === "leaves" && (
  <AdminLeaveRequestsTab 
    leaveRequests={leaveRequests} 
    loading={loadingLeaves} 
    fetchLeaveRequests={fetchAdminData} 
  />
)}
      {activeTab === "announcements" && (
        <AdminAnnouncementsTab announcements={announcements} loading={loadingAnnouncements} />
      )}
    </div>
  );
};

export default AdminInquiry;
