import React, { useEffect, useState } from "react";
import { assignRole, getAllRoles } from "../../../api/roleApi";
import { userAPI } from "../../../api/api"; // Importing userAPI for fetching users

const AssignRole = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userAPI.getAdminUsers();
      // Filter users with Gmail addresses only
      const gmailUsers = response.data.filter((user) =>
        user.email?.includes("@gmail.com")
      );
      setUsers(gmailUsers);
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
      setMessage("Error fetching users. Are you logged in as admin?");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await getAllRoles();
      setRoles(res); // Expecting res to be an array of roles
    } catch (err) {
      console.error("Error fetching roles:", err.response?.data || err.message);
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      // Convert the selected values to numbers before sending the payload
      await assignRole({
        user_id: Number(selectedUser),
        role_id: Number(selectedRole)
      });
      setMessage("✅ Role assigned successfully!");
      setSelectedUser("");
      setSelectedRole("");
    } catch (err) {
      console.error("Failed to assign role:", err);
      setMessage("❌ Failed to assign role.");
    }
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

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Assign Role to User</h2>

      <input
        type="text"
        placeholder="Search by email, name, or ID code"
        className="w-full px-3 py-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <form onSubmit={handleAssign} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Select User (Gmail)</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">-- Choose a user --</option>
            {filteredUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Select Role</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">-- Choose a role --</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name} - ${role.pay_per_hour}/hr
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Assign Role
        </button>

        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default AssignRole;
