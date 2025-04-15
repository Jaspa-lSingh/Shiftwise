import React, { useState } from "react";
import EmployeeCoverupShift from "./EmployeeCoverupShift";
import SwapShift from "./SwapShift";
const ShiftChangesTab = () => {
  const [activeTab, setActiveTab] = useState("coverup");

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Shift Changes</h2>

      {/* Tab Buttons */}
      <div className="flex space-x-4 border-b pb-2 mb-6">
        <button
          onClick={() => setActiveTab("coverup")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "coverup"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
          }`}
        >
          Cover-Up Shift
        </button>
        <button
          onClick={() => setActiveTab("swap")}  
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "swap"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
          }`}
        >
          Swap Shift
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "coverup" && <EmployeeCoverupShift />}
      {activeTab === "swap" && <SwapShift />}
    </div>
  );
};

export default ShiftChangesTab;
