"use client";

import React, { useCallback, useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/i18n";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const destinationData = [
  {
    id: 1,
    image: "/images/destinations/sajek.jpg",
    categoryKey: "mountains" as const,
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    id: 2,
    image: "/images/destinations/coxs.jpg",
    categoryKey: "beach" as const,
    gradient: "from-amber-400 to-orange-500",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2070&auto=format&fit=crop",
    categoryKey: "island" as const,
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    id: 4,
    image: "/images/destinations/bandarban.jpg",
    categoryKey: "adventure" as const,
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    id: 5,
    image: "/images/destinations/sundarban.jpg.webp",
    categoryKey: "wildlife" as const,
    gradient: "from-green-400 to-emerald-600",
  },
  {
    id: 6,
    image: "/images/destinations/mirinja.jpeg",
    categoryKey: "valley" as const,
    gradient: "from-lime-400 to-green-500",
  },
];

const ExploreDestinations = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const floatRefs = useRef<(HTMLDivElement | null)[]>([]);

  const destinations = useMemo(() => {
    return destinationData.map((data) => {
      const translation = t.destinations.items.find((item) => item.id === data.id);
      return {
        ...data,
        name: translation?.name || "",
        description: translation?.description || "",
        category: t.destinations.categories[data.categoryKey],
      };
    });
  }, [t.destinations]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "start",
      skipSnaps: false,
      containScroll: "trimSnaps"
    }, 
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      floatRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: -150 - (i * 100),
          x: (i % 2 === 0 ? 40 : -40),
          rotation: i % 2 === 0 ? 10 : -10,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5 + (i * 0.5)
          }
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="destinations" className="py-24 sky-gradient-bg overflow-hidden relative">
      {/* Background Animated Layer */}
      <div className="sky-gradient-glow opacity-80" />

      {/* Floating Elements */}
      <div ref={(el) => { floatRefs.current[0] = el; }} className="absolute top-[10%] left-[5%] z-0 w-28 opacity-40 pointer-events-none">
        <Image src="/images/hot_ballons.png" alt="" width={326} height={400} className="w-full h-auto" />
      </div>
      <div ref={(el) => { floatRefs.current[1] = el; }} className="absolute top-[35%] right-[2%] z-0 w-24 opacity-30 pointer-events-none">
        <Image src="/images/parachutes.png" alt="" width={223} height={300} className="w-full h-auto" />
      </div>
      <div ref={(el) => { floatRefs.current[2] = el; }} className="absolute bottom-[10%] left-[8%] z-0 w-32 opacity-30 pointer-events-none">
        <Image src="/images/hot_ballons.png" alt="" width={326} height={400} className="w-full h-auto brightness-90" />
      </div>
      <div ref={(el) => { floatRefs.current[3] = el; }} className="absolute top-[55%] right-[8%] z-0 w-56 opacity-15 pointer-events-none">
        <Image src="/images/birds.png" alt="" width={500} height={300} className="w-full h-auto" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-4 block"
            >
              {t.destinations.badge}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-black text-slate-950 leading-tight"
            >
              {t.destinations.title} <span className="text-gradient">{t.destinations.titleAccent}</span>
            </motion.h2>
            <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-slate-600 text-lg md:text-xl max-w-md pb-2"
          >
            {t.destinations.description}
          </motion.p>
          </div>
          <div className="flex items-center space-x-4 pb-2">
            <button 
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all group active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all group active:scale-95"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex -ml-4 lg:-ml-8">
            {destinations.map((dest, index) => (
              <div 
                key={dest.id} 
                className="embla__slide flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] lg:pl-8"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/5 cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      priority={index < 3}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                    <div className="mb-4 overflow-hidden">
                       <span 
                        className={`inline-block px-4 py-1.5 rounded-full text-xs font-black text-white bg-gradient-to-r ${dest.gradient} shadow-lg mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300`}
                       >
                        {dest.category}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl font-black text-white mb-2 leading-tight group-hover:text-indigo-300 transition-colors">
                      {dest.name}
                    </h3>
                    
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed line-clamp-2 transition-all duration-300">
                      {dest.description}
                    </p>

                    <div className="mt-6 flex items-center text-white font-bold text-sm tracking-wider uppercase group-hover:gap-4 gap-2 transition-all">
                      {t.destinations.exploreMore}
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Interactive Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar Indicators */}
        <div className="mt-12 flex justify-center space-x-2">
          {destinations.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                selectedIndex === index ? "w-12 bg-indigo-600" : "w-4 bg-slate-200"
              }`}
            />
          ))}
        </div>

      
      </div>
    </section>
  );
};

export default ExploreDestinations;
