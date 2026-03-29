"use client";

import React from "react";
import { Star, MessageSquare, Quote, Search, Trash2, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const feedbackData = [
  {
    id: 1,
    name: "John Denver",
    rating: 5,
    status: "Verified",
    comment: "The Alpine Adventure was absolutely breathtaking. The guides were extremely professional and the logistics were seamless. Highly recommend!",
    date: "2 days ago",
    event: "Alpine Adventure",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    rating: 4,
    status: "Verified",
    comment: "Bali was beautiful, but the itinerary was a bit crowded. Still, a great experience all around. The team was very helpful.",
    date: "1 week ago",
    event: "Tropical Paradise",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Michael Chen",
    rating: 5,
    status: "Top Contributor",
    comment: "Best safari ever! Seeing the Great Migration with Marcus was a life-changing experience. Everything was top-notch.",
    date: "2 weeks ago",
    event: "Safari Expedition",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80"
  }
];

export default function FeedbacksPage() {
  return (
    <div className="space-y-12 pb-10">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200 dark:border-slate-800/50">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-xs font-black uppercase rounded-lg tracking-widest">Sentiment</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">User Feedbacks</h1>
          <p className="text-slate-500 font-medium mt-1">Monitor and respond to traveler reviews and experiences.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 text-amber-400">
                 {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-xs font-black text-slate-400 mt-1 uppercase tracking-tighter">Current Sentiment Score: 4.8</p>
           </div>
           <div className="h-12 w-[1px] bg-slate-200 dark:bg-slate-800" />
           <button className="flex items-center px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-200 transition-all">
             Generate Summary
           </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-2 relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by keywords, traveler name or event..." 
            className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[28px] outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm font-medium"
          />
        </div>
        
        <div className="xl:col-span-2 flex items-center justify-end gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] font-black text-slate-500 uppercase">Live Processing</span>
          </div>
          <button className="flex items-center px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-all font-black text-sm">
            By Rating
          </button>
        </div>
      </div>

      {/* Feedbacks Grid */}
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8">
        <AnimatePresence>
          {feedbackData.map((feedback, idx) => (
            <motion.div
              key={feedback.id}
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group p-10 bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 relative flex flex-col"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-5">
                   <div className="h-16 w-16 relative rounded-2xl overflow-hidden shadow-xl ring-4 ring-white dark:ring-slate-800 group-hover:scale-110 transition-transform duration-500">
                      <Image src={feedback.avatar} alt={feedback.name} fill className="object-cover" />
                   </div>
                   <div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white leading-tight">{feedback.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                         <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{feedback.status}</span>
                         <span className="w-1 h-1 rounded-full bg-slate-300" />
                         <span className="text-[10px] font-bold text-slate-400 uppercase">{feedback.date}</span>
                      </div>
                   </div>
                </div>
                <div className="flex gap-1.5 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-white/5">
                   {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < feedback.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 dark:text-slate-700"} 
                      />
                   ))}
                </div>
              </div>

              <div className="flex-1 relative mb-10">
                <Quote className="absolute -top-4 -left-6 text-indigo-500/10 dark:text-indigo-400/5" size={80} />
                <p className="text-lg font-medium leading-relaxed text-slate-700 dark:text-slate-300 relative z-10 italic">
                  &ldquo;{feedback.comment}&rdquo;
                </p>
              </div>

              <div className="mt-auto flex flex-col md:flex-row md:items-center justify-between gap-6 pt-10 border-t border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center gap-3">
                   <div className="p-3 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl">
                      <MessageSquare size={18} className="text-indigo-600 dark:text-indigo-400" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Referencing Event</p>
                      <p className="text-sm font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors uppercase tracking-tighter">{feedback.event}</p>
                   </div>
                </div>

                <div className="flex items-center gap-3">
                   <button className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:shadow-lg transition-all rounded-xl border border-slate-200 dark:border-slate-700">
                      <CheckCircle2 size={18} />
                   </button>
                   <button className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:shadow-lg transition-all rounded-xl border border-slate-200 dark:border-slate-700">
                      <Trash2 size={18} />
                   </button>
                   <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-xs group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg">
                      Public Reply
                      <ArrowRight size={14} />
                   </button>
                </div>
              </div>
              
              <div className="absolute bottom-0 right-10 h-1.5 w-24 bg-gradient-to-r from-indigo-500/20 to-transparent rounded-t-full hidden group-hover:block" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
