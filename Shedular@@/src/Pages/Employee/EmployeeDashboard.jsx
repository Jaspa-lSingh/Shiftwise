import React, { useEffect, useState } from "react";
import { 
  HiCalendar, 
  HiClock, 
  HiUserCircle, 
  HiDocumentText, 
  HiBell, 
  HiArrowCircleRight 
} from "react-icons/hi";
import { userAPI } from "../../api/api";
import { shiftAPI } from "../../api/api";
import { employeeAnnouncementAPI } from "../../api/api";
import { employeeLeaveAPI } from "../../api/api";
import { attendanceAPI } from "../../api/api";

const EmployeeDashboard = () => {
  const [user, setUser] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch user profile
        const userResponse = await userAPI.getProfile();
        setUser(userResponse.data);

        // Fetch shifts
        const shiftsResponse = await shiftAPI.getEmployeeShifts();
        setShifts(shiftsResponse.data);

        // Fetch announcements
        const announcementsResponse = await employeeAnnouncementAPI.getAll();
        setAnnouncements(announcementsResponse.data);

        // Fetch leave balance
        const leavesResponse = await employeeLeaveAPI.getAll();
        const approvedLeaves = leavesResponse.data.filter(leave => leave.status === 'approved');
        setLeaveBalance(approvedLeaves.length);

        // Fetch attendance for total hours
        const attendanceResponse = await attendanceAPI.getUserAttendance(userResponse.data.id);
        const totalHoursThisMonth = attendanceResponse.data.reduce((total, record) => {
          if (record.clock_out) {
            const hours = (new Date(record.clock_out) - new Date(record.clock_in)) / (1000 * 60 * 60);
            return total + hours;
          }
          return total;
        }, 0);
        setTotalHours(Math.round(totalHoursThisMonth));

        setError(null);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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

  // Get upcoming shifts (next 3 days)
  const upcomingShifts = shifts
    .filter(shift => {
      const shiftDate = new Date(shift.date);
      const now = new Date();
      // Include shifts that start today or in the future
      return shiftDate >= now || (isOvernight(shift) && shiftDate.getDate() === now.getDate() - 1);
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  // Get next shift
  const nextShift = upcomingShifts[0];

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name}</h1>
          <p className="text-gray-600 mt-2">Your schedule for {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <HiUserCircle className="w-10 h-10 text-blue-600" />
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.role || 'Employee'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 mb-1">Upcoming Shifts</p>
              <p className="text-3xl font-bold">{upcomingShifts.length}</p>
            </div>
            <HiCalendar className="w-12 h-12 text-blue-100" />
          </div>
          <div className="mt-4 text-sm text-blue-600 flex items-center gap-2">
            <HiArrowCircleRight className="w-5 h-5" />
            <span>View Schedule</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 mb-1">Total Hours</p>
              <p className="text-3xl font-bold">{totalHours}</p>
              <p className="text-sm text-gray-500 mt-1">This month</p>
            </div>
            <HiClock className="w-12 h-12 text-green-100" />
          </div>
          <div className="mt-4 h-2 bg-gray-100 rounded-full">
            <div className="h-2 bg-green-500 rounded-full" style={{ width: `${Math.min((totalHours / 160) * 100, 100)}%` }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 mb-1">Leave Balance</p>
              <p className="text-3xl font-bold">{leaveBalance}</p>
              <p className="text-sm text-gray-500 mt-1">Days remaining</p>
            </div>
            <HiDocumentText className="w-12 h-12 text-purple-100" />
          </div>
          <button className="mt-4 w-full py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors">
            Request Time Off
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 mb-1">Next Shift</p>
              <p className="text-xl font-bold">
                {nextShift ? new Date(nextShift.date).toLocaleDateString('en-US', { weekday: 'long' }) : 'No upcoming shifts'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {nextShift ? `${nextShift.start_time} - ${nextShift.end_time}` : '--'}
              </p>
            </div>
            <HiBell className="w-12 h-12 text-orange-100" />
          </div>
          <button className="mt-4 w-full py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors">
            Swap Shift
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })} Schedule
            </h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg">Today</button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">←</button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">→</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-gray-500 text-sm py-2">{day}</div>
            ))}
            {Array.from({ length: 31 }).map((_, i) => {
              const currentDate = new Date();
              currentDate.setDate(i + 1);
              const dayShifts = shifts.filter(shift => shiftBelongsToDate(shift, currentDate));
              return (
                <div 
                  key={i} 
                  className={`p-2 rounded-lg ${dayShifts.length > 0 ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-50'}`}
                >
                  {i + 1}
                  {dayShifts.length > 0 && (
                    <div className="text-xs mt-1">
                      {dayShifts.map((shift, idx) => (
                        <div key={idx} className="whitespace-nowrap overflow-hidden text-ellipsis">
                          {isOvernight(shift) && !shift.date.includes(currentDate.toISOString().split('T')[0]) 
                            ? '(cont.) ' : ''}{shift.start_time} - {shift.end_time}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Company Announcements</h2>
          <div className="space-y-6">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="pb-4 border-b last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{announcement.title}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(announcement.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{announcement.content}</p>
                <button className="mt-2 text-blue-600 text-sm hover:underline">
                  Read More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Upcoming Shifts</h2>
        <div className="space-y-4">
          {upcomingShifts.map((shift) => (
            <div 
              key={shift.id} 
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <div>
                <h3 className="font-medium">
                  {new Date(shift.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </h3>
                <p className="text-gray-600 text-sm">{shift.start_time} - {shift.end_time}</p>
              </div>
              <div className="text-gray-500 text-sm">{shift.location}</div>
              <button className="text-blue-600 hover:text-blue-700">
                <HiArrowCircleRight className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard; 