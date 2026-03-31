"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const BentoCard = ({ src, title, description, className }: { src: string; title: string; description: string; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative h-full w-full min-h-[400px] md:min-h-0 rounded-[3rem] overflow-hidden group cursor-pointer ${className}`}
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0 z-10 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <h3 className="text-white text-2xl font-black mb-2 leading-none">{title}</h3>
        <p className="text-white/80 text-sm font-medium leading-tight">{description}</p>
      </div>
      
      <Image
        src={src}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </motion.div>
  );
};

const Gallery = () => {
  const { language } = useLanguage();

  const items = [
    {
      id: 1,
      src: "https://i.postimg.cc/c44NQdGS/656400008-2937814809742072-419709997632154009-n.jpg",
      title: language === "en" ? "Group Adventures" : "গ্রুপ অ্যাডভেঞ্চার",
      description: language === "en" ? "Creating memories that last a lifetime." : "সারাজীবনের জন্য অমূল্য স্মৃতি তৈরি করা।",
      className: "md:col-span-2 md:row-span-2"
    },
    {
      id: 2,
      src: "https://i.postimg.cc/yYQCj27J/656683194-2937814416408778-534490183140621319-n.jpg",
      title: language === "en" ? "Scenic Views" : "মনোরম দৃশ্য",
      description: language === "en" ? "Nature's beauty at its finest." : "প্রকৃতির অপরূপ সৌন্দর্য।",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      id: 3,
      src: "https://i.postimg.cc/yYQCj27m/660526147-3367469703415514-868498680945280906-n.jpg",
      title: language === "en" ? "Travel Moments" : "ভ্রমণের মুহূর্ত",
      description: language === "en" ? "Capturing the essence of exploration." : "অন্বেষণের মূল নির্যাস ধারণ করা।",
      className: "hidden md:block md:col-span-1 md:row-span-1"
    },
    {
      id: 4,
      src: "https://i.postimg.cc/ZK7zHXJv/g1.jpg",
      title: language === "en" ? "Local Culture" : "স্থানীয় সংস্কৃতি",
      description: language === "en" ? "Immerse yourself in authentic experiences." : "প্রকৃত অভিজ্ঞতায় নিজেকে নিমজ্জিত করুন।",
      className: "hidden md:block md:col-span-2 md:row-span-1"
    },
    {
      id: 6,
      src: "https://i.postimg.cc/CLPp79wk/g2.jpg",
      title: language === "en" ? "Exploration" : "অন্বেষণ",
      description: language === "en" ? "Finding beauty in every corner." : "প্রতিটি কোণে সৌন্দর্য খুঁজে পাওয়া।",
      className: "hidden md:block md:col-span-1 md:row-span-1"
    },
    {
      id: 7,
      src: "https://i.postimg.cc/RZW5DG0H/g3.jpg",
      title: language === "en" ? "Nature Escapes" : "প্রকৃতিতে পলায়ন",
      description: language === "en" ? "Breathe in the fresh mountain air." : "পাহাড়ের টাটকা বাতাসে শ্বাস নিন।",
      className: "hidden md:block md:col-span-1 md:row-span-1"
    },
    {
      id: 8,
      src: "https://i.postimg.cc/nhXbPTLB/g4.jpg",
      title: language === "en" ? "Mountain Peaks" : "পাহাড়ের চূড়া",
      description: language === "en" ? "Climb higher for the best perspective." : "সেরা দৃষ্টিভঙ্গির জন্য আরও উঁচুতে আরোহণ করুন।",
      className: "hidden md:block md:col-span-1 md:row-span-1"
    }
  ];


  return (
    <section className="py-14 bg-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-indigo-600 font-black uppercase tracking-widest text-sm mb-4 block"
          >
            {language === "en" ? "Visual Journey" : "দৃশ্যপট ভ্রমণ"}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-slate-900 leading-none"
          >
            {language === "en" ? "Our Travel Gallery" : "আমাদের ভ্রমণ গ্যালারি"}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[800px]">
          {items.map((item) => (
            <BentoCard key={item.id} {...item} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link 
            href="/gallery"
            className="group relative flex items-center justify-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-full font-black text-xl transition-all hover:bg-indigo-600 hover:scale-110 active:scale-95 shadow-2xl shadow-slate-900/10"
          >
            <span>{language === "en" ? "View Full Gallery" : "পুরো গ্যালারি দেখুন"}</span>
            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
