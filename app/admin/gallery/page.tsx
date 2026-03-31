"use client";

import React, { useState } from "react";
import { Plus, Search, Trash2, Edit2, ZoomIn, MoreHorizontal, MapPin, Calendar, LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const galleryData = [
  { id: 1, title: "Group Tour", size: "1.2 MB", category: "Travel", location: "Sylhet, BD", date: "Mar 2024", url: "https://i.postimg.cc/gjK2WK9v/ts1.jpg" },
  { id: 2, title: "Scenic Valley", size: "2.1 MB", category: "Nature", location: "Jaflong, BD", date: "Feb 2024", url: "https://i.postimg.cc/jdsjhBNM/ts10.jpg" },
  { id: 3, title: "Crystal River", size: "1.5 MB", category: "Nature", location: "Lalakhal, BD", date: "Jan 2024", url: "https://i.postimg.cc/wT6BknJW/ts11.jpg" },
  { id: 4, title: "Chairman's Meet", size: "0.8 MB", category: "Culture", location: "Office, BD", date: "Apr 2024", url: "/images/chairman.png" },
  { id: 5, title: "Tea Estate", size: "3.4 MB", category: "Mountain", location: "Srimangal, BD", date: "Dec 2023", url: "https://i.postimg.cc/qMjvDQX5/ts12.jpg" },
  { id: 6, title: "Waterfall", size: "2.8 MB", category: "Nature", location: "Madhabkunda, BD", date: "Nov 2023", url: "https://i.postimg.cc/Pr25VKQG/ts13.jpg" },
];


export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = ["All", "Nature", "Travel", "Mountain", "Culture", "Desert"];

  return (
    <div className="space-y-12">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200 dark:border-slate-800/50">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase rounded-lg tracking-widest">Assets</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Media Gallery</h1>
          <p className="text-slate-500 font-medium mt-1">Organize and manage visual content for events and marketing.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
             <button 
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-xl transition-all ${viewMode === "grid" ? "bg-white dark:bg-slate-900 text-indigo-600 shadow-sm" : "text-slate-400"}`}
             >
                <LayoutGrid size={18} />
             </button>
             <button 
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-xl transition-all ${viewMode === "list" ? "bg-white dark:bg-slate-900 text-indigo-600 shadow-sm" : "text-slate-400"}`}
             >
                <List size={18} />
             </button>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black shadow-xl"
          >
            <Plus size={20} className="mr-2" />
            Upload Photo
          </motion.button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 custom-scrollbar scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeCategory === category
                  ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-indigo-900/40"
                  : "bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search assets..." 
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm font-medium"
          />
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {galleryData
            .filter(item => activeCategory === "All" || item.category === activeCategory)
            .map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative h-80 rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-slate-200 dark:border-slate-800"
            >
              <Image 
                src={item.url} 
                alt={item.title} 
                fill
                className="object-cover transition-all duration-1000 group-hover:scale-110" 
              />
              
              {/* Refined Glassmorphic Overlay */}
              <div className="absolute inset-x-4 bottom-4 p-6 bg-white/30 dark:bg-black/40 backdrop-blur-xl rounded-[32px] border border-white/40 dark:border-white/10 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                   <h4 className="text-white text-lg font-black tracking-tight">{item.title}</h4>
                   <span className="text-[10px] font-black text-white/90 bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest">{item.category}</span>
                </div>
                
                <div className="flex flex-col gap-2 mb-6">
                   <div className="flex items-center text-white/70 text-xs font-bold">
                      <MapPin size={12} className="mr-2" />
                      {item.location}
                   </div>
                   <div className="flex items-center text-white/70 text-xs font-bold">
                      <Calendar size={12} className="mr-2" />
                      {item.date}
                   </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                   <div className="flex gap-2">
                       <button className="p-2.5 bg-white/20 hover:bg-white/40 text-white rounded-xl transition-all border border-white/20">
                          <Edit2 size={16} />
                       </button>
                       <button className="p-2.5 bg-rose-500/80 hover:bg-rose-600 text-white rounded-xl transition-all border border-rose-400/50">
                          <Trash2 size={16} />
                       </button>
                   </div>
                   <button className="p-2.5 bg-indigo-600/90 hover:bg-indigo-600 text-white rounded-xl transition-all border border-indigo-400">
                      <ZoomIn size={16} />
                   </button>
                </div>
              </div>
              
              <div className="absolute top-6 right-6 p-2 bg-black/20 backdrop-blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                 <MoreHorizontal size={18} className="text-white" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
