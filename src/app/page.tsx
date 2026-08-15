"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageContext";
import { useData } from "@/components/DataContext";
import { getTranslated, getYouTubeEmbedUrl } from "@/db/mockData";
import { Play, Calendar, HeartHandshake, MapPin, BookOpen, ChevronRight, Video, Newspaper } from "lucide-react";
import HomeRadioSection from "@/components/HomeRadioSection";

export default function HomePage() {
  const { language } = useLanguage();
  const { settings, news, messages } = useData();

  // Filter latest items
  const latestNews = news.slice(0, 2);
  const latestVideoMessage = messages.filter((m) => m.type === "video")[0];

  return (
    <div className="bg-[#08140C] text-gray-200 min-h-screen w-full py-8 space-y-16">
      
      {/* 1. HERO SECTION (TOPO PRINCIPAL COM FUNDO CINEMATOGRÁFICO) */}
      <section className="w-full px-4 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto relative overflow-hidden rounded-3xl bg-[url('/images/hero_landscape_bg.jpg')] bg-cover bg-center bg-no-repeat border border-emerald-950/60 shadow-2xl p-6 sm:p-10 md:p-14 text-left">
          {/* Gradiente escuro suave cobrindo a imagem para garantir legibilidade dos textos */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#08140C]/95 via-[#08140C]/75 to-transparent pointer-events-none" />
          
          <div className="relative max-w-4xl mx-auto md:mx-0 grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10">
            <div className="md:col-span-8 space-y-6 animate-fade-in">
              
              {/* Título Principal */}
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white">
                Igreja <span className="bg-gradient-to-r from-accent-gold to-yellow-500 bg-clip-text text-transparent">Reinando em Vida</span>
              </h1>
              
              {/* Subtítulo Curto */}
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
                Uma comunidade de fé que vive o Evangelho com verdade, amor e propósito, transformando vidas e impactando o mundo com a Graça de Deus.
              </p>
              
              {/* Bloco de Citação */}
              <div className="border-l-4 border-accent-gold pl-4 py-1 my-4 max-w-xl bg-white/5 rounded-r-xl pr-3">
                <p className="italic text-xs sm:text-sm text-gray-300 leading-relaxed">
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
                  className="px-6 py-3 rounded-xl bg-accent-gold hover:bg-accent-gold-dark text-[#08140C] text-sm font-bold shadow-md shadow-accent-gold/15 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <Video className="w-4 h-4" />
                  <span>Assista ao Vivo</span>
                </Link>
                <Link
                  href="/eventos"
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-bold border border-white/10 flex items-center gap-2 transition-all hover:border-white/20 active:scale-95"
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

      {/* 2. PLACAS DE ATALHO RÁPIDO (CARD GRID COM HOVER PREMIUM & ELEVAÇÃO) */}
      <section className="w-full px-4 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Dízimos */}
          <Link
            href={settings.card1_link || "/colabore"}
            className="bg-emerald-950/40 border border-emerald-800/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-400/10 hover:border-yellow-400 hover:shadow-xl hover:shadow-yellow-500/10 group flex flex-col justify-between h-full text-left"
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
            <div className="flex items-center gap-1 text-[11px] text-accent-gold group-hover:text-yellow-300 font-semibold uppercase tracking-wider mt-4 group-hover:gap-2 transition-all duration-300">
              <span>{settings.card1_cta || "Colaborar"}</span>
              <span>→</span>
            </div>
          </Link>
          
          {/* Card 2: Localizações */}
          <Link
            href={settings.card2_link || "/contato"}
            className="bg-emerald-950/40 border border-emerald-800/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-400/10 hover:border-yellow-400 hover:shadow-xl hover:shadow-yellow-500/10 group flex flex-col justify-between h-full text-left"
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
            <div className="flex items-center gap-1 text-[11px] text-accent-gold group-hover:text-yellow-300 font-semibold uppercase tracking-wider mt-4 group-hover:gap-2 transition-all duration-300">
              <span>{settings.card2_cta || "Onde estamos"}</span>
              <span>→</span>
            </div>
          </Link>

          {/* Card 3: Conteúdos */}
          <Link
            href={settings.card3_link || "/conteudos"}
            className="bg-emerald-950/40 border border-emerald-800/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-400/10 hover:border-yellow-400 hover:shadow-xl hover:shadow-yellow-500/10 group flex flex-col justify-between h-full text-left"
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
            <div className="flex items-center gap-1 text-[11px] text-accent-gold group-hover:text-yellow-300 font-semibold uppercase tracking-wider mt-4 group-hover:gap-2 transition-all duration-300">
              <span>{settings.card3_cta || "VER CONTEÚDOS"}</span>
              <span>→</span>
            </div>
          </Link>

          {/* Card 4: Cursos */}
          <Link
            href={settings.card4_link || "/conteudos"}
            className="bg-emerald-950/40 border border-emerald-800/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-400/10 hover:border-yellow-400 hover:shadow-xl hover:shadow-yellow-500/10 group flex flex-col justify-between h-full text-left"
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
            <div className="flex items-center gap-1 text-[11px] text-accent-gold group-hover:text-yellow-300 font-semibold uppercase tracking-wider mt-4 group-hover:gap-2 transition-all duration-300">
              <span>{settings.card4_cta || "Acessar Instituto"}</span>
              <span>→</span>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. SEÇÃO DE MÍDIA & RÁDIO AO VIVO (COMPONENTE ISOLADO CLIENTE) */}
      <HomeRadioSection />

      {/* 4. SEÇÃO DO PASTOR PRESIDENTE (BOAS-VINDAS) */}
      <section className="w-full px-4 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center bg-emerald-950/20 border border-emerald-800/20 rounded-3xl p-6 md:p-8">
          
          {/* Lado Esquerdo: Foto Pastor (Otimizada via Next.js Image) */}
          <div className="md:col-span-5 w-full flex justify-center">
            <div className="relative aspect-[4/5] w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-emerald-800/30 bg-emerald-950/40">
              <Image
                src={settings.pastor_image_url || "/images/pastor_samuel.png"}
                alt={settings.pastor_name || "Pr. Samuel Rodrigues - Pastor Presidente"}
                width={400}
                height={500}
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                priority
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
                  className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-850/20 flex gap-4 hover:border-emerald-600/40 hover:bg-emerald-900/10 transition-all block group"
                >
                  {post.image_url && (
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-emerald-850/30 bg-emerald-950/40">
                      <Image
                        src={post.image_url}
                        alt={getTranslated(post, "title", language) || "Imagem da Notícia"}
                        fill
                        sizes="64px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-between py-0.5 text-left">
                    <h4 className="font-semibold text-xs sm:text-sm text-white line-clamp-1 group-hover:text-yellow-300 transition-colors">
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
