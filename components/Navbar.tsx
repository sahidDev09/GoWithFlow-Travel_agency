"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
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
    { name: "Home", href: "/" },
    { name: "Events", href: "#" },
    { name: "Gallery", href: "#" },
    { name: "About Us", href: "#" },
  ];

  return (
    <div className="fixed top-8 left-0 w-full z-100 flex justify-center px-4 pointer-events-none">
      <nav
        ref={navRef}
        className={`pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between px-8 py-3 rounded-full border border-slate-200/50 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] glass ${
          isScrolled ? "max-w-[850px] w-full py-4 bg-white/90 scale-95 shadow-indigo-500/5 border-slate-100" : "max-w-[750px] w-full bg-white/60"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="group flex items-center space-x-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg group-hover:bg-indigo-500 transition-colors">
            TA
          </div>
          <span className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
            Travel<span className="text-indigo-600 group-hover:text-indigo-800">Aid</span>
          </span>
        </Link>

        {/* Menu Items */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              ref={(el) => {
                menuItemsRef.current[index] = el;
              }}
              className="relative text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors duration-300 group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <button className="relative group overflow-hidden bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-xl transition-all hover:scale-105 active:scale-95">
          <span className="relative z-10">Join Now</span>
          <div className="absolute inset-0 bg-indigo-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
