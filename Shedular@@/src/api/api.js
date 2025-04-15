import axios from "axios";
import { getAdminAuthHeader } from "../helpers/adminAuth";
import { getEmployeeAuthHeader } from "../helpers/employeeAuth";

// Load backend URL from environment variables
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

console.log("API_BASE_URL:", API_BASE_URL); 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// ✅ Authentication APIs
export const authAPI = {
    adminLogin: (credentials) => api.post("/api/auth/admin-login/", credentials),
    employeeLogin: (email, password, idCode) => 
        api.post("/api/auth/employee-login/", { email, password, id_code: idCode }),
    register: (formData) =>
        api.post("/api/auth/auth/register/", formData, {
          ...getAdminAuthHeader(),
          headers: {
            ...getAdminAuthHeader().headers,
            "Content-Type": "multipart/form-data",
          },
        }),
    getToken: (credentials) => api.post("/api/token/", credentials),
    refreshToken: (token) => api.post("/api/token/refresh/", { refresh: token }),
};

// ✅ User APIs
export const userAPI = {
  // Fetch all admin users
  getAdminUsers: () =>
    api.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/admin/users/`,
      getAdminAuthHeader()
    ),

  // Delete an admin user
  deleteAdminUser: (userId) =>
    api.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/admin/users/${userId}/`,
      getAdminAuthHeader()
    ),

    getProfile: () =>
        api.get("/api/users/profile/", getEmployeeAuthHeader()),
    getUserDetail: (userId) =>
      axios.get(`${API_BASE_URL}/api/users/admin/users/${userId}/`, getAdminAuthHeader()),
    
      
};
export const adminAPI = {
  getInquiries: () =>
    api.get("/api/inquiries/admin/", getAdminAuthHeader()),

  getLeaves: () =>
    api.get("/api/leaves/admin/", getAdminAuthHeader()),

  getAnnouncements: () =>
    api.get("/api/announcements/admin/", getAdminAuthHeader()),

  // Add more admin-related methods as needed...
};


export const employeeInquiryAPI = {
  getAll: () => api.get("/api/inquiries/", getEmployeeAuthHeader()),
  create: (data) => api.post("/api/inquiries/", data, getEmployeeAuthHeader()),
};

export const adminInquiryAPI = {
  getAll: () => api.get("/api/inquiries/admin/", getAdminAuthHeader()),
  update: (id, data) => api.patch(`/api/inquiries/admin/${id}/`, data, getAdminAuthHeader()),
  delete: (id) => api.delete(`/api/inquiries/admin/${id}/`, getAdminAuthHeader()),
  getAll: () => api.get("/api/inquiries/admin/", getAdminAuthHeader()),
};
export const employeeLeaveAPI = {
  create: (data) => api.post("/api/leaves/", data, getEmployeeAuthHeader()),
  getAll: () => api.get("/api/leaves/", getEmployeeAuthHeader()),
};

//  Employee Leaves APIs
export const adminLeaveAPI = {
  getAll: () => api.get("/api/leaves/admin/", getAdminAuthHeader()),
  update: (id, data) =>
    api.patch(`/api/leaves/admin/${id}/`, data, getAdminAuthHeader()),
  getAll: () => api.get("/api/leaves/admin/", getAdminAuthHeader()),
};

//  Notifications APIs
export const notificationAPI = {
    getNotifications: () => api.get("/api/notifications/"),
    markNotificationRead: (id) => api.patch(`/api/notifications/${id}/read/`),  // PATCH instead of PUT
};

// Payroll APIs
export const payrollAPI = {
    getEmployees: () => api.get("/api/payroll/employees/"),
    processPayroll: () => api.post("/api/payroll/process/"),
};

//  Shift Request APIs
export const shiftRequestAPI = {
    createShiftSwap: (data) => api.post("/api/shiftswap/", data),
    updateShiftSwap: (id, data) => api.patch(`/api/shiftswap/swap/${id}/`, data),
    createCoverupShift: (data) => api.post("/api/shiftswap/coverup/", data),
    claimCoverupShift: (id) => api.post(`/api/shiftswap/coverup/${id}/claim/`),
};

// Shift APIs
export const shiftAPI = {
    getShifts: () =>
      api.get(`${import.meta.env.VITE_BACKEND_URL}/api/shifts/`, getAdminAuthHeader()),
    getShiftDetail: (id) =>
      api.get(`${import.meta.env.VITE_BACKEND_URL}/api/shifts/${id}/`, getAdminAuthHeader()),
    manageAdminShifts: () =>
      api.get(`${import.meta.env.VITE_BACKEND_URL}/api/shifts/admin-shifts/`, getAdminAuthHeader()),
    createShiftWithUser: (data) =>
      api.post(`${import.meta.env.VITE_BACKEND_URL}/api/shifts/create_shift_with_user/`, data, getAdminAuthHeader()),
    getEmployeeShifts: () =>
      api.get(`${import.meta.env.VITE_BACKEND_URL}/api/shifts/my-shifts/`, getEmployeeAuthHeader()),
    getEmployeeShiftDetail: (id) =>
      api.get(`${import.meta.env.VITE_BACKEND_URL}/api/shifts/my-shifts/${id}/`, getEmployeeAuthHeader()),
    updateEmployeeShiftStatus: (shiftId, newStatus) =>
      api.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/shifts/my-shifts/${shiftId}/`,
        { status: newStatus },
        getEmployeeAuthHeader()
      ),
  };

// Attendance APIs 
export const attendanceAPI = {
    // Employee Clock In
    clockIn: (data) =>
      api.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/attendance/clock-in/`,
        data,
        getEmployeeAuthHeader()
      ),
  
    // Employee Clock Out (requires attendance record ID)
    clockOut: (id, data) =>
      api.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/attendance/clock-out/${id}/`,
        data,
        getEmployeeAuthHeader()
      ),
  
    // Admin: Get All Attendance Records
    getAllAttendance: () =>
      api.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/attendance/all/`,
        getAdminAuthHeader()
      ),
  
    // Employee or Admin: Get Specific User's Attendance
    getUserAttendance: (id) =>
      api.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/attendance/user/${id}/`,
        getEmployeeAuthHeader()
      ),
      getActiveAttendance: () =>
        api.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/attendance/active/`,
          getEmployeeAuthHeader()
        ),
  };

// Announcements APIs
export const adminAnnouncementAPI = {
  getAll: () => api.get("/api/announcements/admin/", getAdminAuthHeader()),
  create: (data) => api.post("/api/announcements/admin/", data, getAdminAuthHeader()),
  delete: (id) => api.delete(`/api/announcements/admin/${id}/`, getAdminAuthHeader()),
};
export const employeeAnnouncementAPI = {
  getAll: () => api.get("/api/announcements/", getEmployeeAuthHeader()),
};
export const employeeAPI = {
  getInquiries: () => api.get("/api/inquiries/", getEmployeeAuthHeader()),
  getLeaves: () => api.get("/api/leaves/", getEmployeeAuthHeader()),
  getAnnouncements: () => api.get("/api/announcements/", getEmployeeAuthHeader())
};

export default api;