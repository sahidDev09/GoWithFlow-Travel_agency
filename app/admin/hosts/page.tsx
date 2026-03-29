"use client";

import React from "react";
import { User, Shield, Briefcase, Mail, Phone, Calendar, MoreVertical, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

const staffData = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Senior Tour Guide",
    email: "alex@gowithflow.com",
    phone: "+44 20 7946 0958",
    status: "Active",
    joinDate: "Jan 2024",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Elena Petrov",
    role: "Event Coordinator",
    email: "elena@gowithflow.com",
    phone: "+44 20 7946 0233",
    status: "Active",
    joinDate: "Mar 2024",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Marcus Thorne",
    role: "Logistics Manager",
    email: "marcus@gowithflow.com",
    phone: "+44 20 7946 0521",
    status: "On Leave",
    joinDate: "May 2024",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Sophie Chen",
    role: "Travel Host",
    email: "sophie@gowithflow.com",
    phone: "+44 20 7946 0884",
    status: "Active",
    joinDate: "Jul 2024",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
  }
];

export default function HostsPage() {
  return (
    <div className="space-y-8">
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input 
            type="text" 
            placeholder="Search staff..." 
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all shadow-sm">
            <Filter size={18} className="mr-2" />
            Roles
          </button>
          <button className="flex items-center px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all shadow-sm">
            <Shield size={18} className="mr-2 text-indigo-500" />
            Manage Permissions
          </button>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white dark:bg-neutral-900 rounded-4xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50/50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800">
                <th className="px-6 py-5 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Employee</th>
                <th className="px-6 py-5 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Position</th>
                <th className="px-6 py-5 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Contact</th>
                <th className="px-6 py-5 text-sm font-semibold text-neutral-600 dark:text-neutral-400">Status</th>
                <th className="px-6 py-5 text-sm font-semibold text-neutral-600 dark:text-neutral-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {staffData.map((staff, idx) => (
                <motion.tr 
                  key={staff.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 transition-all"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center">
                      <div className="h-10 w-10 relative rounded-full overflow-hidden mr-3 ring-2 ring-indigo-50 dark:ring-indigo-900/20">
                        <img src={staff.avatar} alt={staff.name} className="object-cover h-full w-full" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{staff.name}</div>
                        <div className="text-xs text-neutral-500">Joined {staff.joinDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                      <Briefcase size={14} className="mr-2 text-indigo-500" />
                      {staff.role}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-xs text-neutral-500">
                        <Mail size={12} className="mr-2" />
                        {staff.email}
                      </div>
                      <div className="flex items-center text-xs text-neutral-500">
                        <Phone size={12} className="mr-2" />
                        {staff.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                      staff.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" :
                      "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${staff.status === "Active" ? "bg-green-500" : "bg-amber-500"}`}></div>
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-neutral-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 rounded-xl transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-neutral-50/50 dark:bg-neutral-800/30 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <p className="text-xs text-neutral-500 font-medium">Showing 4 of 24 staff members</p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs font-semibold text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all">Previous</button>
            <button className="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs font-semibold text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
