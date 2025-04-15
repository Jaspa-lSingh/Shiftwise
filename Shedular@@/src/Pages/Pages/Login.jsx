import React, { useState } from 'react';

const Login = () => {
  // State to keep track of selected role
  const [role, setRole] = useState('employee');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle login logic, e.g. sending data to an API
    console.log(`Logging in as ${role}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Outer container ensures content is centered and responsive */}
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {/* Dropdown to choose Employee or Admin */}
        <label htmlFor="role" className="block mb-2 font-medium text-gray-700">
          Select Role
        </label>
        <select
          id="role"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            placeholder="Enter your email"
          />

          {/* Password */}
          <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            placeholder="Enter your password"
          />

          {/* ID Code */}
          <label htmlFor="idCode" className="block mb-2 font-medium text-gray-700">
            ID Code
          </label>
          <input
            id="idCode"
            type="text"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            placeholder="Enter your ID code"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Login as {role === 'employee' ? 'Employee' : 'Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
