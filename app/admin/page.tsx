"use client";

import React, { useEffect, useState } from "react";
import { 
  BarChart, Bar, 
  AreaChart, Area, 
  XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from "recharts";
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Eye,
  UserPlus,
  Compass
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const dashboardData = {
  stats: [
    { title: "Total Travelers", value: "12,482", icon: Users, change: "+12.5%", isPositive: true },
    { title: "Upcoming Events", value: "24", icon: Calendar, change: "+3.2%", isPositive: true },
    { title: "Revenue", value: "$182,490", icon: DollarSign, change: "+8.7%", isPositive: true },
    { title: "New Bookings", value: "312", icon: Compass, change: "-2.1%", isPositive: false },
  ],
  monthlyTravelers: [
    { month: "Jan", count: 1200 },
    { month: "Feb", count: 1560 },
    { month: "Mar", count: 1890 },
    { month: "Apr", count: 2100 },
    { month: "May", count: 2450 },
    { month: "Jun", count: 3200 },
  ],
  revenueByRegion: [
    { name: "Europe", value: 45 },
    { name: "Asia", value: 30 },
    { name: "Americas", value: 15 },
    { name: "Others", value: 10 },
  ],
  recentTravelers: [
    { name: "John Doe", email: "john@example.com", region: "Europe", status: "Active" },
    { name: "Jane Smith", email: "jane@example.com", region: "Asia", status: "Active" },
    { name: "Michael Ross", email: "michael@example.com", region: "America", status: "Inactive" },
    { name: "Sarah Connor", email: "sarah@example.com", region: "Europe", status: "Active" },
  ]
};

const COLORS = ["#4f46e5", "#0ea5e9", "#f43f5e", "#fbbf24"];

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.stats.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${stat.isPositive ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"}`}>
                {stat.isPositive ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-neutral-500 text-sm font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 p-8 bg-white dark:bg-neutral-900 rounded-4xl border border-neutral-100 dark:border-neutral-800 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold dark:text-white">Traveler Growth</h3>
            <select className="bg-neutral-100 dark:bg-neutral-800 border-none rounded-xl text-xs font-medium px-4 py-2 outline-none">
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboardData.monthlyTravelers}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "15px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#4f46e5" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-8 bg-white dark:bg-neutral-900 rounded-4xl border border-neutral-100 dark:border-neutral-800 shadow-sm"
        >
          <h3 className="text-xl font-bold mb-8 dark:text-white">Booking Distribution</h3>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboardData.revenueByRegion}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {dashboardData.revenueByRegion.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={4} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-2xl font-bold dark:text-white">100%</p>
                <p className="text-xs text-neutral-500">Booked</p>
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            {dashboardData.revenueByRegion.map((region, idx) => (
              <div key={region.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: COLORS[idx] }}></div>
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{region.name}</span>
                </div>
                <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{region.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tables and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-8 bg-white dark:bg-neutral-900 rounded-4xl border border-neutral-100 dark:border-neutral-800 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold dark:text-white">Recent Travelers</h3>
            <button className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {dashboardData.recentTravelers.map((traveler, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-bold text-neutral-600 dark:text-neutral-400 mr-4">
                    {traveler.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{traveler.name}</h4>
                    <p className="text-xs text-neutral-500">{traveler.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{traveler.region}</p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    {traveler.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="p-8 bg-white dark:bg-neutral-900 rounded-4xl border border-neutral-100 dark:border-neutral-800 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold dark:text-white">Employee Performance</h3>
            <TrendingUp size={20} className="text-indigo-600" />
          </div>
          <div className="space-y-8">
            {[
              { name: "Tour Guides", score: 92, count: 18 },
              { name: "Customer Support", score: 85, count: 12 },
              { name: "Event Managers", score: 88, count: 8 },
              { name: "Logistics Team", score: 79, count: 15 }
            ].map((perf, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{perf.name} ({perf.count} employees)</span>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{perf.score}%</span>
                </div>
                <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${perf.score}%` }}
                    transition={{ duration: 1, delay: 0.7 + idx * 0.1 }}
                    className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
