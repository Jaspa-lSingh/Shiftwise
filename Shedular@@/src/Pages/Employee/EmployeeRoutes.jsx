// File: src/Employee/EmployeeRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import EmployeeLayout from "./EmployeeLayout";
import EmployeeDashboard from "./EmployeeDashboard";
import MyShifts from "./MyShifts";
import Attendance from "./Attendance";
import Profile from "./Profile";
import Notifications from "../../Components/Notifications";
import ShiftChangesTab from "./ShiftChangesTab";
import EmployeePayroll from './EmployeePayroll'; 


// The new parent inquiry folder
import Inquiry from "./Inquiry/Inquiry"; // path to your Inquiry.jsx

const EmployeeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployeeLayout />}>
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="my-shifts" element={<MyShifts />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="profile" element={<Profile />} />
        <Route path="inquiry" element={<Inquiry />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="EmployeePayroll" element={<EmployeePayroll />} />  
        <Route path="shift-changes" element={<ShiftChangesTab />} />
        
      </Route>
    </Routes>
  );
};

export default EmployeeRoutes;
