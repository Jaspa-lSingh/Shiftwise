import React from "react";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { FiUsers, FiClock, FiDollarSign, FiAlertOctagon, FiPlus, FiActivity, FiBriefcase, FiServer } from "react-icons/fi";
import { motion } from "framer-motion";

const data = {
  shiftDistribution: [
    { name: "Morning", hours: 400 },
    { name: "Afternoon", hours: 300 },
    { name: "Night", hours: 200 },
  ],
  laborCosts: [
    { name: "Warehouse", value: 400 },
    { name: "Office", value: 300 },
    { name: "Drivers", value: 200 },
  ],
  colors: ["#3B82F6", "#10B981", "#F59E0B"]
};

const AdminDashboard = () => {
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold flex items-center gap-2"
        >
          <FiActivity className="text-blue-600" />
          Workforce Dashboard
        </motion.h1>
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
            <FiPlus /> New Shift
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white shadow-lg rounded-xl p-4 border-l-4 border-blue-500"
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-500 flex items-center gap-2"><FiUsers /> Total Employees</div>
              <div className="text-2xl font-bold mt-2">1</div>
            </div>
            <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">↑ -% from last month</div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white shadow-lg rounded-xl p-4 border-l-4 border-green-500"
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-500 flex items-center gap-2"><FiClock /> Active Shifts</div>
              <div className="text-2xl font-bold mt-2">89</div>
            </div>
            <div className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded"> N/A shifts pending approval</div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white shadow-lg rounded-xl p-4 border-l-4 border-purple-500"
        >
          <div className="flex justify-between">
            <div>
              <div className="text-gray-500 flex items-center gap-2"><FiDollarSign /> Payroll Due</div>
              <div className="text-2xl font-bold mt-2">---</div>
            </div>
            <div className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Next run: Saturday</div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white shadow-lg rounded-xl p-4 border-l-4 border-red-500"
        >
          <div className="flex justify-between">
            <div>
              <div className="text-gray-500 flex items-center gap-2"><FiAlertOctagon /> Overtime</div>
              <div className="text-2xl font-bold mt-2">127 hrs</div>
            </div>
            <div className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">$0.00 cost</div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white shadow-lg rounded-xl p-6"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiClock /> Shift Distribution
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.shiftDistribution}>
                <Bar 
                  dataKey="hours" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-4">
            {data.shiftDistribution.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.colors[index] }} />
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white shadow-lg rounded-xl p-6"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiBriefcase /> Labor Cost Breakdown
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.laborCosts}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.laborCosts.map((entry, index) => (
                    <Cell key={index} fill={data.colors[index % data.colors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiActivity /> Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              { type: 'shift', user: 'John Doe', action: 'created new overnight shift', time: '2h ago' },
              { type: 'payroll', user: 'System', action: 'processed payroll for 123 employees', time: '5h ago' },
              { type: 'alert', user: 'Warehouse', action: 'overtime threshold exceeded', time: '8h ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${activity.type === 'shift' ? 'bg-blue-100 text-blue-600' : 
                    activity.type === 'payroll' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {activity.type === 'shift' ? <FiClock /> : 
                   activity.type === 'payroll' ? <FiDollarSign /> : <FiAlertOctagon />}
                </div>
                <div>
                  <div className="font-semibold">{activity.user}</div>
                  <div className="text-gray-600">{activity.action}</div>
                  <div className="text-sm text-gray-400">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiServer /> System Health
          </h2>
          <div className="space-y-4">
            {[
              { service: 'Payroll API', status: 'operational', lastChecked: '2 min ago' },
              { service: 'Time Tracking', status: 'degraded', lastChecked: '5 min ago' },
              { service: 'Scheduling', status: 'operational', lastChecked: '10 min ago' }
            ].map((system, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{system.service}</div>
                  <div className="text-sm text-gray-500">{system.lastChecked}</div>
                </div>
                <div className={`px-2 py-1 rounded-full text-sm ${
                  system.status === 'operational' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {system.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;