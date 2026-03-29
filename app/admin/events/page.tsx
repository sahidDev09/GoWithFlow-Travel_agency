"use client";

import React, { useState } from "react";
import { Plus, Search, Calendar, MapPin, Users, MoreVertical, Edit2, Trash2, Filter } from "lucide-react";
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
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input 
            type="text" 
            placeholder="Search events..." 
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all shadow-sm">
            <Filter size={18} className="mr-2" />
            Filters
          </button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-semibold shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 transition-all"
          >
            <Plus size={20} className="mr-2" />
            Add Event
          </motion.button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image 
                  src={event.image} 
                  alt={event.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    event.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" :
                    event.status === "Draft" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" :
                    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 line-clamp-1">{event.title}</h3>
                  <div className="flex items-center text-neutral-500 text-sm mt-1">
                    <MapPin size={14} className="mr-1" />
                    {event.location}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm py-2 border-y border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center text-neutral-600 dark:text-neutral-400">
                    <Calendar size={14} className="mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-bold">
                    <Users size={14} className="mr-2" />
                    {event.bookings}/{event.capacity}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-2">
                    <button className="p-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-lg hover:text-indigo-600 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-lg hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <button className="p-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
