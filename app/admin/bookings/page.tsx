"use client";

import React, { useState, useEffect } from "react";
import { Search, Calendar, Phone, Mail, User, CheckCircle, XCircle, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("customAdminBookings");
      if (stored) {
        setBookings(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = bookings.filter(booking => 
    booking.eventName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateStatus = (id: number, newStatus: string) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    setBookings(updated);
    try {
       localStorage.setItem("customAdminBookings", JSON.stringify(updated));
    } catch {}
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this booking permanently?")) {
       const updated = bookings.filter(b => b.id !== id);
       setBookings(updated);
       try {
         localStorage.setItem("customAdminBookings", JSON.stringify(updated));
       } catch {}
    }
  };

  return (
    <div className="space-y-12 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200 dark:border-slate-800/50">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-xs font-black uppercase rounded-lg tracking-widest">Transactions</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Recent Bookings</h1>
          <p className="text-slate-500 font-medium mt-1">Review and manage recent booking requests from customers.</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search bookings by name, destination or transaction ID..." 
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="mx-auto w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <CreditCard className="text-slate-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No bookings found</h3>
            <p className="text-slate-500">Wait for travelers to book their journeys.</p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredBookings.map((booking, idx) => (
              <motion.div
                key={booking.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  {/* Left: Event & User Info */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          booking.status === "Pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                          booking.status === "Confirmed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                          "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                        }`}>
                          {booking.status || "Pending"}
                        </span>
                        <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">{new Date(booking.dateAdded).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white">{booking.eventName}</h3>
                      <p className="text-sm font-bold text-indigo-500 flex items-center gap-2 mt-1">
                        <Calendar size={14} />
                        {booking.eventDate}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-500 flex items-center gap-2">
                          <User className="text-indigo-500" size={14} />
                          {booking.fullName}
                          {booking.bookingType === "couple" && ` & ${booking.partnerName}`}
                        </p>
                        <p className="text-xs font-bold text-slate-500 flex items-center gap-2">
                          <Phone className="text-emerald-500" size={14} />
                          {booking.phone}
                        </p>
                        <p className="text-xs font-bold text-slate-500 flex items-center gap-2">
                          <Mail className="text-blue-500" size={14} />
                          {booking.email}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction ID</p>
                        <p className="text-lg font-mono font-black text-slate-900 dark:text-white bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 inline-block">
                          {booking.transactionId}
                        </p>
                      </div>
                    </div>
                  </div>

                   {/* Right: Actions */}
                  <div className="flex flex-row lg:flex-col justify-end gap-3 min-w-[150px]">
                     {booking.status !== "Confirmed" && (
                       <button onClick={() => handleUpdateStatus(booking.id, "Confirmed")} className="flex-1 lg:flex-none justify-center flex items-center gap-2 py-3 px-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 rounded-xl font-bold transition-all">
                         <CheckCircle size={16} /> Confirm
                       </button>
                     )}
                     {booking.status !== "Rejected" && (
                       <button onClick={() => handleUpdateStatus(booking.id, "Rejected")} className="flex-1 lg:flex-none justify-center flex items-center gap-2 py-3 px-4 bg-amber-50 dark:bg-amber-900/20 text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-900/40 rounded-xl font-bold transition-all">
                         <XCircle size={16} /> Reject
                       </button>
                     )}
                     <button onClick={() => handleDelete(booking.id)} className="flex-1 lg:flex-none justify-center flex items-center gap-2 py-3 px-4 bg-rose-50 dark:bg-rose-900/20 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/40 rounded-xl font-bold transition-all">
                       Delete
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
