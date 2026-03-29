"use client";

import React, { useEffect, useState } from "react";
import { 
  AreaChart, Area, 
  XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from "recharts";
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  UserPlus,
  Compass,
  ArrowRight,
  MoreVertical,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";

const dashboardData = {
  stats: [
    { title: "Total Travelers", value: "12,482", icon: Users, change: "+12.5%", isPositive: true, color: "indigo" },
    { title: "Upcoming Events", value: "24", icon: Calendar, change: "+3.2%", isPositive: true, color: "blue" },
    { title: "Revenue", value: "20,986,350 ৳", icon: Wallet, change: "+8.7%", isPositive: true, color: "emerald" },
    { title: "New Bookings", value: "312", icon: Compass, change: "-2.1%", isPositive: false, color: "rose" },
  ],
  monthlyTravelers: [
    { month: "Jan", count: 1200, revenue: 45000 },
    { month: "Feb", count: 1560, revenue: 52000 },
    { month: "Mar", count: 1890, revenue: 61000 },
    { month: "Apr", count: 2100, revenue: 68000 },
    { month: "May", count: 2450, revenue: 75000 },
    { month: "Jun", count: 3200, revenue: 92000 },
  ],
  revenueByRegion: [
    { name: "Europe", value: 45, color: "#6366f1" },
    { name: "Asia", value: 30, color: "#3b82f6" },
    { name: "Americas", value: 15, color: "#10b981" },
    { name: "Others", value: 10, color: "#f43f5e" },
  ],
  recentTravelers: [
    { name: "John Doe", email: "john@example.com", region: "Europe", status: "Active", amount: "138,000 ৳" },
    { name: "Jane Smith", email: "jane@example.com", region: "Asia", status: "Active", amount: "396,750 ৳" },
    { name: "Michael Ross", email: "michael@example.com", region: "America", status: "Pending", amount: "102,350 ৳" },
    { name: "Sarah Connor", email: "sarah@example.com", region: "Europe", status: "Active", amount: "241,500 ৳" },
  ]
};



export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Only set isClient on mount to handle Recharts hydration
    const timer = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isClient) return null;

  return (
    <div className="space-y-10 pb-10">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-700 p-10 text-white shadow-2xl shadow-indigo-200 dark:shadow-none"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h1 className="text-4xl font-black mb-3 tracking-tight">Welcome, Administrator! 👋</h1>
            <p className="text-indigo-100/80 text-lg max-w-xl font-medium">
              Your dashboard is performing 12% better than last month. Check out the latest traveler metrics and upcoming events.
            </p>
            <div className="flex gap-4 mt-8">
              <button className="px-6 py-3 bg-white text-indigo-600 rounded-2xl font-bold shadow-lg hover:bg-slate-50 transition-all flex items-center gap-2">
                Download Report
                <ArrowRight size={18} />
              </button>
              <button className="px-6 py-3 bg-indigo-500/30 text-white border border-indigo-400/30 rounded-2xl font-bold hover:bg-indigo-500/40 transition-all">
                Analytics Details
              </button>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-3xl font-black">2.4k</p>
                <p className="text-indigo-100/60 font-medium text-sm">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black">154</p>
                <p className="text-indigo-100/60 font-medium text-sm">Destinations</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-white/10 skew-x-[-20deg] blur-3xl rounded-full" />
        <div className="absolute bottom-[-50%] left-[-10%] w-[30%] h-[100%] bg-indigo-400/20 blur-3xl rounded-full" />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.stats.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative p-8 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`p-4 bg-${stat.color}-50 dark:bg-${stat.color}-900/10 text-${stat.color}-600 dark:text-${stat.color}-400 rounded-[20px] transition-transform duration-300 group-hover:scale-110`}>
                <stat.icon size={26} strokeWidth={2.5} />
              </div>
              <div className={`flex items-center text-xs font-bold px-3 py-1.5 rounded-full ${stat.isPositive ? "bg-emerald-100/60 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-rose-100/60 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400"}`}>
                {stat.isPositive ? <ArrowUpRight size={14} className="mr-1" strokeWidth={3} /> : <ArrowDownRight size={14} className="mr-1" strokeWidth={3} />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">{stat.title}</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</h3>
            </div>
            
            <div className={`absolute bottom-0 left-8 right-8 h-1 rounded-t-full bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-400 opacity-0 group-hover:opacity-100 transition-opacity`} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Growth Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 p-10 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Growth Analytics</h3>
              <p className="text-slate-500 text-sm font-medium">Monthly traveler statistics overview</p>
            </div>
            <div className="flex gap-2">
              <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-xs font-bold px-4 py-2.5 outline-none cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <option>Year 2026</option>
                <option>Year 2025</option>
              </select>
              <button className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboardData.monthlyTravelers}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#94a3b8", fontSize: 13, fontWeight: 600 }}
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#94a3b8", fontSize: 13, fontWeight: 600 }}
                  dx={-15}
                />
                <Tooltip 
                  cursor={{ stroke: '#6366f1', strokeWidth: 2 }}
                  contentStyle={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(8px)",
                    border: "none",
                    borderRadius: "20px",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    padding: "15px"
                  }}
                  itemStyle={{ color: "#6366f1", fontWeight: 700 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#6366f1" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                  animationDuration={2500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Region Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-10 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col"
        >
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Regions</h3>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/10 text-indigo-600 dark:text-indigo-400 rounded-2xl">
              <Activity size={20} />
            </div>
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            <div className="h-[280px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dashboardData.revenueByRegion}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={8}
                    dataKey="value"
                    animationDuration={2000}
                  >
                    {dashboardData.revenueByRegion.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: "15px", 
                      border: "none", 
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" 
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-4xl font-black text-slate-900 dark:text-white">74%</p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Global</p>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              {dashboardData.revenueByRegion.map((region, idx) => (
                <div key={region.name} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-md mr-4 shadow-lg transition-transform group-hover:scale-125" style={{ backgroundColor: region.color }}></div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{region.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-20 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${region.value}%` }}
                        transition={{ duration: 1.5, delay: 0.5 + idx * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: region.color }}
                      />
                    </div>
                    <span className="text-sm font-black text-slate-900 dark:text-white min-w-[32px]">{region.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tables and Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Travelers Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-10 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Recent Travelers</h3>
              <p className="text-slate-500 text-sm font-medium">Recently joined community members</p>
            </div>
            <button className="flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-black hover:gap-2 transition-all">
              View All Activity
              <ArrowRight size={18} className="ml-1" />
            </button>
          </div>
          
          <div className="space-y-6">
            {dashboardData.recentTravelers.map((traveler, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <div className="flex items-center">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 p-[1px] shadow-sm mr-5 group-hover:scale-105 transition-transform duration-300">
                    <div className="h-full w-full rounded-2x; bg-white dark:bg-slate-900 flex items-center justify-center font-black text-indigo-600 dark:text-indigo-400 text-lg">
                      {traveler.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white leading-tight">{traveler.name}</h4>
                    <p className="text-sm text-slate-500 font-medium">{traveler.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900 dark:text-white mb-1">{traveler.amount}</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    traveler.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}>
                    {traveler.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Performance & Targets */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="p-10 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Performance</h3>
              <p className="text-slate-500 text-sm font-medium">Department efficiency ratings</p>
            </div>
            <TrendingUp size={24} className="text-emerald-500" />
          </div>
          
          <div className="space-y-10 py-4">
            {[
              { name: "Tour Guides", score: 92, count: 18, color: "indigo" },
              { name: "Customer Support", score: 85, count: 12, color: "blue" },
              { name: "Event Managers", score: 88, count: 8, color: "emerald" },
              { name: "Logistics Team", score: 79, count: 15, color: "rose" }
            ].map((perf, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-base font-black text-slate-900 dark:text-white">{perf.name}</span>
                    <span className="text-xs text-slate-500 font-bold ml-3 uppercase tracking-tighter">{perf.count} Members</span>
                  </div>
                  <span className="text-xl font-black text-slate-900 dark:text-white">{perf.score}%</span>
                </div>
                <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden p-1 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${perf.score}%` }}
                    transition={{ duration: 2, delay: 0.8 + idx * 0.15, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r from-${perf.color}-500 to-${perf.color}-400 rounded-xl shadow-lg shadow-${perf.color}-500/20`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center gap-6">
            <div className="h-16 w-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-sm">
              <UserPlus className="text-indigo-600" size={28} />
            </div>
            <div>
              <h4 className="font-black text-slate-900 dark:text-white">Need more capacity?</h4>
              <p className="text-sm text-slate-500 font-medium">Scale your team by adding more guide hosts.</p>
            </div>
            <button className="ml-auto px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200">
              Invite
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
