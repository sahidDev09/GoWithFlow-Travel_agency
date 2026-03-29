"use client";

import React from "react";
import { User, MapPin, Calendar, ChevronRight, Search, Download, Filter, Star, Heart, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const travelerData = [
  {
    id: 1,
    name: "Benjamin Gray",
    email: "ben.gray@example.com",
    trips: 12,
    lastTrip: "Iceland (Expedition)",
    status: "Premium",
    loyaltyPoints: 2450,
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Isabella Vance",
    email: "isabella.v@example.com",
    trips: 8,
    lastTrip: "Switzerland (Alpine)",
    status: "Regular",
    loyaltyPoints: 1200,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Oliver Quinn",
    email: "oliver.q@example.com",
    trips: 15,
    lastTrip: "Kenya (Safari)",
    status: "VIP",
    loyaltyPoints: 4800,
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Emily Watson",
    email: "emily.w@example.com",
    trips: 5,
    lastTrip: "Bali (Tropical)",
    status: "Regular",
    loyaltyPoints: 850,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
  }
];

export default function TravelersPage() {
  return (
    <div className="space-y-12">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200 dark:border-slate-800/50">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase rounded-lg tracking-widest">Community</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Traveler Database</h1>
          <p className="text-slate-500 font-medium mt-1">Manage and segment your growing traveler community.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-all shadow-sm font-bold">
            <Download size={18} className="mr-3" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, email or destination..." 
            className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[28px] outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm font-medium"
          />
        </div>
        
        <div className="flex items-center flex-wrap gap-3">
          <button className="flex items-center px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm font-bold">
            <Filter size={18} className="mr-3" />
            Segment
          </button>
          <button className="flex items-center px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm font-bold">
            <TrendingUp size={18} className="mr-3" />
            Growth
          </button>
        </div>
      </div>

      {/* Traveler Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {travelerData.map((traveler, idx) => (
          <motion.div
            key={traveler.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="group p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 transition-all shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 overflow-hidden relative"
          >
            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center">
                <div className="h-20 w-20 relative rounded-[28px] overflow-hidden mr-6 shadow-xl group-hover:scale-105 transition-transform duration-500">
                  <Image src={traveler.avatar} alt={traveler.name} fill className="object-cover" />
                </div>
                <div>
                   <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">{traveler.name}</h3>
                    {traveler.status === "VIP" && <Star size={16} className="text-amber-500 fill-amber-500" />}
                   </div>
                  <div className="text-sm font-bold text-slate-400 flex items-center">
                    <User size={14} className="mr-2 text-indigo-500" />
                    {traveler.email}
                  </div>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                traveler.status === "VIP" ? "bg-gradient-to-tr from-amber-500 to-yellow-400 text-white shadow-lg shadow-amber-200" :
                traveler.status === "Premium" ? "bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-200" :
                "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
              }`}>
                {traveler.status}
              </span>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 relative z-10">
              <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-2 flex items-center">
                  <Calendar size={12} className="mr-2 text-indigo-500" />
                  Trips
                </p>
                <div className="text-2xl font-black text-slate-900 dark:text-white">{traveler.trips}</div>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-800 col-span-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-2 flex items-center">
                  <Heart size={12} className="mr-2 text-rose-500" />
                  Loyalty Points
                </p>
                <div className="text-2xl font-black text-slate-900 dark:text-white">{traveler.loyaltyPoints} PTS</div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 p-5 bg-indigo-50/30 dark:bg-indigo-900/10 rounded-3xl border border-indigo-100/50 dark:border-indigo-900/20 relative z-10">
               <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
                  <MapPin size={18} className="text-indigo-600" />
               </div>
               <div className="flex-1 overflow-hidden">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Last Destination</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{traveler.lastTrip}</p>
               </div>
               <ChevronRight size={20} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
            </div>

            <button className="w-full mt-8 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[28px] font-black text-sm flex items-center justify-center transition-all shadow-xl group-hover:bg-indigo-600 group-hover:text-white">
              Full Travel Dossier
              <ChevronRight size={18} className="ml-2" />
            </button>
            
            {/* Background Decorative Element */}
            <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
