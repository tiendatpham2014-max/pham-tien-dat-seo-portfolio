"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Language } from "@/content/portfolio";
import { initPortfolio } from "@/components/portfolio/init";
import { setLanguage } from "@/components/portfolio/language";
import { setTheme } from "@/components/portfolio/theme";

type Theme = "dark" | "light";
type Preferences = {
  language: Language;
  theme: Theme;
  changeLanguage: (language: Language) => void;
  changeTheme: (theme: Theme) => void;
};

const PreferencesContext = createContext<Preferences | null>(null);

export function SitePreferences({ children }: { children: ReactNode }) {
  const [language, setCurrentLanguage] = useState<Language>("vi");
  const [theme, setCurrentTheme] = useState<Theme>("dark");

  useEffect(() => {
    const cleanup = initPortfolio();
    let storedLanguage: string | null = null;
    let storedTheme: string | null = null;
    try {
      storedLanguage = localStorage.getItem("dat-seo-language");
      storedTheme = localStorage.getItem("dat-seo-theme");
    } catch { /* The page remains usable when storage is unavailable. */ }
    const requested = new URLSearchParams(location.search).get("lang");
    const initialLanguage: Language = requested === "vi" || requested === "en" ? requested : storedLanguage === "en" ? "en" : "vi";
    const initialTheme: Theme = storedTheme === "light" || document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setLanguage(initialLanguage);
    setTheme(initialTheme, false);
    setCurrentLanguage(initialLanguage);
    setCurrentTheme(initialTheme);

    const titleObserver = new MutationObserver(() => {
      const expected = document.documentElement.lang === "en"
        ? "Dat Pham (Pham Tien Dat) — SEO Executive | Portfolio"
        : "Phạm Tiến Đạt (Dat Pham) — SEO Executive | Portfolio";
      if (document.title !== expected) document.title = expected;
    });
    titleObserver.observe(document.head, { childList: true, characterData: true, subtree: true });

    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onSystemTheme = () => {
      try { if (localStorage.getItem("dat-seo-theme")) return; } catch { /* Use the system choice. */ }
      const next = media.matches ? "light" : "dark";
      setTheme(next, false);
      setCurrentTheme(next);
    };
    media.addEventListener("change", onSystemTheme);
    return () => { titleObserver.disconnect(); media.removeEventListener("change", onSystemTheme); cleanup(); };
  }, []);

  const changeLanguage = (next: Language) => {
    setLanguage(next);
    setCurrentLanguage(next);
  };
  const changeTheme = (next: Theme) => {
    setTheme(next);
    setCurrentTheme(next);
  };

  return <PreferencesContext.Provider value={{ language, theme, changeLanguage, changeTheme }}>{children}</PreferencesContext.Provider>;
}

export function useSitePreferences() {
  const preferences = useContext(PreferencesContext);
  if (!preferences) throw new Error("SitePreferences provider is missing");
  return preferences;
}
