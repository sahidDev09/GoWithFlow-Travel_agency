"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const Testimonials = () => {
  const { language } = useLanguage();

  const testimonials = [
    {
      id: 1,
      name: "Tanvir Ahmed",
      location: "Sylhet, BD",
      text: language === "en" 
        ? "GoWithFlow made my visit to the tea gardens of Sylhet absolutely magical. The planning was seamless!"
        : "GoWithFlow আমার সিলেট চা বাগান ভ্রমণকে একেবারে জাদুকরী করে তুলেছে। তাদের পরিকল্পনা ছিল অসাধারণ!",
      rating: 5,
      rotation: -2,
    },
    {
      id: 2,
      name: "Sarah Islam",
      location: "Dhaka, BD",
      text: language === "en"
        ? "The best travel experience I've had in years. The guides were professional and very friendly."
        : "বিগত কয়েক বছরের মধ্যে সেরা ভ্রমণের অভিজ্ঞতা। গাইডরা খুবই প্রফেশনাল এবং বন্ধুসুলভ ছিল।",
      rating: 5,
      rotation: 1,
    },
    {
      id: 3,
      name: "Rahul Sen",
      location: "Chittagong, BD",
      text: language === "en"
        ? "I was amazed by the attention to detail. Every moment of our escape was perfectly curated."
        : "তাদের খুঁটিনাটি বিষয়ের প্রতি নজর দেখে আমি অবাক হয়েছি। আমাদের ভ্রমণের প্রতিটি মুহূর্ত ছিল গোছানো।",
      rating: 5,
      rotation: -1.5,
    },
    {
      id: 4,
      name: "Aisha Khan",
      location: "London, UK",
      text: language === "en"
        ? "Visiting Bangladesh for the first time was a dream, and this agency made it feel like home."
        : "প্রথমবার বাংলাদেশে আসা আমার কাছে স্বপ্নের মতো ছিল, আর এই এজেন্সি আমাকে ঘরের অনুভূতি দিয়েছে।",
      rating: 5,
      rotation: 2,
    },
    {
      id: 5,
      name: "Zayan Malik",
      location: "New York, USA",
      text: language === "en"
        ? "Premium service from start to finish. The hot air balloon ride in Sylhet is a must-try!"
        : "শুরু থেকে শেষ পর্যন্ত প্রিমিয়াম সার্ভিস। সিলেটের হট এয়ার বেলুন রাইড অবশ্যই ট্রাই করা উচিত!",
      rating: 5,
      rotation: -3,
    },
    {
      id: 6,
      name: "Fatima Zohra",
      location: "Rajshahi, BD",
      text: language === "en"
        ? "The team went above and beyond for our group. Highly professional travel experts!"
        : "টিম আমাদের গ্রুপের জন্য সেরাটা দিয়েছে। হাইলি প্রফেশনাল ট্রাভেল এক্সপার্ট!",
      rating: 5,
      rotation: 1.5,
    }
  ];

  // Doubling the array for seamless marquee effect
  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-14 bg-blue-50/50 overflow-hidden relative">
      <div className="container mx-auto px-4 mb-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-indigo-600 font-black uppercase tracking-widest text-sm mb-4 block"
        >
          {language === "en" ? "Stories of Joy" : "আনন্দের গল্প"}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-slate-900 leading-none"
        >
          {language === "en" ? "What our Adventurers says" : "আমাদের অভিযাত্রীরা যা বলছেন"}
        </motion.h2>
      </div>

      <div className="flex relative">
        <motion.div
          animate={{ x: ["-100%", "0%"] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-8 whitespace-nowrap min-w-full"
        >
          {doubledTestimonials.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              style={{ rotate: item.rotation }}
              whileHover={{ 
                scale: 1.05, 
                rotate: 0, 
                zIndex: 50,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="inline-block w-[300px] md:w-[380px] p-6 md:p-8 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex-shrink-0 cursor-default"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-indigo-50 rounded-2xl">
                  <Quote className="w-6 h-6 text-indigo-600 fill-indigo-600/10" />
                </div>
                <div className="flex gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
              </div>
              
              <p className="text-base md:text-lg font-medium text-slate-600 whitespace-normal mb-8 leading-relaxed tracking-tight italic">
                &quot;{item.text}&quot;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-black text-lg">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 leading-none mb-1">{item.name}</h4>
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{item.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Testimonials;
