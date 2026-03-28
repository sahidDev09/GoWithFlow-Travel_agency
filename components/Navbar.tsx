"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useLanguage } from "@/lib/i18n";

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const navRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Initial load animation
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
    );

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.events, href: "/#events" },
    { name: t.nav.gallery, href: "/gallery" },
    { name: t.nav.about, href: "/about" },
  ];

  return (
    <div className="fixed top-8 left-0 w-full z-[100] flex justify-center px-4 pointer-events-none">
      <nav
        ref={navRef}
        className={`pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between px-8 py-3 rounded-full border shadow-2xl backdrop-blur-xl backdrop-saturate-200 ${
          isScrolled 
            ? "max-w-[1000px] w-full py-4 bg-white/60 border-white/40 scale-[0.98] shadow-indigo-500/10" 
            : "max-w-[850px] w-full bg-white/30 border-white/20"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="group flex items-center space-x-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg group-hover:bg-indigo-500 transition-colors">
            TA
          </div>
          
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-[13px] font-black uppercase tracking-widest text-slate-900/70 hover:text-indigo-600 transition-colors duration-300 group"
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full opacity-60" />
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100/50 rounded-full p-1 border border-slate-200">
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase transition-all ${
                language === "en" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("bn")}
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase transition-all ${
                language === "bn" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              বাংলা
            </button>
          </div>

          {/* CTA Button */}
          <button className="relative group overflow-hidden bg-slate-950 text-white px-7 py-3 rounded-full text-[13px] font-black uppercase tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95">
            <span className="relative z-10">{t.nav.joinNow}</span>
            <div className="absolute inset-0 bg-indigo-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
