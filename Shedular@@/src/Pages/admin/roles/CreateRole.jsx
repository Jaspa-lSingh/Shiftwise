import React, { useState } from 'react';
import { createRole } from '../../../api/roleApi';

const CreateRole = () => {
  const [roleName, setRoleName] = useState('');
  const [pay, setPay] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createRole({ name: roleName, pay_per_hour: pay });
      setMessage({ type: 'success', content: 'Role created successfully!' });
      setRoleName('');
      setPay('');
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', content: 'Error creating role. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-gray-200/50 dark:ring-gray-700/50">
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Create New Role
            <span className="block mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Add a new position to your organization's roles
            </span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Role Name Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role Name
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:text-white transition-all"
                    placeholder="e.g., Senior Chef, Sous Chef"
                    required
                    disabled={isSubmitting}
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Pay Rate Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hourly Rate
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400">$</span>
                  </div>
                  <input
                    type="number"
                    value={pay}
                    onChange={(e) => setPay(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:text-white transition-all"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                    disabled={isSubmitting}
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400">/hour</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center px-6 py-3.5 border border-transparent rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-all transform hover:scale-[1.01] shadow-md"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Create Role'
              )}
            </button>

            {/* Status Messages */}
            {message && (
              <div className={`mt-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800'}`}>
                <p className={`text-sm ${message.type === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'} flex items-center`}>
                  <svg className={`h-5 w-5 mr-2 ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {message.type === 'success' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    )}
                  </svg>
                  {message.content}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRole;