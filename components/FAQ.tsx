"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import gsap from "gsap";

export default function FAQ() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll entrance animation for title and badge
    const ctx = gsap.context(() => {
      gsap.from(".faq-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".faq-item-reveal", {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-white"
      id="faq"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div ref={titleRef} className="max-w-3xl mx-auto text-center mb-16 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="faq-reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-4"
          >
            <HelpCircle className="w-4 h-4" />
            {t.faq.badge}
          </motion.div>
          <h2 className="faq-reveal text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            {t.faq.title} <span className="text-indigo-600">{t.faq.titleAccent}</span>
          </h2>
          <p className="faq-reveal text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.faq.description}
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="max-w-4xl mx-auto space-y-4"
        >
          {t.faq.items.map((item, index) => (
            <div 
              key={index}
              className="faq-item-reveal"
            >
              <div 
                className={`
                  group rounded-2xl transition-all duration-300 border
                  ${activeIndex === index 
                    ? "border-indigo-200 bg-indigo-50/30 shadow-sm" 
                    : "border-slate-100 bg-white hover:border-indigo-100 hover:shadow-sm"
                  }
                `}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  aria-expanded={activeIndex === index}
                >
                  <span className={`text-lg font-semibold transition-colors duration-300 ${activeIndex === index ? "text-indigo-700" : "text-slate-800"}`}>
                    {item.question}
                  </span>
                  <div className={`
                    flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                    ${activeIndex === index ? "bg-indigo-600 text-white rotate-180" : "bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"}
                  `}>
                    {activeIndex === index ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="h-px w-full bg-indigo-100/50 mb-4" />
                        <p className="text-slate-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center faq-reveal">
          <p className="text-slate-500 mb-4 italic">{t.faq.footerText}</p>
          <button className="px-8 py-4 bg-slate-900 text-white font-medium rounded-full shadow-lg hover:shadow-slate-200 transition-all duration-300 transform hover:-translate-y-1 active:scale-95">
            {t.faq.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
}
