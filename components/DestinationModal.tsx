"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Mountain, 
  Cloud, 
  Waves, 
  Map as MapIcon, 
  Tent, 
  TowerControl,
  ArrowRight,
  MapPin,
  LucideIcon
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface MustVisitPlace {
  icon: string;
  name: string;
}

interface TravelInfo {
  bestTime: string;
  location: string;
  duration: string;
  difficulty: string;
}

interface DestinationItem {
  id: number;
  name: string;
  description: string;
  image?: string;
  category?: string;
  fullDescription?: string;
  gallery?: string[];
  mustVisit?: MustVisitPlace[];
  travelInfo?: TravelInfo;
  gradient?: string;
}

interface DestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: DestinationItem | null;
}

const iconMap: Record<string, LucideIcon> = {
  Mountain: Mountain,
  Cloud: Cloud,
  Waves: Waves,
  Map: MapIcon,
  Tent: Tent,
  TowerControl: TowerControl,
  Check: MapPin,
};

const DestinationModal = ({ isOpen, onClose, destination }: DestinationModalProps) => {
  if (!destination) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: { 
                type: "spring", 
                damping: 25, 
                stiffness: 300,
                duration: 0.6
              } 
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              y: 20,
              transition: { duration: 0.3 }
            }}
            className="relative w-full max-w-7xl bg-white/90 dark:bg-slate-900/90 rounded-[32px] overflow-hidden shadow-2xl glass border border-white/20"
          >
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"
              />
              <motion.div 
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, -10, 0]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -right-10 w-60 h-60 bg-cyan-500/20 rounded-full blur-3xl"
              />
            </div>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-sm transition-all active:scale-90"
            >
              <X className="w-6 h-6 text-slate-800 dark:text-white" />
            </button>

            <div className="flex flex-col lg:flex-row h-full max-h-[90vh] overflow-y-auto lg:overflow-hidden">
              {/* Left Side: Image Gallery */}
              <div className="w-full lg:w-1/2 h-[350px] lg:h-auto relative">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay, EffectFade]}
                  effect="fade"
                  navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                  }}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 5000 }}
                  loop={true}
                  className="w-full h-full"
                >
                  {(destination.gallery || [destination.image || ""]).map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="relative w-full h-full">
                        <Image
                          src={img}
                          alt={`${destination.name} ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                      </div>
                    </SwiperSlide>
                  ))}
                  
                  {/* Custom Navigation */}
                  <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all">
                    <ArrowRight className="w-5 h-5 text-white rotate-180" />
                  </div>
                  <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </Swiper>
              </div>

              {/* Right Side: Information */}
              <div className="w-full lg:w-1/2 p-8 md:p-12 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black text-white bg-gradient-to-r ${destination.gradient || "from-indigo-500 to-cyan-500"} shadow-lg mb-6`}>
                    {destination.category || "Destination"}
                  </span>
                  
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                    {destination.name}
                  </h2>
                  
                  <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8">
                    {destination.fullDescription || destination.description}
                  </p>

                  {/* Must Visit Places */}
                  <div className="mb-10">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                       Must Visit Places
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                      {(destination.mustVisit || []).map((place, idx) => {
                        const Icon = iconMap[place.icon] || MapIcon;
                        return (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + (idx * 0.1) }}
                            className="flex items-center gap-4 group"
                          >
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/50 dark:bg-blue-900/30 flex items-center justify-center">
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-base font-medium text-slate-700 dark:text-slate-300">
                              {place.name}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button className="w-full sm:flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold py-4 rounded-2xl hover:bg-indigo-600 dark:hover:bg-indigo-50 transition-all shadow-xl shadow-slate-900/10 active:scale-95 text-base tracking-wide">
                      Plan This Trip
                    </button>
                    <button className="w-full sm:flex-1 py-4 px-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 text-base whitespace-nowrap">
                      Explore Tour Packages
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DestinationModal;
