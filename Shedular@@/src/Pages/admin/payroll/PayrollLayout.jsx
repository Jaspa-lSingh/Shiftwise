// File: src/Pages/admin/payroll/PayrollLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../AdminNavbar";
import PayrollSidebar from "./PayrollSidebar";

const PayrollLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Fixed Navbar */}
      <div className="fixed top-0 w-full z-30">
        <AdminNavbar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16"> {/* Offset for fixed navbar */}
        {/* Fixed Sidebar */}
        <div className="fixed left-0 h-full z-20">
          <PayrollSidebar />
        </div>

        {/* Scrollable Main Content */}
        <main className="flex-1 ml-64 p-8 transition-all duration-300"> {/* Match sidebar width */}
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <Outlet />
            </div>
            
            {/* Optional Footer */}
           
          </div>
        </main>
      </div>
    </div>
  );
};

export default PayrollLayout;