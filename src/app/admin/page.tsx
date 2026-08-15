"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { useData } from "@/components/DataContext";
import { Settings, DBMessage, ShopItem, NewsPost, EventItem, Volunteer, BirthdayItem, MuralPost, MuralStatus } from "@/db/mockData";
import { 
  Lock, Settings as SettingsIcon, Play, BookOpen, Newspaper, Calendar, Users, 
  Plus, Edit, Trash2, Save, LogOut, CheckCircle, ShieldAlert, Radio, HelpCircle, Gift,
  MessageSquare, Check, X, ToggleLeft, ToggleRight, Clock, Sparkles
} from "lucide-react";

export default function AdminPage() {
  const { language, t } = useLanguage();
  const { 
    settings, updateSettings, 
    messages, addMessage, updateMessage, deleteMessage,
    shopItems, addShopItem, updateShopItem, deleteShopItem,
    news, addNewsPost, updateNewsPost, deleteNewsPost,
    events, addEvent, updateEvent, deleteEvent,
    volunteers, 
    birthdays, addBirthday, updateBirthday, deleteBirthday,
    muralPosts, updateMuralPostStatus, deleteMuralPost,
  } = useData();

  // Authentication State
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<"settings" | "popup" | "messages" | "shop" | "news" | "events" | "volunteers" | "birthdays" | "mural">("settings");
  const [adminMuralFilter, setAdminMuralFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  // Save Confirmations
  const [saveSuccess, setSaveSuccess] = useState(false);

  // General Settings Form state
  const [formSettings, setFormSettings] = useState<Settings>({ ...settings });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormSettings({
          ...formSettings,
          pastor_image_url: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEventImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingEvt) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingEvt({
          ...editingEvt,
          image_url: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormSettings({
          ...formSettings,
          radio_recorded_url: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // CRUD Forms State
  const [editingMsg, setEditingMsg] = useState<Partial<DBMessage> | null>(null);
  const [editingShop, setEditingShop] = useState<Partial<ShopItem> | null>(null);
  const [editingNews, setEditingNews] = useState<Partial<NewsPost> | null>(null);
  const [editingEvt, setEditingEvt] = useState<Partial<EventItem> | null>(null);
  const [editingBday, setEditingBday] = useState<Partial<BirthdayItem> | null>(null);
  const [bdayFilterMonth, setBdayFilterMonth] = useState<string>("all");

  const handleBdayImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingBday) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingBday({
          ...editingBday,
          image_url: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple admin password check
    if (password === "reinando123") {
      setIsAuthenticated(true);
      setAuthError(false);
      setFormSettings({ ...settings }); // Sync local form settings
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await updateSettings(formSettings);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // --- CRUD MESSAGES (Sermons, studies, devotionals) ---
  const handleOpenMsgForm = (msg: DBMessage | null) => {
    if (msg) {
      setEditingMsg({ ...msg });
    } else {
      setEditingMsg({
        type: "video",
        title_pt: "", title_en: "", title_es: "",
        author: "Pr. Samuel Rodrigues",
        content_pt: "", content_en: "", content_es: "",
        url: "",
        date: new Date().toISOString().split("T")[0],
      });
    }
  };

  const handleSaveMsg = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMsg) return;

    let ok = false;
    if (editingMsg.id) {
      ok = await updateMessage(editingMsg as DBMessage);
    } else {
      ok = await addMessage(editingMsg as Omit<DBMessage, "id">);
    }

    if (ok) {
      setEditingMsg(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleDeleteMsg = async (id: string) => {
    if (window.confirm("Deseja realmente excluir este registro?")) {
      await deleteMessage(id);
    }
  };

  // --- CRUD SHOP ITEMS (Courses, materials) ---
  const handleOpenShopForm = (item: ShopItem | null) => {
    if (item) {
      setEditingShop({ ...item });
    } else {
      setEditingShop({
        title_pt: "", title_en: "", title_es: "",
        description_pt: "", description_en: "", description_es: "",
        price: 0,
        image_url: "",
        download_url: "",
      });
    }
  };

  const handleSaveShop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingShop) return;

    let ok = false;
    if (editingShop.id) {
      ok = await updateShopItem(editingShop as ShopItem);
    } else {
      ok = await addShopItem(editingShop as Omit<ShopItem, "id">);
    }

    if (ok) {
      setEditingShop(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleDeleteShop = async (id: string) => {
    if (window.confirm("Deseja realmente excluir este produto?")) {
      await deleteShopItem(id);
    }
  };

  // --- CRUD NEWS ---
  const handleOpenNewsForm = (post: NewsPost | null) => {
    if (post) {
      setEditingNews({ ...post });
    } else {
      setEditingNews({
        title_pt: "", title_en: "", title_es: "",
        content_pt: "", content_en: "", content_es: "",
        image_url: "",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toTimeString().split(" ")[0].slice(0, 5),
      });
    }
  };

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;

    let ok = false;
    if (editingNews.id) {
      ok = await updateNewsPost(editingNews as NewsPost);
    } else {
      ok = await addNewsPost(editingNews as Omit<NewsPost, "id">);
    }

    if (ok) {
      setEditingNews(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (window.confirm("Excluir esta notícia permanentemente?")) {
      await deleteNewsPost(id);
    }
  };

  // --- CRUD EVENTS ---
  const handleOpenEvtForm = (evt: EventItem | null) => {
    if (evt) {
      setEditingEvt({ ...evt });
    } else {
      setEditingEvt({
        title_pt: "", title_en: "", title_es: "",
        description_pt: "", description_en: "", description_es: "",
        date: new Date().toISOString().slice(0, 16),
        location: "São Paulo - Santana",
        is_service: true,
        image_url: "",
        is_past: false,
      });
    }
  };

  const handleSaveEvt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvt) return;

    let ok = false;
    if (editingEvt.id) {
      ok = await updateEvent(editingEvt as EventItem);
    } else {
      ok = await addEvent(editingEvt as Omit<EventItem, "id">);
    }

    if (ok) {
      setEditingEvt(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleDeleteEvt = async (id: string) => {
    if (window.confirm("Excluir este evento do calendário?")) {
      await deleteEvent(id);
    }
  };

  // --- CRUD BIRTHDAYS ---
  const handleOpenBdayForm = (bday: BirthdayItem | null) => {
    if (bday) {
      setEditingBday({ ...bday });
    } else {
      setEditingBday({
        name: "",
        day: 1,
        month: new Date().getMonth() + 1,
        image_url: "",
        is_active: true,
      });
    }
  };

  const handleSaveBday = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBday) return;

    let ok = false;
    if (editingBday.id) {
      ok = await updateBirthday(editingBday as BirthdayItem);
    } else {
      ok = await addBirthday(editingBday as Omit<BirthdayItem, "id">);
    }

    if (ok) {
      setEditingBday(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleDeleteBday = async (id: string) => {
    if (window.confirm("Excluir este aniversariante?")) {
      await deleteBirthday(id);
    }
  };

  const handleSaveBdayMessage = async () => {
    await updateSettings(formSettings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // ----------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="bg-[#06120B] min-h-screen -mx-4 sm:-mx-6 lg:-mx-8 -mt-8 -mb-8 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0F2918] p-8 rounded-3xl border border-emerald-800/40 shadow-2xl space-y-6 text-left">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 bg-accent-gold text-[#06120B] rounded-2xl flex items-center justify-center shadow-lg">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="font-display font-extrabold text-xl text-white">
              {t("adminLoginTitle")}
            </h2>
            <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
              Painel Admin Reinando em Vida
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-950/40 border border-red-500/30 text-xs font-semibold text-red-305 rounded-xl flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
              <span>{t("adminError")}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-emerald-450 uppercase tracking-wider block">
                {t("adminPassword")}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Insira a senha do administrador"
                className="w-full px-3 py-2.5 rounded-xl bg-[#06120B] border border-emerald-700/50 text-white placeholder-emerald-600/60 text-xs focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none"
              />
              <span className="text-[9px] text-gray-400 block mt-1">
                Dica para teste: a senha é <code className="font-mono font-bold text-accent-gold">reinando123</code>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-accent-gold hover:bg-accent-gold-dark text-[#06120B] font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              {t("adminLoginBtn")}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ----------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD
  // ----------------------------------------
  return (
    <div className="admin-dark-theme bg-[#06120B] text-gray-250 min-h-screen -mx-4 sm:-mx-6 lg:-mx-8 -mt-8 -mb-8 px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-left">
         {/* Dynamic Style Injection for Admin Dark Theme Forms */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* 1. Global Labels, Headings, and Texts */
        .admin-dark-theme label {
          color: #d1fae5 !important; /* text-emerald-100 */
        }
        .admin-dark-theme h1, 
        .admin-dark-theme h2, 
        .admin-dark-theme h3, 
        .admin-dark-theme h4, 
        .admin-dark-theme h5, 
        .admin-dark-theme h6 {
          color: #ffffff !important;
        }
        /* Override specific classes that make texts dark in dark theme */
        .admin-dark-theme .text-gray-500,
        .admin-dark-theme .text-gray-700,
        .admin-dark-theme .text-primary-main {
          color: #d1fae5 !important; /* text-emerald-100 */
        }
        .admin-dark-theme .text-gray-600 {
          color: #f3f4f6 !important; /* text-gray-100 */
        }
        
        /* 2. Inputs, Textareas, Selects & Placeholders */
        .admin-dark-theme input:not([type="file"]):not([type="checkbox"]), 
        .admin-dark-theme select, 
        .admin-dark-theme textarea {
          background-color: #06120B !important;
          border-color: rgba(16, 185, 129, 0.6) !important; /* border border-emerald-800/60 */
          color: #ffffff !important;
          font-weight: 500 !important;
        }
        .admin-dark-theme input:focus, 
        .admin-dark-theme select:focus, 
        .admin-dark-theme textarea:focus {
          border-color: #F1C40F !important; /* focus:border-yellow-400 */
          outline: none !important;
          box-shadow: 0 0 0 1px #F1C40F !important;
        }
        .admin-dark-theme input::placeholder, 
        .admin-dark-theme textarea::placeholder {
          color: rgba(209, 250, 229, 0.5) !important; /* placeholder-emerald-200/50 */
        }
        
        /* 3. Tables & Lists */
        .admin-dark-theme .border-gray-200 {
          border-color: rgba(16, 185, 129, 0.4) !important;
        }
        .admin-dark-theme thead.bg-gray-50 {
          background-color: #06120B !important;
          border-bottom-color: rgba(16, 185, 129, 0.4) !important;
        }
        .admin-dark-theme th {
          color: #F1C40F !important; /* text-yellow-400 */
          font-weight: bold !important;
        }
        .admin-dark-theme tbody.divide-y.divide-gray-100 {
          border-color: rgba(16, 185, 129, 0.15) !important;
        }
        .admin-dark-theme tbody.divide-y.divide-gray-100 > :not([hidden]) ~ :not([hidden]) {
          border-top-color: rgba(16, 185, 129, 0.15) !important;
        }
        .admin-dark-theme td {
          color: #f3f4f6 !important; /* text-gray-100 */
        }
        .admin-dark-theme tr {
          background-color: #0A1B10 !important;
        }
        .admin-dark-theme tr.hover\:bg-gray-50:hover,
        .admin-dark-theme tbody tr:hover {
          background-color: rgba(16, 185, 129, 0.15) !important; /* custom green hover */
        }
        
        /* 4. Action Buttons Inside Admin Tabs */
        .admin-dark-theme button.border-gray-200.text-gray-600,
        .admin-dark-theme a.border-gray-200.text-gray-600 {
          border-color: rgba(16, 185, 129, 0.4) !important;
          color: #d1fae5 !important; /* text-emerald-100 */
          background-color: transparent !important;
        }
        .admin-dark-theme button.border-gray-200.text-gray-600:hover,
        .admin-dark-theme a.border-gray-200.text-gray-600:hover {
          background-color: rgba(16, 185, 129, 0.2) !important;
          color: #F1C40F !important; /* text-yellow-400 */
          border-color: #F1C40F !important;
        }
        
        .admin-dark-theme button.border-red-200.text-red-600 {
          border-color: rgba(239, 68, 68, 0.4) !important;
          color: #fca5a5 !important; /* red-300 */
          background-color: transparent !important;
        }
        .admin-dark-theme button.border-red-200.text-red-600:hover {
          background-color: rgba(239, 68, 68, 0.2) !important;
          color: #ef4444 !important; /* red-500 */
          border-color: #ef4444 !important;
        }
      ` }} />

      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/30 pb-5">
        <div className="space-y-1">
          <span className="px-2.5 py-0.5 rounded-full bg-accent-gold/15 text-accent-gold text-[9px] font-extrabold uppercase tracking-widest">
            Acesso Autorizado
          </span>
          <h1 className="font-display font-extrabold text-2xl text-white">
            {t("adminWelcome")}
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl border border-red-500/30 hover:bg-red-950/20 text-red-400 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sair do Painel</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-900/40 border border-emerald-800/30 text-xs font-semibold text-emerald-300 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>{t("adminSaveSuccess")}</span>
        </div>
      )}

      {/* Admin navigation layout: Sidebar or grid tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 bg-[#0F2918] p-4 rounded-2xl border border-emerald-800/40 shadow-lg space-y-1">
          {([
            { id: "settings", label: t("adminTabSettings"), icon: SettingsIcon },
            { id: "popup", label: "Pop-up de Avisos", icon: Radio },
            { id: "messages", label: "Mensagens & Sermões", icon: Play },
            { id: "shop", label: "Catálogo da Loja", icon: BookOpen },
            { id: "news", label: "Blog & Notícias", icon: Newspaper },
            { id: "events", label: "Calendário & Cultos", icon: Calendar },
            { id: "volunteers", label: "Voluntários Cadastrados", icon: Users },
            { id: "birthdays", label: "Aniversariantes", icon: Gift },
            { id: "mural", label: "Gerenciar Mural", icon: MessageSquare },
          ] as const).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setEditingMsg(null);
                  setEditingShop(null);
                  setEditingNews(null);
                  setEditingEvt(null);
                  setEditingBday(null);
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#F1C40F] text-[#0A1B10] font-bold shadow-md"
                    : "text-gray-200 hover:bg-emerald-900/60 hover:text-yellow-400"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Panels */}
        <div className="lg:col-span-9 bg-[#0F2918] p-6 md:p-8 rounded-3xl border border-emerald-800/40 shadow-lg">
          
          {/* TAB 1: GENERAL SETTINGS */}
          {activeTab === "settings" && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <h3 className="font-display font-bold text-base text-white border-b border-emerald-850/20 pb-3">
                {t("adminTabSettings")}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                {/* Hero Banner Section */}
                <div className="col-span-1 sm:col-span-2 border-b border-emerald-850/20 pb-3">
                  <h4 className="font-bold text-white text-xs">Textos do Banner Principal (Hero)</h4>
                </div>

                <div className="col-span-1 sm:col-span-2 flex items-center gap-2 py-2">
                  <input
                    type="checkbox"
                    id="show_hero_badge"
                    checked={formSettings.show_hero_badge ?? true}
                    onChange={(e) => setFormSettings({ ...formSettings, show_hero_badge: e.target.checked })}
                    className="w-4 h-4 rounded text-accent-gold focus:ring-accent-gold bg-transparent border-emerald-700/50"
                  />
                  <label htmlFor="show_hero_badge" className="text-xs font-bold text-emerald-450 cursor-pointer select-none">
                    Exibir Tag Superior no Banner ("• ROMANOS 5:17")
                  </label>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Título (PT)</label>
                  <input
                    type="text"
                    value={formSettings.hero_title_pt || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, hero_title_pt: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Título (EN)</label>
                  <input
                    type="text"
                    value={formSettings.hero_title_en || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, hero_title_en: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Título (ES)</label>
                  <input
                    type="text"
                    value={formSettings.hero_title_es || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, hero_title_es: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>

                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    Tamanho da Fonte do Título (Banner Principal)
                  </label>
                  <select
                    value={formSettings.hero_title_size || "auto"}
                    onChange={(e) => setFormSettings({ ...formSettings, hero_title_size: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  >
                    <option value="auto">Automático (Reajusta com base no comprimento do texto)</option>
                    <option value="small">Pequeno (Ideal para textos longos/parágrafos)</option>
                    <option value="medium">Médio (Tamanho intermediário)</option>
                    <option value="large">Grande (Destaque principal)</option>
                  </select>
                </div>

                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Subtítulo (PT)</label>
                  <textarea
                    rows={2}
                    value={formSettings.hero_subtitle_pt || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, hero_subtitle_pt: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Subtítulo (EN)</label>
                  <textarea
                    rows={2}
                    value={formSettings.hero_subtitle_en || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, hero_subtitle_en: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Subtítulo (ES)</label>
                  <textarea
                    rows={2}
                    value={formSettings.hero_subtitle_es || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, hero_subtitle_es: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>

                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Versículo Bíblico (PT)</label>
                  <input
                    type="text"
                    value={formSettings.hero_verse_pt || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, hero_verse_pt: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Versículo Bíblico (EN)</label>
                  <input
                    type="text"
                    value={formSettings.hero_verse_en || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, hero_verse_en: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Versículo Bíblico (ES)</label>
                  <input
                    type="text"
                    value={formSettings.hero_verse_es || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, hero_verse_es: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>

                <div className="col-span-1 sm:col-span-2 border-b border-gray-100 pb-3 mt-4">
                  <h4 className="font-bold text-primary-main text-xs">Configurações Gerais e Integrações</h4>
                </div>

                
                {/* URLs settings */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    Link do Instituto (Menu)
                  </label>
                  <input
                    type="url"
                    value={formSettings.instituto_url}
                    onChange={(e) => setFormSettings({ ...formSettings, instituto_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    WhatsApp da Igreja
                  </label>
                  <input
                    type="text"
                    value={formSettings.whatsapp_number}
                    onChange={(e) => setFormSettings({ ...formSettings, whatsapp_number: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    Tipo de Transmissão da Rádio
                  </label>
                  <select
                    value={formSettings.radio_transmission_type || "live"}
                    onChange={(e) => setFormSettings({ ...formSettings, radio_transmission_type: e.target.value as "live" | "recorded" })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  >
                    <option value="live">Streaming ao Vivo (Shoutcast/Zeno.fm)</option>
                    <option value="recorded">Áudio Gravado (Playlist / Loop MP3)</option>
                  </select>
                </div>

                {(formSettings.radio_transmission_type || "live") === "live" ? (
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                      URL Streaming Rádio Online (Ao Vivo)
                    </label>
                    <input
                      type="url"
                      value={formSettings.radio_stream_url || ""}
                      onChange={(e) => setFormSettings({ ...formSettings, radio_stream_url: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      placeholder="https://stream.zeno.fm/..."
                    />
                  </div>
                ) : (
                  <div className="space-y-1.5 sm:col-span-2 border border-emerald-800/10 p-3 rounded-xl bg-emerald-950/5">
                    <span className="text-[10px] font-bold text-accent-gold uppercase tracking-wider block mb-2">
                      Configurações do Áudio Gravado (Loop)
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <span className="text-[9px] text-gray-400 block font-semibold">Upload de arquivo de áudio (MP3)</span>
                        <input
                          type="file"
                          accept="audio/*"
                          onChange={handleAudioUpload}
                          className="w-full text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-semibold file:bg-primary-main/10 file:text-primary-main hover:file:bg-primary-main/20 file:cursor-pointer"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] text-gray-400 block font-semibold">Ou URL direta do áudio</span>
                        <input
                          type="text"
                          value={formSettings.radio_recorded_url || ""}
                          onChange={(e) => setFormSettings({ ...formSettings, radio_recorded_url: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-xl border border-gray-200 font-mono text-xs"
                          placeholder="https://exemplo.com/musica.mp3"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-800/10">
                      <input
                        type="checkbox"
                        id="radio_recorded_loop"
                        checked={formSettings.radio_recorded_loop ?? true}
                        onChange={(e) => setFormSettings({ ...formSettings, radio_recorded_loop: e.target.checked })}
                        className="w-4 h-4 rounded text-accent-gold focus:ring-accent-gold"
                      />
                      <label htmlFor="radio_recorded_loop" className="text-xs font-semibold text-emerald-450 cursor-pointer select-none">
                        Executar em Loop Contínuo (Reiniciar automaticamente ao terminar)
                      </label>
                    </div>
                    {formSettings.radio_recorded_url && (
                      <div className="mt-2 text-[10px] text-green-600 font-semibold flex items-center gap-1.5">
                        <span>✓ Fonte do áudio configurada:</span>
                        <code className="font-mono text-emerald-400 bg-emerald-950/20 px-1 rounded truncate max-w-xs">{formSettings.radio_recorded_url.startsWith("data:") ? "Arquivo enviado (Base64)" : formSettings.radio_recorded_url}</code>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    URL Culto Ao Vivo (YouTube Embed)
                  </label>
                  <input
                    type="url"
                    value={formSettings.youtube_live_url}
                    onChange={(e) => setFormSettings({ ...formSettings, youtube_live_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    Status do Player Rodapé
                  </label>
                  <select
                    value={formSettings.player_status}
                    onChange={(e) => setFormSettings({ ...formSettings, player_status: e.target.value as "online" | "offline" })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  >
                    <option value="online">Online (Com transmissão ativa)</option>
                    <option value="offline">Offline (Desabilitado)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    Carteira USDT (USDT-TRC20)
                  </label>
                  <input
                    type="text"
                    value={formSettings.usdt_wallet}
                    onChange={(e) => setFormSettings({ ...formSettings, usdt_wallet: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 font-mono font-semibold"
                  />
                </div>

                <div className="col-span-1 sm:col-span-2 border-b border-gray-100 pb-3 mt-4">
                  <h4 className="font-bold text-primary-main text-xs">Atalhos Rápidos (Cards da Home)</h4>
                </div>

                {/* Card 1 */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Card 1 - Título</label>
                  <input
                    type="text"
                    value={formSettings.card1_title || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, card1_title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Card 1 - Link de Destino</label>
                  <input
                    type="text"
                    value={formSettings.card1_link || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, card1_link: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Card 1 - Descrição</label>
                  <input
                    type="text"
                    value={formSettings.card1_desc || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, card1_desc: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1 col-span-1 sm:col-span-2 border-b border-gray-800/10 pb-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Card 1 - Texto do Botão (CTA)</label>
                  <input
                    type="text"
                    value={formSettings.card1_cta || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, card1_cta: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>

                {/* Card 2 */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Card 2 - Título</label>
                  <input
                    type="text"
                    value={formSettings.card2_title || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, card2_title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Card 2 - Link de Destino</label>
                  <input
                    type="text"
                    value={formSettings.card2_link || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, card2_link: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Card 2 - Descrição</label>
                  <input
                    type="text"
                    value={formSettings.card2_desc || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, card2_desc: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1 col-span-1 sm:col-span-2 border-b border-gray-800/10 pb-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Card 2 - Texto do Botão (CTA)</label>
                  <input
                    type="text"
                    value={formSettings.card2_cta || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, card2_cta: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>

                {/* Card 3 */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Card 3 - Título</label>
                  <input
                    type="text"
                    value={formSettings.card3_title || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, card3_title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Card 3 - Link de Destino</label>
                  <input
                    type="text"
                    value={formSettings.card3_link || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, card3_link: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Card 3 - Descrição</label>
                  <input
                    type="text"
                    value={formSettings.card3_desc || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, card3_desc: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1 col-span-1 sm:col-span-2 border-b border-gray-800/10 pb-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Card 3 - Texto do Botão (CTA)</label>
                  <input
                    type="text"
                    value={formSettings.card3_cta || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, card3_cta: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>

                {/* Card 4 */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Card 4 - Título</label>
                  <input
                    type="text"
                    value={formSettings.card4_title || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, card4_title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Card 4 - Link de Destino</label>
                  <input
                    type="text"
                    value={formSettings.card4_link || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, card4_link: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Card 4 - Descrição</label>
                  <input
                    type="text"
                    value={formSettings.card4_desc || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, card4_desc: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Card 4 - Texto do Botão (CTA)</label>
                  <input
                    type="text"
                    value={formSettings.card4_cta || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, card4_cta: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>

                {/* Pastor Welcome Message Settings */}
                <div className="space-y-1 col-span-1 sm:col-span-2 border-b border-gray-100 pb-3 mt-4">
                  <h4 className="font-bold text-primary-main text-xs">Mensagem de Boas-Vindas do Pastor Presidente</h4>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    Nome do Pastor
                  </label>
                  <input
                    type="text"
                    value={formSettings.pastor_name || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, pastor_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    Foto do Pastor (Upload Local)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-semibold file:bg-primary-main/10 file:text-primary-main hover:file:bg-primary-main/20 file:cursor-pointer"
                  />
                </div>

                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    Foto do Pastor (URL Direta / Preview)
                  </label>
                  <input
                    type="text"
                    value={formSettings.pastor_image_url || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, pastor_image_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-mono"
                    placeholder="URL da imagem (ex: /images/pastor.png ou base64 Data URL)"
                  />
                  {formSettings.pastor_image_url && (
                    <div className="mt-2 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                        <img src={formSettings.pastor_image_url} alt="Preview Pastor" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] text-green-600 font-semibold">✓ Imagem carregada e pronta</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Cargo (PT)</label>
                  <input
                    type="text"
                    value={formSettings.pastor_role_pt || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, pastor_role_pt: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Cargo (EN)</label>
                  <input
                    type="text"
                    value={formSettings.pastor_role_en || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, pastor_role_en: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Cargo (ES)</label>
                  <input
                    type="text"
                    value={formSettings.pastor_role_es || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, pastor_role_es: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Título Boas-Vindas (PT)</label>
                  <input
                    type="text"
                    value={formSettings.pastor_title_pt || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, pastor_title_pt: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Título Boas-Vindas (EN)</label>
                  <input
                    type="text"
                    value={formSettings.pastor_title_en || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, pastor_title_en: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Título Boas-Vindas (ES)</label>
                  <input
                    type="text"
                    value={formSettings.pastor_title_es || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, pastor_title_es: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>

                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Citação em Itálico (PT)</label>
                  <textarea
                    rows={2}
                    value={formSettings.pastor_quote_pt || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, pastor_quote_pt: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Citação em Itálico (EN)</label>
                  <textarea
                    rows={2}
                    value={formSettings.pastor_quote_en || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, pastor_quote_en: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Citação em Itálico (ES)</label>
                  <textarea
                    rows={2}
                    value={formSettings.pastor_quote_es || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, pastor_quote_es: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>

                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Parágrafo Descritivo (PT)</label>
                  <textarea
                    rows={3}
                    value={formSettings.pastor_desc_pt || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, pastor_desc_pt: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Parágrafo Descritivo (EN)</label>
                  <textarea
                    rows={3}
                    value={formSettings.pastor_desc_en || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, pastor_desc_en: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Parágrafo Descritivo (ES)</label>
                  <textarea
                    rows={3}
                    value={formSettings.pastor_desc_es || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, pastor_desc_es: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>

                <div className="space-y-1 col-span-1 sm:col-span-2 border-t border-gray-800/10 pt-4 mt-2">
                  <span className="text-[10px] font-bold text-accent-gold uppercase tracking-wider block">
                    Mensagem do Pastor (Página Quem Somos)
                  </span>
                </div>

                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Mensagem Quem Somos (PT)</label>
                  <textarea
                    rows={3}
                    value={formSettings.pastor_about_pt || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, pastor_about_pt: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Mensagem Quem Somos (EN)</label>
                  <textarea
                    rows={3}
                    value={formSettings.pastor_about_en || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, pastor_about_en: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Mensagem Quem Somos (ES)</label>
                  <textarea
                    rows={3}
                    value={formSettings.pastor_about_es || ""}
                    onChange={(e) => setFormSettings({ ...formSettings, pastor_about_es: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>

                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <h4 className="font-bold text-primary-main mt-4 mb-2 text-xs">Redes Sociais</h4>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    value={formSettings.facebook_url}
                    onChange={(e) => setFormSettings({ ...formSettings, facebook_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={formSettings.instagram_url}
                    onChange={(e) => setFormSettings({ ...formSettings, instagram_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>

                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    YouTube Canal URL
                  </label>
                  <input
                    type="url"
                    value={formSettings.youtube_channel_url}
                    onChange={(e) => setFormSettings({ ...formSettings, youtube_channel_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>

                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <h4 className="font-bold text-primary-main mt-4 mb-2 text-xs">Chaves API Gateways de Pagamento (Mock)</h4>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    Stripe Public Key
                  </label>
                  <input
                    type="text"
                    value={formSettings.stripe_key}
                    onChange={(e) => setFormSettings({ ...formSettings, stripe_key: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    Mercado Pago Public Key
                  </label>
                  <input
                    type="text"
                    value={formSettings.mercado_pago_key}
                    onChange={(e) => setFormSettings({ ...formSettings, mercado_pago_key: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 font-mono"
                  />
                </div>

                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    PayPal Client ID
                  </label>
                  <input
                    type="text"
                    value={formSettings.paypal_client_id}
                    onChange={(e) => setFormSettings({ ...formSettings, paypal_client_id: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 font-mono"
                  />
                </div>

              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-primary-main hover:bg-primary-dark text-accent-gold font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Configurações</span>
              </button>
            </form>
          )}

          {/* TAB 2: ANNOUNCEMENT POP-UP CONFIG */}
          {activeTab === "popup" && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <h3 className="font-display font-bold text-base text-primary-main border-b border-gray-100 pb-3">
                Configuração do Pop-up da Home
              </h3>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex gap-3 text-left">
                <input
                  type="checkbox"
                  id="form-popup-enabled"
                  checked={formSettings.popup_enabled}
                  onChange={(e) => setFormSettings({ ...formSettings, popup_enabled: e.target.checked })}
                  className="w-4 h-4 text-primary-main accent-primary-main border-gray-300 rounded focus:ring-primary-main shrink-0 mt-0.5"
                />
                <label htmlFor="form-popup-enabled" className="text-xs text-gray-700 font-semibold select-none">
                  Exibir Pop-up de Aviso Automático na Home?
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 text-xs">
                
                {/* Multilingual Titles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Título (PT)</label>
                    <input
                      type="text"
                      value={formSettings.popup_title_pt}
                      onChange={(e) => setFormSettings({ ...formSettings, popup_title_pt: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Título (EN)</label>
                    <input
                      type="text"
                      value={formSettings.popup_title_en}
                      onChange={(e) => setFormSettings({ ...formSettings, popup_title_en: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Título (ES)</label>
                    <input
                      type="text"
                      value={formSettings.popup_title_es}
                      onChange={(e) => setFormSettings({ ...formSettings, popup_title_es: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200"
                    />
                  </div>
                </div>

                {/* Multilingual Description texts */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Texto do Pop-up (PT)</label>
                  <textarea
                    rows={3}
                    value={formSettings.popup_text_pt}
                    onChange={(e) => setFormSettings({ ...formSettings, popup_text_pt: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Texto do Pop-up (EN)</label>
                  <textarea
                    rows={3}
                    value={formSettings.popup_text_en}
                    onChange={(e) => setFormSettings({ ...formSettings, popup_text_en: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Texto do Pop-up (ES)</label>
                  <textarea
                    rows={3}
                    value={formSettings.popup_text_es}
                    onChange={(e) => setFormSettings({ ...formSettings, popup_text_es: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                    Link de redirecionamento do Botão (Ex: /eventos ou URL completa)
                  </label>
                  <input
                    type="text"
                    value={formSettings.popup_link}
                    onChange={(e) => setFormSettings({ ...formSettings, popup_link: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>

              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-primary-main hover:bg-primary-dark text-accent-gold font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Pop-up</span>
              </button>
            </form>
          )}

          {/* TAB 3: MANAGE MESSAGES (CRUD) */}
          {activeTab === "messages" && (
            <div className="space-y-6">
              
              {!editingMsg ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <h3 className="font-display font-bold text-base text-primary-main">
                      Acervo de Mensagens, Sermões e Estudos
                    </h3>
                    <button
                      onClick={() => handleOpenMsgForm(null)}
                      className="px-3.5 py-2 rounded-xl bg-primary-main hover:bg-primary-dark text-accent-gold font-bold text-xs flex items-center gap-1 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nova Mensagem</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto border border-gray-200 rounded-2xl">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-gray-50 border-b border-gray-200 font-bold text-gray-600">
                        <tr>
                          <th className="p-4">Tipo</th>
                          <th className="p-4">Título (PT)</th>
                          <th className="p-4">Autor</th>
                          <th className="p-4">Data</th>
                          <th className="p-4 text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {messages.map((msg) => (
                          <tr key={msg.id} className="hover:bg-gray-50">
                            <td className="p-4 font-semibold capitalize">{msg.type}</td>
                            <td className="p-4 max-w-xs truncate">{msg.title_pt}</td>
                            <td className="p-4">{msg.author}</td>
                            <td className="p-4">{new Date(msg.date).toLocaleDateString()}</td>
                            <td className="p-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleOpenMsgForm(msg)}
                                  className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteMsg(msg.id)}
                                  className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                // Message Form
                <form onSubmit={handleSaveMsg} className="space-y-4 text-xs">
                  <h3 className="font-display font-bold text-base text-primary-main border-b border-gray-100 pb-3">
                    {editingMsg.id ? "Editar Registro" : "Adicionar Novo Registro"}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Tipo</label>
                      <select
                        value={editingMsg.type}
                        onChange={(e) => setEditingMsg({ ...editingMsg, type: e.target.value as DBMessage["type"] })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      >
                        <option value="video">Vídeo (YouTube)</option>
                        <option value="audio">Áudio (Podcast)</option>
                        <option value="study">Estudo Bíblico (Google Drive Link)</option>
                        <option value="devotional">Devocional (Escrito)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Autor</label>
                      <input
                        type="text"
                        required
                        value={editingMsg.author}
                        onChange={(e) => setEditingMsg({ ...editingMsg, author: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Data de Lançamento</label>
                      <input
                        type="date"
                        required
                        value={editingMsg.date}
                        onChange={(e) => setEditingMsg({ ...editingMsg, date: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                  </div>

                  {/* Multilingual Titles */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Título (PT)</label>
                      <input
                        type="text"
                        required
                        value={editingMsg.title_pt}
                        onChange={(e) => setEditingMsg({ ...editingMsg, title_pt: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Título (EN)</label>
                      <input
                        type="text"
                        value={editingMsg.title_en}
                        onChange={(e) => setEditingMsg({ ...editingMsg, title_en: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Título (ES)</label>
                      <input
                        type="text"
                        value={editingMsg.title_es}
                        onChange={(e) => setEditingMsg({ ...editingMsg, title_es: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                  </div>

                  {/* Description / Content (PT) */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 block uppercase">Resumo / Conteúdo (PT)</label>
                    <textarea
                      required
                      rows={3}
                      value={editingMsg.content_pt}
                      onChange={(e) => setEditingMsg({ ...editingMsg, content_pt: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200"
                    />
                  </div>

                  {/* Description / Content (EN) */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 block uppercase">Resumo / Conteúdo (EN)</label>
                    <textarea
                      rows={3}
                      value={editingMsg.content_en}
                      onChange={(e) => setEditingMsg({ ...editingMsg, content_en: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200"
                    />
                  </div>

                  {/* Description / Content (ES) */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 block uppercase">Resumo / Conteúdo (ES)</label>
                    <textarea
                      rows={3}
                      value={editingMsg.content_es}
                      onChange={(e) => setEditingMsg({ ...editingMsg, content_es: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 block uppercase">URL da Mídia (Youtube Embed / MP3 link / Google Drive)</label>
                    <input
                      type="text"
                      value={editingMsg.url}
                      onChange={(e) => setEditingMsg({ ...editingMsg, url: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-primary-main hover:bg-primary-dark text-accent-gold font-bold"
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingMsg(null)}
                      className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

          {/* TAB 4: SHOP CATALOGUE CRUD */}
          {activeTab === "shop" && (
            <div className="space-y-6">
              {!editingShop ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <h3 className="font-display font-bold text-base text-primary-main">
                      Catálogo de Cursos & Materiais de Apoio
                    </h3>
                    <button
                      onClick={() => handleOpenShopForm(null)}
                      className="px-3.5 py-2 rounded-xl bg-primary-main hover:bg-primary-dark text-accent-gold font-bold text-xs flex items-center gap-1 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Novo Produto</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto border border-gray-200 rounded-2xl">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-gray-50 border-b border-gray-200 font-bold text-gray-600">
                        <tr>
                          <th className="p-4">Item</th>
                          <th className="p-4">Preço</th>
                          <th className="p-4">Download / Drive URL</th>
                          <th className="p-4 text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {shopItems.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="p-4 font-semibold">{item.title_pt}</td>
                            <td className="p-4 font-bold">{item.price === 0 ? "Gratuito" : `R$ ${item.price.toFixed(2)}`}</td>
                            <td className="p-4 max-w-xs truncate text-[10px] font-mono text-gray-500">{item.download_url}</td>
                            <td className="p-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleOpenShopForm(item)}
                                  className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteShop(item.id)}
                                  className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                // Shop Item Form
                <form onSubmit={handleSaveShop} className="space-y-4 text-xs">
                  <h3 className="font-display font-bold text-base text-primary-main border-b border-gray-100 pb-3">
                    {editingShop.id ? "Editar Produto" : "Adicionar Novo Produto"}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="space-y-1 col-span-3">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Título do Item (PT)</label>
                      <input
                        type="text"
                        required
                        value={editingShop.title_pt}
                        onChange={(e) => setEditingShop({ ...editingShop, title_pt: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                    <div className="space-y-1 col-span-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Preço (R$)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        value={editingShop.price}
                        onChange={(e) => setEditingShop({ ...editingShop, price: parseFloat(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 font-bold"
                      />
                    </div>
                  </div>

                  {/* Titles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Título do Item (EN)</label>
                      <input
                        type="text"
                        value={editingShop.title_en}
                        onChange={(e) => setEditingShop({ ...editingShop, title_en: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Título do Item (ES)</label>
                      <input
                        type="text"
                        value={editingShop.title_es}
                        onChange={(e) => setEditingShop({ ...editingShop, title_es: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 block uppercase">Descrição (PT)</label>
                    <textarea
                      required
                      rows={3}
                      value={editingShop.description_pt}
                      onChange={(e) => setEditingShop({ ...editingShop, description_pt: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 block uppercase">Descrição (EN)</label>
                    <textarea
                      rows={3}
                      value={editingShop.description_en}
                      onChange={(e) => setEditingShop({ ...editingShop, description_en: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 block uppercase">Descrição (ES)</label>
                    <textarea
                      rows={3}
                      value={editingShop.description_es}
                      onChange={(e) => setEditingShop({ ...editingShop, description_es: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">URL da Imagem de Capa</label>
                      <input
                        type="text"
                        required
                        value={editingShop.image_url}
                        onChange={(e) => setEditingShop({ ...editingShop, image_url: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">URL de Download (Google Drive)</label>
                      <input
                        type="text"
                        required
                        value={editingShop.download_url}
                        onChange={(e) => setEditingShop({ ...editingShop, download_url: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-primary-main hover:bg-primary-dark text-accent-gold font-bold"
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingShop(null)}
                      className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 5: BLOG AND NEWS CRUD */}
          {activeTab === "news" && (
            <div className="space-y-6">
              {!editingNews ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <h3 className="font-display font-bold text-base text-primary-main">
                      Notícias e Publicações de Blog
                    </h3>
                    <button
                      onClick={() => handleOpenNewsForm(null)}
                      className="px-3.5 py-2 rounded-xl bg-primary-main hover:bg-primary-dark text-accent-gold font-bold text-xs flex items-center gap-1 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nova Notícia</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto border border-gray-200 rounded-2xl">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-gray-50 border-b border-gray-200 font-bold text-gray-600">
                        <tr>
                          <th className="p-4">Título</th>
                          <th className="p-4">Data</th>
                          <th className="p-4">Horário</th>
                          <th className="p-4 text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {news.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="p-4 font-semibold max-w-sm truncate">{item.title_pt}</td>
                            <td className="p-4">{new Date(item.date).toLocaleDateString()}</td>
                            <td className="p-4">{item.time}</td>
                            <td className="p-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleOpenNewsForm(item)}
                                  className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteNews(item.id)}
                                  className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                // News Form
                <form onSubmit={handleSaveNews} className="space-y-4 text-xs">
                  <h3 className="font-display font-bold text-base text-primary-main border-b border-gray-100 pb-3">
                    {editingNews.id ? "Editar Publicação" : "Nova Publicação"}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Data de Publicação</label>
                      <input
                        type="date"
                        required
                        value={editingNews.date}
                        onChange={(e) => setEditingNews({ ...editingNews, date: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Horário</label>
                      <input
                        type="text"
                        required
                        value={editingNews.time}
                        onChange={(e) => setEditingNews({ ...editingNews, time: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Título (PT)</label>
                      <input
                        type="text"
                        required
                        value={editingNews.title_pt}
                        onChange={(e) => setEditingNews({ ...editingNews, title_pt: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Título (EN)</label>
                      <input
                        type="text"
                        value={editingNews.title_en}
                        onChange={(e) => setEditingNews({ ...editingNews, title_en: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Título (ES)</label>
                      <input
                        type="text"
                        value={editingNews.title_es}
                        onChange={(e) => setEditingNews({ ...editingNews, title_es: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 block uppercase">Conteúdo do Blog (PT)</label>
                    <textarea
                      required
                      rows={4}
                      value={editingNews.content_pt}
                      onChange={(e) => setEditingNews({ ...editingNews, content_pt: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 block uppercase">Conteúdo do Blog (EN)</label>
                    <textarea
                      rows={4}
                      value={editingNews.content_en}
                      onChange={(e) => setEditingNews({ ...editingNews, content_en: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 block uppercase">Conteúdo do Blog (ES)</label>
                    <textarea
                      rows={4}
                      value={editingNews.content_es}
                      onChange={(e) => setEditingNews({ ...editingNews, content_es: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 block uppercase">URL da Imagem de Destaque</label>
                    <input
                      type="text"
                      required
                      value={editingNews.image_url}
                      onChange={(e) => setEditingNews({ ...editingNews, image_url: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 font-mono"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-primary-main hover:bg-primary-dark text-accent-gold font-bold"
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingNews(null)}
                      className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 6: EVENT CALENDAR CRUD */}
          {activeTab === "events" && (
            <div className="space-y-6">
              {!editingEvt ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <h3 className="font-display font-bold text-base text-primary-main">
                      Calendário e Reuniões Semanais
                    </h3>
                    <button
                      onClick={() => handleOpenEvtForm(null)}
                      className="px-3.5 py-2 rounded-xl bg-primary-main hover:bg-primary-dark text-accent-gold font-bold text-xs flex items-center gap-1 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Novo Evento</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto border border-gray-200 rounded-2xl">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-gray-50 border-b border-gray-200 font-bold text-gray-600">
                        <tr>
                          <th className="p-4">Título</th>
                          <th className="p-4">Data/Hora</th>
                          <th className="p-4">Local</th>
                          <th className="p-4">Tipo</th>
                          <th className="p-4 text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {events.map((evt) => (
                          <tr key={evt.id} className="hover:bg-gray-50">
                            <td className="p-4 font-semibold">{evt.title_pt}</td>
                            <td className="p-4">{new Date(evt.date).toLocaleString()}</td>
                            <td className="p-4">{evt.location}</td>
                            <td className="p-4">{evt.is_service ? "Culto Regular" : "Evento Especial"}</td>
                            <td className="p-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleOpenEvtForm(evt)}
                                  className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteEvt(evt.id)}
                                  className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                // Event Form
                <form onSubmit={handleSaveEvt} className="space-y-4 text-xs">
                  <h3 className="font-display font-bold text-base text-primary-main border-b border-gray-100 pb-3">
                    {editingEvt.id ? "Editar Evento" : "Criar Novo Evento"}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Data e Hora</label>
                      <input
                        type="datetime-local"
                        required
                        value={editingEvt.date}
                        onChange={(e) => setEditingEvt({ ...editingEvt, date: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Localização</label>
                      <input
                        type="text"
                        required
                        value={editingEvt.location}
                        onChange={(e) => setEditingEvt({ ...editingEvt, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Tipo</label>
                      <select
                        value={editingEvt.is_service ? "true" : "false"}
                        onChange={(e) => setEditingEvt({ ...editingEvt, is_service: e.target.value === "true" })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      >
                        <option value="true">Culto Presencial de Rotina</option>
                        <option value="false">Evento Especial</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Título (PT)</label>
                      <input
                        type="text"
                        required
                        value={editingEvt.title_pt}
                        onChange={(e) => setEditingEvt({ ...editingEvt, title_pt: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Título (EN)</label>
                      <input
                        type="text"
                        value={editingEvt.title_en}
                        onChange={(e) => setEditingEvt({ ...editingEvt, title_en: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Título (ES)</label>
                      <input
                        type="text"
                        value={editingEvt.title_es}
                        onChange={(e) => setEditingEvt({ ...editingEvt, title_es: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 block uppercase">Descrição do Evento (PT)</label>
                    <textarea
                      required
                      rows={3}
                      value={editingEvt.description_pt}
                      onChange={(e) => setEditingEvt({ ...editingEvt, description_pt: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Imagem do Evento</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <span className="text-[9px] text-gray-400 block font-semibold">Upload de arquivo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleEventImageUpload}
                            className="w-full text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-semibold file:bg-primary-main/10 file:text-primary-main hover:file:bg-primary-main/20 file:cursor-pointer"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] text-gray-400 block font-semibold">Ou URL externa</span>
                          <input
                            type="text"
                            value={editingEvt.image_url || ""}
                            onChange={(e) => setEditingEvt({ ...editingEvt, image_url: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-xl border border-gray-200 font-mono text-xs"
                            placeholder="https://exemplo.com/imagem.jpg"
                          />
                        </div>
                      </div>
                      <span className="text-[9px] text-emerald-600 block mt-1 font-semibold">
                        Recomendado: Imagem quadrada no tamanho 400x400 pixels (PNG, JPG ou WEBP)
                      </span>
                      
                      {/* Miniature Preview */}
                      {editingEvt.image_url && (
                        <div className="mt-2 flex items-center gap-3">
                          <div className="w-16 h-16 rounded-xl overflow-hidden border border-emerald-800/20 shrink-0">
                            <img 
                              src={editingEvt.image_url} 
                              alt="Preview Evento" 
                              className="w-full h-full object-cover aspect-square" 
                            />
                          </div>
                          <span className="text-[10px] text-green-600 font-semibold">✓ Pré-visualização da Imagem</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Marcar como Evento Antigo?</label>
                      <select
                        value={editingEvt.is_past ? "true" : "false"}
                        onChange={(e) => setEditingEvt({ ...editingEvt, is_past: e.target.value === "true" })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      >
                        <option value="false">Evento Futuro</option>
                        <option value="true">Evento Passado (Entra na Galeria Histórica)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-primary-main hover:bg-primary-dark text-accent-gold font-bold"
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingEvt(null)}
                      className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 7: VOLUNTEERS VIEW */}
          {activeTab === "volunteers" && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-base text-primary-main border-b border-gray-100 pb-3">
                Inscrições de Voluntários
              </h3>

              <div className="overflow-x-auto border border-gray-200 rounded-2xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-gray-50 border-b border-gray-200 font-bold text-gray-600">
                    <tr>
                      <th className="p-4">Nome</th>
                      <th className="p-4">WhatsApp</th>
                      <th className="p-4">E-mail</th>
                      <th className="p-4">Consentimento LGPD</th>
                      <th className="p-4">Data do Cadastro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {volunteers.length > 0 ? (
                      volunteers.map((vol) => (
                        <tr key={vol.id} className="hover:bg-gray-50">
                          <td className="p-4 font-semibold">{vol.name}</td>
                          <td className="p-4">{vol.whatsapp}</td>
                          <td className="p-4">{vol.email}</td>
                          <td className="p-4">
                            <span className="px-2.5 py-0.5 rounded-full text-[9px] bg-green-50 text-green-700 border border-green-200 font-bold">
                              ✓ Consentido
                            </span>
                          </td>
                          <td className="p-4 text-gray-500">{new Date(vol.date).toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-400">
                          Nenhum voluntário cadastrado até o momento.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: BIRTHDAYS VIEW */}
          {activeTab === "birthdays" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-3">
                <h3 className="font-display font-bold text-base text-primary-main">
                  Gestão de Aniversariantes do Mês
                </h3>
                {!editingBday && (
                  <button
                    onClick={() => handleOpenBdayForm(null)}
                    className="px-3.5 py-1.5 rounded-xl bg-primary-main hover:bg-primary-dark text-accent-gold font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Cadastrar Aniversariante</span>
                  </button>
                )}
              </div>

              {/* Birthday felicitation message panel */}
              {!editingBday && (
                <div className="bg-[#0F2918]/30 border border-emerald-800/20 p-4 rounded-2xl space-y-4">
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider">
                    Mensagem Pastoral de Parabéns (Felicitações)
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Mensagem em Português</label>
                      <textarea
                        rows={2}
                        value={formSettings.birthday_message_pt || ""}
                        onChange={(e) => setFormSettings({ ...formSettings, birthday_message_pt: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSaveBdayMessage}
                    className="px-4 py-2 rounded-xl bg-accent-gold hover:bg-[#D4AC0D] text-[#0A1B10] font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Salvar Mensagem</span>
                  </button>
                </div>
              )}

              {editingBday ? (
                /* Form structure */
                <form onSubmit={handleSaveBday} className="space-y-4 max-w-xl bg-[#0F2918]/10 border border-emerald-800/10 p-5 rounded-2xl">
                  <h4 className="font-bold text-sm text-primary-main">
                    {editingBday.id ? "Editar Aniversariante" : "Cadastrar Novo Aniversariante"}
                  </h4>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 block uppercase">Nome Completo</label>
                    <input
                      type="text"
                      required
                      value={editingBday.name || ""}
                      onChange={(e) => setEditingBday({ ...editingBday, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Dia do Nascimento</label>
                      <input
                        type="number"
                        required
                        min={1}
                        max={31}
                        value={editingBday.day || ""}
                        onChange={(e) => setEditingBday({ ...editingBday, day: parseInt(e.target.value) || 1 })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 block uppercase">Mês do Nascimento</label>
                      <select
                        value={editingBday.month || 1}
                        onChange={(e) => setEditingBday({ ...editingBday, month: parseInt(e.target.value) || 1 })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200"
                      >
                        <option value={1}>Janeiro</option>
                        <option value={2}>Fevereiro</option>
                        <option value={3}>Março</option>
                        <option value={4}>Abril</option>
                        <option value={5}>Maio</option>
                        <option value={6}>Junho</option>
                        <option value={7}>Julho</option>
                        <option value={8}>Agosto</option>
                        <option value={9}>Setembro</option>
                        <option value={10}>Outubro</option>
                        <option value={11}>Novembro</option>
                        <option value={12}>Dezembro</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 block uppercase">Foto do Aniversariante (Opcional)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <span className="text-[9px] text-gray-400 block font-semibold">Upload de arquivo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBdayImageUpload}
                          className="w-full text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-semibold file:bg-primary-main/10 file:text-primary-main hover:file:bg-primary-main/20 file:cursor-pointer"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] text-gray-400 block font-semibold">Ou URL de Imagem externa</span>
                        <input
                          type="text"
                          value={editingBday.image_url || ""}
                          onChange={(e) => setEditingBday({ ...editingBday, image_url: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-xl border border-gray-200 font-mono text-xs"
                          placeholder="https://exemplo.com/foto.jpg"
                        />
                      </div>
                    </div>
                    
                    {/* Visual Preview */}
                    <div className="mt-2 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-emerald-800/20 shrink-0 bg-accent-gold/20 flex items-center justify-center font-bold text-[#0A1B10]">
                        {editingBday.image_url ? (
                          <img src={editingBday.image_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          editingBday.name ? editingBday.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase() : "?"
                        )}
                      </div>
                      <span className="text-[10px] text-emerald-600 font-semibold">Pré-visualização do Avatar/Foto</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 block uppercase">Status</label>
                    <select
                      value={editingBday.is_active ? "true" : "false"}
                      onChange={(e) => setEditingBday({ ...editingBday, is_active: e.target.value === "true" })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200"
                    >
                      <option value="true">Ativo</option>
                      <option value="false">Inativo</option>
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-primary-main hover:bg-primary-dark text-accent-gold font-bold text-xs"
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingBday(null)}
                      className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs text-gray-600"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                /* List & Filter view */
                <div className="space-y-4">
                  <div className="flex items-center gap-2 max-w-xs">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider shrink-0">Filtrar por Mês:</label>
                    <select
                      value={bdayFilterMonth}
                      onChange={(e) => setBdayFilterMonth(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs"
                    >
                      <option value="all">Todos</option>
                      <option value="1">Janeiro</option>
                      <option value="2">Fevereiro</option>
                      <option value="3">Março</option>
                      <option value="4">Abril</option>
                      <option value="5">Maio</option>
                      <option value="6">Junho</option>
                      <option value="7">Julho</option>
                      <option value="8">Agosto</option>
                      <option value="9">Setembro</option>
                      <option value="10">Outubro</option>
                      <option value="11">Novembro</option>
                      <option value="12">Dezembro</option>
                    </select>
                  </div>

                  <div className="overflow-x-auto border border-gray-200 rounded-2xl">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-gray-50 border-b border-gray-200 font-bold text-gray-600">
                        <tr>
                          <th className="p-4">Foto</th>
                          <th className="p-4">Nome Completo</th>
                          <th className="p-4">Dia/Mês</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {birthdays && birthdays.filter(b => {
                          if (bdayFilterMonth === "all") return true;
                          return b.month.toString() === bdayFilterMonth;
                        }).length > 0 ? (
                          birthdays.filter(b => {
                            if (bdayFilterMonth === "all") return true;
                            return b.month.toString() === bdayFilterMonth;
                          }).map((b) => {
                            const monthsNames = ["", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
                            return (
                              <tr key={b.id} className="hover:bg-gray-50">
                                <td className="p-4">
                                  <div className="w-8 h-8 rounded-full overflow-hidden bg-accent-gold/20 flex items-center justify-center font-bold text-[#0A1B10]">
                                    {b.image_url ? (
                                      <img src={b.image_url} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                      b.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()
                                    )}
                                  </div>
                                </td>
                                <td className="p-4 font-semibold">{b.name}</td>
                                <td className="p-4">{b.day} de {monthsNames[b.month]}</td>
                                <td className="p-4">
                                  {b.is_active ? (
                                    <span className="px-2.5 py-0.5 rounded-full text-[9px] bg-green-50 text-green-700 border border-green-200 font-bold">Ativo</span>
                                  ) : (
                                    <span className="px-2.5 py-0.5 rounded-full text-[9px] bg-red-50 text-red-700 border border-red-200 font-bold">Inativo</span>
                                  )}
                                </td>
                                <td className="p-4 text-right flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => handleOpenBdayForm(b)}
                                    className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-accent-gold transition-colors cursor-pointer"
                                    title="Editar"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteBday(b.id)}
                                    className="p-1.5 rounded-lg border border-red-100 hover:bg-red-50 text-red-500 transition-colors cursor-pointer"
                                    title="Excluir"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-gray-400">
                              Nenhum aniversariante encontrado.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ---------------------------------------- */}
          {/* TAB: GERENCIAR MURAL */}
          {/* ---------------------------------------- */}
          {activeTab === "mural" && (
            <div className="bg-[#0F2918] p-6 md:p-8 rounded-3xl border border-emerald-800/40 shadow-xl space-y-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/30 pb-6">
                <div>
                  <h2 className="font-display font-extrabold text-xl text-white flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-accent-gold" />
                    <span>Gerenciamento do Mural da Comunidade</span>
                  </h2>
                  <p className="text-xs text-emerald-200/70 mt-1">
                    Modere os testemunhos e pedidos de oração enviados pelos membros e visitantes.
                  </p>
                </div>
              </div>

              {/* Auto-Approve Settings Toggle */}
              <div className="bg-[#06120B] p-5 rounded-2xl border border-emerald-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Modo de Aprovação de Publicações</span>
                    {settings.mural_auto_approve ? (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        Auto-aprovado
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        Moderação Prévia Requerida
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-emerald-200/60">
                    {settings.mural_auto_approve
                      ? "Novas publicações serão publicadas no mural instantaneamente sem aprovação prévia."
                      : "Novas publicações precisarão da aprovação do administrador antes de aparecerem no mural público."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    const nextVal = !settings.mural_auto_approve;
                    await updateSettings({ ...settings, mural_auto_approve: nextVal });
                    setSaveSuccess(true);
                    setTimeout(() => setSaveSuccess(false), 3000);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                    settings.mural_auto_approve
                      ? "bg-emerald-600 text-white hover:bg-emerald-500 shadow-md"
                      : "bg-amber-600 text-white hover:bg-amber-500 shadow-md"
                  }`}
                >
                  {settings.mural_auto_approve ? (
                    <ToggleRight className="w-5 h-5 text-accent-gold" />
                  ) : (
                    <ToggleLeft className="w-5 h-5 text-white/80" />
                  )}
                  <span>
                    {settings.mural_auto_approve
                      ? "Aprovação Automática: Ativada"
                      : "Exigir Aprovação Prévia"}
                  </span>
                </button>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-emerald-800/30">
                <button
                  onClick={() => setAdminMuralFilter("all")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    adminMuralFilter === "all"
                      ? "bg-accent-gold text-[#0A1B10]"
                      : "bg-[#06120B] text-emerald-200 hover:text-white border border-emerald-800/40"
                  }`}
                >
                  Todos ({muralPosts.length})
                </button>

                <button
                  onClick={() => setAdminMuralFilter("pending")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    adminMuralFilter === "pending"
                      ? "bg-amber-500 text-white"
                      : "bg-[#06120B] text-amber-300 hover:text-amber-200 border border-amber-500/30"
                  }`}
                >
                  <span>Pendentes</span>
                  {muralPosts.filter((p) => p.status === "pending").length > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-900 text-amber-100">
                      {muralPosts.filter((p) => p.status === "pending").length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setAdminMuralFilter("approved")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    adminMuralFilter === "approved"
                      ? "bg-emerald-600 text-white"
                      : "bg-[#06120B] text-emerald-300 hover:text-emerald-200 border border-emerald-800/40"
                  }`}
                >
                  Aprovados ({muralPosts.filter((p) => p.status === "approved").length})
                </button>

                <button
                  onClick={() => setAdminMuralFilter("rejected")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    adminMuralFilter === "rejected"
                      ? "bg-red-600 text-white"
                      : "bg-[#06120B] text-red-300 hover:text-red-200 border border-red-500/30"
                  }`}
                >
                  Rejeitados ({muralPosts.filter((p) => p.status === "rejected").length})
                </button>
              </div>

              {/* Submissions Table */}
              <div className="overflow-x-auto rounded-2xl border border-emerald-800/40 bg-[#06120B]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0A1B10] border-b border-emerald-800/40 text-accent-gold font-bold">
                    <tr>
                      <th className="p-4">Autor / Email</th>
                      <th className="p-4">Tipo</th>
                      <th className="p-4">Conteúdo</th>
                      <th className="p-4">Data de Envio</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Ações Rápidas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-800/30">
                    {(() => {
                      const filtered = muralPosts.filter((p) => {
                        if (adminMuralFilter === "all") return true;
                        return p.status === adminMuralFilter;
                      });

                      if (filtered.length === 0) {
                        return (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-emerald-200/50">
                              Nenhuma publicação encontrada para este filtro.
                            </td>
                          </tr>
                        );
                      }

                      return filtered.map((post) => {
                        const isTestimony = post.category === "testimony";
                        return (
                          <tr key={post.id} className="hover:bg-emerald-950/20 transition-colors">
                            <td className="p-4">
                              <div className="flex flex-col">
                                <span className="font-bold text-white flex items-center gap-1.5">
                                  {post.author_name}
                                  {post.is_anonymous && (
                                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-gray-700 text-gray-300 font-normal">
                                      Anônimo
                                    </span>
                                  )}
                                </span>
                                {post.email && (
                                  <span className="text-[11px] text-emerald-200/60">{post.email}</span>
                                )}
                              </div>
                            </td>

                            <td className="p-4">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                                  isTestimony
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                    : "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                                }`}
                              >
                                {isTestimony ? "Testemunho" : "Pedido de Oração"}
                              </span>
                            </td>

                            <td className="p-4 max-w-xs">
                              <div className="space-y-1">
                                <p className="line-clamp-2 text-emerald-100 text-xs">{post.message}</p>
                                {post.image_url && (
                                  <span className="inline-flex items-center gap-1 text-[10px] text-accent-gold font-semibold">
                                    📷 Possui imagem anexa
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="p-4 whitespace-nowrap text-emerald-200/70">
                              {new Date(post.created_at).toLocaleString("pt-BR", {
                                dateStyle: "short",
                                timeStyle: "short",
                              })}
                            </td>

                            <td className="p-4">
                              {post.status === "approved" && (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                  Aprovado
                                </span>
                              )}
                              {post.status === "pending" && (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                                  Pendente
                                </span>
                              )}
                              {post.status === "rejected" && (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-red-500/20 text-red-300 border border-red-500/40">
                                  Rejeitado
                                </span>
                              )}
                            </td>

                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {post.status !== "approved" && (
                                  <button
                                    onClick={async () => {
                                      await updateMuralPostStatus(post.id, "approved");
                                      setSaveSuccess(true);
                                      setTimeout(() => setSaveSuccess(false), 2000);
                                    }}
                                    className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-800 hover:text-white transition-colors cursor-pointer"
                                    title="Aprovar Publicação"
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                )}

                                {post.status !== "rejected" && (
                                  <button
                                    onClick={async () => {
                                      await updateMuralPostStatus(post.id, "rejected");
                                      setSaveSuccess(true);
                                      setTimeout(() => setSaveSuccess(false), 2000);
                                    }}
                                    className="p-1.5 rounded-lg bg-amber-950 border border-amber-500/40 text-amber-400 hover:bg-amber-800 hover:text-white transition-colors cursor-pointer"
                                    title="Rejeitar Publicação"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                )}

                                <button
                                  onClick={async () => {
                                    if (window.confirm("Deseja realmente excluir permanentemente esta publicação?")) {
                                      await deleteMuralPost(post.id);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg bg-red-950 border border-red-500/40 text-red-400 hover:bg-red-800 hover:text-white transition-colors cursor-pointer"
                                  title="Excluir Permanentemente"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
