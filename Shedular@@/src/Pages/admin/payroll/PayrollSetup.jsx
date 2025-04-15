// File: src/Pages/admin/PayrollSetup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const PayrollSetup = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin/payroll/management', { state: { startDate, endDate } });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-3xl mx-auto">
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-600 to-purple-600">
          <h2 className="text-2xl font-semibold text-white">
            Payroll Cycle Configuration
          </h2>
          <p className="mt-1 text-sm text-blue-100">
            Set up payroll parameters for processing
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Start Date
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="block w-full pl-4 pr-3 py-2.5 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <CalendarIcon className="h-5 w-5 text-gray-400 absolute right-3 top-3" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                End Date
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="block w-full pl-4 pr-3 py-2.5 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <CalendarIcon className="h-5 w-5 text-gray-400 absolute right-3 top-3" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="text-sm text-gray-500">
              <ArrowRightIcon className="h-4 w-4 inline-block mr-1" />
              Next: Employee verification & adjustments
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent 
                       text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                       transition-colors duration-200"
            >
              Confirm & Continue
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">
          Helpful Tips
        </h3>
        <ul className="space-y-1 text-sm text-blue-700">
          <li>• Ensure dates align with your payroll calendar</li>
          <li>• Double-check public holidays in selected period</li>
          <li>• Verify employee contracts before proceeding</li>
        </ul>
      </div>
    </div>
  );
};

export default PayrollSetup;