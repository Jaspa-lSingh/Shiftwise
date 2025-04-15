// File: src/Pages/admin/EmployeeList.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeRow from "../EmployeeRow";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Base API URL
  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  // Fetch employees from your payroll API
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/payroll/employees/`);
      setEmployees(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error fetching employees");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Function to update an employee's department or base salary.
  const handleUpdate = async (employeeId, updatedData) => {
    try {
      await axios.patch(
        `${API_BASE}/api/payroll/employees/${employeeId}/`,
        updatedData
      );
      // Refresh the list after successful update
      fetchEmployees();
    } catch (err) {
      console.error("Update error", err);
      setError("Error updating employee");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Employee List & Configuration</h2>
      {loading && <p>Loading employees...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && employees.length === 0 && <p>No employees found.</p>}
      {!loading && employees.length > 0 && (
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Employee ID</th>
              <th className="p-2 border">Configuration</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <EmployeeRow key={emp.id} employee={emp} onUpdate={handleUpdate} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;
