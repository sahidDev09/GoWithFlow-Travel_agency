"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const images = [
  "https://i.postimg.cc/gjK2WK9v/ts1.jpg",
  "https://i.postimg.cc/jdsjhBNM/ts10.jpg",
  "https://i.postimg.cc/wT6BknJW/ts11.jpg",
  "https://i.postimg.cc/qMjvDQX5/ts12.jpg",
  "https://i.postimg.cc/Pr25VKQG/ts13.jpg",
  "https://i.postimg.cc/NfpjCbkt/ts14.jpg",
  "https://i.postimg.cc/rFQwZgNk/ts15.jpg",
  "https://i.postimg.cc/K8jv6L0m/ts16.jpg",
  "https://i.postimg.cc/jS2dpNM2/ts17.jpg",
  "https://i.postimg.cc/cLC4pYFJ/ts18.jpg",
  "https://i.postimg.cc/4xyNDtW4/ts19.jpg",
  "https://i.postimg.cc/jq65PRWC/ts2.jpg",
  "https://i.postimg.cc/wjMTCJwy/ts20.jpg",
  "https://i.postimg.cc/dV3tbd5T/ts21.jpg",
  "https://i.postimg.cc/QdzxhtzH/ts22.jpg",
  "https://i.postimg.cc/pLSXRTSz/ts23.jpg",
  "https://i.postimg.cc/mgn2BDnw/ts24.jpg",
  "https://i.postimg.cc/pdnVTvNJ/ts25.jpg",
  "https://i.postimg.cc/bv2YJPcf/ts26.jpg",
  "https://i.postimg.cc/jjJq5TVZ/ts28.jpg",
  "https://i.postimg.cc/vm68ByFm/ts29.jpg",
  "https://i.postimg.cc/kMN4K7V2/ts3.jpg",
  "https://i.postimg.cc/d1PsZfwK/ts30.jpg",
  "https://i.postimg.cc/PrtqM0Zt/ts4.jpg",
  "https://i.postimg.cc/5950LfHY/ts5.jpg",
  "https://i.postimg.cc/HspLtF5Y/ts6.jpg",
  "https://i.postimg.cc/J41hQSJs/ts7.jpg",
  "https://i.postimg.cc/BQMn7Ncx/ts8.jpg",
  "https://i.postimg.cc/tCXgz8Pk/ts9.jpg",
];


const BentoCard = ({ src, index }: { src: string; index: number }) => {
  // Diverse grid spans for a dynamic masonry-style layout
  const spans = [
    "md:col-span-2 md:row-span-2", 
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-2",
    "md:col-span-2 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-2 md:row-span-2",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-2 md:row-span-1",
    "md:col-span-1 md:row-span-2",
  ];

  const spanClass = spans[index % spans.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        delay: (index % 10) * 0.05 
      }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`${spanClass} relative rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-indigo-500/10 bg-white border border-white/20 h-full w-full`}
    >
      <Image
        src={src}
        alt={`Travel Memory ${index + 1}`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading={index < 12 ? "eager" : "lazy"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};


export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-blue-50/50 selection:bg-indigo-500/10 relative">
      <Navbar />
      
      {/* Immersive Gallery Grid */}
      <section className="pt-32 pb-16 container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-dense auto-rows-[300px] gap-6">
          {images.map((img, i) => (
            <BentoCard key={i} src={img} index={i} />
          ))}
        </div>
      </section>

      <Footer />

      
      {/* Background Decorative Blurs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full" />
      </div>
    </main>
  );
}
