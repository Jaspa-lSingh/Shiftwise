import React, { useState, useEffect } from "react";
import axios from "axios";
import { getEmployeeAuthHeader } from "../../helpers/employeeAuth";
import { shiftAPI } from "../../api/api";

const MyShifts = () => {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch shifts on component mount
  useEffect(() => {
    fetchMyShifts();
  }, []);

  // Fetch only the logged-in employee's shifts
  const fetchMyShifts = async () => {
    setLoading(true);
    try {
      const response = await shiftAPI.getEmployeeShifts();
      setShifts(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching shifts:", err.response?.data || err.message);
      setError("Error fetching shifts. Are you logged in?");
    }
    setLoading(false);
  };

  // Helper function to check if a shift spans to the next day
  const isOvernight = (shift) => {
    const [startHour] = shift.start_time.split(':').map(Number);
    const [endHour] = shift.end_time.split(':').map(Number);
    return startHour > endHour;
  };

  // Helper function to check if a shift belongs to a specific date
  const shiftBelongsToDate = (shift, date) => {
    const shiftDate = new Date(shift.date);
    const nextDay = new Date(shiftDate);
    nextDay.setDate(nextDay.getDate() + 1);
    
    const compareDate = new Date(date);
    
    // Check if the shift starts on this date
    const startsOnThisDate = shiftDate.toDateString() === compareDate.toDateString();
    
    // Check if the shift ends on this date (for overnight shifts)
    const endsOnThisDate = isOvernight(shift) && nextDay.toDateString() === compareDate.toDateString();
    
    return startsOnThisDate || endsOnThisDate;
  };

  // Get current week dates
  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const diff = today.getDate() - currentDay;
    
    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(today.setDate(diff + index));
      return {
        date: day,
        dayName: day.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: day.getDate(),
        month: day.toLocaleDateString('en-US', { month: 'short' })
      };
    });
  };

  const weekDays = getCurrentWeekDates();

  // Separate current week shifts and past shifts
  const currentDate = new Date();
  const currentWeekStart = new Date(currentDate);
  currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay());
  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 6);

  const { currentWeekShifts, pastShifts } = shifts.reduce((acc, shift) => {
    const shiftDate = new Date(shift.date);
    const isCurrentWeek = shiftDate >= currentWeekStart && shiftDate <= currentWeekEnd;
    
    // Handle overnight shifts that start in the previous week but end in current week
    const isOvernightFromPreviousWeek = 
      isOvernight(shift) && 
      new Date(shift.date).getDate() === currentWeekStart.getDate() - 1;

    if (isCurrentWeek || isOvernightFromPreviousWeek) {
      acc.currentWeekShifts.push(shift);
    } else if (shiftDate < currentWeekStart) {
      acc.pastShifts.push(shift);
    }
    return acc;
  }, { currentWeekShifts: [], pastShifts: [] });

  // PATCH request to update the shift status
  const updateShiftStatus = async (shiftId, newStatus) => {
    try {
      await shiftAPI.updateEmployeeShiftStatus(shiftId, newStatus);
      // Re-fetch shifts to refresh the table
      fetchMyShifts();
    } catch (err) {
      console.error("Error updating shift status:", err.response?.data || err.message);
      setError("Error updating shift status. Are you logged in?");
    }
  };

  // Handler for the dropdown change
  const handleActionChange = (shiftId, e) => {
    const selectedAction = e.target.value;
    if (selectedAction) {
      updateShiftStatus(shiftId, selectedAction);
    }
    e.target.value = "";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            My Shifts
          </h1>
          <p className="mt-1 text-sm text-gray-500">View and manage your shifts</p>
        </div>

        {/* Week View */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Week</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {weekDays.map(({ date, dayName, dayNumber, month }) => {
              const dayShifts = shifts.filter(shift => shiftBelongsToDate(shift, date));
              return (
                <div key={dayName} className="bg-white rounded-lg shadow p-4">
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{dayName}</div>
                    <div className="text-sm text-gray-500">{month} {dayNumber}</div>
                  </div>
                  {dayShifts.length > 0 ? (
                    dayShifts.map(shift => (
                      <div key={shift.id} className="mt-2 p-2 bg-blue-50 rounded">
                        <div className="text-sm font-medium text-gray-900">
                          {isOvernight(shift) && !shift.date.includes(date.toISOString().split('T')[0])
                            ? '(cont.) ' : ''}{shift.start_time} - {shift.end_time}
                        </div>
                        <div className="text-xs text-gray-500">{shift.location}</div>
                        <div className="mt-1">
                          <select
                            defaultValue=""
                            onChange={(e) => handleActionChange(shift.id, e)}
                            className="block w-full text-xs appearance-none bg-white border border-gray-300 hover:border-gray-400 px-2 py-1 pr-6 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            disabled={shift.status === "confirmed" || shift.status === "cancelled"}
                          >
                            <option value="" disabled>Actions</option>
                            <option value="employee_confirmed" disabled={shift.status === "confirmed" || shift.status === "cancelled"}>
                              Confirm
                            </option>
                            <option value="cancelled" disabled={shift.status === "cancelled"}>
                              Cancel
                            </option>
                          </select>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-sm text-gray-500 py-2 mt-2">No shifts</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Past Shifts Table */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Past Shifts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pastShifts.map((shift) => {
                  const statusColor = shift.status === "cancelled" ? 'red' : shift.status === "confirmed" ? 'green' : 'yellow';
                  return (
                    <tr key={shift.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(shift.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })}
                          {isOvernight(shift) && ' - Next Day'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{shift.start_time} - {shift.end_time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{shift.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${statusColor}-100 text-${statusColor}-800`}>
                          {shift.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyShifts; 