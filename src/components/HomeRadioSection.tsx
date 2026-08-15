"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";
import { useData } from "./DataContext";
import { getTranslated } from "@/db/mockData";
import { Play, Calendar, MapPin } from "lucide-react";

export default function HomeRadioSection() {
  const { language } = useLanguage();
  const { settings, events } = useData();
  const [isPlayingRadio, setIsPlayingRadio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Get active live stream status
  const isOnline = settings.player_status === "online";
  const transmissionType = settings.radio_transmission_type || "live";
  const audioUrl = transmissionType === "recorded"
    ? (settings.radio_recorded_url || "")
    : (settings.radio_stream_url || "https://stream.zeno.fm/0vy38b4u2p8uv");
  const shouldLoop = transmissionType === "recorded" && (settings.radio_recorded_loop ?? true);

  const isHomePlayable = transmissionType === "recorded" || isOnline;
  const nextService = events.filter((e) => e.is_service && !e.is_past)[0];

  // Auto update audio element when settings change
  useEffect(() => {
    let wasPlaying = isPlayingRadio;
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    if (typeof window !== "undefined" && audioUrl) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.loop = shouldLoop;
      
      audioRef.current.addEventListener("ended", () => {
        if (!shouldLoop) {
          setIsPlayingRadio(false);
        }
      });
      
      if (wasPlaying && isHomePlayable) {
        audioRef.current.play()
          .then(() => setIsPlayingRadio(true))
          .catch((err) => {
            console.error("Home player auto-resume failed:", err);
            setIsPlayingRadio(false);
          });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [audioUrl, shouldLoop, isHomePlayable]);

  const toggleRadio = () => {
    if (!audioRef.current || !isHomePlayable) return;
    
    if (isPlayingRadio) {
      audioRef.current.pause();
      setIsPlayingRadio(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlayingRadio(true))
        .catch((err) => {
          console.error("Audio play failed:", err);
          setIsPlayingRadio(false);
        });
    }
  };

  const getHomePlayerStatusText = () => {
    if (transmissionType === "recorded") {
      return isPlayingRadio ? "Reproduzindo Áudio (Loop)..." : "Áudio Gravado (Loop) • Pronto";
    }
    return isPlayingRadio ? "Transmitindo Ao Vivo..." : (isOnline ? "Pronto • Online" : "Temporariamente Offline");
  };

  return (
    <section id="radio-e-culto" className="w-full bg-[#122A1B] border-y border-emerald-800/20 py-16 px-4 md:px-12 lg:px-20 shadow-inner">
      {/* Waveform Custom Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wave-animation {
          0%, 100% { height: 6px; }
          50% { height: 20px; }
        }
        .wave-bar-1 { animation: wave-animation 0.8s ease-in-out infinite; }
        .wave-bar-2 { animation: wave-animation 0.8s ease-in-out infinite 0.15s; }
        .wave-bar-3 { animation: wave-animation 0.8s ease-in-out infinite 0.3s; }
        .wave-bar-4 { animation: wave-animation 0.8s ease-in-out infinite 0.45s; }
        .wave-bar-5 { animation: wave-animation 0.8s ease-in-out infinite 0.2s; }
      ` }} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Coluna Rádio: 7 colunas */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6 text-left">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/40 border border-emerald-700/30 text-emerald-400 text-[10px] font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {transmissionType === "recorded" ? "Áudio Loop" : "Transmissão Ao Vivo"}
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white">
              Rádio Reinando em Vida
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {transmissionType === "recorded"
                ? "Ouça pregações e louvores selecionados para a edificação da sua fé em reprodução contínua."
                : "Sintonize nossa rádio com transmissão ininterrupta de louvores edificantes, estudos doutrinários da Graça e mensagens inspiradas na Nova Aliança."}
            </p>
          </div>
          
          {/* Waveform and Play bar */}
          <div className="p-4 rounded-2xl bg-[#08140C]/90 border border-emerald-800/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleRadio}
                disabled={!isHomePlayable}
                className={`w-12 h-12 rounded-full text-[#08140C] flex items-center justify-center shadow-lg transition-all ${
                  isHomePlayable 
                    ? "bg-accent-gold hover:bg-[#D4AC0D] hover:scale-105 active:scale-95 cursor-pointer" 
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
                aria-label={isPlayingRadio ? "Pausar rádio" : "Tocar rádio"}
              >
                {isPlayingRadio ? (
                  <svg className="w-5 h-5 fill-current text-[#08140C]" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <Play className="w-5 h-5 fill-current text-[#08140C] ml-1" />
                )}
              </button>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">
                  {transmissionType === "recorded" ? "Programação Gravada" : "Rádio Web Oficial"}
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                  <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${isPlayingRadio ? "animate-ping" : ""}`} />
                  {getHomePlayerStatusText()}
                </span>
              </div>
            </div>
            
            {/* Waveform simulation */}
            {isPlayingRadio ? (
              <div className="flex items-end gap-1 h-6 pr-2">
                <span className="w-1 bg-accent-gold rounded-full wave-bar-1" />
                <span className="w-1 bg-accent-gold rounded-full wave-bar-2" />
                <span className="w-1 bg-accent-gold rounded-full wave-bar-3" />
                <span className="w-1 bg-accent-gold rounded-full wave-bar-4" />
                <span className="w-1 bg-accent-gold rounded-full wave-bar-5" />
              </div>
            ) : (
              <div className="flex items-end gap-1 h-6 pr-2 opacity-30">
                <span className="w-1 bg-accent-gold h-2 rounded-full" />
                <span className="w-1 bg-accent-gold h-2 rounded-full" />
                <span className="w-1 bg-accent-gold h-2 rounded-full" />
                <span className="w-1 bg-accent-gold h-2 rounded-full" />
                <span className="w-1 bg-accent-gold h-2 rounded-full" />
              </div>
            )}
          </div>
        </div>
        
        {/* Coluna Próximo Culto: 5 colunas */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-[#08140C]/90 border border-emerald-800/20 rounded-2xl p-6 flex flex-col justify-between h-full text-left space-y-4">
            <div className="space-y-3">
              <span className="text-xs font-bold text-accent-gold uppercase tracking-wider block">
                Próximo Culto Presencial
              </span>
              <h3 className="font-display font-extrabold text-lg text-white">
                {nextService ? getTranslated(nextService, "title", language) : "Culto da Abundante Graça"}
              </h3>
              
              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {nextService 
                      ? new Date(nextService.date).toLocaleDateString(language === "pt" ? "pt-BR" : "en-US", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          hour: "2-digit",
                          minute: "2-digit"
                        })
                      : "Todos os Domingos às 19h"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{nextService ? nextService.location : "São Paulo (Santana) e Ribeirão Preto"}</span>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <Link
                href="/eventos"
                className="w-full py-2.5 rounded-xl bg-emerald-900/50 hover:bg-emerald-900 border border-emerald-800/30 text-white text-xs font-bold block text-center transition-all"
              >
                Ver todos os cultos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
