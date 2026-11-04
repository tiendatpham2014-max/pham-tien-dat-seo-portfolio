"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { copy, type Language } from "@/content/portfolio";
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

export function SitePreferences({ children, initialLanguage }: { children: ReactNode; initialLanguage: Language }) {
  const [language, setCurrentLanguage] = useState<Language>(initialLanguage);
  const [theme, setCurrentTheme] = useState<Theme>("dark");

  useEffect(() => {
    const cleanup = initPortfolio();
    let storedTheme: string | null = null;
    try {
      storedTheme = localStorage.getItem("dat-seo-theme");
    } catch { /* The page remains usable when storage is unavailable. */ }
    const query = new URLSearchParams(location.search);
    const legacyLanguage = query.get("lang");
    const selectedLanguage: Language = legacyLanguage === "vi" || legacyLanguage === "en" ? legacyLanguage : initialLanguage;
    if (legacyLanguage === "vi" || legacyLanguage === "en") {
      query.delete("lang");
      const remainingQuery = query.toString();
      history.replaceState(null, "", `${selectedLanguage === "vi" ? "/" : "/en/"}${remainingQuery ? `?${remainingQuery}` : ""}${location.hash}`);
    }
    const initialTheme: Theme = storedTheme === "light" || document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setLanguage(selectedLanguage);
    setTheme(initialTheme, false);
    setCurrentLanguage(selectedLanguage);
    setCurrentTheme(initialTheme);

    const onHistory = () => {
      const next = location.pathname.startsWith("/en/") || location.pathname === "/en" ? "en" : "vi";
      setLanguage(next);
      setCurrentLanguage(next);
    };
    window.addEventListener("popstate", onHistory);

    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onSystemTheme = () => {
      try { if (localStorage.getItem("dat-seo-theme")) return; } catch { /* Use the system choice. */ }
      const next = media.matches ? "light" : "dark";
      setTheme(next, false);
      setCurrentTheme(next);
    };
    media.addEventListener("change", onSystemTheme);
    return () => { window.removeEventListener("popstate", onHistory); media.removeEventListener("change", onSystemTheme); cleanup(); };
  }, []);

  const changeLanguage = (next: Language) => {
    if (next !== language) {
      history.pushState(null, "", `${next === "vi" ? "/" : "/en/"}${location.hash}`);
    }
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

export function useCopy() {
  return copy[useSitePreferences().language];
}
