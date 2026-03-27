"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useLanguage();
  const titleRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Floating elements refs
  const balloonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const parachuteRefs = useRef<(HTMLDivElement | null)[]>([]);
  const birdsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Animations for content
      const tl = gsap.timeline({ defaults: { ease: "back.out(1.5)" } });

      tl.fromTo(titleRef.current, 
        { y: 100, opacity: 0, scale: 0.8 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1.5 }, 
        0.2
      );

      tl.fromTo(subtitleRef.current, 
        { y: 50, opacity: 0, scale: 0.9 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1.2 }, 
        0.5
      );

      tl.fromTo(textRef.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 
        1.0
      );

      tl.fromTo(buttonsRef.current, 
        { y: 20, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(2)" }, 
        1.2
      );

      // 2. Scroll Animations for Balloons (Individual speeds)
      balloonRefs.current.forEach((balloon, i) => {
        if (!balloon) return;
        gsap.to(balloon, {
          y: -200 - (i * 150), // Each balloon moves at a different speed
          x: (i % 2 === 0 ? 50 : -50) * (i + 1), // Drift left or right
          rotation: i % 2 === 0 ? 15 : -15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1 + (i * 0.5)
          }
        });
      });

      // 3. Scroll Animations for Parachutes (Downwards and drift)
      parachuteRefs.current.forEach((parachute, i) => {
        if (!parachute) return;
        gsap.to(parachute, {
          y: 300, 
          x: (i === 0 ? 100 : -100),
          rotation: (i === 0 ? 10 : -10),
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2.5
          }
        });
      });

      // 4. Scroll Animations for Birds (Fly across)
      gsap.to(birdsRef.current, {
        x: 1000,
        y: -150,
        scale: 1.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <section 
        className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-20"
      >
        {/* Background Layer: Sky */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center brightness-105 saturate-110"
            style={{ 
              backgroundImage: `url('/sky.png')`,
            }}
          />
          {/* Contrast Mask: Lightens the area behind text */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_70%)] opacity-40 pointer-events-none" />
        </motion.div>

        {/* Floating Elements (USING IMAGES FROM PUBLIC/IMAGES/) */}
        
        {/* Hot Air Balloons */}
        <div 
          ref={(el) => { balloonRefs.current[0] = el; }} 
          className="absolute top-[10%] right-[10%] z-5 w-32 h-auto opacity-90"
        >
          <Image src="/images/hot_ballons.png" alt="Balloon" width={326} height={400} className="w-full h-auto" />
        </div>
        <div 
          ref={(el) => { balloonRefs.current[1] = el; }} 
          className="absolute top-[25%] left-[8%] z-5 w-24 h-auto opacity-70"
        >
          <Image src="/images/hot_ballons.png" alt="Balloon" width={326} height={400} className="w-full h-auto brightness-90" />
        </div>
        <div 
          ref={(el) => { balloonRefs.current[2] = el; }} 
          className="absolute top-[45%] right-[25%] z-5 w-20 h-auto opacity-60"
        >
          <Image src="/images/hot_ballons.png" alt="Balloon" width={326} height={400} className="w-full h-auto brightness-75 scale-75" />
        </div>
        <div 
          ref={(el) => { balloonRefs.current[3] = el; }} 
          className="absolute top-[60%] left-[20%] z-5 w-28 h-auto opacity-80"
        >
          <Image src="/images/hot_ballons.png" alt="Balloon" width={326} height={400} className="w-full h-auto" />
        </div>

        {/* Parachutes */}
        <div 
          ref={(el) => { parachuteRefs.current[0] = el; }} 
          className="absolute top-[15%] left-[30%] z-5 w-20 h-auto"
        >
          <Image src="/images/parachutes.png" alt="Parachute" width={223} height={300} className="w-full h-auto opacity-80" />
        </div>
        <div 
          ref={(el) => { parachuteRefs.current[1] = el; }} 
          className="absolute top-[35%] right-[35%] z-5 w-24 h-auto"
        >
          <Image src="/images/parachutes.png" alt="Parachute" width={223} height={300} className="w-full h-auto opacity-60 brightness-90" />
        </div>

        {/* Birds */}
        <div 
          ref={birdsRef} 
          className="absolute top-[18%] left-[-15%] z-5 w-48 h-auto opacity-40"
        >
          <Image src="/images/birds.png" alt="Birds" width={500} height={300} className="w-full h-auto" />
        </div>

        {/* Combined Content Div in the MIDDLE */}
        <div className="relative z-30 text-center max-w-5xl px-4 flex flex-col items-center space-y-10">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl font-black text-[#020617] drop-shadow-[0_10px_30px_rgba(255,255,255,1)] drop-shadow-[0_4px_10px_rgba(0,0,0,0.1)] uppercase flex flex-col items-center leading-none">
              <span ref={titleRef} className="text-indigo-700 md:text-8xl text-5xl block">{t.hero.title}</span>
              <span ref={subtitleRef} className="text-xl md:text-4xl font-extrabold text-slate-950 mt-2 block text-center leading-tight">{t.hero.subtitle}</span>
            </h1>
          </div>

          <p ref={textRef} className="text-xl md:text-2xl text-slate-950 max-w-3xl mx-auto drop-shadow-[0_5px_15px_rgba(255,255,255,1)] drop-shadow-[0_2px_5px_rgba(0,0,0,0.05)] leading-relaxed antialiased font-medium">
            {t.hero.description}
          </p>
          
          <div ref={buttonsRef} className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 pt-4">
            <button className="bg-slate-950 text-white px-12 py-5 rounded-full text-xl font-black shadow-2xl transition-all hover:bg-indigo-600 hover:scale-110 active:scale-95 flex items-center group">
              {t.hero.bookEscape}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button className="glass px-12 py-5 rounded-full text-xl font-black shadow-xl transition-all hover:bg-white text-slate-900 border-2 border-slate-900/5 hover:border-indigo-600/20">
              {t.hero.viewGallery}
            </button>
          </div>
        </div>

        {/* Foreground Layer: Cityscape */}
        <motion.div 
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="absolute -bottom-10 left-0 w-full z-20 pointer-events-none"
        >
          <Image 
            src="/landing travel.png"
            alt="Travel Aid Cityscape"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover"
            priority
          />
        </motion.div>

        {/* Transition Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white via-white/50 to-transparent z-15 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent z-5 pointer-events-none" />

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center space-y-2"
        >
          <span className="text-[10px] font-black uppercase text-slate-900/60 font-sans">{t.hero.scrollDown}</span>
          <div className="h-8 w-[1px] bg-slate-900/20" />
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
