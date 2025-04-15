import React from "react";
import { useNavigate } from "react-router-dom";
import { HiCurrencyDollar, HiDocumentReport, HiCalendar, HiUserGroup } from "react-icons/hi";
import { motion } from "framer-motion";

const PayrollManagement = () => {
  const navigate = useNavigate();

  const handleGeneratePayroll = () => {
    navigate("/admin/payroll/setup");
  };

  // Mock data for demonstration
  const payrollStats = [
    { icon: <HiUserGroup />, label: "Total Employees", value: "12" },
    { icon: <HiCurrencyDollar />, label: "Monthly Budget", value: "$0.00M" },
    { icon: <HiCalendar />, label: "Next Payroll", value: "Not Upcoming Payroll" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent"
          >
            Payroll Management
          </motion.h1>
          <p className="text-gray-600 text-lg">Efficient payroll processing and management system</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {payrollStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 rounded-lg text-green-600 text-2xl">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-block p-6 bg-green-50 rounded-2xl mb-6">
                <HiDocumentReport className="w-16 h-16 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Generate New Payroll
              </h2>
              <p className="text-gray-600 mb-6">
                Initiate payroll processing for the current period. Ensure all employee data and hours are verified before proceeding.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGeneratePayroll}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-green-200 transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                <HiCurrencyDollar className="w-6 h-6" />
                Generate Payroll
              </motion.button>
            </div>

            {/* Recent Activity */}
            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Payrolls</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">No Recent Payroll</p>
                      <p className="text-sm text-gray-500">No Payroll</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Not any Payroll Completed
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Visual Decoration */}
        <div className="absolute top-0 right-0 opacity-10 md:opacity-20">
          <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#16a34a" d="M42.6,-35.6C54.3,-24.9,62.2,-8.5,60.6,7.7C59,23.8,48,39.7,32.6,50.8C17.2,61.9,-2.6,68.2,-20.7,63.3C-38.7,58.4,-55.1,42.4,-60.1,24.6C-65.1,6.8,-58.7,-12.7,-47.1,-25.5C-35.6,-38.3,-18.8,-44.4,-1.9,-43.3C15,-42.1,30.1,-33.7,42.6,-35.6Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PayrollManagement;