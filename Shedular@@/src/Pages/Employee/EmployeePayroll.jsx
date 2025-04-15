import React, { useState } from 'react';
import { 
    HiDocumentArrowDown as DocumentArrowDown,
    HiCurrencyDollar as CurrencyDollar,
    HiReceiptPercent as ReceiptPercent,
    HiBanknotes as Banknotes,
    HiCalendarDays as CalendarDays 
  } from 'react-icons/hi2';

const EmployeePayroll = () => {
  const [activeTab, setActiveTab] = useState('tax');
  const [taxDocuments] = useState([
    { id: 1, name: 'W-2 Form 2023', status: 'Not Available', date: '01/31/2025' },
    { id: 2, name: 'T-4 Form', status: 'Not Available', date: '02/15/2025' },
    { id: 3, name: 'State Tax Form', status: 'Not Available', date: '01/31/2025' },
  ]);

  const currentPay = {
    period: 'March 24 - April 1 , 2025',
    netPay: 0.0,
    grossPay: 0.0,
    deductions: 0.0,
    paymentDate: 'Jan 20, 2024'
  };

  const handleDownload = (docType) => {
    console.log(`Downloading ${docType}`);
    // Add actual download logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <Banknotes className="w-12 h-12 text-blue-600" />
          Payroll Portal
        </h1>

        {/* Tabs Navigation */}
        <div className="flex border-b-2 border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('tax')}
            className={`px-8 py-4 flex items-center gap-2 text-lg font-medium transition-all ${
              activeTab === 'tax' 
                ? 'border-b-4 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            <ReceiptPercent className="w-6 h-6" />
            Tax Documents
          </button>
          <button
            onClick={() => setActiveTab('pay')}
            className={`px-8 py-4 flex items-center gap-2 text-lg font-medium transition-all ${
              activeTab === 'pay'
                ? 'border-b-4 border-green-600 text-green-600'
                : 'text-gray-500 hover:text-green-500'
            }`}
          >
            <CurrencyDollar className="w-6 h-6" />
            Current Payment
          </button>
        </div>

        {/* Tax Documents Tab */}
        {activeTab === 'tax' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <DocumentArrowDown className="w-8 h-8 text-blue-600" />
              Tax Forms & Documents
            </h2>
            
            <div className="space-y-6">
              {taxDocuments.map((doc) => (
                <div 
                  key={doc.id}
                  className="flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all"
                >
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{doc.name}</h3>
                    <p className="text-sm text-gray-500">Due date: {doc.date}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      doc.status === 'Available' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {doc.status}
                    </span>
                    <button
                      onClick={() => handleDownload(doc.name)}
                      className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      disabled={doc.status !== 'Available'}
                    >
                      <DocumentArrowDown className="w-5 h-5" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Current Payment Tab */}
        {activeTab === 'pay' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-semibold flex items-center gap-3">
                  <CurrencyDollar className="w-8 h-8 text-green-600" />
                  Payment Details
                </h2>
                <p className="text-gray-500 mt-2 flex items-center gap-2">
                  <CalendarDays className="w-5 h-5" />
                  {currentPay.period}
                </p>
              </div>
              <button
                onClick={() => handleDownload('payslip')}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
              >
                <DocumentArrowDown className="w-5 h-5" />
                Download Payslip
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Net Pay</h3>
                  <div className="bg-green-100 p-3 rounded-full">
                    <CurrencyDollar className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <p className="text-4xl font-bold text-gray-900">
                  ${currentPay.netPay.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  Deposited to your account on {currentPay.paymentDate}
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Gross Pay</h4>
                  <p className="text-2xl font-semibold text-gray-800">
                    ${currentPay.grossPay.toFixed(2)}
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Deductions</h4>
                  <p className="text-2xl font-semibold text-red-600">
                    -${currentPay.deductions.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-xl">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Payment Breakdown</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Regular Hours</p>
                  <p className="font-medium">80 hours</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Overtime Hours</p>
                  <p className="font-medium">12 hours</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hourly Rate</p>
                  <p className="font-medium">$45.00</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeePayroll;
