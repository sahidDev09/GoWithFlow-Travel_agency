"use client";

import React from "react";
import { Shield, Briefcase, Mail, Phone, MoreVertical, Search, Filter, Plus, UserCheck, UserX, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

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
    <div className="space-y-12">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200 dark:border-slate-800/50">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-black uppercase rounded-lg tracking-widest">Workspace</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Staff & Hosts</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your team permission and operational status.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black shadow-xl transition-all group"
          >
            <Plus size={20} className="mr-2" />
            Add Employee
          </motion.button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, role or email..." 
            className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[28px] outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm font-medium"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm font-bold">
            <Filter size={18} className="mr-3" />
            Roles
          </button>
          <button className="flex items-center px-6 py-4 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/20 rounded-2xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-all shadow-sm font-bold">
            <Shield size={18} className="mr-3" />
            Permissions
          </button>
        </div>
      </div>

      {/* Staff Table Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
      >
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Employee Profile</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Department & Role</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Contact Details</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Settings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {staffData.map((staff, idx) => (
                <motion.tr 
                  key={staff.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all cursor-pointer"
                >
                  <td className="px-10 py-6">
                    <div className="flex items-center">
                      <div className="h-14 w-14 relative rounded-2xl overflow-hidden mr-5 shadow-md group-hover:scale-105 transition-transform duration-300 ring-2 ring-white dark:ring-slate-800">
                        <Image src={staff.avatar} alt={staff.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="text-base font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">{staff.name}</div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5 flex items-center gap-2">
                           <Clock size={10} className="text-indigo-400" />
                           Since {staff.joinDate}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="inline-flex items-center px-4 py-2 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-xl text-xs font-black text-indigo-700 dark:text-indigo-300 gap-3">
                      <Briefcase size={14} strokeWidth={2.5} />
                      {staff.role}
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center text-sm font-bold text-slate-600 dark:text-slate-300">
                        <Mail size={14} className="mr-3 text-slate-400" />
                        {staff.email}
                      </div>
                      <div className="flex items-center text-sm font-bold text-slate-600 dark:text-slate-300">
                        <Phone size={14} className="mr-3 text-slate-400" />
                        {staff.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`inline-flex items-center px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] shadow-sm ${
                      staff.status === "Active" ? "bg-emerald-500 text-white" :
                      "bg-amber-500 text-white"
                    }`}>
                      {staff.status === "Active" ? <UserCheck size={12} className="mr-2" /> : <UserX size={12} className="mr-2" />}
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-2xl transition-all border border-transparent hover:border-indigo-100 dark:hover:border-slate-700">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination/Footer */}
        <div className="px-10 py-8 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm font-bold text-slate-400">
             Showing <span className="text-slate-900 dark:text-white">1 - 4</span> of 24 members
          </div>
          <div className="flex items-center gap-2">
            <button className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-black text-slate-500 hover:text-indigo-600 transition-all shadow-sm disabled:opacity-50" disabled>
              Previous
            </button>
            <div className="flex items-center gap-1">
               {[1, 2, 3, 4].map(p => (
                 <button key={p} className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${p === 1 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"}`}>
                   {p}
                 </button>
               ))}
            </div>
            <button className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-black text-slate-500 hover:text-indigo-600 transition-all shadow-sm">
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
