import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  DocumentPlusIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  ClockIcon,
  BanknotesIcon,
  UserGroupIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

const PayrollSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`
      ${isCollapsed ? 'w-20' : 'w-64'} 
      fixed inset-y-0 left-0 bg-white shadow-xl z-30
      transition-all duration-300 ease-in-out
      top-16 /* Adjust this value based on your navbar height */
    `}>
      <div className="relative h-full p-4 border-r border-gray-200">
        {/* Collapse Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-1/2 -translate-y-1/2
                    bg-white rounded-full shadow-md p-2 hover:bg-gray-50
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* Sidebar Content */}
        <div className="h-full flex flex-col">
          {!isCollapsed && (
            <div className="mb-6 pl-2">
              <h3 className="text-lg font-semibold text-gray-800">Payroll Management</h3>
              <p className="text-sm text-gray-500 mt-1">Administration Portal</p>
            </div>
          )}

          <nav className="flex-1">
            <ul className="space-y-1">
              {[
                { 
                  to: "/admin/payroll/create",
                  text: "Create Payroll",
                  icon: <DocumentPlusIcon className="w-5 h-5" />
                },
                {
                  to: "/admin/payroll/setup",
                  text: "Payroll Setup",
                  icon: <Cog6ToothIcon className="w-5 h-5" />
                },
                {
                  to: "/admin/payroll/tax-forms",
                  text: "Tax Forms",
                  icon: <DocumentTextIcon className="w-5 h-5" />
                },
                {
                  to: "/admin/payroll/history",
                  text: "Payroll History",
                  icon: <ClockIcon className="w-5 h-5" />
                },
                {
                  to: "/admin/payroll/deductions",
                  text: "Deductions & Benefits",
                  icon: <BanknotesIcon className="w-5 h-5" />
                },
                {
                  to: "/admin/payroll/employee-list",
                  text: "Employee List",
                  icon: <UserGroupIcon className="w-5 h-5" />
                }
              ].map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `
                      flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} 
                      px-4 py-3 rounded-lg
                      transition-all duration-200
                      ${isActive 
                        ? "bg-blue-50 border-l-4 border-blue-600 text-blue-700 font-semibold" 
                        : "text-gray-600 hover:bg-gray-50"}
                    `}
                  >
                    <span className="text-gray-700">{item.icon}</span>
                    {!isCollapsed && <span className="text-sm">{item.text}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {!isCollapsed && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="px-4 text-sm text-gray-500">
                Current Cycle: Monthly
                <span className="block text-xs mt-1">Version 2.4.1</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default PayrollSidebar;