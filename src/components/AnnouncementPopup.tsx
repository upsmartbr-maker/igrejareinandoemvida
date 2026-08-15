"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";
import { useData } from "./DataContext";
import { getTranslated } from "@/db/mockData";
import { X, Calendar, Bell } from "lucide-react";

export default function AnnouncementPopup() {
  const { language, t } = useLanguage();
  const { settings } = useData();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if popup is enabled in admin settings
    if (settings.popup_enabled) {
      const hasSeen = sessionStorage.getItem("reinando_announcement_seen");
      if (!hasSeen) {
        // Show after a brief delay for a premium user feel
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [settings.popup_enabled]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("reinando_announcement_seen", "true");
  };

  if (!isOpen) return null;

  const title = getTranslated(settings, "popup_title", language);
  const text = getTranslated(settings, "popup_text", language);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-primary-main/10 animate-fade-in">
        
        {/* Banner header decoration */}
        <div className="bg-gradient-to-br from-primary-main to-secondary-main p-6 text-white flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-3 shadow-inner">
            <Bell className="w-6 h-6 text-accent-gold" />
          </div>
          <span className="text-[10px] text-accent-gold font-bold tracking-widest uppercase mb-1">
            {t("popupTitleDefault")}
          </span>
          <h3 className="font-display font-extrabold text-lg leading-tight">
            {title || t("popupTitleDefault")}
          </h3>
        </div>

        {/* Content body */}
        <div className="p-6 flex flex-col items-center text-center">
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {text}
          </p>

          <div className="flex gap-3 w-full">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              {t("popupClose")}
            </button>
            {settings.popup_link && (
              <Link
                href={settings.popup_link}
                onClick={handleClose}
                className="flex-1 px-4 py-2.5 rounded-xl bg-accent-gold hover:bg-accent-gold-dark text-primary-main text-sm font-bold shadow-md shadow-accent-gold/20 flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02]"
              >
                <Calendar className="w-4 h-4" />
                <span>{t("btnCalendar")}</span>
              </Link>
            )}
          </div>
        </div>

        {/* Floating close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-black/10 text-white/90 hover:bg-black/25 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
