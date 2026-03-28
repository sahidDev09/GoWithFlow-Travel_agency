"use client";

import { motion } from "framer-motion";
import { Award, Users, Calendar, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const Stats = () => {
  const { language } = useLanguage();

  const stats = [
    {
      id: 1,
      icon: <Award className="w-6 h-6 text-indigo-600" />,
      value: language === "en" ? "#1" : "১ নম্বর",
      label: language === "en" ? "Travel Agency in Sylhet" : "সিলেটের সেরা ট্রাভেল এজেন্সি",
      id_name: "best-agency"
    },
    {
      id: 2,
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
      value: language === "en" ? "99%" : "৯৯%",
      label: language === "en" ? "Success Booking Rate" : "সফল বুকিং রেট",
      id_name: "success-rate"
    },
    {
      id: 3,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      value: language === "en" ? "30,000+" : "৩০,০০০+",
      label: language === "en" ? "Happy Travelers" : "হাসিখুশি ভ্রমণকারী",
      id_name: "total-travelers"
    },
    {
      id: 4,
      icon: <Calendar className="w-6 h-6 text-amber-600" />,
      value: language === "en" ? "5+" : "৫+",
      label: language === "en" ? "Upcoming Events" : "আসছে ইভেন্টসমূহ",
      id_name: "upcoming-events"
    }
  ];

  return (
    <section className="relative z-30 -mt-10 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-[2rem] shadow-xl shadow-indigo-100/50 flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4 p-4 rounded-2xl bg-slate-50 group-hover:bg-white transition-colors">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm md:text-base text-slate-500 font-semibold leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
