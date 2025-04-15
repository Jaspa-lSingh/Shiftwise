// File: src/Pages/admin/payroll/PayrollHistory.jsx
import React from "react";
import {
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentMagnifyingGlassIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

const PayrollHistory = () => {
  // Dummy data - replace with real data
  const payrollRuns = [
    { id: 1, date: "2024-03-25", total: 0.0, employees: 45, status: "Completed", tax: 0.0 },
    { id: 2, date: "2024-03-18", total: 0.0, employees: 42, status: "Completed", tax: 0.0 },
    { id: 3, date: "2024-03-11", total: 0.0, employees: 40, status: "Pending", tax: 0.0 },
    { id: 4, date: "2024-03-04", total: 0.0, employees: 38, status: "Completed", tax: 0.0 },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <div className="bg-white shadow overflow-hidden rounded-lg">
        {/* Header */}
        <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Payroll History</h2>
              <p className="mt-1 text-sm text-blue-100">Historical payroll records and analytics</p>
            </div>
            <ChartBarIcon className="h-12 w-12 text-white opacity-90" />
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-5 sm:p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-6 w-6 text-green-600 mr-2" />
                <div>
                  <p className="text-sm text-green-700">Total Paid This Month</p>
                  <p className="text-2xl font-bold text-green-900">$0.0</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center">
                <UserGroupIcon className="h-6 w-6 text-blue-600 mr-2" />
                <div>
                  <p className="text-sm text-blue-700">Employees Paid</p>
                  <p className="text-2xl font-bold text-blue-900">165</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center">
                <DocumentMagnifyingGlassIcon className="h-6 w-6 text-purple-600 mr-2" />
                <div>
                  <p className="text-sm text-purple-700">Tax Deductions</p>
                  <p className="text-2xl font-bold text-purple-900">$0.0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Payroll Over Time</h3>
              <div className="h-48 bg-gray-50 rounded-lg animate-pulse">
                {/* Replace with actual chart component */}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Department Breakdown</h3>
              <div className="h-48 bg-gray-50 rounded-lg animate-pulse">
                {/* Replace with actual chart component */}
              </div>
            </div>
          </div>

          {/* Payroll History Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payroll Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employees
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payrollRuns.map((run) => (
                  <tr key={run.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {new Date(run.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${run.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {run.employees}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        run.status === "Completed" ? "bg-green-100 text-green-800" :
                        run.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {run.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <button
                          title="Download Report"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <ArrowDownTrayIcon className="h-5 w-5" />
                        </button>
                        <button
                          title="View Details"
                          className="text-purple-600 hover:text-purple-900"
                        >
                          <DocumentMagnifyingGlassIcon className="h-5 w-5" />
                        </button>
                        <button
                          title="Re-run Payroll"
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircleIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {payrollRuns.length === 0 && (
            <div className="text-center py-12">
              <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">No payroll history available</p>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">
                Quick Actions
              </h3>
              <div className="flex space-x-4">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Export All
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                  New Payroll Run
                </button>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="text-sm font-semibold text-purple-800 mb-2">
                Audit Logs
              </h3>
              <ul className="space-y-2 text-sm text-purple-700">
                <li>• Payroll #24 approved by John Doe</li>
                <li>• Tax report generated for Q1 2024</li>
                <li>• Bonus payments processed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollHistory;