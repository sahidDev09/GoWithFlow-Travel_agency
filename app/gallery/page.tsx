"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const images = [
  "https://i.postimg.cc/c44NQdGS/656400008-2937814809742072-419709997632154009-n.jpg",
  "https://i.postimg.cc/yYQCj27J/656683194-2937814416408778-534490183140621319-n.jpg",
  "https://i.postimg.cc/yYQCj27m/660526147-3367469703415514-868498680945280906-n.jpg",
  "https://i.postimg.cc/5N7WgDfV/chairman.jpg",
  "https://i.postimg.cc/ZK7zHXJv/g1.jpg",
  "https://i.postimg.cc/CLPp79wk/g2.jpg",
  "https://i.postimg.cc/RZW5DG0H/g3.jpg",
  "https://i.postimg.cc/nhXbPTLB/g4.jpg",
  "https://i.postimg.cc/Z5WtMjqL/g5.jpg",
  "https://i.postimg.cc/RZW5DG0X/g6.jpg",
  "https://i.postimg.cc/DwSkM5zD/g7.jpg",
  "https://i.postimg.cc/bw4ccbDc/g8.jpg",
  "https://i.postimg.cc/HkFDD5JF/g9.jpg",
  "https://i.postimg.cc/52DddvYx/g10.jpg",
  "https://i.postimg.cc/zG4ZZWLs/g11.jpg",
  "https://i.postimg.cc/W4rR23gF/g12.jpg",
  "https://i.postimg.cc/XvFMVJdg/g13.jpg",
  "https://i.postimg.cc/SK80ysCs/g14.jpg",
  "https://i.postimg.cc/R0frMFK1/g15.jpg",
  "https://i.postimg.cc/bvbXzJk1/g16.jpg",
  "https://i.postimg.cc/JzDvqnTK/g17.jpg",
  "https://i.postimg.cc/cLg2mH91/g18.jpg",
  "https://i.postimg.cc/7ZGdV6Bc/g19.jpg",
  "https://i.postimg.cc/3x4VBRSQ/g20.jpg",
  "https://i.postimg.cc/Qd2Pn3wZ/g21.jpg",
  "https://i.postimg.cc/t4KfmjwJ/g22.jpg",
  "https://i.postimg.cc/2SsJXDM5/g23.jpg",
  "https://i.postimg.cc/JhjFfFCy/g24.jpg",
  "https://i.postimg.cc/Xv9PRP6d/g25.jpg",
  "https://i.postimg.cc/QMcz2zZJ/g26.jpg",
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
