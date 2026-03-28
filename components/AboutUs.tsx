"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";
import { 
  Target, 
  Lightbulb, 
  Quote, 
  MapPin, 
  Phone, 
  Mail, 
  Send,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const sampleMarkers: GlobeMarker[] = [
  { lat: 24.8949, lng: 91.8687, label: "Sylhet", src: "/images/destinations/ratargul.jpg.avif" },
  { lat: 22.1885, lng: 92.2036, label: "Bandarban", src: "/images/destinations/bandarban.jpg" },
  { lat: 23.3820, lng: 92.2907, label: "Sajek Valley", src: "/images/destinations/sajek.jpg" },
  { lat: 21.4272, lng: 92.0058, label: "Cox's Bazar", src: "/images/destinations/coxs.jpg" },
  { lat: 20.6276, lng: 92.3235, label: "St. Martin", src: "/images/destinations/stmarting.jpg" },
  { lat: 28.6139, lng: 77.2090, label: "India", src: "https://assets.aceternity.com/avatars/6.webp" },
  { lat: 27.7172, lng: 85.3240, label: "Nepal", src: "https://assets.aceternity.com/avatars/7.webp" },
  { lat: 3.2028, lng: 73.2207, label: "Maldives", src: "https://assets.aceternity.com/avatars/8.webp" },
  { lat: 6.9271, lng: 79.8612, label: "Sri Lanka", src: "https://assets.aceternity.com/avatars/9.webp" },
  { lat: -8.4095, lng: 115.1889, label: "Indonesia", src: "https://assets.aceternity.com/avatars/10.webp" },
];

const AboutUs = () => {
  const { t } = useLanguage();
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <div className="pt-24 pb-20 overflow-hidden sky-gradient-bg relative">
      <div className="sky-gradient-glow" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider uppercase text-indigo-600 bg-indigo-50 rounded-full"
          >
            {t.about.badge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1]"
          >
            {t.about.title} <span className="text-indigo-600 italic font-medium">{t.about.titleAccent}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 font-medium leading-relaxed"
          >
            {t.about.description}
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[320px] mb-20">
          
          {/* Chairman Card - First Column (Tall) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:row-span-2 group relative overflow-hidden rounded-[2.5rem] bg-indigo-900 shadow-2xl"
          >
            <Image
              src="/images/chairman.png"
              alt="Chairman"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-950/20 to-transparent" />
            <div className="absolute bottom-10 left-8 right-8">
              <span className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-2 block">{t.about.chairmanTitle}</span>
              <h3 className="text-3xl font-black text-white mb-2">{t.about.chairmanName}</h3>
              <div className="flex gap-2">
                <Quote className="w-5 h-5 text-indigo-400 shrink-0" />
                <p className="text-indigo-100/90 text-sm leading-relaxed italic">
                  {t.about.chairmanQuote}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mission Card - Second Column (Top) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-indigo-100 p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100/50 flex flex-col justify-between group hover:border-indigo-300 transition-all hover:bg-slate-50/50"
          >
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-7 h-7 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{t.about.missionTitle}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                {t.about.missionDesc}
              </p>
            </div>
          </motion.div>

          {/* 3D Globe Card - Third Column (Tall) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:row-span-2 bg-slate-950 rounded-[2.5rem] overflow-hidden relative shadow-2xl shadow-indigo-900/40"
          >
            <div className="absolute top-10 left-10 right-10 z-10 pointer-events-none">
              <h3 className="text-3xl font-black text-white mb-2">{t.about.globeTitle}</h3>
              <p className="text-indigo-300 font-medium text-sm max-w-sm">
                {t.about.globeDesc}
              </p>
            </div>
            
            <div className="w-full h-full pt-24 pb-10">
              <Globe3D 
                markers={sampleMarkers}
                config={{
                  atmosphereColor: "#4f46e5",
                  atmosphereIntensity: 20,
                  bumpScale: 5,
                  autoRotateSpeed: 0.2,
                }}
              />
            </div>

            {/* Floating stats in globe */}
            <div className="absolute bottom-10 left-10 right-10 flex flex-col gap-3 pointer-events-none">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-sm self-start">
                  <p className="text-[10px] text-indigo-300 uppercase font-black tracking-widest leading-none mb-1">Tour Hotspots</p>
                  <p className="text-xl font-black text-white">45+</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-sm self-start ml-auto">
                  <p className="text-[10px] text-indigo-300 uppercase font-black tracking-widest leading-none mb-1">Expert Guides</p>
                  <p className="text-xl font-black text-white">120+</p>
              </div>
            </div>
          </motion.div>

          {/* Vision Card - Second Column (Bottom) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-indigo-100 p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100/50 flex flex-col justify-between group hover:border-indigo-300 transition-all hover:bg-slate-50/50"
          >
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Lightbulb className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{t.about.visionTitle}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                {t.about.visionDesc}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Hosts Marquee Section */}
        <div className="mb-24 py-12 relative overflow-hidden">
          <div className="max-w-3xl mb-12 ml-4 md:ml-0">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Meet Our Global Hosts</h2>
            <p className="text-slate-500 font-medium">Experienced experts leading your journeys across the most breathtaking landscapes.</p>
          </div>
          
          <div className="flex gap-6 animate-marquee whitespace-nowrap">
            <MarqueeContent repeat={3} />
          </div>
        </div>

        {/* Location & Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
                <h2 className="text-4xl font-black text-slate-900 mb-4">Visit Our Office</h2>
                <p className="text-slate-500 font-medium mb-8">Located at the heart of Zindabazar, we welcome you to drop by and discuss your travel dreams.</p>
                
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-indigo-100 hover:bg-white transition-all">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                            <MapPin className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Address</p>
                            <p className="text-slate-700 font-bold">Zindabazar, Sylhet 3100, Bangladesh</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-indigo-100 hover:bg-white transition-all">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                            <Phone className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Phone</p>
                            <p className="text-slate-700 font-bold">+880 1700-000000</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-indigo-100 hover:bg-white transition-all">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                            <Mail className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Email</p>
                            <p className="text-slate-700 font-bold">sahid@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="h-[400px] w-full rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl relative grayscale hover:grayscale-0 transition-all duration-500 shadow-indigo-100/50">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14470.364491953254!2d91.85966455!3d24.89492985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375054d3dce09c3f%3A0x2f6050543e9fdcc5!2sZinda%20Bazar%2C%20Sylhet!5e0!3m2!1sen!2sbd!4v1711654483921!5m2!1sen!2sbd" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-indigo-100/30 border border-slate-50"
          >
            <div className="mb-10">
                <h2 className="text-4xl font-black text-slate-900 mb-4">{t.about.contact.title}</h2>
                <p className="text-slate-500 font-medium">{t.about.contact.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-900 px-1">{t.about.contact.name}</label>
                        <input 
                            required
                            type="text" 
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-bold"
                            placeholder="Sahid"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-black text-slate-900 px-1">{t.about.contact.email}</label>
                        <input 
                            required
                            type="email" 
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-bold"
                            placeholder="sahid@gmail.com"
                        />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-black text-slate-900 px-1">{t.about.contact.subject}</label>
                    <input 
                        required
                        type="text" 
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-bold"
                        placeholder="Inquiry about Sajek Trip"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-black text-slate-900 px-1">{t.about.contact.message}</label>
                    <textarea 
                        required
                        rows={4}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-bold resize-none"
                        placeholder="Tell us what's on your mind..."
                    />
                </div>

                <button 
                    disabled={formStatus !== "idle"}
                    type="submit"
                    className={cn(
                        "w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 active:scale-[0.98]",
                        formStatus === "success" 
                            ? "bg-emerald-500 text-white" 
                            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-200"
                    )}
                >
                    {formStatus === "idle" && (
                        <>
                            {t.about.contact.send}
                            <Send className="w-5 h-5" />
                        </>
                    )}
                    {formStatus === "submitting" && (
                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    {formStatus === "success" && (
                        <>
                            {t.about.contact.success}
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const hosts = [
  { name: "Tahsan Khan", specialty: "Adventure Specialist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop" },
  { name: "Sarah Ahmed", specialty: "Cultural Explorer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&fit=crop" },
  { name: "Karim Ullah", specialty: "Wildlife Photographer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop" },
  { name: "Jennifer Lee", specialty: "Luxury Consultant", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&h=256&fit=crop" },
  { name: "Rahul Gupta", specialty: "High-Altitude Guide", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&fit=crop" },
  { name: "Elena Rossi", specialty: "Authentic Culinary", image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=256&h=256&fit=crop" },
];

const HostCard = ({ host }: { host: typeof hosts[0] }) => (
  <div className="inline-flex items-center gap-4 bg-white border border-indigo-100 p-4 rounded-3xl shadow-xl shadow-indigo-100/30 min-w-[300px] group hover:border-indigo-400 transition-all hover:scale-105 duration-300">
    <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-slate-50 shadow-inner">
      <img src={host.image} alt={host.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    </div>
    <div>
      <h4 className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{host.name}</h4>
      <p className="text-xs text-indigo-500 font-bold uppercase tracking-widest">{host.specialty}</p>
    </div>
  </div>
);

const MarqueeContent = ({ repeat }: { repeat: number }) => (
  <div className="flex gap-6 animate-marquee-content">
    {Array.from({ length: repeat }).map((_, i) => (
      <React.Fragment key={i}>
        {hosts.map((host, idx) => (
          <HostCard key={`${i}-${idx}`} host={host} />
        ))}
      </React.Fragment>
    ))}
  </div>
);

export default AboutUs;
