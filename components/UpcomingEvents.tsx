"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { 
  Calendar, 
  Users, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Clock
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const CountdownTimer = ({ deadline }: { deadline: string }) => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(deadline) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <div className="flex gap-3">
      {[
        { label: t.events.days, value: timeLeft.days },
        { label: t.events.hours, value: timeLeft.hours },
        { label: t.events.mins, value: timeLeft.minutes },
        { label: t.events.secs, value: timeLeft.seconds },
      ].map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="bg-indigo-600/10 backdrop-blur-md border border-indigo-500/20 rounded-lg w-12 h-12 flex items-center justify-center">
            <span className="text-indigo-600 font-bold text-lg leading-none">
              {String(item.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 mt-1">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const UpcomingEvents = () => {
  const { t } = useLanguage();

  return (
    <section id="events" className="py-14 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-500/5 blur-[120px] rounded-full -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 blur-[120px] rounded-full -ml-20 -mb-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold tracking-wider uppercase mb-4 border border-indigo-100"
          >
            {t.events.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6"
          >
            {t.events.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
              {t.events.titleAccent}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-slate-600 text-lg leading-relaxed"
          >
            {t.events.description}
          </motion.p>
        </div>

        <div className="container mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="rounded-3xl shadow-2xl shadow-indigo-200/50 bg-white overflow-visible mb-12"
          >
            {t.events.items.map((event) => (
              <SwiperSlide key={event.id}>
                <div className="flex flex-col lg:flex-row min-h-[500px]">
                  {/* Image Section */}
                  <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-full overflow-hidden rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl">
                    <Image
                      src={event.image}
                      alt={event.destination}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r" />
                    <div className="absolute bottom-6 left-6 text-white lg:hidden">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-medium tracking-wide">{event.destination}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between bg-white rounded-b-3xl lg:rounded-bl-none lg:rounded-r-3xl">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-slate-500 font-semibold">
                          <Calendar className="w-5 h-5 text-indigo-600" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>{t.events.bookNow}</span>
                        </div>
                      </div>

                      <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight leading-tight">
                        {event.destination}
                      </h3>

                      <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                            <Users className="w-3.5 h-3.5" />
                            <span>{t.events.seatsLeft}</span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-slate-900">{event.availableSeats}</span>
                            <span className="text-slate-400 font-medium text-sm">/ {event.totalSeats}</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(event.availableSeats / event.totalSeats) * 100}%` }}
                              className="h-full bg-indigo-600 rounded-full"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{t.events.bookingEnds}</span>
                          </div>
                          <CountdownTimer deadline={event.bookingDeadline} />
                        </div>
                      </div>

                      <div className="space-y-4 mb-8">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                          {t.events.includes}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {event.inclusions.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-slate-600 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-1">
                            {t.events.perPerson}
                          </span>
                          <span className="text-xl font-black text-indigo-600 leading-none">{event.price}</span>
                        </div>
                        <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
                          <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-wider block mb-1">
                            {t.events.couplePackage}
                          </span>
                          <span className="text-xl font-black text-indigo-600 leading-none">{event.couplePrice}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                            <TrendingUp className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block leading-none mb-1">
                              {t.events.bookingMoneyLabel}
                            </span>
                            <span className="text-lg font-bold text-slate-900 leading-none">{event.bookingMoney}</span>
                          </div>
                        </div>
                        
                        <button className="group relative flex-1 flex items-center justify-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold transition-all hover:bg-indigo-600 hover:scale-[1.02] active:scale-95 shadow-xl shadow-slate-900/10 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-white/10 to-indigo-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                          <span>{t.events.bookNow}</span>
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #cbd5e1;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: #4f46e5;
        }
      `}</style>
    </section>
  );
};

export default UpcomingEvents;
