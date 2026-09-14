"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("tr");

  // Load persisted language from localStorage on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("hasturk_lang") as Language;
      if (savedLang === "tr" || savedLang === "en" || savedLang === "de" || savedLang === "ar") {
        setLanguageState(savedLang);
      }
    }
  }, []);

  // Sync document language & text direction (RTL for Arabic)
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("hasturk_lang", lang);
    }
  };

  const toggleLanguage = () => {
    const order: Language[] = ["tr", "en", "de", "ar"];
    const currentIndex = order.indexOf(language);
    const nextLang = order[(currentIndex + 1) % order.length];
    setLanguage(nextLang);
  };

  const t = (key: string, fallback?: string): string => {
    if (translations[key]) {
      if (translations[key][language]) {
        return translations[key][language];
      }
      if (translations[key]["en"]) {
        return translations[key]["en"];
      }
      if (translations[key]["tr"]) {
        return translations[key]["tr"];
      }
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
