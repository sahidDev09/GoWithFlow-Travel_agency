"use client";

import React from "react";
import { Star, MessageSquare, Quote, ThumbsUp, Search, Trash2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const feedbackData = [
  {
    id: 1,
    name: "John Denver",
    rating: 5,
    comment: "The Alpine Adventure was absolutely breathtaking. The guides were extremely professional and the logistics were seamless. Highly recommend!",
    date: "2 days ago",
    event: "Alpine Adventure",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    rating: 4,
    comment: "Bali was beautiful, but the itinerary was a bit crowded. Still, a great experience all around. The team was very helpful.",
    date: "1 week ago",
    event: "Tropical Paradise",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Michael Chen",
    rating: 5,
    comment: "Best safari ever! Seeing the Great Migration with Marcus was a life-changing experience. Everything was top-notch.",
    date: "2 weeks ago",
    event: "Safari Expedition",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80"
  }
];

export default function FeedbacksPage() {
  return (
    <div className="space-y-8">
      {/* Search and Ratings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input 
            type="text" 
            placeholder="Search feedbacks..." 
            className="w-full pl-10 pr-4 py-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
          />
        </div>
        
        <div className="p-4 bg-indigo-600 rounded-3xl text-white flex items-center justify-between shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 rounded-2xl">
              <Star size={24} fill="currentColor" />
            </div>
            <div>
              <p className="text-sm font-semibold opacity-80">Average Rating</p>
              <h3 className="text-2xl font-bold">4.8 / 5.0</h3>
            </div>
          </div>
          <p className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">+0.2 this month</p>
        </div>
      </div>

      {/* Feedbacks Feed */}
      <div className="space-y-6">
        {feedbackData.map((feedback, idx) => (
          <motion.div
            key={feedback.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative p-8 bg-white dark:bg-neutral-900 rounded-4xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/4 flex flex-col items-center justify-center space-y-4 border-r border-neutral-100 dark:border-neutral-800 pr-8">
                <div className="h-20 w-20 relative rounded-3xl overflow-hidden shadow-lg transform group-hover:rotate-3 transition-transform">
                  <img src={feedback.avatar} alt={feedback.name} className="object-cover h-full w-full" />
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-neutral-900 dark:text-neutral-100">{feedback.name}</h4>
                  <p className="text-xs text-neutral-500 font-medium">{feedback.date}</p>
                </div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < feedback.rating ? "text-amber-400 fill-amber-400 shadow-amber-200" : "text-neutral-300"} 
                    />
                  ))}
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <Quote className="text-indigo-600 opacity-20" size={40} />
                    <div className="flex space-x-2">
                       <button className="p-2 text-neutral-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/10 rounded-xl transition-all border border-neutral-100 dark:border-neutral-800">
                        <CheckCircle2 size={18} />
                      </button>
                      <button className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all border border-neutral-100 dark:border-neutral-800">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 italic">
                    {feedback.comment}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl text-xs font-bold text-neutral-600 dark:text-neutral-400">
                    <MessageSquare size={12} />
                    <span>Related to {feedback.event}</span>
                  </div>
                  <div className="flex items-center text-sm font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline">
                    Reply to Feedback
                    <ThumbsUp size={16} className="ml-2" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
