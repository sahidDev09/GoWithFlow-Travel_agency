"use client";

import React, { useState } from "react";
import { Plus, Image as ImageIcon, Search, Filter, Trash2, Edit2, ZoomIn, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const galleryData = [
  { id: 1, title: "Grand Canyon", size: "2.4 MB", category: "Nature", url: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&q=80" },
  { id: 2, title: "Santorini Sunset", size: "1.8 MB", category: "Travel", url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80" },
  { id: 3, title: "Swiss Alps", size: "3.1 MB", category: "Mountain", url: "https://images.unsplash.com/photo-1506905952044-88461c282672?auto=format&fit=crop&q=80" },
  { id: 4, title: "Kyoto Temple", size: "2.7 MB", category: "Culture", url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80" },
  { id: 5, title: "Sahara Desert", size: "2.1 MB", category: "Desert", url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80" },
  { id: 6, title: "Iceland Aurora", size: "4.2 MB", category: "Nature", url: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&q=80" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Nature", "Travel", "Mountain", "Culture", "Desert"];

  return (
    <div className="space-y-8">
      {/* Search and Category Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center space-x-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-2xl text-sm font-semibold transition-all whitespace-nowrap shadow-sm ${
                activeCategory === category
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20"
                  : "bg-white dark:bg-neutral-900 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-neutral-100 dark:border-neutral-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text" 
              placeholder="Search images..." 
              className="pl-10 pr-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm w-full md:w-64"
            />
          </div>
          <button className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 hover:scale-105 active:scale-95 transition-all">
            <Plus size={18} className="mr-2" />
            Upload Photo
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {galleryData
            .filter(item => activeCategory === "All" || item.category === activeCategory)
            .map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative h-72 rounded-4xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border-4 border-white dark:border-neutral-900 hover:border-indigo-100 dark:hover:border-indigo-900/30"
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110" 
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                <div>
                  <h4 className="text-white text-lg font-bold">{item.title}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-white/70 font-medium px-2 py-0.5 bg-white/20 backdrop-blur-md rounded-lg">{item.category}</span>
                    <span className="text-xs text-white/70">{item.size}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/20">
                  <div className="flex space-x-3">
                    <button className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-xl transition-all">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 bg-white/10 hover:bg-red-500 backdrop-blur-md text-white rounded-xl transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <button className="p-2 bg-white/10 hover:bg-indigo-500 backdrop-blur-md text-white rounded-xl transition-all">
                    <ZoomIn size={16} />
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
