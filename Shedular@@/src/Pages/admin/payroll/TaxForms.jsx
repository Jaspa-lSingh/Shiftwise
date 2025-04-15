// File: src/Pages/admin/payroll/TaxForms.jsx
import React from "react";
import { 
  DocumentMagnifyingGlassIcon,
  TableCellsIcon,
  ArrowDownTrayIcon,
  CheckBadgeIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

const TaxForms = () => {
  // Dummy data - replace with real data
  const forms = [
    { id: 1, name: "Form W-2", year: 2023, status: "Filed", dueDate: "2024-01-31" },
    { id: 2, name: "Form 1099-MISC", year: 2023, status: "Pending", dueDate: "2024-02-28" },
    { id: 3, name: "Form 941", year: "Q4 2023", status: "Overdue", dueDate: "2024-01-31" },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <div className="bg-white shadow overflow-hidden rounded-lg">
        {/* Header */}
        <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Tax Forms Management</h2>
              <p className="mt-1 text-sm text-blue-100">Current Tax Year: 2023-2024</p>
            </div>
            <DocumentMagnifyingGlassIcon className="h-12 w-12 text-white opacity-90" />
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-5 sm:p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center">
                <CheckBadgeIcon className="h-6 w-6 text-green-600 mr-2" />
                <div>
                  <p className="text-sm text-green-700">Filed Forms</p>
                  <p className="text-2xl font-bold text-green-900">24</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center">
                <ClockIcon className="h-6 w-6 text-yellow-600 mr-2" />
                <div>
                  <p className="text-sm text-yellow-700">Pending Forms</p>
                  <p className="text-2xl font-bold text-yellow-900">5</p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center">
                <TableCellsIcon className="h-6 w-6 text-red-600 mr-2" />
                <div>
                  <p className="text-sm text-red-700">Overdue Forms</p>
                  <p className="text-2xl font-bold text-red-900">2</p>
                </div>
              </div>
            </div>
          </div>

          {/* Forms Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Form Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tax Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {forms.map((form) => (
                  <tr key={form.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {form.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {form.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        form.status === "Filed" ? "bg-green-100 text-green-800" :
                        form.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {form.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {form.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <button
                          title="Download"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <ArrowDownTrayIcon className="h-5 w-5" />
                        </button>
                        <button
                          title="Preview"
                          className="text-purple-600 hover:text-purple-900"
                        >
                          <DocumentMagnifyingGlassIcon className="h-5 w-5" />
                        </button>
                        <button
                          title="Mark as Filed"
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckBadgeIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {forms.length === 0 && (
            <div className="text-center py-12">
              <TableCellsIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">No tax forms found for this period</p>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-blue-700 hover:text-blue-900">
                    IRS Form W-2 Instructions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-700 hover:text-blue-900">
                    Quarterly Tax Calendar
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-700 hover:text-blue-900">
                    State Tax Requirements
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="text-sm font-semibold text-purple-800 mb-2">
                Recent Activity
              </h3>
              <ul className="space-y-2 text-sm text-purple-700">
                <li>• Form W-2 submitted on 01/25/2024</li>
                <li>• Form 941-Q4 review pending</li>
                <li>• State tax filing completed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxForms;