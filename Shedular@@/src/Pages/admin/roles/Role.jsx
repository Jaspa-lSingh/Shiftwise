import React, { useState } from 'react';
import CreateRole from './CreateRole';
import AssignRole from './AssignRole';

const Role = () => {
  const [activeTab, setActiveTab] = useState('create');

  const tabClass = (tab) =>
    `w-full sm:w-auto px-4 py-3 text-sm sm:text-base font-medium transition-colors
    ${
      activeTab === tab
        ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50/50'
        : 'text-gray-500 hover:text-blue-500 hover:bg-gray-50'
    }`;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200/50">
          {/* Tabs Navigation */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 border-b border-gray-200 px-4 pt-4 sm:px-6 sm:pt-6">
            <button 
              className={tabClass('create')} 
              onClick={() => setActiveTab('create')}
            >
              Create Role
            </button>
            <button 
              className={tabClass('assign')} 
              onClick={() => setActiveTab('assign')}
            >
              Assign Role
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            {activeTab === 'create' && <CreateRole />}
            {activeTab === 'assign' && <AssignRole />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;