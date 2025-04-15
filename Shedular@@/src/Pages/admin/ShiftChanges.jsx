// File: src/Pages/admin/ShiftChanges.jsx
import React, { useState } from 'react';
import ShiftSwapTab from './ShiftSwapTab';
import CoverupShiftsTab from './CoverupShiftsTab';

const ShiftChanges = () => {
  const [activeTab, setActiveTab] = useState('swap');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shift Changes</h1>
      <div className="flex space-x-4 border-b mb-4">
        <button
          onClick={() => setActiveTab('swap')}
          className={`py-2 px-4 ${activeTab === 'swap' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
        >
          Shift Swap
        </button>
        <button
          onClick={() => setActiveTab('coverup')}
          className={`py-2 px-4 ${activeTab === 'coverup' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
        >
          Cover-up Shifts
        </button>
      </div>

      {activeTab === 'swap' && <ShiftSwapTab />}
      {activeTab === 'coverup' && <CoverupShiftsTab />}
    </div>
  );
};

export default ShiftChanges;
