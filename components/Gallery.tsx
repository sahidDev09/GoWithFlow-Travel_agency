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
      className={`relative h-full w-full rounded-[2rem] overflow-hidden group cursor-pointer ${className}`}
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
      src: "/images/gallery/tea_garden.png",
      title: language === "en" ? "Lush Tea Gardens" : "সবুজ চা বাগান",
      description: language === "en" ? "Explore the rolling hills of Sylhet's famous tea estates." : "সিলেটের বিখ্যাত চা বাগানের সবুজ পাহাড় অন্বেষণ করুন।",
      className: "md:col-span-2 md:row-span-2"
    },
    {
      id: 2,
      src: "/images/gallery/jaflong.png",
      title: language === "en" ? "Crystal Waters" : "স্বচ্ছ জলরাশি",
      description: language === "en" ? "The stunning rocky riverbeds of Jaflong." : "জাফলংয়ের অসাধারণ পাথুরে নদী।",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      id: 3,
      src: "/images/gallery/keane_bridge.png",
      title: language === "en" ? "City Sunset" : "শহুরে সূর্যাস্ত",
      description: language === "en" ? "Golden hour at the iconic Keane Bridge." : "ঐতিহাসিক কিন ব্রিজে স্বর্ণালী গোধূলি।",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      id: 4,
      src: "/landing travel.png",
      title: language === "en" ? "Urban Escapes" : "নগর ভ্রমণ",
      description: language === "en" ? "Seamless transitions from nature to city life." : "প্রকৃতি থেকে শহুরে জীবনের সহজ রূপান্তর।",
      className: "md:col-span-2 md:row-span-1"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1540611025311-01df3cef54b5",
      title: language === "en" ? "River Life" : "নদীমাতৃক জীবন",
      description: language === "en" ? "Experience the heart of Bangladesh on the water." : "জলের ওপর বাংলাদেশের প্রাণস্পন্দন অনুভব করুন।",
      className: "md:col-span-1 md:row-span-2"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1596402184320-417d7178b2cd",
      title: language === "en" ? "Golden Harvest" : "সোনালী ফসল",
      description: language === "en" ? "Beautiful rural landscapes and rich tea culture." : "চমৎকার গ্রামীণ দৃশ্য এবং সমৃদ্ধ চা সংস্কৃতি।",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      title: language === "en" ? "Hidden Gems" : "লুকানো রত্ন",
      description: language === "en" ? "Discover the secret wonders of nature." : "প্রকৃতির গোপন বিস্ময়গুলো আবিষ্কার করুন।",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: language === "en" ? "Mountain Peaks" : "পাহাড়ের চূড়া",
      description: language === "en" ? "Climb the highest points for a better view." : "সেরা দৃশ্যের জন্য সর্বোচ্চ শিখরে আরোহণ করুন।",
      className: "md:col-span-1 md:row-span-1"
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

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-[800px]">
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
