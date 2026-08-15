"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { useData } from "@/components/DataContext";
import { getTranslated, ShopItem, MinistryPost } from "@/db/mockData";
import { Download, Music, BookOpen, User, Calendar, CreditCard, Sparkles, X, CheckCircle, ArrowRight, Loader2 } from "lucide-react";

type MinistryTab = "jovem" | "kids" | "louvor" | "shop";

export default function MinistriesPage() {
  const { language, t } = useLanguage();
  const { ministryPosts, shopItems } = useData();
  const [activeTab, setActiveTab] = useState<MinistryTab>("jovem");
  
  // Checkout states
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutPhone, setCheckoutPhone] = useState("");
  const [paymentGateway, setPaymentGateway] = useState<"stripe" | "mercado_pago" | "paypal" | "usdt">("stripe");
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  // Filter posts based on tab
  const activePosts = ministryPosts.filter((post) => post.category === activeTab);

  const handleOpenCheckout = (item: ShopItem) => {
    setSelectedItem(item);
    setPurchaseSuccess(false);
    setIsProcessing(false);
  };

  const handleCloseCheckout = () => {
    setSelectedItem(null);
    setCheckoutEmail("");
    setCheckoutPhone("");
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutEmail) return;

    setIsProcessing(true);

    // Simulate API delay
    setTimeout(() => {
      setIsProcessing(false);
      setPurchaseSuccess(true);
    }, 2000);
  };

  return (
    <div className="space-y-8 text-left relative">
      
      {/* Header */}
      <div className="space-y-3">
        <span className="px-3 py-1 rounded-full bg-primary-main/10 text-primary-main text-xs font-bold uppercase tracking-widest">
          {t("navMinistries")}
        </span>
        <h1 className="font-display font-extrabold text-3xl text-primary-main tracking-tight">
          Nossa Comunidade em Ação
        </h1>
        <p className="text-gray-600 text-sm max-w-xl">
          Conheça os espaços dedicados a cada faixa etária, nossa equipe de louvor e adquira materiais e cursos exclusivos da igreja.
        </p>
      </div>

      {/* Tab Selectors */}
      <div className="flex border-b border-gray-200">
        {([
          { id: "jovem", label: t("minYouth") },
          { id: "kids", label: t("minKids") },
          { id: "louvor", label: t("minPraise") },
          { id: "shop", label: t("minShop") },
        ] as { id: MinistryTab; label: string }[]).map((tab) => (
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

      {/* Main Content Render */}
      {activeTab !== "shop" ? (
        // Render Ministry Blog-style Posts
        activePosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activePosts.map((post) => {
              const title = getTranslated(post, "title", language);
              const content = getTranslated(post, "content", language);

              return (
                <div
                  key={post.id}
                  className="bg-white rounded-3xl overflow-hidden border border-primary-main/5 shadow-sm flex flex-col hover:shadow-md transition-shadow"
                >
                  {post.media_url && (
                    <div className="relative aspect-video w-full bg-gray-100 border-b border-gray-100">
                      <img src={post.media_url} alt="" className="object-cover w-full h-full" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-[10px] text-gray-400 font-semibold">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          Líder do Ministério
                        </span>
                      </div>
                      <h3 className="font-display font-extrabold text-base text-primary-main leading-snug">
                        {title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {content}
                      </p>
                    </div>

                    {post.download_url && (
                      <div className="pt-4 border-t border-gray-50">
                        <a
                          href={post.download_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary-main hover:bg-primary-dark text-accent-gold text-xs font-bold shadow-md shadow-primary-main/10"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download de Materiais</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 border border-dashed border-gray-200 text-center text-gray-500 text-xs">
            Nenhuma publicação disponível neste ministério no momento.
          </div>
        )
      ) : (
        // Render Shop / Catalogue Items
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shopItems.map((item) => {
            const title = getTranslated(item, "title", language);
            const desc = getTranslated(item, "description", language);
            const isFree = item.price === 0;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-primary-main/5 shadow-sm flex flex-col hover:shadow-md transition-shadow justify-between"
              >
                <div className="relative aspect-square w-full bg-gray-50">
                  <img src={item.image_url} alt="" className="object-cover w-full h-full" />
                  <div className="absolute top-4 right-4 shadow-md">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${
                      isFree ? "bg-green-600 text-white" : "bg-primary-main text-accent-gold"
                    }`}>
                      {isFree ? t("minFree") : `R$ ${item.price.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-display font-extrabold text-sm sm:text-base text-primary-main leading-tight">
                      {title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                      {desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-50">
                    {isFree ? (
                      <a
                        href={item.download_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full justify-center inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Grátis</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => handleOpenCheckout(item)}
                        className="w-full justify-center inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary-main hover:bg-primary-dark text-accent-gold text-xs font-bold"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Adquirir Material</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CHECKOUT MODAL DIALOG (Simulated Checkout flow) */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-gray-800">
          <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-primary-main/10 flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-primary-main text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent-gold" />
                <span className="font-display font-bold text-sm">Adquirir Conteúdo</span>
              </div>
              <button onClick={handleCloseCheckout} className="p-1 rounded-full hover:bg-white/10 text-white/90">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            {!purchaseSuccess ? (
              <form onSubmit={handleProcessPayment} className="p-6 space-y-4">
                <div className="flex gap-3 bg-background-warm p-3 rounded-xl border border-primary-main/5">
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                    <img src={selectedItem.image_url} alt="" className="object-cover w-full h-full" />
                  </div>
                  <div className="flex flex-col text-left py-0.5 justify-between">
                    <span className="text-xs font-bold text-primary-main leading-tight line-clamp-1">
                      {getTranslated(selectedItem, "title", language)}
                    </span>
                    <span className="text-xs font-bold text-accent-gold-dark mt-1">
                      R$ {selectedItem.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    E-mail do Comprador
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="voce@exemplo.com"
                    value={checkoutEmail}
                    onChange={(e) => setCheckoutEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-1 focus:ring-primary-main focus:outline-none"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    WhatsApp (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="(11) 99999-9999"
                    value={checkoutPhone}
                    onChange={(e) => setCheckoutPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-1 focus:ring-primary-main focus:outline-none"
                  />
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Gateway de Pagamento
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {([
                      { id: "stripe", name: "Stripe" },
                      { id: "mercado_pago", name: "M. Pago" },
                      { id: "paypal", name: "PayPal" },
                    ] as const).map((gateway) => (
                      <button
                        key={gateway.id}
                        type="button"
                        onClick={() => setPaymentGateway(gateway.id)}
                        className={`py-2 rounded-xl border text-[11px] font-bold text-center transition-all ${
                          paymentGateway === gateway.id
                            ? "bg-accent-gold/15 text-primary-main border-accent-gold font-extrabold"
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {gateway.name}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 rounded-xl bg-primary-main hover:bg-primary-dark text-accent-gold font-bold text-xs shadow-md shadow-primary-main/10 flex items-center justify-center gap-1.5 pt-3 border-t"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-accent-gold" />
                      <span>Processando Pagamento...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Pagar R$ {selectedItem.price.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              // Success Screen with instant file download
              <div className="p-6 text-center space-y-5 flex flex-col items-center">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-extrabold text-base text-primary-main">
                    Pagamento Aprovado!
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed px-4">
                    Seu pagamento foi compensado pelo gateway <strong>{paymentGateway.toUpperCase().replace("_", " ")}</strong>. O link de download do material já está liberado abaixo:
                  </p>
                </div>

                <div className="w-full p-4 rounded-xl bg-green-50 border border-green-200 flex flex-col items-center gap-2.5">
                  <span className="text-[10px] text-green-700 font-bold uppercase tracking-wider leading-none">
                    Seu Material Exclusivo
                  </span>
                  <a
                    href={selectedItem.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center gap-1.5 transition-transform hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download no Google Drive</span>
                  </a>
                </div>

                <button
                  onClick={handleCloseCheckout}
                  className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-600"
                >
                  Concluir e Fechar
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
