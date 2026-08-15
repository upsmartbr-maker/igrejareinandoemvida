"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { useData } from "@/components/DataContext";
import { getTranslated, getYouTubeEmbedUrl } from "@/db/mockData";
import { Play, Calendar, HeartHandshake, MapPin, Radio, BookOpen, ChevronRight, Video, Newspaper } from "lucide-react";

export default function HomePage() {
  const { language, t } = useLanguage();
  const { settings, news, messages, events } = useData();
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

  // Filter latest items
  const latestNews = news.slice(0, 2);
  const latestVideoMessage = messages.filter((m) => m.type === "video")[0];
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
    <div className="bg-[#08140C] text-gray-200 min-h-screen w-full py-8 space-y-16">
      
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

      {/* 1. HERO SECTION (TOPO PRINCIPAL COM FUNDO CINEMATOGRÁFICO) */}
      <section className="w-full px-4 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto relative overflow-hidden rounded-3xl bg-[url('/images/hero_landscape_bg.jpg')] bg-cover bg-center bg-no-repeat border border-emerald-950/60 shadow-2xl p-6 sm:p-10 md:p-14 text-left">
          {/* Gradiente escuro suave cobrindo a imagem para garantir legibilidade dos textos */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#08140C]/95 via-[#08140C]/75 to-transparent pointer-events-none" />
          
          <div className="relative max-w-4xl mx-auto md:mx-0 grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10">
            <div className="md:col-span-8 space-y-6">
              
              {/* Título Principal */}
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white">
                Igreja <span className="bg-gradient-to-r from-accent-gold to-yellow-500 bg-clip-text text-transparent">Reinando em Vida</span>
              </h1>
              
              {/* Subtítulo Curto */}
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
                Uma comunidade de fé que vive o Evangelho com verdade, amor e propósito, transformando vidas e impactando o mundo com a Graça de Deus.
              </p>
              
              {/* Bloco de Citação */}
              <div className="border-l-4 border-accent-gold pl-4 py-1 my-4 max-w-xl">
                <p className="italic text-xs sm:text-sm text-gray-400 leading-relaxed">
                  &ldquo;...muito mais os que recebem a abundância da graça, e do dom da justiça, reinarão em vida por meio de um só, Jesus Cristo.&rdquo;
                </p>
                <span className="block text-[10px] font-bold text-accent-gold mt-1.5 uppercase tracking-wider">
                  — Romanos 5:17
                </span>
              </div>
              
              {/* Botões */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="#radio-e-culto"
                  className="px-6 py-3 rounded-xl bg-accent-gold hover:bg-accent-gold-dark text-[#08140C] text-sm font-bold shadow-md shadow-accent-gold/15 flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Video className="w-4 h-4" />
                  <span>Assista ao Vivo</span>
                </Link>
                <Link
                  href="/eventos"
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-bold border border-white/10 flex items-center gap-2 transition-all"
                >
                  <Calendar className="w-4 h-4 text-accent-gold" />
                  <span>Agenda</span>
                </Link>
              </div>
            </div>
            
            <div className="hidden md:col-span-4 md:flex items-center justify-center">
              {/* Espaço vazio equilibrado revelando o fundo cinematográfico */}
            </div>
          </div>
        </div>
      </section>

      {/* 2. PLACAS DE ATALHO RÁPIDO (CARD GRID COM HOVER AMARELO PREMIUM) */}
      <section className="w-full px-4 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Dízimos */}
          <Link
            href={settings.card1_link || "/colabore"}
            className="bg-emerald-950/40 border border-emerald-800/30 rounded-2xl p-6 transition-all duration-300 hover:bg-yellow-450/10 hover:border-yellow-400 hover:text-yellow-300 group flex flex-col justify-between h-full text-left"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-900/50 border border-emerald-700/30 flex items-center justify-center text-accent-gold group-hover:scale-110 group-hover:text-yellow-300 group-hover:border-yellow-500/50 transition-all duration-300 mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                {settings.card1_title || "Dízimos e Ofertas"}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed group-hover:text-yellow-50/80 transition-colors duration-300">
                {settings.card1_desc || "Contribua de forma voluntária, segura e rápida para expandir o Evangelho da Graça."}
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-accent-gold group-hover:text-yellow-350 font-semibold uppercase tracking-wider mt-4 group-hover:gap-2 transition-all duration-300">
              <span>{settings.card1_cta || "Colaborar"}</span>
              <span>→</span>
            </div>
          </Link>
          
          {/* Card 2: Localizações */}
          <Link
            href={settings.card2_link || "/contato"}
            className="bg-emerald-950/40 border border-emerald-800/30 rounded-2xl p-6 transition-all duration-300 hover:bg-yellow-450/10 hover:border-yellow-400 hover:text-yellow-300 group flex flex-col justify-between h-full text-left"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-900/50 border border-emerald-700/30 flex items-center justify-center text-accent-gold group-hover:scale-110 group-hover:text-yellow-300 group-hover:border-yellow-500/50 transition-all duration-300 mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                {settings.card2_title || "Localizações"}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed group-hover:text-yellow-50/80 transition-colors duration-300">
                {settings.card2_desc || "Encontre o templo mais próximo em São Paulo (Santana) ou Ribeirão Preto."}
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-accent-gold group-hover:text-yellow-350 font-semibold uppercase tracking-wider mt-4 group-hover:gap-2 transition-all duration-300">
              <span>{settings.card2_cta || "Onde estamos"}</span>
              <span>→</span>
            </div>
          </Link>

          {/* Card 3: Conteúdos */}
          <Link
            href={settings.card3_link || "/conteudos"}
            className="bg-emerald-950/40 border border-emerald-800/30 rounded-2xl p-6 transition-all duration-300 hover:bg-yellow-450/10 hover:border-yellow-400 hover:text-yellow-300 group flex flex-col justify-between h-full text-left"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-900/50 border border-emerald-700/30 flex items-center justify-center text-accent-gold group-hover:scale-110 group-hover:text-yellow-300 group-hover:border-yellow-500/50 transition-all duration-300 mb-4">
                <Newspaper className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                {settings.card3_title || "CONTEÚDOS E EDIFICAÇÃO"}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed group-hover:text-yellow-50/80 transition-colors duration-300">
                {settings.card3_desc || "Acesse o blog de notícias, plano de leitura bíblica, rádio online e boletins semanais."}
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-accent-gold group-hover:text-yellow-350 font-semibold uppercase tracking-wider mt-4 group-hover:gap-2 transition-all duration-300">
              <span>{settings.card3_cta || "VER CONTEÚDOS"}</span>
              <span>→</span>
            </div>
          </Link>

          {/* Card 4: Cursos */}
          <Link
            href={settings.card4_link || "/conteudos"}
            className="bg-emerald-950/40 border border-emerald-800/30 rounded-2xl p-6 transition-all duration-300 hover:bg-yellow-450/10 hover:border-yellow-400 hover:text-yellow-300 group flex flex-col justify-between h-full text-left"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-900/50 border border-emerald-700/30 flex items-center justify-center text-accent-gold group-hover:scale-110 group-hover:text-yellow-300 group-hover:border-yellow-500/50 transition-all duration-300 mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                {settings.card4_title || "Cursos e Materiais"}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed group-hover:text-yellow-50/80 transition-colors duration-300">
                {settings.card4_desc || "Acesse a plataforma de estudos bíblicos do Instituto Reinando em Vida."}
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-accent-gold group-hover:text-yellow-350 font-semibold uppercase tracking-wider mt-4 group-hover:gap-2 transition-all duration-300">
              <span>{settings.card4_cta || "Acessar Instituto"}</span>
              <span>→</span>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. SEÇÃO DE MÍDIA & RÁDIO AO VIVO (FAIXA DE FUNDO DESTACADA EM TELA CHEIA) */}
      <section id="radio-e-culto" className="w-full bg-[#122A1B] border-y border-emerald-800/20 py-16 px-4 md:px-12 lg:px-20 shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Coluna Rádio: 7 colunas */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/40 border border-emerald-700/30 text-emerald-400 text-[10px] font-bold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-450 animate-pulse" />
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
                  aria-label={isPlayingRadio ? "Pause" : "Play"}
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
                  <span className="text-[10px] text-emerald-405 flex items-center gap-1 font-medium">
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

      {/* 4. SEÇÃO DO PASTOR PRESIDENTE (BOAS-VINDAS) */}
      <section className="w-full px-4 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center bg-emerald-950/20 border border-emerald-800/20 rounded-3xl p-6 md:p-8">
          
          {/* Lado Esquerdo: Foto Pastor */}
          <div className="md:col-span-5 w-full flex justify-center">
            <div className="relative aspect-[4/5] w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-emerald-800/30 bg-emerald-950/40">
              <img
                src={settings.pastor_image_url || "/images/pastor_samuel.png"}
                alt={settings.pastor_name || "Pr. Samuel Rodrigues"}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08140C] via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-left bg-gradient-to-t from-[#08140C]/90 to-transparent">
                <span className="font-display font-bold text-base text-white block">
                  {settings.pastor_name || "Pr. Samuel Rodrigues"}
                </span>
                <span className="text-[11px] text-accent-gold block font-semibold uppercase tracking-wider mt-0.5">
                  {getTranslated(settings, "pastor_role", language) || "Pastor Presidente"}
                </span>
              </div>
            </div>
          </div>
          
          {/* Lado Direito: Texto de Boas-Vindas */}
          <div className="md:col-span-7 space-y-5 text-left">
            <span className="text-xs font-bold text-accent-gold uppercase tracking-widest block">
              Mensagem de Boas-Vindas
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white leading-tight">
              {getTranslated(settings, "pastor_title", language) || "Nossa missão é pregar a Graça de Deus"}
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed italic border-l-2 border-accent-gold pl-4 py-1">
              &ldquo;{getTranslated(settings, "pastor_quote", language) || "Temos como chamada restaurar a verdade do amor incondicional..."}&rdquo;
            </p>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              {getTranslated(settings, "pastor_desc", language) || "Convidamos você e sua família a nos fazerem uma visita..."}
            </p>
            <div className="pt-2">
              <Link
                href="/quem-somos"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-accent-gold hover:text-white transition-colors group"
              >
                <span>Conheça nossa história</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NOTÍCIAS & MENSAGEM EM DESTAQUE (DUAS COLUNAS NA PARTE INFERIOR) */}
      <section className="w-full px-4 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Coluna 1: Notícias & Blog */}
          <div className="space-y-5 text-left">
            <div className="flex items-center gap-2 pb-2 border-b border-emerald-800/20">
              <Newspaper className="w-5 h-5 text-accent-gold" />
              <h3 className="font-display font-bold text-lg text-white">
                Notícias & Blog
              </h3>
            </div>
            
            <div className="space-y-4">
              {latestNews.map((post) => (
                <Link
                  key={post.id}
                  href="/conteudos"
                  className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-850/20 flex gap-4 hover:border-emerald-600/40 hover:bg-emerald-900/10 transition-all block"
                >
                  {post.image_url && (
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-emerald-850/30 bg-emerald-950/40">
                      <img src={post.image_url} alt="" className="object-cover w-full h-full" />
                    </div>
                  )}
                  <div className="flex flex-col justify-between py-0.5 text-left">
                    <h4 className="font-semibold text-xs sm:text-sm text-white line-clamp-1">
                      {getTranslated(post, "title", language)}
                    </h4>
                    <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed mt-1">
                      {getTranslated(post, "content", language)}
                    </p>
                    <span className="text-[9px] text-gray-500 font-semibold mt-1.5 block">
                      {new Date(post.date).toLocaleDateString()} • {post.time}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="pt-2">
              <Link
                href="/conteudos"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-gold hover:text-white transition-colors group"
              >
                <span>Ver todas as notícias</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
          
          {/* Coluna 2: Mensagem em Destaque */}
          <div className="space-y-5 text-left">
            <div className="flex items-center gap-2 pb-2 border-b border-emerald-800/20">
              <Play className="w-5 h-5 text-accent-gold fill-current" />
              <h3 className="font-display font-bold text-lg text-white">
                Mensagem em Destaque
              </h3>
            </div>
            
            {latestVideoMessage ? (
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-850/20 space-y-4">
                {latestVideoMessage.url && (
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-emerald-800/30 bg-black shadow-lg">
                    <iframe
                      src={getYouTubeEmbedUrl(latestVideoMessage.url)}
                      title="Sermão em Destaque"
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-accent-gold font-bold uppercase tracking-wider">
                    {latestVideoMessage.author}
                  </span>
                  <h4 className="font-semibold text-sm text-white leading-snug mt-1">
                    {getTranslated(latestVideoMessage, "title", language)}
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2 mt-1">
                    {getTranslated(latestVideoMessage, "content", language)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-emerald-950/20 border border-dashed border-emerald-800/30 text-center text-gray-500 text-xs">
                Nenhuma mensagem gravada disponível no momento.
              </div>
            )}
            
            <div className="pt-2">
              <Link
                href="/mensagens"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-gold hover:text-white transition-colors group"
              >
                <span>Acessar acervo de sermões</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
          
        </div>
      </section>
      
    </div>
  );
}
