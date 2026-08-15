"use client";

import React from "react";
import { useLanguage } from "@/components/LanguageContext";
import { useData } from "@/components/DataContext";
import { getTranslated } from "@/db/mockData";
import { BookOpen, Star, Compass, Award } from "lucide-react";

export default function AboutPage() {
  const { language, t } = useLanguage();
  const { settings } = useData();

  return (
    <div className="space-y-12 max-w-4xl mx-auto text-left">
      
      {/* Page Header */}
      <section className="text-center space-y-4">
        <span className="px-3 py-1 rounded-full bg-primary-main/10 text-primary-main text-xs font-bold uppercase tracking-widest">
          {t("navAbout")}
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-primary-main tracking-tight">
          {t("aboutTitle")}
        </h1>
        <p className="text-gray-600 text-sm max-w-2xl mx-auto leading-relaxed">
          Nossa fé é fundamentada nas Escrituras Sagradas, com foco especial na revelação progressiva confiada ao apóstolo Paulo para a Igreja, corpo de Cristo.
        </p>
      </section>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Mission and Vision Card */}
        <div className="bg-white p-6 rounded-2xl border border-primary-main/5 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-accent-gold/10 text-primary-main flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-base text-primary-main">
            {t("aboutMissionTitle")}
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t("aboutMissionText")}
          </p>
        </div>

        {/* Our Faith Card */}
        <div className="bg-white p-6 rounded-2xl border border-primary-main/5 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-accent-gold/10 text-primary-main flex items-center justify-center">
            <Star className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-base text-primary-main">
            {t("aboutFaithTitle")}
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t("aboutFaithText")}
          </p>
        </div>

        {/* Our Community Card */}
        <div className="bg-white p-6 rounded-2xl border border-primary-main/5 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-accent-gold/10 text-primary-main flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-base text-primary-main">
            {t("aboutCommTitle")}
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t("aboutCommText")}
          </p>
        </div>

      </div>

      {/* Pastor Message Section */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-primary-main/5 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-accent-gold bg-gray-50 shadow-md">
            <img
              src={settings.pastor_image_url || "/images/pastor_samuel.png"}
              alt={settings.pastor_name || "Pr. Samuel Rodrigues"}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold text-accent-gold-dark uppercase tracking-wider block">
              {t("aboutPastorMsg")}
            </span>
            <h2 className="font-display font-extrabold text-xl text-primary-main">
              {settings.pastor_name || "Pr. Samuel Rodrigues"}
            </h2>
            <p className="text-gray-500 text-xs font-medium">
              {getTranslated(settings, "pastor_role", language) || "Pastor Presidente da Igreja Reinando em Vida"}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 space-y-3 text-gray-600 text-sm leading-relaxed italic">
          {(getTranslated(settings, "pastor_about", language) || t("aboutPastorText"))
            .split("\n")
            .filter((p) => p.trim() !== "")
            .map((para, index, arr) => (
              <p key={index}>
                {index === 0 ? "“" : ""}{para}{index === arr.length - 1 ? "”" : ""}
              </p>
            ))
          }
        </div>
      </section>

      {/* Theological Abstraction / Pauline Focus */}
      <section className="bg-gradient-to-br from-primary-main to-secondary-main text-white p-6 md:p-8 rounded-3xl space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-accent-gold" />
          <h3 className="font-display font-extrabold text-lg text-white">
            Fundamento Teológico
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
          Nossa igreja proclama o Evangelho da Graça conforme revelado ao apóstolo Paulo (Romanos a Hebreus). Cremos que na Nova Aliança não estamos sob a lei, mas sob a graça. O sacrifício de Cristo Jesus na cruz é único, eterno e absolutamente suficiente. Através de Sua ressurreição, fomos justificados e capacitados para reinar em vida sobre as enfermidades, a escassez e o medo.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs">
            <strong className="text-accent-gold block mb-1">Segurança Eterna</strong>
            Somos selados com o Espírito Santo da promessa, nossa herança está garantida em Cristo Jesus.
          </div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs">
            <strong className="text-accent-gold block mb-1">Identidade de Justiça</strong>
            Não somos definidos por nossas obras, mas pela justiça de Deus imputada gratuitamente a nós pela fé.
          </div>
        </div>
      </section>

    </div>
  );
}
