import React from "react";
import { NavLink } from "react-router-dom";

const EmployeeSidebar = ({ isOpen, setIsOpen }) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    {
      label: "Dashboard",
      to: "/Employee/dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m7-7 7 7m-6 6v6" />
        </svg>
      ),
    },
    {
      label: "My Shifts",
      to: "/Employee/my-shifts",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14" />
        </svg>
      ),
    },
    {
      label: "Attendance",
      to: "/Employee/attendance",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Inquiry",
      to: "/Employee/inquiry",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8a9 9 0 100-18 9 9 0 000 18z" />
        </svg>
      ),
    },
    {
      label: "Profile",
      to: "/Employee/profile",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.85.647 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: "Payroll",
      to: "/Employee/EmployeePayroll",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 0v4m0-4h4m-4 0H8" />
        </svg>
      ),
    },
    {
      label: "Shift Changes",
      to: "/Employee/shift-changes",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582a5.5 5.5 0 0110.836 0H20V4m0 16v-5h-.582a5.5 5.5 0 01-10.836 0H4v5" />
        </svg>
      ),
    }
    
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed md:hidden top-4 left-4 z-50 p-2 bg-white text-gray-800 rounded-lg shadow-md transition-opacity duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
        style={{ zIndex: 50 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 bg-white text-gray-800 transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 md:w-20 ${
          isOpen ? "md:w-64" : "md:w-20"
        } z-40 shadow-xl`}
      >
        {/* Centered Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white text-gray-600 p-2 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 z-50 transition-all duration-300"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>

        {/* Sidebar Header */}
        <div className="flex items-center p-6 border-b border-gray-200 h-16">
          {isOpen ? (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="/path/to/avatar.png"
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full border-2 border-blue-300"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <p className="font-semibold text-sm">John Doe</p>
                <p className="text-xs text-gray-500">Employee</p>
              </div>
            </div>
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-100"></div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) => 
                `flex items-center p-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              {React.cloneElement(item.icon, {
                className: `h-6 w-6 ${isOpen ? "mr-3" : "mx-auto"}`
              })}
              {isOpen && (
                <span className="text-sm font-medium transition-opacity duration-200">
                  {item.label}
                </span>
              )}
              {!isOpen && (
                <div className="absolute left-20 ml-2 px-2 py-1 bg-white text-gray-800 text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-gray-200">
                  {item.label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default EmployeeSidebar;