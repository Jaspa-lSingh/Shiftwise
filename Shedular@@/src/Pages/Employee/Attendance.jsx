import React, { useState, useEffect } from "react";
import axios from "axios";
import { getEmployeeAuthHeader } from "../../helpers/employeeAuth";
import api from "../../api/api";

const Attendance = () => {
  const [allShifts, setAllShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [attendanceMap, setAttendanceMap] = useState({});
  

  useEffect(() => {
    fetchAllShifts();
  }, []);

  // 1) Fetch All Shifts
  const fetchAllShifts = async () => {
    setLoading(true);
    try {
      // 1. Fetch shifts
      const shiftsResponse = await api.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/shifts/my-shifts/`,
        getEmployeeAuthHeader()
      );
      setAllShifts(shiftsResponse.data);
  
      // 2. Fetch active attendance (single record or 404)
      try {
        const attendanceResponse = await api.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/attendance/active/`, // Add trailing slash
          getEmployeeAuthHeader()
        );
        // Handle single record
        const record = attendanceResponse.data;
        setAttendanceMap((prev) => ({ ...prev, [record.shift]: record }));
      } catch (err) {
        if (err.response?.status === 404) {
          // No active attendance found (expected case)
          setAttendanceMap({});
        } else {
          throw err;
        }
      }
  
      setError("");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load data");
    }
    setLoading(false);
  };


  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  const todayDateStr = getTodayDateString();

  const isPastShift = (shift) => {
    const now = new Date();
    const shiftEnd = new Date(shift.date);
    const [endHour, endMinute, endSecond] = shift.end_time.split(":");
    shiftEnd.setHours(endHour, endMinute, endSecond);
    return now > shiftEnd;
  };

  const upcomingShifts = allShifts.filter((s) => s.date > todayDateStr);
  const todayShifts = allShifts.filter((s) => s.date === todayDateStr);
  const pastShifts = allShifts.filter((s) => s.date < todayDateStr);

  const canClockIn = (shift) => {
    const shiftStartStr = `${shift.date}T${shift.start_time}`;
    const shiftStart = new Date(shiftStartStr);
  
    // 2) Define the earliest and latest clock-in times
    const earliest = new Date(shiftStart.getTime() - 5 * 60 * 1000); // 5 min before
    const latest = new Date(shiftStart.getTime() + 10 * 60 * 1000);  // 10 min after
  
    // 3) Current local time
    const now = new Date();
  
    // 4) (Optional) Debugging logs to confirm the calculations
    console.log("---- canClockIn Debug ----");
    console.log("Shift Start String:", shiftStartStr);
    console.log("Shift Start:", shiftStart.toString());
    console.log("Earliest:", earliest.toString());
    console.log("Latest:", latest.toString());
    console.log("Now:", now.toString());
    console.log("-------------------------");
  
    // 5) Return whether 'now' is within [earliest, latest]
    return now >= earliest && now <= latest;
  };

  const handleClockIn = (shift) => {
    if (!canClockIn(shift)) {
      alert("You can only clock in within 5 minutes before to 10 minutes after the shift starts.");
      return;
    }
  
    // 1) Get current geolocation before making the POST request
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // 2) Extract latitude & longitude
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
  
          // 3) Build the payload for clock in
          const data = {
            shift: shift.id,
            clock_in_time: new Date().toISOString(),
            clock_in_location: `${lat},${lng}`,
          };
  
          // 4) Make the POST request
          const response = await api.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/attendance/clock-in/`,
            data,
            getEmployeeAuthHeader()
          );
  
          // 5) Store the returned attendance record
          const record = response.data;
          setAttendanceMap((prev) => ({ ...prev, [shift.id]: record }));
          alert("Clocked in successfully!");
        } catch (err) {
          console.error("Error clocking in:", err.response?.data || err.message);
          setError("Error clocking in.");
        }
      },
      (err) => {
        // Geolocation error callback
        console.error("Geolocation error:", err);
        alert("Unable to fetch your location. Please allow location access.");
      }
    );
  };

  const handleClockOut = (shift) => {
    const record = attendanceMap[shift.id];
    if (!record) {
      alert("No attendance record found for this shift.");
      return;
    }
  
    // 1) Get current geolocation before making the PATCH request
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // 2) Extract latitude & longitude
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
  
          // 3) Build the payload for clock out
          const data = {
            clock_out_time: new Date().toISOString(),
            clock_out_location: `${lat},${lng}`,
          };
  
          // 4) Make the PATCH request
          const response = await api.patch(
            `${import.meta.env.VITE_BACKEND_URL}/api/attendance/clock-out/${record.id}/`,
            data,
            getEmployeeAuthHeader()
          );
  
          // 5) Update the attendance record in state
          const updated = response.data;
          setAttendanceMap((prev) => ({ ...prev, [shift.id]: updated }));
          alert("Clocked out successfully!");
        } catch (err) {
          console.error("Error clocking out:", err.response?.data || err.message);
          setError("Error clocking out.");
        }
      },
      (err) => {
        // Geolocation error callback
        console.error("Geolocation error:", err);
        alert("Unable to fetch your location for clock out. Please allow location access.");
      }
    );
  };
  

  // 5) Render Tables
  // For upcoming/past
  const renderShiftsTable = (shifts) => {
    if (shifts.length === 0) {
      return (
        <div className="text-center py-6 text-gray-500">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          No shifts found
        </div>
      );
    }
    return (
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {shifts.map((shift) => (
              <tr key={shift.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift.start_time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift.end_time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderTodayShiftsTable = () => {
    if (todayShifts.length === 0) {
      return (
        <div className="text-center py-6 text-gray-500">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          No shift scheduled for today
        </div>
      );
    }
    return (
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock In</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock Out</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location In</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location Out</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {todayShifts.map((shift) => {
              const record = attendanceMap[shift.id];
              const clockedIn = record && record.clock_in_time && !record.clock_out_time;

              return (
                <tr key={shift.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift.start_time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift.end_time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record?.clock_in_time || <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record?.clock_out_time || <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record?.clock_in_location || <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record?.clock_out_location || <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record?.total_hours || <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      {!record?.clock_in_time && (
                        <button
                          onClick={() => handleClockIn(shift)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          In
                        </button>
                      )}
                      {clockedIn && (
                        <button
                          onClick={() => handleClockOut(shift)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                          </svg>
                          Out
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  // Updated main render
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Attendance
        </h1>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg flex items-center gap-3">
          <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <>
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {["upcoming", "today", "past"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Shifts
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-6">
            {activeTab === "upcoming" && (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Upcoming Shifts</h2>
                </div>
                <div className="p-6">{renderShiftsTable(upcomingShifts)}</div>
              </div>
            )}

            {activeTab === "today" && (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Today's Shifts</h2>
                </div>
                <div className="p-6">{renderTodayShiftsTable()}</div>
              </div>
            )}

            {activeTab === "past" && (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Past Shifts</h2>
                </div>
                <div className="p-6">{renderShiftsTable(pastShifts)}</div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Attendance;