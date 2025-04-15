// File: src/Pages/admin/ManageUsers.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAdminAuthHeader } from "../../helpers/adminAuth";
import { FiSearch, FiUserPlus, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { userAPI } from "../../api/api"; 

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userAPI.getAdminUsers(); 
      setUsers(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
      setError("Error fetching users. Are you logged in as admin?");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const idCodeLower = (user.id_code || "").toLowerCase();
    const nameLower = (user.name || "").toLowerCase();
    const emailLower = (user.email || "").toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    return (
      idCodeLower.includes(searchLower) ||
      nameLower.includes(searchLower) ||
      emailLower.includes(searchLower)
    );
  });

  const handleViewUser = (userId) => {
    navigate(`/admin/admin-user-detail/${userId}`);
  };

  const handleEditUser = (userId) => {
    navigate(`/admin/edit-user/${userId}`);
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await userAPI.deleteAdminUser(userId);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err.response?.data || err.message);
      setError("Error deleting user.");
    }
  };

  // NEW: Add User button → navigate to /admin/add-user
  const handleAddUser = () => {
    navigate("/admin/add-user");
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={handleAddUser}
          className="w-full md:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all flex items-center gap-2 justify-center"
        >
          <FiUserPlus className="text-lg" />
          <span>Add New User</span>
        </button>
      </div>

      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-2 md:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {loading && (
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {!loading && filteredUsers.length === 0 && (
        <div className="text-center py-12 text-gray-500 text-sm md:text-base">
          No users found matching your criteria
        </div>
      )}

      {/* Mobile View */}
      <div className="md:hidden space-y-3">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{user.name || "N/A"}</h3>
                  <p className="text-xs text-gray-500">{user.id_code}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleViewUser(user.id)}
                    className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600"
                  >
                    <FiEye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditUser(user.id)}
                    className="p-1.5 hover:bg-amber-50 rounded-lg text-amber-600"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-1.5 hover:bg-red-50 rounded-lg text-red-600"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-700 break-all">{user.email || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">
                  Employee ID
                </th>
                <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-4 py-3 text-right text-xs md:text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs md:text-sm font-medium text-gray-900">
                    {user.id_code}
                  </td>
                  <td className="px-4 py-3 text-xs md:text-sm text-gray-700">
                    {user.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-xs md:text-sm text-gray-700 break-all">
                    {user.email || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => handleViewUser(user.id)}
                        className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 hover:text-blue-700"
                      >
                        <FiEye className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                      <button
                        onClick={() => handleEditUser(user.id)}
                        className="p-2 hover:bg-amber-50 rounded-lg text-amber-600 hover:text-amber-700"
                      >
                        <FiEdit2 className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-600 hover:text-red-700"
                      >
                        <FiTrash2 className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;