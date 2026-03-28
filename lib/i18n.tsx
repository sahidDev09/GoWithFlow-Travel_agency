"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "bn";

type NavTranslations = {
  home: string;
  destinations: string;
  events: string;
  gallery: string;
  about: string;
  joinNow: string;
};

type HeroTranslations = {
  title: string;
  subtitle: string;
  description: string;
  bookEscape: string;
  viewGallery: string;
  scrollDown: string;
};

type MustVisitPlace = {
  icon: string;
  name: string;
};

type TravelInfo = {
  bestTime: string;
  location: string;
  duration: string;
  difficulty: string;
};

type DestinationItem = {
  id: number;
  name: string;
  description: string;
  fullDescription?: string;
  gallery?: string[];
  mustVisit?: MustVisitPlace[];
  travelInfo?: TravelInfo;
};

type DestinationsTranslations = {
  badge: string;
  title: string;
  titleAccent: string;
  description: string;
  exploreMore: string;
  categories: {
    mountains: string;
    beach: string;
    island: string;
    adventure: string;
    wildlife: string;
    valley: string;
  };
  items: DestinationItem[];
};

type TranslationSet = {
  nav: NavTranslations;
  hero: HeroTranslations;
  destinations: DestinationsTranslations;
};

const translations: Record<Language, TranslationSet> = {
  en: {
    nav: {
      home: "Home",
      destinations: "Destinations",
      events: "Events",
      gallery: "Gallery",
      about: "About Us",
      joinNow: "Join Now",
    },
    hero: {
      title: "Travel Aid",
      subtitle: "Sylhet's Most Trusted Gateway to Hidden Wonders",
      description: "From lush tea gardens to cascading waterfalls, explore the true essence of Sylhet with the region's most trusted tour experts.",
      bookEscape: "Book Escape",
      viewGallery: "View Gallery",
      scrollDown: "Scroll Down",
    },
    destinations: {
      badge: "Curated Experiences",
      title: "Explore",
      titleAccent: "Destinations",
      description: "From the clouds of Sajek to the deep mangroves of Sundarban, discover the breathtaking beauty of Bangladesh.",
      exploreMore: "Explore More",
      categories: {
        mountains: "Mountains",
        beach: "Beach",
        island: "Island",
        adventure: "Adventure",
        wildlife: "Wildlife",
        valley: "Valley",
      },
      items: [
        {
          id: 1,
          name: "Sajek Valley",
          description: "The 'Queen of Clouds', where you can touch the sky and experience breathtaking mountain sunrises.",
          fullDescription: "Sajek Valley is an emerging tourist spot in Bangladesh situated among the hills of the Kasalong range of mountains. Known as the 'Queen of Clouds', it offers a surreal experience defined by floating clouds and lush green horizons.",
          gallery: ["/images/destinations/sajek.jpg", "/images/destinations/mirinja.jpeg"],
          mustVisit: [
            { icon: "Check", name: "Konglak Para" },
            { icon: "Check", name: "Sajek Helipad" },
            { icon: "Check", name: "Lusai Village" },
            { icon: "Check", name: "Alutile Cave" },
            { icon: "Check", name: "Risang Waterfall" },
          ],
        },
        {
          id: 2,
          name: "Cox's Bazar",
          description: "Experience the world's longest natural sea beach with its golden sands and turquoise waters.",
          fullDescription: "Cox's Bazar is the tourist capital of Bangladesh. It is home to the world's longest natural sea beach, stretching over 120km. From surfing to sunset views, it's a coastal paradise.",
          gallery: ["/images/destinations/coxs.jpg", "/images/destinations/stmarting.jpg"],
          mustVisit: [
            { icon: "Check", name: "Inani Beach" },
            { icon: "Check", name: "Himchari National Park" },
            { icon: "Check", name: "Marine Drive" },
            { icon: "Check", name: "Laboni Beach" },
            { icon: "Check", name: "Ramu Monastery" },
          ],
        },
        {
          id: 3,
          name: "Saint Martin",
          description: "Bangladesh's only coral island, a slice of paradise with crystal clear blue water and palm trees.",
          fullDescription: "Saint Martin's Island is a small island in the northeastern part of the Bay of Bengal. It's the only coral island in Bangladesh, offering pristine blue water and white sandy beaches.",
          gallery: ["/images/destinations/stmarting.jpg", "/images/destinations/coxs.jpg"],
          mustVisit: [
            { icon: "Check", name: "Chera Dwip" },
            { icon: "Check", name: "West Beach" },
            { icon: "Check", name: "Cyclone Shelter" },
            { icon: "Check", name: "Samudra Bilas" },
          ],
        },
        {
          id: 4,
          name: "Bandarban",
          description: "Venture into the heart of the hills, discover hidden waterfalls and the culture of the mountain tribes.",
          fullDescription: "Bandarban Hill District is one of the most exotic travel destinations in Bangladesh. This place is famous for its natural beauty, including mountains, waterfalls, and the unique culture of various ethnic groups. It's home to the highest peaks and the clearest waterfalls in the country. A traveler's paradise for adventure and serenity alike.",
          gallery: [
            "/images/destinations/bandarban.jpg",
            "/images/destinations/sajek.jpg",
            "/images/destinations/mirinja.jpeg",
            "/images/destinations/humhum.jpg",
          ],
          mustVisit: [
            { icon: "Check", name: "Nilgiri Hills" },
            { icon: "Check", name: "Nilachal" },
            { icon: "Check", name: "Nafakhum Waterfall" },
            { icon: "Check", name: "Boga Lake" },
            { icon: "Check", name: "Golden Temple" },
          ],
          travelInfo: {
            bestTime: "October to March",
            location: "Chittagong Division",
            duration: "3-4 Days",
            difficulty: "Moderate",
          },
        },
        {
          id: 5,
          name: "Sundarban",
          description: "The world's largest mangrove forest, home to the majestic Royal Bengal Tiger and exotic wildlife.",
          fullDescription: "The Sundarbans is a UNESCO World Heritage site and the largest mangrove forest in the world. It provides a unique ecosystem of canals, wildlife, and mystery.",
          gallery: ["/images/destinations/sundarban.jpg.webp", "/images/destinations/mirinja.jpeg"],
          mustVisit: [
            { icon: "Check", name: "Hiron Point" },
            { icon: "Check", name: "Katka Beach" },
            { icon: "Check", name: "Karamjal" },
            { icon: "Check", name: "Dublar Char" },
          ],
        },
        {
          id: 6,
          name: "Mirinja Valley",
          description: "A hidden gem in Alikadam, offering stunning views of low-hanging clouds and lush green valleys.",
          fullDescription: "Mirinja Valley in Alikadam is a trekker's dream. It offers breathtaking panoramic views of the Matamuhuri river and the cloud-capped mountains of the Hill Tracts.",
          gallery: ["/images/destinations/mirinja.jpeg", "/images/destinations/sajek.jpg"],
          mustVisit: [
            { icon: "Check", name: "Alikadam" },
            { icon: "Check", name: "Marayan Rong" },
            { icon: "Check", name: "Damtua Waterfall" },
          ],
        },
      ],
    },
  },
  bn: {
    nav: {
      home: "Home",
      destinations: "Destinations",
      events: "Events",
      gallery: "Gallery",
      about: "About Us",
      joinNow: "Join Now",
    },
    hero: {
      title: "Travel Aid",
      subtitle: "লুকানো বিস্ময়ের সন্ধানে সিলেটের সবচেয়ে নির্ভরযোগ্য প্রবেশদ্বার",
      description: "সবুজ চা বাগান থেকে শুরু করে ঝর্ণার কলতান পর্যন্ত, এই অঞ্চলের সবচেয়ে বিশ্বস্ত ট্যুর বিশেষজ্ঞদের সাথে সিলেটের আসল রূপটি অন্বেষণ করুন।",
      bookEscape: "বুকিং দিন",
      viewGallery: "গ্যালারি দেখুন",
      scrollDown: "নিচে স্ক্রল করুন",
    },
    destinations: {
      badge: "মনোরম অভিজ্ঞতা",
      title: "Explore",
      titleAccent: "Destinations",
      description: "সাজেক ভ্যালির মেঘ থেকে শুরু করে সুন্দরবনের গভীর ম্যানগ্রোভ পর্যন্ত, বাংলাদেশের শ্বাসরুদ্ধকর সৌন্দর্য আবিষ্কার করুন।",
      exploreMore: "Explore More",
      categories: {
        mountains: "পাহাড়",
        beach: "সৈকত",
        island: "দ্বীপ",
        adventure: "অ্যাডভেঞ্চার",
        wildlife: "বন্যপ্রাণী",
        valley: "উপত্যকা",
      },
      items: [
        {
          id: 1,
          name: "সাজেক ভ্যালি",
          description: "মেঘের রানী সাজেক, যেখানে আপনি মেঘ ছুঁতে পারবেন এবং পাহাড়ের অপূর্ব সূর্যোদয় উপভোগ করতে পারবেন।",
          fullDescription: "সাজেক ভ্যালী বাংলাদেশের একটি উদীয়মান পর্যটন কেন্দ্র যা কাসালং পর্বতশ্রেণীর পাহাড়ের মধ্যে অবস্থিত। এটি 'মেঘের রাণী' নামে পরিচিত, যেখানে মেঘের লুকোচুরি আর সবুজ পাহাড়ের মিতালি চোখে পড়ে।",
          mustVisit: [
            { icon: "Check", name: "কংলাক পাড়া" },
            { icon: "Check", name: "হেলিপ্যাড" },
            { icon: "Check", name: "লুসাই ভিলেজ" },
            { icon: "Check", name: "আলুটিলা গুহা" },
            { icon: "Check", name: "রিসাং ঝর্ণা" },
          ],
        },
        {
          id: 2,
          name: "কক্সবাজার",
          description: "সোনালী বালু আর নীল জলরাশি নিয়ে বিশ্বের দীর্ঘতম প্রাকৃতিক সমুদ্র সৈকত ভ্রমণ করুন।",
          fullDescription: "কক্সবাজার বাংলাদেশের পর্যটন রাজধানী। এখানে রয়েছে ১২০ কিলোমিটার লম্বা বিশ্বের দীর্ঘতম প্রাকৃতিক সমুদ্র সৈকত। সার্ফিং থেকে শুরু করে সূর্যাস্ত দেখা—সব মিলিয়ে এটি এক উপকূলীয় স্বর্গ।",
          mustVisit: [
            { icon: "Check", name: "ইনানী সৈকত" },
            { icon: "Check", name: "হিমছড়ি জাতীয় উদ্যান" },
            { icon: "Check", name: "মেরিন ড্রাইভ" },
            { icon: "Check", name: "লাবনী সৈকত" },
            { icon: "Check", name: "রামু বৌদ্ধ বিহার" },
          ],
        },
        {
          id: 3,
          name: "সেন্ট মার্টিন",
          description: "বাংলাদেশের একমাত্র প্রবাল দ্বীপ, যেখানে নীল জল এবং নারকেল গাছের সারি আপনাকে এক স্বর্গের আমেজ দেবে।",
          fullDescription: "সেন্ট মার্টিন দ্বীপ বঙ্গোপসাগরের উত্তর-পূর্ব অংশে অবস্থিত একটি ছোট দ্বীপ। এটি বাংলাদেশের একমাত্র প্রবাল দ্বীপ, যা নীল জলরাশি এবং স্বচ্ছ বালির সৈকত উপহার দেয়।",
          mustVisit: [
            { icon: "Check", name: "ছেঁড়া দ্বীপ" },
            { icon: "Check", name: "পশ্চিম সৈকত" },
            { icon: "Check", name: "সাইক্লোন শেল্টার" },
            { icon: "Check", name: "সমুদ্র বিলাস" },
          ],
        },
        {
          id: 4,
          name: "বান্দরবান",
          description: "পাহাড়ের গভীরে যাত্রা করুন, লুকানো ঝর্ণা এবং পাহাড়ী আদিবাসীদের সংস্কৃতি আবিষ্কার করুন।",
          fullDescription: "বান্দরবান পার্বত্য জেলা বাংলাদেশের অন্যতম আকর্ষণীয় পর্যটন কেন্দ্র। এটি পাহাড়, ঝর্ণা এবং বিভিন্ন ক্ষুদ্র নৃগোষ্ঠীর বৈচিত্র্যময় সংস্কৃতির জন্য সুপরিচিত। দেশের সর্বোচ্চ পাহাড় এবং স্বচ্ছ পানির ঝর্ণা এখানে অবস্থিত। এটি রোমাঞ্চ এবং প্রশান্তি খোঁজা ভ্রমণকারীদের জন্য একটি স্বর্গরাজ্য।",
          gallery: [
            "/images/destinations/bandarban.jpg",
            "/images/destinations/sajek.jpg",
            "/images/destinations/mirinja.jpeg",
            "/images/destinations/humhum.jpg",
          ],
          mustVisit: [
            { icon: "Check", name: "নীলগিরি হিলস" },
            { icon: "Check", name: "নীলাচল" },
            { icon: "Check", name: "নাফাকুম জলপ্রপাত" },
            { icon: "Check", name: "বগা লেক" },
            { icon: "Check", name: "স্বর্ণ মন্দির" },
          ],
          travelInfo: {
            bestTime: "অক্টোবর থেকে মার্চ",
            location: "চট্টগ্রাম বিভাগ",
            duration: "৩-৪ দিন",
            difficulty: "মাঝারি",
          },
        },
        {
          id: 5,
          name: "সুন্দরবন",
          description: "বিশ্বের বৃহত্তম ম্যানগ্রোভ বন, যা রাজকীয় রয়েল বেঙ্গল টাইগার এবং বৈচিত্র্যময় বন্যপ্রাণীর আবাসস্থল।",
          fullDescription: "সুন্দরবন একটি ইউনেস্কো ওয়ার্ল্ড হেরিটেজ সাইট এবং বিশ্বের বৃহত্তম ম্যানগ্রোভ বন। এটি খালের গোলকধাঁধা, বন্যপ্রাণী এবং রহস্যের এক অনন্য বাস্তুতন্ত্র প্রদান করে।",
          mustVisit: [
            { icon: "Check", name: "হিরণ পয়েন্ট" },
            { icon: "Check", name: "কাটকা সৈকত" },
            { icon: "Check", name: "করমজল" },
            { icon: "Check", name: "দুবলার চর" },
          ],
        },
        {
          id: 6,
          name: "মিরিন্জা ভ্যালি",
          description: "আলীকদমের এক লুকানো রত্ন, যেখান থেকে মেঘের নিচে ঝুলে থাকা সবুজ উপত্যকার চমৎকার দৃশ্য উপভোগ করা যায়।",
          fullDescription: "আলীকদমের মিরিন্জা ভ্যালি ট্রেকারদের জন্য এক আদর্শ স্বপ্ন। এখান থেকে মাতামুহুরী নদীর দৃশ্য এবং পার্বত্য চট্টগ্রামের মেঘাচ্ছন্ন পাহাড়ের অসাধারণ ভিউ পাওয়া যায়।",
          mustVisit: [
            { icon: "Check", name: "আলীকদম" },
            { icon: "Check", name: "মারায়ন তং" },
            { icon: "Check", name: "দামতুয়া জলপ্রপাত" },
          ],
        },
      ],
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSet;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<{
    language: Language;
    hasMounted: boolean;
  }>({
    language: "en",
    hasMounted: false,
  });

  const { language, hasMounted } = state;

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    const isValid = savedLang === "en" || savedLang === "bn";
    
    // Defer the update to the next microtask to avoid "synchronous" execution
    // inside the effect body, which satisfies strict cascading render rules.
    queueMicrotask(() => {
      React.startTransition(() => {
        setState({
          language: isValid ? savedLang : "en",
          hasMounted: true,
        });
      });
    });
  }, []);

  const setLanguage = (lang: Language) => {
    setState(prev => ({ ...prev, language: lang }));
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
  };

  const t = translations[language];

  // Prevent hydration mismatch by only rendering the selected language after mounting
  // During SSR and first paint, we use the default (English)
  const currentT = hasMounted ? t : translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: currentT }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
