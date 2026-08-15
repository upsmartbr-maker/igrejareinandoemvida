"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, Language } from "./LanguageContext";
import { useData } from "./DataContext";
import { Menu, X, Globe, LogIn } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { settings } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [contentDropdownOpen, setContentDropdownOpen] = useState(false);

  const menuItems = [
    { name: t("navHome"), path: "/" },
    { name: t("navAbout"), path: "/quem-somos" },
    { name: t("navMessages"), path: "/mensagens" },
    { name: t("navMinistries"), path: "/ministerios" },
    { name: t("navContent"), path: "/conteudos" },
    { name: t("navEvents"), path: "/eventos" },
    { name: t("navGive"), path: "/colabore" },
    { name: t("navContact"), path: "/contato" },
  ];

  const handleLangSelect = (lang: Language) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  const getLanguageLabel = (lang: Language) => {
    switch (lang) {
      case "pt": return "PT 🇧🇷";
      case "en": return "EN 🇺🇸";
      case "es": return "ES 🇪🇸";
    }
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="bg-[#06120B]/90 backdrop-blur-md border-b border-emerald-900/30 w-full sticky top-0 z-50 shadow-sm">
      <div className="w-full px-6 lg:px-12 py-3">
        <div className="flex justify-between items-center gap-4">
          
          {/* Logo Container */}
          <div className="flex-shrink-0 mr-8">
            <Link href="/" className="flex items-center gap-2">
              <img 
                src="/images/logo.png" 
                alt="Logo Reinando em Vida" 
                className="w-[50px] h-[50px] object-contain"
              />
              <div className="flex flex-col">
                <span className="text-white font-display font-extrabold text-base tracking-wider leading-none">
                  REINANDO EM VIDA
                </span>
                <span className="text-[10px] text-accent-gold font-medium uppercase tracking-widest leading-none mt-1">
                  Igreja em Graça
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 lg:gap-6">
            {menuItems.map((item) => {
              if (item.path === "/conteudos") {
                return (
                  <div 
                    key={item.path}
                    className="relative"
                    onMouseEnter={() => setContentDropdownOpen(true)}
                    onMouseLeave={() => setContentDropdownOpen(false)}
                  >
                    <Link
                      href={item.path}
                      className={`px-3 py-2 text-xs font-semibold text-center transition-all duration-200 border-b-2 block ${
                        isActive(item.path) || isActive("/aniversariantes")
                          ? "border-yellow-400 text-yellow-400 font-bold"
                          : "border-transparent text-emerald-100 hover:text-yellow-400"
                      }`}
                    >
                      {item.name}
                    </Link>
                    {contentDropdownOpen && (
                      <div className="absolute left-0 mt-0 w-44 bg-[#0F2918] rounded-xl shadow-lg border border-emerald-900/30 py-1.5 z-50 animate-fade-in">
                        <Link
                          href="/conteudos"
                          className="block px-4 py-2 text-xs text-emerald-100 hover:bg-emerald-950/40 hover:text-white transition-all font-semibold"
                        >
                          Boletins & Devocionais
                        </Link>
                        <Link
                          href="/aniversariantes"
                          className="block px-4 py-2 text-xs text-emerald-100 hover:bg-emerald-950/40 hover:text-white transition-all font-semibold"
                        >
                          Aniversariantes do Mês
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 text-xs font-semibold text-center transition-all duration-200 border-b-2 block ${
                    isActive(item.path)
                      ? "border-yellow-400 text-yellow-400 font-bold"
                      : "border-transparent text-emerald-100 hover:text-yellow-400"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            {/* External Institute Link */}
            <a
              href={settings.instituto_url || "https://instituto.reinandoemvida.com.br"}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-yellow-400/80 text-yellow-400 hover:bg-yellow-400 hover:text-black rounded-lg px-3 py-1 text-xs sm:text-sm font-medium transition-all text-center block"
            >
              {t("navInstitute")}
            </a>
          </nav>

          {/* Right Side Options (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium border border-emerald-900/30 text-emerald-100 hover:bg-emerald-950/20 hover:text-white transition-all cursor-pointer"
              >
                <Globe className="w-4 h-4 text-emerald-100" />
                <span>{getLanguageLabel(language)}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-[#0F2918] rounded-xl shadow-lg border border-emerald-900/30 py-1.5 overflow-hidden animate-fade-in z-50">
                  {(["pt", "en", "es"] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLangSelect(lang)}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-emerald-950/40 hover:text-white transition-all flex justify-between items-center cursor-pointer ${
                        language === lang ? "text-yellow-400 font-bold bg-emerald-950/30" : "text-emerald-100"
                      }`}
                    >
                      {getLanguageLabel(lang)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Login Link */}
            <Link
              href="/admin"
              className="p-2 rounded-lg border border-emerald-900/30 text-emerald-100/70 hover:text-white hover:bg-emerald-950/20 transition-all"
              title={t("navAdmin")}
            >
              <LogIn className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Language selector icon for mobile */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="p-2 rounded-lg border border-emerald-900/30 text-emerald-100"
              >
                <Globe className="w-5 h-5" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-[#0F2918] rounded-xl shadow-lg border border-emerald-900/30 py-1.5 z-50">
                  {(["pt", "en", "es"] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLangSelect(lang)}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-emerald-950/40 hover:text-white transition-all ${
                        language === lang ? "text-yellow-400 font-bold bg-emerald-950/30" : "text-emerald-100"
                      }`}
                    >
                      {getLanguageLabel(lang)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-emerald-900/30 text-emerald-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-900/30 bg-[#06120B]/95 backdrop-blur-md animate-fade-in absolute w-full left-0 z-40 shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {menuItems.map((item) => {
              const isContent = item.path === "/conteudos";
              return (
                <React.Fragment key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      isActive(item.path)
                        ? "bg-emerald-900/60 text-yellow-400 font-bold border-l-4 border-yellow-400 pl-3"
                        : "text-emerald-100 hover:bg-emerald-950/40"
                    }`}
                  >
                    {item.name}
                  </Link>
                  {isContent && (
                    <Link
                      href="/aniversariantes"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-8 py-2 rounded-xl text-sm font-semibold transition-all ${
                        isActive("/aniversariantes")
                          ? "text-yellow-400 font-bold"
                          : "text-emerald-200/80 hover:text-white hover:bg-emerald-950/20"
                      }`}
                    >
                      ↳ Aniversariantes do Mês
                    </Link>
                  )}
                </React.Fragment>
              );
            })}

            {/* External Institute Link */}
            <a
              href={settings.instituto_url || "https://instituto.reinandoemvida.com.br"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-bold text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all border border-yellow-400/30 text-center"
            >
              {t("navInstitute")}
            </a>

            {/* Mobile Admin Link */}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-base font-medium text-emerald-100 hover:bg-emerald-950/40 border border-emerald-900/30"
            >
              <LogIn className="w-4 h-4 text-emerald-100" />
              <span>{t("navAdmin")}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
