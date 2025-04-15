import React, { useState, useEffect } from "react";

const Reports = () => {
  const [reportsData, setReportsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        title: "Shift Report",
        date: "2025-03-01",
        summary: "Overview of shifts for the period.",
        details: "Detailed analysis of shift coverage, gaps, and extra hours."
      },
      {
        id: 2,
        title: "Payroll Report",
        date: "2025-03-02",
        summary: "Summary of payroll calculations.",
        details: "Breakdown of payroll amounts, deductions, and bonuses."
      },
      {
        id: 3,
        title: "Employee Activity Report",
        date: "2025-03-03",
        summary: "Report on employee attendance and activity.",
        details: "Analysis of clock-ins, overtime, and performance metrics."
      }
    ];
    setReportsData(dummyData);
    setLoading(false);
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Reports Dashboard</h1>
        <p className="mt-2 text-sm text-gray-500">Manage and analyze your organization's reports</p>
      </div>

      {/* Filters */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input 
              type="date" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input 
              type="date" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          <button className="h-[42px] px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
            Apply Filters
          </button>
        </div>
      </div>

      {/* Reports Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Summary</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportsData.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{report.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{report.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-[300px] truncate">{report.summary}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-[400px] truncate">{report.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Chart Section */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Analytics Overview</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            View More →
          </button>
        </div>
        <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <span className="text-gray-400">Chart Visualization</span>
        </div>
      </div>
    </div>
  );
};

export default Reports;