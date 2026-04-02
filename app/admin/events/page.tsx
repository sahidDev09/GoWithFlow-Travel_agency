"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, Search, Calendar, MapPin, 
  Edit2, Trash2, Filter, 
  ArrowUpRight,
  Layers, X, Image as ImageIcon,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { eventsData as initialEventsData } from "@/lib/admin-data";

export default function EventsPage() {
  const [events, setEvents] = useState(initialEventsData);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);
  
  useEffect(() => {
    try {
      const stored = localStorage.getItem("customAdminEvents");
      const deletedStored = localStorage.getItem("deletedAdminEvents");
      const deletedIds = deletedStored ? JSON.parse(deletedStored) : [];
      
      let baseEvents = initialEventsData;
      if (deletedIds.length > 0) {
        baseEvents = baseEvents.filter(e => !deletedIds.includes(e.id));
      }
      
      if (stored) {
        const parsed = JSON.parse(stored);
        // eslint-disable-next-line
        setEvents([...parsed, ...baseEvents]);
      } else {
        setEvents(baseEvents);
      }
    } catch {}
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inclusionInput, setInclusionInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    capacity: "",
    price: "",
    couplePrice: "",
    bookingMoney: "",
    deadline: "",
    status: "Draft",
    image: "",
    description: "",
    inclusions: [] as string[]
  });

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || event.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusColors: Record<string, string> = {
    Active: "bg-emerald-500/90",
    Draft: "bg-amber-500/90",
    Postponed: "bg-rose-500/90",
    Complete: "bg-slate-500/90",
    Cancelled: "bg-red-600/90",
  };

  const addInclusion = () => {
    if (inclusionInput.trim() && !formData.inclusions.includes(inclusionInput.trim())) {
       setFormData({
         ...formData,
         inclusions: [...formData.inclusions, inclusionInput.trim()]
       });
       setInclusionInput("");
    }
  };

  const removeInclusion = (item: string) => {
    setFormData({
      ...formData,
      inclusions: formData.inclusions.filter(i => i !== item)
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEventId(null);
    setFormData({
      title: "",
      date: "",
      location: "",
      capacity: "",
      price: "",
      couplePrice: "",
      bookingMoney: "",
      deadline: "",
      status: "Draft",
      image: "",
      description: "",
      inclusions: []
    });
  };

  const confirmDelete = (id: number) => {
    setEventToDelete(id);
  };

  const executeDelete = () => {
    if (eventToDelete !== null) {
      const updatedEvents = events.filter(e => e.id !== eventToDelete);
      setEvents(updatedEvents);

      try {
        const stored = localStorage.getItem("customAdminEvents");
        if (stored) {
          const parsedStored = JSON.parse(stored);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const filteredStored = parsedStored.filter((e: any) => e.id !== eventToDelete);
          localStorage.setItem("customAdminEvents", JSON.stringify(filteredStored));
        }

        const deletedStored = localStorage.getItem("deletedAdminEvents");
        const deletedIds = deletedStored ? JSON.parse(deletedStored) : [];
        if (!deletedIds.includes(eventToDelete)) {
          localStorage.setItem("deletedAdminEvents", JSON.stringify([...deletedIds, eventToDelete]));
        }
      } catch {}
      setEventToDelete(null);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (event: any) => {
    setEditingEventId(event.id);
    setFormData({
      title: event.title || "",
      date: event.date || "",
      location: event.location || "",
      capacity: String(event.capacity || ""),
      price: typeof event.price === "string" ? event.price.replace(/ ৳/g, "") : String(event.price || ""),
      couplePrice: typeof event.couplePrice === "string" ? event.couplePrice.replace(/ ৳/g, "") : String(event.couplePrice || ""),
      bookingMoney: typeof event.bookingMoney === "string" ? event.bookingMoney.replace(/ ৳/g, "") : String(event.bookingMoney || ""),
      deadline: event.deadline || "",
      status: event.status || "Draft",
      image: event.image || "",
      description: event.description || "",
      inclusions: event.inclusions || []
    });
    setIsModalOpen(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const eventObj = {
       id: editingEventId || Date.now(),
       title: formData.title,
       date: formData.date,
       location: formData.location,
       bookings: editingEventId ? (events.find(ev => ev.id === editingEventId)?.bookings || 0) : 0,
       capacity: parseInt(formData.capacity) || 0,
       status: formData.status,
       price: `${formData.price} ৳`,
       image: formData.image || "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80",
       couplePrice: formData.couplePrice,
       bookingMoney: formData.bookingMoney,
       deadline: formData.deadline,
       description: formData.description,
       inclusions: formData.inclusions
    };
    
    let updatedEvents;
    if (editingEventId) {
       updatedEvents = events.map(ev => ev.id === editingEventId ? eventObj : ev);
    } else {
       updatedEvents = [eventObj as typeof initialEventsData[0], ...events];
    }
    
    setEvents(updatedEvents);
    
    try {
      const stored = localStorage.getItem("customAdminEvents");
      let parsedStored = stored ? JSON.parse(stored) : [];
      if (editingEventId) {
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const isCustom = parsedStored.find((ev: any) => ev.id === editingEventId);
         if (isCustom) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            parsedStored = parsedStored.map((ev: any) => ev.id === editingEventId ? eventObj : ev);
         } else {
            parsedStored = [eventObj, ...parsedStored];
            const deletedStored = localStorage.getItem("deletedAdminEvents");
            const deletedIds = deletedStored ? JSON.parse(deletedStored) : [];
            if (!deletedIds.includes(editingEventId)) {
               localStorage.setItem("deletedAdminEvents", JSON.stringify([...deletedIds, editingEventId]));
            }
         }
      } else {
         parsedStored = [eventObj, ...parsedStored];
      }
      localStorage.setItem("customAdminEvents", JSON.stringify(parsedStored));
    } catch {}
    
    closeModal();
  };

  return (
    <div className="space-y-12 relative">
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
          <div className="hidden sm:flex -space-x-3 mr-4">
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
            onClick={() => { closeModal(); setIsModalOpen(true); }}
            className="flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-indigo-200 dark:shadow-indigo-900/30 transition-all group"
          >
            <Plus size={20} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
            Create New Event
          </motion.button>
        </div>
      </div>

      {/* Control Bar remains the same */}
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
          <div className="relative group">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none pl-12 pr-10 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm font-bold flex items-center outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Postponed">Postponed</option>
              <option value="Complete">Complete</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Draft">Draft</option>
            </select>
            <Filter size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1 shadow-sm">
            <button 
              onClick={() => setViewMode("grid")}
              className={`flex items-center px-4 py-3 rounded-xl transition-all font-bold text-sm ${viewMode === "grid" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
            >
              <Layers size={18} className="mr-2" />
              Grid
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`flex items-center px-4 py-3 rounded-xl transition-all font-bold text-sm ${viewMode === "list" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
            >
              <Layers size={18} className="mr-2 rotate-90" />
              List
            </button>
          </div>
        </div>
      </div>

      {/* Events Display remains state-driven */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 relative"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60" />
                  
                  <div className="absolute top-6 right-6">
                    <span className={`px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-lg text-white ${statusColors[event.status] || "bg-indigo-500/90"}`}>
                      {event.status}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                      <p className="text-[10px] font-bold text-white/70 uppercase">Starting From</p>
                      <p className="text-xl font-black text-white">{event.price}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={(e) => { e.stopPropagation(); handleEdit(event); }} className="p-3 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/40 transition-colors border border-white/20">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); confirmDelete(event.id); }} className="p-3 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-rose-500/80 transition-colors border border-white/20">
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                className="group flex flex-col md:flex-row items-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 gap-6 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative h-24 w-full md:w-40 rounded-2xl overflow-hidden shrink-0">
                  <Image src={event.image} alt={event.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider text-white ${statusColors[event.status] || "bg-indigo-500/90"}`}>
                      {event.status}
                    </span>
                    <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1">
                      <MapPin size={10} className="text-indigo-500" />
                      {event.location}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white truncate">{event.title}</h3>
                  <div className="flex items-center text-slate-500 font-bold text-xs mt-1">
                    <Calendar size={14} className="mr-2 text-indigo-500" />
                    {event.date}
                  </div>
                </div>
                <div className="flex items-center gap-8 px-4">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Bookings</p>
                    <p className="text-lg font-black text-slate-900 dark:text-white">{event.bookings}/{event.capacity}</p>
                  </div>
                  <div className="text-right min-w-[100px]">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Starting From</p>
                    <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">{event.price}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={(e) => { e.stopPropagation(); handleEdit(event); }} className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); confirmDelete(event.id); }} className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Enhanced Create Event Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-white dark:bg-slate-900 rounded-[40px] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
            >
              <div className="p-8 pb-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 shrink-0">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{editingEventId ? "Edit Journey" : "Create New Journey"}</h2>
                  <p className="text-slate-500 font-medium">Define your next breathtaking adventure.</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors text-slate-400"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSaveEvent} className="p-8 space-y-10 overflow-y-auto">
                {/* General Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center font-bold">1</div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">General Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-11">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Event Title</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold transition-all"
                        placeholder="Sajek Valley Expedition"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                        <input 
                          required
                          type="text" 
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold transition-all"
                          placeholder="Rangamati, Bangladesh"
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Journey Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                        <input 
                          required
                          type="text" 
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold transition-all"
                          placeholder="April 15 - 18, 2026"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Booking Deadline</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold transition-all"
                        placeholder="April 10, 2026"
                        value={formData.deadline}
                        onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing & Capacity */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center font-bold">2</div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Pricing & Capacity</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pl-11">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Solo Price</label>
                      <div className="relative">
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-slate-400">৳</span>
                        <input 
                          required
                          type="text" 
                          className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold transition-all"
                          placeholder="8,500"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Couple Price</label>
                      <div className="relative">
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-slate-400">৳</span>
                        <input 
                          type="text" 
                          className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold transition-all"
                          placeholder="16,000"
                          value={formData.couplePrice}
                          onChange={(e) => setFormData({...formData, couplePrice: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Max Capacity</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                        <input 
                          required
                          type="number" 
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold transition-all"
                          placeholder="30"
                          value={formData.capacity}
                          onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Package Details */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 flex items-center justify-center font-bold">3</div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Package Details</h3>
                  </div>
                  
                  <div className="space-y-6 pl-11">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Description (Information)</label>
                      <textarea 
                        rows={3}
                        className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold transition-all resize-none"
                        placeholder="Tell travelers more about this journey..."
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">What&apos;s Included?</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          className="flex-1 px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold transition-all"
                          placeholder="e.g. AC Transport"
                          value={inclusionInput}
                          onChange={(e) => setInclusionInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addInclusion())}
                        />
                        <button 
                          type="button"
                          onClick={addInclusion}
                          className="px-6 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all"
                        >
                          Add
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {formData.inclusions.map((item, idx) => (
                           <motion.div 
                             initial={{ opacity: 0, scale: 0.8 }}
                             animate={{ opacity: 1, scale: 1 }}
                             key={idx} 
                             className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl text-sm font-black border border-indigo-100 dark:border-indigo-800"
                           >
                             {item}
                             <button type="button" onClick={() => removeInclusion(item)} className="p-0.5 hover:bg-indigo-200 dark:hover:bg-indigo-800 rounded-md">
                               <X size={14} />
                             </button>
                           </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Cover Image URL</label>
                      <div className="relative">
                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                        <input 
                          type="text" 
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold transition-all"
                          placeholder="https://images.unsplash.com/photo-..."
                          value={formData.image}
                          onChange={(e) => setFormData({...formData, image: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Selection */}
                <div className="pt-4 flex flex-col sm:flex-row gap-4 shrink-0 px-11">
                  <div className="flex-[1] space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Initial Status</label>
                    <div className="flex gap-2">
                      {["Active", "Draft", "Upcoming"].map(status => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setFormData({...formData, status})}
                          className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${formData.status === status ? "bg-indigo-600 text-white shadow-lg" : "bg-slate-50 dark:bg-slate-800 text-slate-500"}`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-[1] flex gap-3 pt-6 sm:pt-0">
                    <button 
                      type="button"
                      onClick={closeModal}
                      className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-3xl font-black transition-all hover:bg-slate-200"
                    >
                      Dismiss
                    </button>
                    <button 
                      type="submit"
                      className="flex-[2] py-4 bg-indigo-600 text-white rounded-3xl font-black shadow-xl shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all"
                    >
                      {editingEventId ? "Save Changes" : "Launch Journey"}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {eventToDelete !== null && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEventToDelete(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 className="w-8 h-8 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Delete Journey?</h3>
              <p className="text-slate-500 font-medium mb-8">
                This action cannot be undone. Are you sure you want to permanently delete this event?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setEventToDelete(null)}
                  className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black transition-all hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={executeDelete}
                  className="flex-1 py-4 bg-rose-600 text-white rounded-2xl font-black shadow-xl shadow-rose-200 dark:shadow-none hover:bg-rose-700 transition-all"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
