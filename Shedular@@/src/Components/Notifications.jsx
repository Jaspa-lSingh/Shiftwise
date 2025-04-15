import React, { useState, useEffect } from "react";
import axios from "axios";
import { getEmployeeAuthHeader } from "../helpers/employeeAuth"; // Adjust path as needed


const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/notifications/",
        getEmployeeAuthHeader()
      );
      setNotifications(response.data);
    } catch (err) {
      console.error("Error fetching notifications:", err.response?.data || err.message);
      setError("Failed to load notifications");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();

    // Optionally: set up polling or WebSocket for real-time updates.
    // const interval = setInterval(fetchNotifications, 60000);
    // return () => clearInterval(interval);
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/notifications/${notificationId}/read/`,
        {},
        getEmployeeAuthHeader()
      );
      // After marking as read, update the local state (or re-fetch)
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notificationId ? { ...notif, is_read: true } : notif
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err.response?.data || err.message);
    }
  };

  if (loading) return <p>Loading notifications...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!notifications.length) return <p>No notifications available.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      <ul className="space-y-3">
        {notifications.map((notif) => (
          <li
            key={notif.id}
            className={`p-3 rounded shadow ${
              notif.is_read ? "bg-gray-100" : "bg-white"
            }`}
          >
            <p className="text-sm">{notif.message}</p>
            <p className="text-xs text-gray-500">
              {new Date(notif.created_at).toLocaleString()}
            </p>
            {!notif.is_read && (
              <button
                onClick={() => markAsRead(notif.id)}
                className="mt-1 text-blue-600 hover:underline text-xs"
              >
                Mark as Read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
