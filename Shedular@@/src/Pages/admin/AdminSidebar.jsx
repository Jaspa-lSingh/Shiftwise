import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const toggleSidebar = () => setIsOpen(!isOpen);

  const NavItem = ({ to, label, icon }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`group flex items-center px-4 py-3 transition-all duration-300 ${
          isOpen ? "pr-6" : "justify-center"
        } ${
          isActive
            ? "bg-gradient-to-r from-blue-100 to-purple-100 border-l-4 border-blue-600"
            : "hover:bg-gray-100"
        }`}
      >
        <span className={`${isActive ? "text-blue-600" : "text-gray-600"} group-hover:text-gray-900`}>
          {React.cloneElement(icon, { 
            className: "h-6 w-6 flex-shrink-0",
            strokeWidth: isActive ? 2 : 1.5
          })}
        </span>
        {isOpen && (
          <span className={`ml-4 font-medium ${isActive ? "text-gray-900" : "text-gray-600 group-hover:text-gray-900"}`}>
            {label}
          </span>
        )}
        {!isOpen && (
          <div className="absolute left-full ml-4 invisible group-hover:visible bg-white text-gray-900 px-3 py-2 rounded-lg shadow-lg text-sm border border-gray-200">
            {label}
          </div>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed md:hidden top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100"
        >
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-20"}`}
      >
        <div className="w-full bg-white shadow-xl h-full border-r border-gray-200 relative">
          {/* Collapse Toggle Button - Updated positioning */}
          <button
            onClick={toggleSidebar}
            className="absolute left-full top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg p-1.5 hover:bg-gray-100 transition-colors duration-300 z-50"
          >
            {isOpen ? (
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>

          {/* Sidebar Header */}
          <div className="flex items-center justify-center p-6 border-b border-gray-200 h-16">
            <span className="text-gray-900 font-bold text-lg">Admin</span>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1">
            <NavItem
              to="/admin/dashboard"
              label="Dashboard"
              icon={
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              }
            />
            <NavItem
              to="/admin/profile"
              label="Profile"
              icon={
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              }
            />
            <NavItem
              to="/admin/manage-users"
              label="Manage Users"
              icon={
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              }
            />
            <NavItem
              to="/admin/manage-shifts"
              label="Manage Shifts"
              icon={
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
            <NavItem
              to="/admin/reports"
              label="Reports"
              icon={
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              }
            />
            <NavItem
              to="/admin/payroll"
              label="Payroll"
              icon={
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
            />
            <NavItem
              to="/admin/inquiries"
              label="Employee Inquiry"
              icon={
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
            <NavItem
              to="/admin/attendance"
              label="Attendance"
              icon={
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              }
            />
            <NavItem
              to="/admin/shift-changes"
              label="Shift Changes"
              icon={
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              }
            />
            <NavItem
                to="/admin/roles"
                label="Role Management"
                icon={
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                    strokeWidth={1.5}
                   d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"
/>
                   </svg>
                     }
/>    
          </nav>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;