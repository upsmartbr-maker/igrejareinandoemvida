"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { useData } from "@/components/DataContext";
import { getTranslated } from "@/db/mockData";
import { Calendar, MapPin, Clock, Image, AlertCircle, Camera, CheckSquare } from "lucide-react";

type EventTab = "upcoming" | "services" | "past";

export default function EventsPage() {
  const { language, t } = useLanguage();
  const { events } = useData();
  const [activeTab, setActiveTab] = useState<EventTab>("upcoming");

  // Filter events
  const upcomingEvents = events.filter((e) => !e.is_service && !e.is_past);
  const weeklyServices = events.filter((e) => e.is_service && !e.is_past);
  const pastEvents = events.filter((e) => e.is_past === true);

  // Hardcoded photo gallery for rich aesthetic demonstration
  const photoGallery = [
    { id: "p1", title: "Conferência Reinar 2025", url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&auto=format&fit=crop&q=60" },
    { id: "p2", title: "Batismo Geral de Verão", url: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=500&auto=format&fit=crop&q=60" },
    { id: "p3", title: "Acampamento de Jovens", url: "https://images.unsplash.com/photo-1529070538774-1883cb3c85fc?w=500&auto=format&fit=crop&q=60" },
    { id: "p4", title: "Pequenos Reis (Dia das Crianças)", url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=500&auto=format&fit=crop&q=60" },
    { id: "p5", title: "Louvor e Adoração no Templo", url: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500&auto=format&fit=crop&q=60" },
    { id: "p6", title: "Ação de Graças (Alimentando Vidas)", url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&auto=format&fit=crop&q=60" },
  ];

  return (
    <div className="space-y-8 text-left">
      
      {/* Header */}
      <div className="space-y-3">
        <span className="px-3 py-1 rounded-full bg-primary-main/10 text-primary-main text-xs font-bold uppercase tracking-widest">
          {t("navEvents")}
        </span>
        <h1 className="font-display font-extrabold text-3xl text-primary-main tracking-tight">
          {t("evtTitle")}
        </h1>
        <p className="text-gray-600 text-sm max-w-xl">
          Participe das nossas atividades. Fique atento às datas dos nossos cultos presenciais, eventos juvenis e confira a nossa galeria de fotos.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {([
          { id: "upcoming", label: t("evtUpcoming") },
          { id: "services", label: t("evtWeekly") },
          { id: "past", label: t("evtPast") },
        ] as { id: EventTab; label: string }[]).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all -mb-px ${
              activeTab === tab.id
                ? "border-accent-gold text-primary-main"
                : "border-transparent text-gray-500 hover:text-primary-main hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Render tabs content */}
      {activeTab === "upcoming" && (
        <div className="space-y-6">
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((evt) => {
                const dateObj = new Date(evt.date);
                return (
                  <div
                    key={evt.id}
                    className="bg-white border border-primary-main/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row"
                  >
                    {evt.image_url && (
                      <div className="relative w-full sm:w-44 aspect-video sm:aspect-square bg-gray-50 shrink-0 border-r border-gray-100 overflow-hidden">
                        <img src={evt.image_url} alt="" className="object-cover w-[400px] h-[400px] aspect-square" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col justify-between text-left space-y-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-400 font-semibold">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {dateObj.toLocaleDateString(language === "pt" ? "pt-BR" : "en-US")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {dateObj.toLocaleTimeString(language === "pt" ? "pt-BR" : "en-US", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                        <h3 className="font-display font-extrabold text-base text-primary-main leading-tight">
                          {getTranslated(evt, "title", language)}
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {getTranslated(evt, "description", language)}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 text-[10px] text-primary-main font-bold">
                        <MapPin className="w-3.5 h-3.5 text-accent-gold" />
                        <span>{evt.location}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-dashed border-gray-200 text-center flex flex-col items-center justify-center gap-3 text-gray-500 text-xs">
              <AlertCircle className="w-8 h-8 text-gray-400" />
              <span>Nenhum evento especial agendado.</span>
            </div>
          )}
        </div>
      )}

      {activeTab === "services" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-primary-main/5 shadow-sm space-y-6 text-left">
            <h2 className="font-display font-extrabold text-lg text-primary-main">
              Cronograma de Reuniões e Cultos
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Realizamos cultos e pequenos grupos semanalmente em nossas congregações. Venha cultuar a Deus conosco e desfrutar de comunhão sincera em amor.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {weeklyServices.map((srv) => {
                const dateObj = new Date(srv.date);
                return (
                  <div
                    key={srv.id}
                    className="p-4 rounded-2xl bg-background-warm border border-primary-main/10 flex flex-col justify-between text-left space-y-3"
                  >
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-accent-gold-dark uppercase tracking-widest block">
                        Culto de Rotina
                      </span>
                      <h4 className="font-bold text-sm text-primary-main">
                        {getTranslated(srv, "title", language)}
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        {getTranslated(srv, "description", language)}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-600 font-semibold border-t border-primary-main/5 pt-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary-main" />
                        {dateObj.toLocaleDateString(language === "pt" ? "pt-BR" : "en-US", { weekday: "long" })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-primary-main" />
                        {dateObj.toLocaleTimeString(language === "pt" ? "pt-BR" : "en-US", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-primary-main" />
                        {srv.location}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === "past" && (
        <div className="space-y-8">
          
          {/* Past Event list if any */}
          {pastEvents.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pastEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white rounded-3xl overflow-hidden border border-primary-main/5 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
                >
                  {evt.image_url && (
                    <div className="relative aspect-video w-full bg-gray-50 overflow-hidden">
                      <img src={evt.image_url} alt="" className="object-cover w-[400px] h-[400px] aspect-square" />
                    </div>
                  )}
                  <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                        Realizado em {new Date(evt.date).toLocaleDateString()}
                      </span>
                      <h4 className="font-bold text-sm text-primary-main leading-tight line-clamp-1">
                        {getTranslated(evt, "title", language)}
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                        {getTranslated(evt, "description", language)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Photo Gallery Grid */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-primary-main/5 shadow-sm space-y-6 text-left">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-accent-gold-dark" />
              <h2 className="font-display font-extrabold text-lg text-primary-main">
                {t("evtGallery")}
              </h2>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Momentos especiais registrados na história da nossa comunidade. Comunhão, alegria e celebração da graça.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photoGallery.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                    <span className="text-white text-xs font-bold font-display leading-snug">
                      {photo.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
