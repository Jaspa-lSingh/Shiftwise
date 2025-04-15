// File: src/Pages/admin/AdminLayout.jsx
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import PayrollLayout from "./payroll/PayrollLayout";

const AdminLayout = () => {
  const location = useLocation();

  // If path starts with /admin/payroll, show payroll layout
  if (location.pathname.startsWith("/admin/payroll")) {
    return <PayrollLayout />;
  }

  // Otherwise, normal admin layout
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarWidth = isSidebarOpen ? 256 : 80;

  return (
    <div>
      <AdminNavbar />
      <div className="flex">
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div
          style={{ marginLeft: `${sidebarWidth}px` }}
          className="pt-16 p-4 transition-all duration-300 w-full"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
