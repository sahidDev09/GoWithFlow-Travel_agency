"use client";

import React from "react";
import { User, MapPin, Calendar, Clock, ChevronRight, Search, Download, Filter } from "lucide-react";
import { motion } from "framer-motion";

const travelerData = [
  {
    id: 1,
    name: "Benjamin Gray",
    email: "ben.gray@example.com",
    trips: 12,
    lastTrip: "Iceland (Expedition)",
    status: "Premium",
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Isabella Vance",
    email: "isabella.v@example.com",
    trips: 8,
    lastTrip: "Switzerland (Alpine)",
    status: "Regular",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Oliver Quinn",
    email: "oliver.q@example.com",
    trips: 15,
    lastTrip: "Kenya (Safari)",
    status: "VIP",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Emily Watson",
    email: "emily.w@example.com",
    trips: 5,
    lastTrip: "Bali (Tropical)",
    status: "Regular",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
  }
];

export default function TravelersPage() {
  return (
    <div className="space-y-8">
      {/* Search and Export */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input 
            type="text" 
            placeholder="Search travelers..." 
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all shadow-sm">
            <Filter size={18} className="mr-2" />
            Segment
          </button>
          <button className="flex items-center px-4 py-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-all">
            <Download size={18} className="mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Traveler List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {travelerData.map((traveler, idx) => (
          <motion.div
            key={traveler.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group p-6 bg-white dark:bg-neutral-900 rounded-4xl border border-neutral-200 dark:border-neutral-800 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 transition-all shadow-sm hover:shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="h-16 w-16 relative rounded-3xl overflow-hidden mr-5 shadow-lg">
                  <img src={traveler.avatar} alt={traveler.name} className="object-cover h-full w-full" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{traveler.name}</h3>
                  <div className="flex items-center text-sm text-neutral-500 mt-1">
                    <User size={14} className="mr-1" />
                    {traveler.email}
                  </div>
                </div>
              </div>
              <span className={`px-4 py-1.5 rounded-2xl text-xs font-bold ${
                traveler.status === "VIP" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 ring-1 ring-amber-200" :
                traveler.status === "Premium" ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 ring-1 ring-indigo-200" :
                "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
              }`}>
                {traveler.status}
              </span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl">
                <div className="text-xs text-neutral-500 font-medium mb-1 flex items-center">
                  <Calendar size={12} className="mr-1" />
                  Total Trips
                </div>
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{traveler.trips}</div>
              </div>
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl">
                <div className="text-xs text-neutral-500 font-medium mb-1 flex items-center">
                  <MapPin size={12} className="mr-1" />
                  Last Destination
                </div>
                <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 line-clamp-1 h-8 flex items-center">
                  {traveler.lastTrip}
                </div>
              </div>
            </div>

            <button className="w-full mt-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-2xl font-bold text-sm flex items-center justify-center group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 transition-colors shadow-lg">
              View Travel History
              <ChevronRight size={16} className="ml-2" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
