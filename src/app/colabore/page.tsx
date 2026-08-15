"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { useData } from "@/components/DataContext";
import { getTranslated, MissionaryProject } from "@/db/mockData";
import { HeartHandshake, CreditCard, Sparkles, Copy, Check, Users, Shield, ArrowRight, Loader2, QrCode } from "lucide-react";

const DEFAULT_PROJECT_IMG = "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=60";

export default function CollaboratePage() {
  const { language, t } = useLanguage();
  const { settings, missionaryProjects, addVolunteer, updateMissionaryProject } = useData();

  // Donation form state
  const [amount, setAmount] = useState("");
  const [donationType, setDonationType] = useState<"single" | "monthly">("single");
  const [gateway, setGateway] = useState<"stripe" | "mercado_pago" | "paypal" | "usdt">("stripe");
  const [donorId, setDonorId] = useState("");
  const [isDonating, setIsDonating] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [usdtCopied, setUsdtCopied] = useState(false);
  const [proofFile, setProofFile] = useState<string | null>(null);

  // Volunteer form state
  const [volName, setVolName] = useState("");
  const [volWhatsapp, setVolWhatsapp] = useState("");
  const [volEmail, setVolEmail] = useState("");
  const [lgpdConsent, setLgpdConsent] = useState(false);
  const [volSubmitting, setVolSubmitting] = useState(false);
  const [volSuccess, setVolSuccess] = useState(false);

  // Project support
  const [selectedProject, setSelectedProject] = useState<MissionaryProject | null>(null);

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(settings.usdt_wallet);
    setUsdtCopied(true);
    setTimeout(() => setUsdtCopied(false), 2000);
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setIsDonating(true);

    // Prepare Gateway Payload reflecting monthly recurring subscription vs one-time payment
    const gatewayPayload = {
      gateway,
      amount: parseFloat(amount),
      currency: "BRL",
      mode: donationType === "monthly" ? "subscription" : "payment",
      recurring_interval: donationType === "monthly" ? "month" : undefined,
      donor_id: donorId || "anonymous",
      project_id: selectedProject?.id,
      success_url: typeof window !== "undefined" ? `${window.location.origin}/colabore?status=success` : "",
      cancel_url: typeof window !== "undefined" ? `${window.location.origin}/colabore?status=cancel` : "",
    };
    console.log("Simulating Gateway Subscription Payload:", gatewayPayload);

    setTimeout(() => {
      setIsDonating(false);
      setDonationSuccess(true);

      // If a project was selected, simulate adding to its collected amount
      if (selectedProject) {
        const updated = {
          ...selectedProject,
          collected_amount: selectedProject.collected_amount + parseFloat(amount),
        };
        updateMissionaryProject(updated);
      }
    }, 1500);
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lgpdConsent || !volName || !volWhatsapp || !volEmail) return;

    setVolSubmitting(true);
    const success = await addVolunteer({
      name: volName,
      whatsapp: volWhatsapp,
      email: volEmail,
      lgpd_consent: lgpdConsent,
    });
    setVolSubmitting(false);

    if (success) {
      setVolSuccess(true);
      setVolName("");
      setVolWhatsapp("");
      setVolEmail("");
      setLgpdConsent(false);
      setTimeout(() => setVolSuccess(false), 5000);
    }
  };

  const selectProjectForDonation = (project: MissionaryProject) => {
    setSelectedProject(project);
    setDonationSuccess(false);
    // Focus or scroll to donation form
    document.getElementById("donation-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#F4F6F0] text-gray-800 min-h-screen w-full py-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <section className="text-center space-y-4 pt-4">
          <span className="px-3 py-1 rounded-full bg-[#1A4029]/10 text-[#1A4029] text-xs font-bold uppercase tracking-widest">
            {t("navGive")}
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#1A4029] tracking-tight">
            {t("giveTitle")}
          </h1>
          <p className="text-gray-655 text-sm max-w-xl mx-auto leading-relaxed">
            {t("giveSubtitle")}
          </p>
        </section>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Forms */}
          <div className="flex flex-col gap-6">
            
            {/* Donation Form */}
            <div id="donation-form" className="bg-white rounded-3xl p-6 md:p-8 border border-emerald-800/10 shadow-sm space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-gray-150">
                <div className="w-10 h-10 rounded-xl bg-accent-gold/10 text-[#1A4029] flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[#1A4029]">
                    Formulário de Contribuição
                  </h3>
                  <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                    {selectedProject 
                      ? `Destinar para o projeto: ${getTranslated(selectedProject, "title", language)}` 
                      : "Oferta Geral para o Templo / Rádio"}
                  </p>
                </div>
              </div>

              {!donationSuccess ? (
                <form onSubmit={handleDonationSubmit} className="space-y-5">
                  
                  {/* Amount input with R$ currency prefix */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-emerald-800/70 uppercase tracking-wider block">
                      {t("giveFormValue")}
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-sm font-extrabold text-[#1A4029] select-none">
                        R$
                      </span>
                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        required
                        placeholder="0,00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#F9FAF8] border border-emerald-200 font-bold text-base text-gray-800 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 placeholder-emerald-800/40"
                      />
                    </div>
                  </div>

                  {/* Donation Type Selectors */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-emerald-800/70 uppercase tracking-wider block">
                      {t("giveFormType")}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setDonationType("single")}
                        className={`py-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                          donationType === "single"
                            ? "bg-[#1A4029] text-accent-gold border-[#1A4029] shadow-sm"
                            : "bg-[#F9FAF8] text-gray-600 border-emerald-200 hover:bg-gray-50"
                        }`}
                      >
                        {t("giveFormSingle")}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDonationType("monthly")}
                        className={`py-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                          donationType === "monthly"
                            ? "bg-[#1A4029] text-accent-gold border-[#1A4029] shadow-sm"
                            : "bg-[#F9FAF8] text-gray-600 border-emerald-200 hover:bg-gray-50"
                        }`}
                      >
                        {t("giveFormMonthly")}
                      </button>
                    </div>

                    {/* Recurring Donation Note / Tooltip */}
                    {donationType === "monthly" && (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                        <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Sua contribuição será debitada mensalmente e você pode cancelar a qualquer momento.</span>
                      </div>
                    )}
                  </div>

                  {/* Gateway Selectors */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-emerald-800/70 uppercase tracking-wider block">
                      {t("giveFormGateway")}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {([
                        { id: "stripe", name: "Stripe" },
                        { id: "mercado_pago", name: "M. Pago" },
                        { id: "paypal", name: "PayPal" },
                        { id: "usdt", name: "USDT" },
                      ] as const).map((gw) => (
                        <button
                          key={gw.id}
                          type="button"
                          onClick={() => setGateway(gw.id)}
                          className={`py-2.5 rounded-xl border text-[11px] font-bold text-center transition-all cursor-pointer ${
                            gateway === gw.id
                              ? "bg-accent-gold/25 text-[#1A4029] border-[#1A4029] font-extrabold"
                              : "bg-[#F9FAF8] text-gray-600 border-emerald-200 hover:bg-gray-50"
                          }`}
                        >
                          {gw.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Identification field */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-emerald-800/70 uppercase tracking-wider block">
                      {t("giveFormId")}
                    </label>
                    <input
                      type="text"
                      placeholder="exemplo@email.com ou (11) 99999-9999"
                      value={donorId}
                      onChange={(e) => setDonorId(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F9FAF8] border border-emerald-200 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 placeholder-emerald-800/40"
                    />
                  </div>

                  {/* Crypto Wallet Details + Auto-Generated QR Code if USDT is selected */}
                  {gateway === "usdt" && (
                    <div className="p-4 rounded-2xl bg-[#F9FAF8] border border-emerald-100 space-y-4">
                      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm">
                        {/* Auto-generated QR Code */}
                        <div className="w-32 h-32 bg-gray-50 border border-gray-200 rounded-xl p-2 flex items-center justify-center shrink-0 shadow-inner relative">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(settings.usdt_wallet || "TYL9H7dZcQjA7V8v1WqUeE3xZy5R6T7y8u")}`}
                            alt="QR Code USDT"
                            className="w-full h-full object-contain rounded-lg"
                            onError={(e) => {
                              (e.currentTarget as HTMLElement).style.display = "none";
                            }}
                          />
                        </div>

                        {/* Wallet address & Copy button */}
                        <div className="space-y-2 flex-1 text-left w-full">
                          <span className="text-[10px] font-extrabold text-[#1A4029] uppercase tracking-wider block">
                            {t("giveFormUsdtWallet")} (Rede TRC20)
                          </span>
                          <code className="block p-2.5 bg-[#F9FAF8] rounded-xl border border-emerald-100 text-[10px] break-all font-mono font-bold text-gray-700">
                            {settings.usdt_wallet}
                          </code>
                          <button
                            type="button"
                            onClick={handleCopyWallet}
                            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#1A4029] hover:bg-[#122e1d] text-accent-gold text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                          >
                            {usdtCopied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-accent-gold" />}
                            <span>{usdtCopied ? t("giveFormUsdtCopied") : "Copiar Endereço"}</span>
                          </button>
                        </div>
                      </div>

                      {/* File Upload mock for receipt */}
                      <div className="space-y-1 pt-1">
                        <label className="text-[9px] font-bold text-emerald-800/70 uppercase tracking-wider block">
                          {t("giveFormUsdtProof")}
                        </label>
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={(e) => setProofFile(e.target.files?.[0]?.name || "comprovante.pdf")}
                          className="w-full text-xs text-gray-550 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-semibold file:bg-emerald-900/10 file:text-[#1A4029] hover:file:bg-emerald-900/20 file:cursor-pointer"
                        />
                        {proofFile && (
                          <span className="text-[10px] text-green-600 font-bold block mt-1">
                            ✓ Arquivo carregado: {proofFile}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isDonating}
                    className="w-full py-3 rounded-xl bg-[#1A4029] hover:bg-[#122e1d] text-accent-gold font-bold text-xs shadow-md shadow-primary-main/15 flex items-center justify-center gap-1.5 transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    {isDonating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Iniciando fluxo do gateway ({donationType === "monthly" ? "Assinatura" : "Pagamento"})...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        <span>
                          {donationType === "monthly"
                            ? `Assinar R$ ${parseFloat(amount || "0").toFixed(2)}/mês (${gateway.toUpperCase().replace("_", " ")})`
                            : `Doar R$ ${parseFloat(amount || "0").toFixed(2)} (${gateway.toUpperCase().replace("_", " ")})`}
                        </span>
                      </>
                    )}
                  </button>

                </form>
              ) : (
                // Donation success dialog
                <div className="py-8 text-center space-y-5 flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center animate-bounce">
                    <Check className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-extrabold text-base text-[#1A4029]">
                      {donationType === "monthly" ? "Assinatura Mensal Ativa!" : "Contribuição Registrada!"}
                    </h3>
                    <p className="text-xs text-gray-655 leading-relaxed max-w-sm">
                      {donationType === "monthly" ? (
                        <>
                          Sua assinatura mensal de <strong>R$ {parseFloat(amount).toFixed(2)}/mês</strong> por meio do gateway <strong>{gateway.toUpperCase().replace("_", " ")}</strong> foi iniciada com sucesso. Você pode gerenciar ou cancelar a assinatura a qualquer momento.
                        </>
                      ) : (
                        <>
                          {t("giveFormSuccess")} Seu apoio único de <strong>R$ {parseFloat(amount).toFixed(2)}</strong> via gateway <strong>{gateway.toUpperCase().replace("_", " ")}</strong> faz toda a diferença.
                        </>
                      )}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setDonationSuccess(false);
                      setAmount("");
                      setSelectedProject(null);
                      setProofFile(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#1A4029] hover:bg-[#122e1d] text-accent-gold text-xs font-bold transition-colors cursor-pointer"
                  >
                    Nova Contribuição
                  </button>
                </div>
              )}
            </div>

            {/* Volunteer Form */}
            <section className="bg-white rounded-3xl p-6 md:p-8 border border-emerald-850/10 shadow-sm space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-gray-150">
                <div className="w-10 h-10 rounded-xl bg-accent-gold/10 text-[#1A4029] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[#1A4029]">
                    {t("giveVolunteersTitle")}
                  </h3>
                  <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                    Trabalhe na obra do Senhor em nossas escalas de serviço
                  </p>
                </div>
              </div>

              {volSuccess && (
                <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-xs font-semibold text-green-700">
                  {t("giveVolSuccess")}
                </div>
              )}

              <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-emerald-800/70 uppercase tracking-wider block">
                      {t("giveVolName")}
                    </label>
                    <input
                      type="text"
                      required
                      value={volName}
                      onChange={(e) => setVolName(e.target.value)}
                      placeholder="Seu Nome Completo"
                      className="w-full px-3 py-2 rounded-xl bg-[#F9FAF8] border border-emerald-200 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 placeholder-emerald-800/40"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-emerald-800/70 uppercase tracking-wider block">
                      {t("giveVolWhatsapp")}
                    </label>
                    <input
                      type="text"
                      required
                      value={volWhatsapp}
                      onChange={(e) => setVolWhatsapp(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="w-full px-3 py-2 rounded-xl bg-[#F9FAF8] border border-emerald-200 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 placeholder-emerald-800/40"
                    />
                  </div>

                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-emerald-800/70 uppercase tracking-wider block">
                    {t("giveVolEmail")}
                  </label>
                  <input
                    type="email"
                    required
                    value={volEmail}
                    onChange={(e) => setVolEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                    className="w-full px-3 py-2 rounded-xl bg-[#F9FAF8] border border-emerald-200 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 placeholder-emerald-800/40"
                  />
                </div>

                {/* Mandatory LGPD consent checkbox */}
                <div className="p-4 rounded-xl bg-[#F9FAF8] border border-emerald-100 flex gap-3 text-left">
                  <input
                    type="checkbox"
                    id="lgpd-consent"
                    required
                    checked={lgpdConsent}
                    onChange={(e) => setLgpdConsent(e.target.checked)}
                    className="w-4 h-4 text-[#1A4029] accent-[#1A4029] border-emerald-300 rounded focus:ring-emerald-600 shrink-0 mt-0.5 cursor-pointer"
                  />
                  <label htmlFor="lgpd-consent" className="text-[10px] leading-relaxed text-gray-550 flex items-start gap-1 font-medium select-none cursor-pointer">
                    <Shield className="w-3.5 h-3.5 text-accent-gold-dark shrink-0 mt-0.5" />
                    <span>{t("giveVolLgpd")}</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={volSubmitting}
                  className="w-full py-2.5 rounded-xl bg-[#1A4029] hover:bg-[#122e1d] text-accent-gold font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-primary-main/15 transition-colors cursor-pointer"
                >
                  {volSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>{t("btnVolunteer")}</span>
                  )}
                </button>

              </form>
            </section>

          </div>

          {/* Right Column: Missionary Projects */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-accent-gold-dark" />
              <h3 className="font-display font-bold text-base text-[#1A4029]">
                {t("giveProjectsTitle")}
              </h3>
            </div>

            <div className="space-y-6">
              {missionaryProjects.map((project) => {
                const title = getTranslated(project, "title", language);
                const desc = getTranslated(project, "description", language);
                const percentage = Math.min(Math.round((project.collected_amount / project.goal_amount) * 100), 100);

                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-2xl overflow-hidden border border-emerald-850/10 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-video w-full bg-gray-50">
                      <img
                        src={project.image_url || DEFAULT_PROJECT_IMG}
                        alt={title}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = DEFAULT_PROJECT_IMG;
                        }}
                      />
                    </div>
                    <div className="p-5 space-y-4 text-left">
                      <div className="space-y-1.5">
                        <h4 className="font-display font-bold text-sm text-[#1A4029]">
                          {title}
                        </h4>
                        <p className="text-[11px] text-gray-650 leading-relaxed line-clamp-3">
                          {desc}
                        </p>
                      </div>

                      {/* Progress details */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] font-semibold text-gray-550">
                          <span>Meta: R$ {project.goal_amount.toLocaleString()}</span>
                          <span>{percentage}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#F4F6F0] overflow-hidden">
                          <div
                            className="h-full bg-accent-gold transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-[9px] text-[#1A4029] font-bold block">
                          Coletado: R$ {project.collected_amount.toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() => selectProjectForDonation(project)}
                        className="w-full py-2 rounded-xl border border-[#1A4029] text-[#1A4029] hover:bg-[#1A4029] hover:text-accent-gold text-[10px] font-bold text-center block transition-colors cursor-pointer"
                      >
                        Apoiar este Projeto
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
