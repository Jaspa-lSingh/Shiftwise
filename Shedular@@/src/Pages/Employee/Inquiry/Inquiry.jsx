import React, { useState, useEffect } from "react";
import axios from "axios";
import { getEmployeeAuthHeader } from "../../../helpers/employeeAuth";
import { employeeAPI } from "../../../api/api";

// Child tab components
import InquiriesTab from "./InquiriesTab";
import LeaveRequestsTab from "./LeaveRequestsTab";
import AnnouncementsTab from "./AnnouncementsTab";

const Inquiry = () => {
  const [activeTab, setActiveTab] = useState("inquiries");

  // Data states
  const [inquiries, setInquiries] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  // Loading states
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [loadingLeaves, setLoadingLeaves] = useState(true);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);

  // Function to fetch all employee data (inquiries, leaves, announcements)
  const fetchEmployeeData = async () => {
    try {
      // Fetch Inquiries
      setLoadingInquiries(true);
      const inquiriesRes = await employeeAPI.getInquiries();
      setInquiries(inquiriesRes.data);
    } catch (err) {
      console.error("Error fetching inquiries:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        alert("Unauthorized: Please log in again.");
      } else if (err.response?.status === 403) {
        alert("Access Denied: You do not have permission.");
      }
    } finally {
      setLoadingInquiries(false);
    }

    try {
      // Fetch Leave Requests
      setLoadingLeaves(true);
      const leavesRes = await employeeAPI.getLeaves();
      setLeaveRequests(leavesRes.data);
    } catch (err) {
      console.error("Error fetching leave requests:", err.response?.data || err.message);
    } finally {
      setLoadingLeaves(false);
    }

    try {
      // Fetch Announcements
      setLoadingAnnouncements(true);
      const announcementsRes = await employeeAPI.getAnnouncements();

      setAnnouncements(announcementsRes.data);
    } catch (err) {
      console.error("Error fetching announcements:", err.response?.data || err.message);
    } finally {
      setLoadingAnnouncements(false);
    }
  };

  // Fetch all employee data on mount
  useEffect(() => {
    fetchEmployeeData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold sm:text-3xl mb-6">Inquiry Center</h1>

      {/* Sticky Tab Bar */}
      <div className="sticky top-0 bg-white z-10 pb-2 sm:static sm:top-auto sm:z-auto">
        <div className="flex overflow-x-auto no-scrollbar pb-2">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`min-w-[100px] sm:min-w-auto px-3 py-2 text-sm sm:text-base focus:outline-none ${
                activeTab === "inquiries"
                  ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Inquiries
            </button>
            <button
              onClick={() => setActiveTab("leaves")}
              className={`min-w-[120px] sm:min-w-auto px-3 py-2 text-sm sm:text-base focus:outline-none ${
                activeTab === "leaves"
                  ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Leave Requests
            </button>
            <button
              onClick={() => setActiveTab("announcements")}
              className={`min-w-[130px] sm:min-w-auto px-3 py-2 text-sm sm:text-base focus:outline-none ${
                activeTab === "announcements"
                  ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Announcements
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-4 sm:mt-6">
        {activeTab === "inquiries" && (
          <InquiriesTab
            inquiries={inquiries}
            loading={loadingInquiries}
            fetchInquiries={fetchEmployeeData}
          />
        )}
        {activeTab === "leaves" && (
          <LeaveRequestsTab
            leaveRequests={leaveRequests}
            loading={loadingLeaves}
          />
        )}
        {activeTab === "announcements" && (
          <AnnouncementsTab
            announcements={announcements}
            loading={loadingAnnouncements}
          />
        )}
      </div>
    </div>
  );
};

export default Inquiry;