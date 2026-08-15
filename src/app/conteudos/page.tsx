"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { useData } from "@/components/DataContext";
import { getTranslated } from "@/db/mockData";
import { Newspaper, Radio, FileText, CheckSquare, Square, Download, Calendar, Clock, BookOpen, AlertCircle, Plus, Heart, X, Check, MessageSquare, Sparkles, Image as ImageIcon, ShieldCheck, Filter, User } from "lucide-react";
import { MuralCategory, MuralPost } from "@/db/mockData";

// Inline Brand SVG for compatibility
const Youtube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.95 1.96C5.12 19.5 12 19.5 12 19.5s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);


type ContentTab = "blog" | "radio" | "reading" | "bulletins" | "mural";

export default function ContentPage() {
  const { language, t } = useLanguage();
  const { news, settings, muralPosts, addMuralPost, incrementPrayedCount } = useData();
  const [activeTab, setActiveTab] = useState<ContentTab>("blog");

  // Mural filtering state
  const [muralFilter, setMuralFilter] = useState<"all" | "testimony" | "prayer">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prayedPosts, setPrayedPosts] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mural_prayed_posts");
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  // Modal Form State
  const [authorName, setAuthorName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<MuralCategory>("testimony");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formFeedback, setFormFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handlePrayClick = (postId: string) => {
    incrementPrayedCount(postId);
    if (!prayedPosts.includes(postId)) {
      const updated = [...prayedPosts, postId];
      setPrayedPosts(updated);
      localStorage.setItem("mural_prayed_posts", JSON.stringify(updated));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError(null);
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setImageError("O arquivo de imagem deve ter no máximo 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormFeedback(null);

    const nameToSave = isAnonymous ? "Anônimo" : authorName.trim();
    if (!nameToSave) {
      setFormFeedback({ type: "error", text: "Por favor, informe seu nome ou selecione a opção Anônimo." });
      return;
    }
    if (!message.trim()) {
      setFormFeedback({ type: "error", text: "Por favor, digite sua mensagem." });
      return;
    }
    if (!acceptedTerms) {
      setFormFeedback({ type: "error", text: "É necessário aceitar os Termos de Uso para publicar." });
      return;
    }

    const success = await addMuralPost({
      author_name: nameToSave,
      is_anonymous: isAnonymous,
      email: email.trim() || undefined,
      category,
      message: message.trim(),
      image_url: imageUrl || undefined,
    });

    if (success) {
      const autoApproved = settings.mural_auto_approve;
      setFormFeedback({
        type: "success",
        text: autoApproved
          ? "Sua publicação foi publicada no mural com sucesso!"
          : "Sua publicação foi enviada com sucesso! Ela estará visível no mural após aprovação da moderação.",
      });
      setTimeout(() => {
        setIsModalOpen(false);
        setFormFeedback(null);
        setAuthorName("");
        setIsAnonymous(false);
        setEmail("");
        setCategory("testimony");
        setMessage("");
        setImageUrl("");
        setImageError(null);
        setAcceptedTerms(false);
      }, 2000);
    }
  };

  // Reading Plan State: checked days saved in localStorage
  const [checkedDays, setCheckedDays] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bible_reading_checked");
      if (saved) return JSON.parse(saved);
    }
    return [];
  });


  const toggleDay = (day: number) => {
    const next = checkedDays.includes(day)
      ? checkedDays.filter((d) => d !== day)
      : [...checkedDays, day];
    setCheckedDays(next);
    localStorage.setItem("bible_reading_checked", JSON.stringify(next));
  };

  // Sample reading plan details
  const readingPlan = [
    { day: 1, verses: "Romanos 1:1-17", checked: false },
    { day: 2, verses: "Romanos 1:18-32", checked: false },
    { day: 3, verses: "Romanos 2", checked: false },
    { day: 4, verses: "Romanos 3", checked: false },
    { day: 5, verses: "Romanos 4", checked: false },
    { day: 6, verses: "Romanos 5", checked: false },
    { day: 7, verses: "Romanos 6", checked: false },
    { day: 8, verses: "Romanos 7", checked: false },
    { day: 9, verses: "Romanos 8:1-17", checked: false },
    { day: 10, verses: "Romanos 8:18-39", checked: false },
  ];

  // Sample Bulletins
  const bulletins = [
    { id: "b1", week: "20 a 26 de Julho, 2026", url: "https://drive.google.com/file/d/demo-bulletin-1/view" },
    { id: "b2", week: "13 a 19 de Julho, 2026", url: "https://drive.google.com/file/d/demo-bulletin-2/view" },
  ];

  return (
    <div className="space-y-8 text-left">
      
      {/* Header */}
      <div className="space-y-3">
        <span className="px-3 py-1 rounded-full bg-primary-main/10 text-primary-main text-xs font-bold uppercase tracking-widest">
          {t("navContent")}
        </span>
        <h1 className="font-display font-extrabold text-3xl text-primary-main tracking-tight">
          Conteúdos e Edificação
        </h1>
        <p className="text-gray-600 text-sm max-w-xl">
          Fique por dentro das novidades, ouça a rádio local, acesse os boletins da semana, interceda no mural da comunidade e acompanhe seu plano de leitura da palavra.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-none">
        {([
          { id: "blog", label: t("contentBlog") },
          { id: "radio", label: t("contentRadio") },
          { id: "reading", label: t("contentReading") },
          { id: "bulletins", label: t("contentBulletins") },
          { id: "mural", label: t("contentMural") },
        ] as { id: ContentTab; label: string }[]).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all -mb-px shrink-0 ${
              activeTab === tab.id
                ? "border-accent-gold text-primary-main"
                : "border-transparent text-gray-500 hover:text-primary-main hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Render Sections */}
      {activeTab === "blog" && (
        <div className="space-y-6">
          {news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {news.map((post) => (
                <article
                  key={post.id}
                  className="bg-white border border-primary-main/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  {post.image_url && (
                    <div className="relative aspect-video w-full bg-gray-50 border-b border-gray-100">
                      <img src={post.image_url} alt="" className="object-cover w-full h-full" />
                    </div>
                  )}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-[10px] text-gray-400 font-semibold">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.time}
                        </span>
                      </div>
                      <h3 className="font-display font-extrabold text-base text-primary-main leading-snug">
                        {getTranslated(post, "title", language)}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {getTranslated(post, "content", language)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-dashed border-gray-200 text-center text-gray-500 text-xs">
              Nenhuma notícia disponível no momento.
            </div>
          )}
        </div>
      )}

      {activeTab === "radio" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Radio Information card */}
          <div className="md:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-primary-main/5 shadow-sm space-y-6 flex flex-col justify-between text-left">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-gold/15 text-accent-gold-dark text-[10px] font-bold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-accent-gold animate-ping" />
                Estação Ao Vivo
              </span>
              <h2 className="font-display font-extrabold text-2xl text-primary-main">
                {t("playerRadioTitle")}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Nossa rádio opera 24 horas por dia, transmitindo louvores, reprises de cultos, estudos especiais e mensagens inspiradoras baseadas no Evangelho da Graça de Deus. Sintonize-se na nossa frequência online!
              </p>
            </div>

            {/* Simulated Live Broadcast Panel */}
            <div className="p-4 rounded-2xl bg-background-warm border border-primary-main/10 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary-main/5 text-primary-main animate-pulse">
                <Radio className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
                  Programação Atual
                </span>
                <span className="text-sm font-bold text-primary-main block">
                  Exposição de Romanos - Pr. Samuel Rodrigues
                </span>
                <span className="text-[10px] text-gray-500 font-medium block">
                  Grade de Segunda a Domingo 24h
                </span>
              </div>
            </div>

            {/* Note to tell users to use persistent player */}
            <div className="p-4 rounded-xl bg-primary-main/5 border border-primary-main/10 text-xs text-primary-main flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-accent-gold mt-0.5" />
              <span>
                Para sintonizar a rádio, utilize o **player persistente de áudio** fixado no rodapé do site. Ele continuará tocando ininterruptamente mesmo se você navegar para outras páginas do portal!
              </span>
            </div>
          </div>

          {/* YouTube Podcast panel */}
          <div className="md:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-primary-main/5 shadow-sm flex flex-col justify-between text-left space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <Youtube className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-primary-main">
                {t("contentLivePodcast")}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Assista também às nossas transmissões no YouTube e nosso canal de Podcasts. Inscreva-se e ative as notificações para receber as atualizações semanais.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <a
                href={settings.youtube_channel_url || "https://youtube.com/reinandoemvida"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-red-100"
              >
                <Youtube className="w-4 h-4" />
                <span>Inscrever-se no YouTube</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {activeTab === "reading" && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-primary-main/5 shadow-sm space-y-6 text-left">
          <div className="space-y-2">
            <h2 className="font-display font-extrabold text-xl text-primary-main">
              Plano de Leitura: As Epístolas da Graça
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Marque os dias completados e acompanhe a sua leitura diária das epístolas do apóstolo Paulo. O progresso é salvo no seu navegador automaticamente.
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
              <span>Progresso de Leitura</span>
              <span>
                {checkedDays.length} de {readingPlan.length} dias ({Math.round((checkedDays.length / readingPlan.length) * 100)}%)
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-accent-gold transition-all duration-300"
                style={{ width: `${(checkedDays.length / readingPlan.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Reading Plan Grid list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {readingPlan.map((day) => {
              const isChecked = checkedDays.includes(day.day);
              return (
                <button
                  key={day.day}
                  onClick={() => toggleDay(day.day)}
                  className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all group ${
                    isChecked
                      ? "bg-primary-main/5 border-primary-main/20 text-primary-main"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isChecked ? "bg-accent-gold text-primary-main" : "bg-gray-100 text-gray-500"
                    }`}>
                      Dia {day.day}
                    </span>
                    <span className="text-xs font-semibold">{day.verses}</span>
                  </div>
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-primary-main" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "bulletins" && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-primary-main/5 shadow-sm space-y-6 text-left">
          <div className="space-y-2">
            <h2 className="font-display font-extrabold text-xl text-primary-main">
              Boletins Informativos Semanais
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Consulte e baixe em PDF os boletins informativos da semana, contendo avisos, cronograma de cultos, aniversariantes e escalas de serviço.
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {bulletins.map((bulletin) => (
              <div key={bulletin.id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs text-gray-500">Boletim Semanal</span>
                    <span className="text-sm font-bold text-primary-main">Semana de {bulletin.week}</span>
                  </div>
                </div>

                <a
                  href={bulletin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-primary-main hover:bg-primary-dark text-accent-gold text-xs font-bold flex items-center gap-1.5 shadow-md shadow-primary-main/10"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar PDF</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "mural" && (
        <div className="space-y-8 text-left">
          {/* Action Header & Filters */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-primary-main/5 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="font-display font-extrabold text-2xl text-primary-main flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-accent-gold" />
                  <span>Mural da Comunidade & Oração</span>
                </h2>
                <p className="text-xs text-gray-600">
                  Espaço para compartilhar bênçãos, grandes vitórias e unir a igreja em concordância e intercessão.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-3 rounded-2xl bg-primary-main hover:bg-primary-dark text-accent-gold text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-primary-main/10 transition-all shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Criar Publicação</span>
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100 overflow-x-auto">
              <span className="text-xs text-gray-400 font-semibold flex items-center gap-1 mr-2 shrink-0">
                <Filter className="w-3.5 h-3.5" /> Filtrar:
              </span>
              <button
                onClick={() => setMuralFilter("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  muralFilter === "all"
                    ? "bg-primary-main text-accent-gold shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Todos os Posts
              </button>
              <button
                onClick={() => setMuralFilter("testimony")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  muralFilter === "testimony"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                }`}
              >
                Testemunhos & Conquistas
              </button>
              <button
                onClick={() => setMuralFilter("prayer")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  muralFilter === "prayer"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                }`}
              >
                Pedidos de Oração
              </button>
            </div>
          </div>

          {/* Posts Grid */}
          {(() => {
            const approvedPosts = muralPosts.filter(
              (p) => p.status === "approved" && (muralFilter === "all" || p.category === muralFilter)
            );

            if (approvedPosts.length === 0) {
              return (
                <div className="bg-white rounded-3xl p-12 border border-dashed border-gray-200 text-center text-gray-500 space-y-3">
                  <Sparkles className="w-8 h-8 text-accent-gold mx-auto opacity-60" />
                  <p className="text-sm font-semibold">Nenhuma publicação encontrada nesta categoria.</p>
                  <p className="text-xs text-gray-400">Seja o primeiro a compartilhar uma bênção ou pedido de oração!</p>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {approvedPosts.map((post) => {
                  const hasPrayed = prayedPosts.includes(post.id);
                  const isTestimony = post.category === "testimony";

                  return (
                    <div
                      key={post.id}
                      className="bg-white rounded-3xl border border-primary-main/5 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4 text-left relative overflow-hidden"
                    >
                      {/* Top Bar / Badge & Date */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                              isTestimony
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : "bg-purple-100 text-purple-800 border border-purple-200"
                            }`}
                          >
                            {isTestimony ? "Testemunho / Conquista" : "Pedido de Oração"}
                          </span>

                          <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(post.created_at).toLocaleDateString("pt-BR")}
                          </span>
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center font-bold text-xs">
                            <User className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-sm text-primary-main">
                            {post.is_anonymous ? "Anônimo" : post.author_name}
                          </span>
                        </div>

                        {/* Post Message */}
                        <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-normal whitespace-pre-wrap">
                          {post.message}
                        </p>

                        {/* Optional Image */}
                        {post.image_url && (
                          <div className="mt-3 rounded-2xl overflow-hidden border border-gray-100 aspect-video max-h-56 bg-gray-50">
                            <img
                              src={post.image_url}
                              alt="Anexo da publicação"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>

                      {/* Footer Interactive Counter Button */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <button
                          onClick={() => handlePrayClick(post.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                            hasPrayed
                              ? "bg-rose-50 border border-rose-200 text-rose-700 shadow-sm"
                              : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 transition-transform ${
                              hasPrayed ? "fill-rose-600 text-rose-600 scale-110" : "text-gray-400"
                            }`}
                          />
                          <span>
                            {hasPrayed ? "Você orou por isso" : "Interceder / Orei por isso"}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                              hasPrayed ? "bg-rose-200 text-rose-900" : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {post.prayed_count}
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {/* Modal for Creating New Post */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 relative text-left">
                {/* Header & Close Button */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-primary-main">
                      Criar Publicação no Mural
                    </h3>
                    <p className="text-xs text-gray-500">
                      Envie seu testemunho ou pedido de oração para a igreja.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {formFeedback && (
                  <div
                    className={`p-4 rounded-2xl text-xs font-bold flex items-start gap-2.5 ${
                      formFeedback.type === "success"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {formFeedback.type === "success" ? (
                      <Check className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                    )}
                    <span>{formFeedback.text}</span>
                  </div>
                )}

                <form onSubmit={handleCreatePost} className="space-y-4">
                  {/* Author Name + Anonymous Checkbox */}
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-primary-main">
                      Nome do Autor {!isAnonymous && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="text"
                      disabled={isAnonymous}
                      placeholder={isAnonymous ? "Anônimo" : "Seu nome completo"}
                      value={isAnonymous ? "" : authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-accent-gold focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
                    />

                    <label className="flex items-center gap-2 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded border-gray-300 text-primary-main focus:ring-accent-gold"
                      />
                      <span className="text-xs text-gray-600 font-semibold">
                        Publicar como Anônimo / Anonymous
                      </span>
                    </label>
                  </div>

                  {/* Email (Optional) */}
                  <div className="space-y-1">
                    <label className="block text-xs font-extrabold text-primary-main">
                      E-mail <span className="text-gray-400 font-normal">(Opcional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-accent-gold focus:outline-none"
                    />
                  </div>

                  {/* Category Selection */}
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-primary-main">
                      Categoria da Publicação <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setCategory("testimony")}
                        className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          category === "testimony"
                            ? "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm"
                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span>Testemunho / Conquista</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCategory("prayer")}
                        className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          category === "prayer"
                            ? "bg-purple-50 border-purple-500 text-purple-800 shadow-sm"
                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <Heart className="w-4 h-4 text-purple-600" />
                        <span>Pedido de Oração</span>
                      </button>
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="space-y-1">
                    <label className="block text-xs font-extrabold text-primary-main">
                      Mensagem <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Escreva aqui seu testemunho ou pedido de oração..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-accent-gold focus:outline-none resize-none"
                    />
                  </div>

                  {/* Image Upload Input (Optional, max 2MB) */}
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold text-primary-main">
                      Imagem Anexa <span className="text-gray-400 font-normal">(Opcional, máx. 2MB)</span>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary-main/10 file:text-primary-main hover:file:bg-primary-main/20 cursor-pointer"
                    />
                    {imageError && (
                      <p className="text-[11px] text-red-600 font-bold">{imageError}</p>
                    )}
                    {imageUrl && !imageError && (
                      <div className="relative aspect-video max-h-40 rounded-2xl overflow-hidden border border-gray-200">
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setImageUrl("")}
                          className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-black"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Terms Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="mt-0.5 rounded border-gray-300 text-primary-main focus:ring-accent-gold"
                      />
                      <span className="text-xs text-gray-600 leading-tight">
                        Concordo com os <strong className="text-primary-main">Termos de Uso</strong> e regras de convivência da comunidade cristã.
                      </span>
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-primary-main hover:bg-primary-dark text-accent-gold text-xs font-extrabold shadow-md shadow-primary-main/10 cursor-pointer"
                    >
                      Enviar Publicação
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

