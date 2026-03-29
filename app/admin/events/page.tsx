"use client";

import React, { useState } from "react";
import { 
  Plus, Search, Calendar, MapPin, 
  Edit2, Trash2, Filter, 
  ArrowUpRight,
  Layers, Settings2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const eventsData = [
  {
    id: 1,
    title: "Alpine Adventure",
    date: "Dec 15, 2025",
    location: "Switzerland",
    bookings: 42,
    capacity: 50,
    status: "Active",
    price: "276,000 ৳",
    image: "https://images.unsplash.com/photo-1506905952044-88461c282672?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Tropical Paradise",
    date: "Jan 10, 2026",
    location: "Bali, Indonesia",
    bookings: 35,
    capacity: 40,
    status: "Active",
    price: "212,750 ৳",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Safari Expedition",
    date: "Feb 05, 2026",
    location: "Kenya",
    bookings: 28,
    capacity: 30,
    status: "Draft",
    price: "368,000 ৳",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "Northern Lights",
    date: "Mar 12, 2026",
    location: "Iceland",
    bookings: 15,
    capacity: 25,
    status: "Upcoming",
    price: "241,500 ৳",
    image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&q=80"
  }
];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = eventsData.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200 dark:border-slate-800/50">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase rounded-lg tracking-widest">Management</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Events Management</h1>
          <p className="text-slate-500 font-medium mt-1">Manage all your travel events and booking capacities.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3 mr-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-950 bg-slate-100 dark:bg-slate-800 overflow-hidden ring-2 ring-transparent group-hover:ring-indigo-500 transition-all">
                <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Admin" width={40} height={40} />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-950 bg-indigo-600 flex items-center justify-center text-[10px] font-black text-white">
              +12
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-indigo-200 dark:shadow-indigo-900/30 transition-all group"
          >
            <Plus size={20} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
            Create New Event
          </motion.button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search events by name, location or category..." 
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center flex-wrap gap-3">
          <button className="flex items-center px-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm font-bold">
            <Filter size={18} className="mr-2" />
            Filters
          </button>
          <button className="flex items-center px-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm font-bold text-sm">
            <Layers size={18} className="mr-2" />
            View Mode
          </button>
          <button className="flex items-center px-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm font-bold text-sm">
            <Settings2 size={18} className="mr-2" />
            Columns
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-8">
        <AnimatePresence>
          {filteredEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 relative"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={event.image} 
                  alt={event.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60" />
                
                <div className="absolute top-6 right-6">
                  <span className={`px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-lg ${
                    event.status === "Active" ? "bg-emerald-500/90 text-white" :
                    event.status === "Draft" ? "bg-amber-500/90 text-white" :
                    "bg-indigo-500/90 text-white"
                  }`}>
                    {event.status}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                    <p className="text-[10px] font-bold text-white/70 uppercase">Starting From</p>
                    <p className="text-xl font-black text-white">{event.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/40 transition-colors border border-white/20">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-3 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-rose-500/80 transition-colors border border-white/20">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-8 space-y-6 flex-1 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2">
                    <MapPin size={12} className="text-indigo-500" />
                    {event.location}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 transition-colors">{event.title}</h3>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-slate-500 font-bold text-sm">
                      <Calendar size={16} className="mr-2 text-indigo-500" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                       <span className="text-xs font-black text-slate-900 dark:text-white">Cap:</span>
                       <span className="text-xs font-bold text-slate-500">{event.capacity}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-black uppercase tracking-tighter">
                      <span className="text-slate-400">Booking Progress</span>
                      <span className="text-indigo-600 dark:text-indigo-400">{Math.round((event.bookings / event.capacity) * 100)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-[1px]">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(event.bookings / event.capacity) * 100}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                <button className="w-full mt-2 py-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all group-hover:bg-indigo-600 group-hover:text-white">
                  Event Details
                  <ArrowUpRight size={18} />
                </button>
              </div>
              
              {/* Animated Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-transparent scale-0 group-hover:scale-100 transition-transform duration-700 origin-top-right rounded-bl-full pointer-events-none" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
