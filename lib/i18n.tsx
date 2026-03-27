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

type DestinationItem = {
  id: number;
  name: string;
  description: string;
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
        },
        {
          id: 2,
          name: "Cox's Bazar",
          description: "Experience the world's longest natural sea beach with its golden sands and turquoise waters.",
        },
        {
          id: 3,
          name: "Saint Martin",
          description: "Bangladesh's only coral island, a slice of paradise with crystal clear blue water and palm trees.",
        },
        {
          id: 4,
          name: "Bandarban",
          description: "Venture into the heart of the hills, discover hidden waterfalls and the culture of the mountain tribes.",
        },
        {
          id: 5,
          name: "Sundarban",
          description: "The world's largest mangrove forest, home to the majestic Royal Bengal Tiger and exotic wildlife.",
        },
        {
          id: 6,
          name: "Mirinja Valley",
          description: "A hidden gem in Alikadam, offering stunning views of low-hanging clouds and lush green valleys.",
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
        },
        {
          id: 2,
          name: "কক্সবাজার",
          description: "সোনালী বালু আর নীল জলরাশি নিয়ে বিশ্বের দীর্ঘতম প্রাকৃতিক সমুদ্র সৈকত ভ্রমণ করুন।",
        },
        {
          id: 3,
          name: "সেন্ট মার্টিন",
          description: "বাংলাদেশের একমাত্র প্রবাল দ্বীপ, যেখানে নীল জল এবং নারকেল গাছের সারি আপনাকে এক স্বর্গের আমেজ দেবে।",
        },
        {
          id: 4,
          name: "বান্দরবান",
          description: "পাহাড়ের গভীরে যাত্রা করুন, লুকানো ঝর্ণা এবং পাহাড়ী আদিবাসীদের সংস্কৃতি আবিষ্কার করুন।",
        },
        {
          id: 5,
          name: "সুন্দরবন",
          description: "বিশ্বের বৃহত্তম ম্যানগ্রোভ বন, যা রাজকীয় রয়েল বেঙ্গল টাইগার এবং বৈচিত্র্যময় বন্যপ্রাণীর আবাসস্থল।",
        },
        {
          id: 6,
          name: "মিরিন্জা ভ্যালি",
          description: "আলীকদমের এক লুকানো রত্ন, যেখান থেকে মেঘের নিচে ঝুলে থাকা সবুজ উপত্যকার চমৎকার দৃশ্য উপভোগ করা যায়।",
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
