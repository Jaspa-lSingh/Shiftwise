// File: src/Pages/admin/EmployeeRow.jsx

import React, { useState } from "react";

const EmployeeRow = ({ employee, onUpdate }) => {
  // Initialize with the current department name and base salary.
  const [department, setDepartment] = useState(
    employee.department ? employee.department.name : ""
  );
  const [baseSalary, setBaseSalary] = useState(employee.base_salary);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the updated data to the parent component (EmployeeList).
    onUpdate(employee.id, { department, base_salary: baseSalary });
  };

  return (
    <tr>
      <td className="p-2 border">{employee.user?.name || "N/A"}</td>
      <td className="p-2 border">{employee.id_code}</td>
      <td className="p-2 border">
        <form onSubmit={handleSubmit} className="flex space-x-2 items-center">
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Department"
            className="border p-1"
          />
          <input
            type="number"
            value={baseSalary}
            onChange={(e) => setBaseSalary(e.target.value)}
            placeholder="Base Salary"
            className="border p-1"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-2 py-1 rounded"
          >
            Update
          </button>
        </form>
      </td>
    </tr>
  );
};

export default EmployeeRow;
