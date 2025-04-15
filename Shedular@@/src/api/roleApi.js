import axios from "axios";
import { getAdminAuthHeader } from "../helpers/adminAuth";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// ✅ Create a new role
export const createRole = async (data) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/roles/`,
    data,
    getAdminAuthHeader()
  );
  return response.data;
};

// ✅ Assign a role to a user
export const assignRole = async (data) => {
  const payload = {
    user: data.user_id,   // Backend expects "user"
    role: data.role_id    // and "role"
  };
  const response = await axios.post(
    `${API_BASE_URL}/api/assign-role/`,
    payload,
    getAdminAuthHeader()
  );
  return response.data;
};

// ✅ Get all roles
export const getAllRoles = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/roles/`,
    getAdminAuthHeader()
  );
  return response.data;
};

// ✅ Get all users (for dropdown if needed)
export const getAllUsers = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/users/`,
    getAdminAuthHeader()
  );
  return response.data;
};

// ✅ Optional: Unassign role from user
export const unassignRole = async (userId) => {
  const response = await axios.delete(
    `${API_BASE_URL}/api/unassign-role/${userId}/`,
    getAdminAuthHeader()
  );
  return response.data;
};

// ✅ Optional: Update role details
export const updateRole = async (roleId, data) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/roles/${roleId}/`,
    data,
    getAdminAuthHeader()
  );
  return response.data;
};

// ✅ Optional: Delete role
export const deleteRole = async (roleId) => {
  const response = await axios.delete(
    `${API_BASE_URL}/api/roles/${roleId}/`,
    getAdminAuthHeader()
  );
  return response.data;
};
