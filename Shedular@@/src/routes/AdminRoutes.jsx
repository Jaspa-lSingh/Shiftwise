// File: src/routes/AdminRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Admin layout & pages
import AdminLayout from "../Pages/admin/AdminLayout";
import AdminDashboard from "../Pages/admin/AdminDashboard";
import ManageUsers from "../Pages/admin/ManageUsers";
import ManageShifts from "../Pages/admin/ManageShifts";
import Reports from "../Pages/admin/Reports";
import AdminProfile from "../Pages/admin/AdminProfile";
import Attendence from "../Pages/admin/Attendance";
import ShiftChanges from "../Pages/admin/ShiftChanges";
import AddUser from "../Pages/admin/AddUser";
import AdminInquiry from "../Pages/admin/AdminInquiry/AdminInquiry";
import UserDetail from "../Pages/admin/UserDetail";

// Payroll pages (we won't define a normal layout route for them)
import PayrollManagement from "../Pages/admin/payroll/PayrollManagement";
import PayrollSetup from "../Pages/admin/payroll/PayrollSetup";
import CreatePayroll from "../Pages/admin/payroll/CreatePayroll";
import DeductionsBenefits from "../Pages/admin/payroll/DeductionsBenefits";
import EmployeeList from "../Pages/admin/payroll/EmployeeList";
import PayrollHistory from "../Pages/admin/payroll/PayrollHistory";
import TaxForms from "../Pages/admin/payroll/TaxForms";
import CreatePayrollUserDetail from "../Pages/admin/payroll/CreatePayrollUserDetail";
import Role from '../Pages/admin/roles/Role';


const AdminRoutes = () => {
  return (
    <Routes>
      {/* 
        1) Single route for /admin/* => uses AdminLayout
        2) We'll nest both normal admin pages and payroll sub-routes here
      */}
      <Route path="/" element={<AdminLayout />}>
        {/* Normal Admin sub-routes */}
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="manage-shifts" element={<ManageShifts />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="attendance" element={<Attendence />} />
        <Route path="shift-changes" element={<ShiftChanges />} />
        <Route path="add-user" element={<AddUser />} />
        <Route path="inquiries" element={<AdminInquiry />} />
        <Route path="admin-user-detail/:userId" element={<UserDetail />} />
        <Route path="roles" element={<Role />} />


        <Route path="payroll">
          <Route index element={<PayrollManagement />} />
          <Route path="setup" element={<PayrollSetup />} />
          <Route path="create" element={<CreatePayroll />} />
          <Route path="create/:userId" element={<CreatePayrollUserDetail />} />
          <Route path="tax-forms" element={<TaxForms />} />
          <Route path="history" element={<PayrollHistory />} />
          <Route path="deductions" element={<DeductionsBenefits />} />
          <Route path="employee-list" element={<EmployeeList />} />
          
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
