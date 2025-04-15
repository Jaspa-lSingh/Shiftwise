import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import EmployeeNavbar from "./EmployeeNavbar";
import EmployeeSidebar from "./EmployeeSidebar";

const EmployeeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Width for the sidebar (open vs collapsed)
  const sidebarWidth = isSidebarOpen ? 256 : 80; // w-64 or w-20 in px

  // If each bar (EmployeeNavbar & Header) is 64px high, total is 128px
  // Adjust these values to match your actual heights
  const totalTopOffset = 128;

  return (
    <div className="bg-gray-100 min-h-screen relative">
      {/* First top bar (fixed at top) - e.g. 64px high */}
      <EmployeeNavbar />

      

      {/* Sidebar, also fixed. You might set top in its own CSS or inline style.
         Typically, you'd do something like top: 128px to place it below both bars. */}
      <EmployeeSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main content offset by the combined top offset & sidebar width */}
      <div
        style={{
          marginLeft: `${sidebarWidth}px`,
          marginTop: `${totalTopOffset}px`,
        }}
        className="p-4 transition-all duration-300"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeLayout;
