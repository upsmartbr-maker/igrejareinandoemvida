"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { useData } from "@/components/DataContext";
import { getTranslated, getYouTubeEmbedUrl, DBMessage } from "@/db/mockData";
import { Search, Play, Volume2, FileText, BookOpen, Download, AlertCircle, Calendar, User } from "lucide-react";

type MessageFilter = "all" | "video" | "audio" | "study" | "devotional";

export default function MessagesPage() {
  const { language, t } = useLanguage();
  const { messages } = useData();
  const [activeFilter, setActiveFilter] = useState<MessageFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // Filters messages based on search and selected tab
  const filteredMessages = messages.filter((msg) => {
    const matchesFilter = activeFilter === "all" || msg.type === activeFilter;
    
    const title = getTranslated(msg, "title", language).toLowerCase();
    const content = getTranslated(msg, "content", language).toLowerCase();
    const author = msg.author.toLowerCase();
    const matchesSearch = 
      title.includes(searchQuery.toLowerCase()) || 
      content.includes(searchQuery.toLowerCase()) ||
      author.includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "video": return <Play className="w-4 h-4 fill-current text-red-600" />;
      case "audio": return <Volume2 className="w-4 h-4 text-blue-600" />;
      case "study": return <FileText className="w-4 h-4 text-green-600" />;
      case "devotional": return <BookOpen className="w-4 h-4 text-amber-600" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "video": return "bg-red-50 text-red-700 border-red-100";
      case "audio": return "bg-blue-50 text-blue-700 border-blue-100";
      case "study": return "bg-green-50 text-green-700 border-green-100";
      case "devotional": return "bg-amber-50 text-amber-700 border-amber-100";
      default: return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Header */}
      <div className="space-y-3">
        <span className="px-3 py-1 rounded-full bg-primary-main/10 text-primary-main text-xs font-bold uppercase tracking-widest">
          {t("navMessages")}
        </span>
        <h1 className="font-display font-extrabold text-3xl text-primary-main tracking-tight">
          Mensagens e Estudos
        </h1>
        <p className="text-gray-600 text-sm max-w-xl">
          Acesse sermões em vídeo, podcasts em áudio, esboços de estudos bíblicos e devocionais diários ministrados na nossa igreja.
        </p>
      </div>

      {/* Search & Tabs Panel */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-primary-main/5 shadow-sm">
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {([
            { id: "all", label: t("msgFilterAll") },
            { id: "video", label: t("msgVideos") },
            { id: "audio", label: t("msgAudios") },
            { id: "study", label: t("msgStudies") },
            { id: "devotional", label: t("msgDevotionals") },
          ] as { id: MessageFilter; label: string }[]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveFilter(tab.id);
                setPlayingAudioId(null); // Pause audio switch
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                activeFilter === tab.id
                  ? "bg-primary-main text-accent-gold border-primary-main shadow-sm"
                  : "bg-white hover:bg-gray-50 text-gray-600 border-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder={t("msgSearch")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-primary-main"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>

      </div>

      {/* Messages Grid */}
      {filteredMessages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMessages.map((msg) => {
            const title = getTranslated(msg, "title", language);
            const content = getTranslated(msg, "content", language);
            const isAudioPlaying = playingAudioId === msg.id;

            return (
              <div
                key={msg.id}
                className="bg-white rounded-3xl p-6 border border-primary-main/5 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                {/* Meta details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${getBadgeColor(msg.type)}`}>
                      {t(`msg${msg.type.charAt(0).toUpperCase() + msg.type.slice(1)}s`)}
                    </span>
                    <div className="flex items-center gap-3 text-[10px] text-gray-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(msg.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {msg.author}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display font-extrabold text-base text-primary-main leading-snug">
                    {title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {content}
                  </p>
                </div>

                {/* Display Specific Media Elements */}
                <div className="pt-2 border-t border-gray-100">
                  {/* YouTube Embed for video */}
                  {msg.type === "video" && msg.url && (
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-gray-100 mb-2">
                      <iframe
                        src={getYouTubeEmbedUrl(msg.url)}
                        title={title}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}

                  {/* Audio Player for audio */}
                  {msg.type === "audio" && msg.url && (
                    <div className="bg-background-warm p-3 rounded-xl border border-gray-200/50 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-gray-500">Audio Podcast Player</span>
                        <button
                          onClick={() => setPlayingAudioId(isAudioPlaying ? null : msg.id)}
                          className="px-3 py-1 rounded-lg bg-primary-main hover:bg-primary-dark text-white text-[10px] font-bold flex items-center gap-1"
                        >
                          {isAudioPlaying ? "Pause" : "Play / Carregar"}
                        </button>
                      </div>
                      {isAudioPlaying && (
                        <audio
                          src={msg.url}
                          controls
                          autoPlay
                          className="w-full h-8 mt-1 accent-primary-main"
                        />
                      )}
                    </div>
                  )}

                  {/* Document Download Link for studies */}
                  {msg.type === "study" && msg.url && (
                    <a
                      href={msg.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-main hover:bg-primary-dark text-accent-gold text-xs font-bold shadow-md shadow-primary-main/10"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar Estudo (Google Drive)</span>
                    </a>
                  )}

                  {/* Written indicator for Devotionals */}
                  {msg.type === "devotional" && (
                    <div className="text-[10px] text-accent-gold-dark font-bold uppercase tracking-wider flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Alimento Diário da Graça</span>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 border border-dashed border-gray-200 text-center flex flex-col items-center justify-center gap-3">
          <AlertCircle className="w-8 h-8 text-gray-400" />
          <span className="text-sm font-semibold text-gray-500">Nenhuma mensagem encontrada</span>
          <span className="text-xs text-gray-400">Tente buscar por outras palavras-chave ou mude o filtro.</span>
        </div>
      )}

    </div>
  );
}
