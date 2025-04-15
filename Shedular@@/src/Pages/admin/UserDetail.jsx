import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userAPI } from "../../api/api"; // Ensure getUserDetail is exported from here

const UserDetail = () => {
  const { userId } = useParams(); // e.g., /admin/user-detail/3
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await userAPI.getUserDetail(userId);
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user detail:", err.response?.data || err.message);
        setError("Failed to fetch user details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [userId]);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!user) return <p>No user data available.</p>;

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">User Detail</h1>
      <div className="space-y-2">
        <p>
          <strong>User ID:</strong> {user.id}
        </p>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Address:</strong> {user.address || "N/A"}
        </p>
        {user.assigned_role ? (
          <>
            <p>
              <strong>Role:</strong> {user.assigned_role.name}
            </p>
            <p>
              <strong>Pay:</strong> ${user.assigned_role.pay_per_hour}/hr
            </p>
          </>
        ) : (
          <p>
            <strong>Role:</strong> Not assigned
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
