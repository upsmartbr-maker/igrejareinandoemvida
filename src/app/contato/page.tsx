"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { useData } from "@/components/DataContext";
import { Phone, Mail, MapPin, Send, CheckCircle, MessageSquare } from "lucide-react";

// Inline Brand SVGs for compatibility
const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Youtube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.95 1.96C5.12 19.5 12 19.5 12 19.5s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);


export default function ContactPage() {
  const { language, t } = useLanguage();
  const { settings } = useData();

  // Mock message form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  const getCleanWhatsapp = () => {
    return settings.whatsapp_number.replace(/\D/g, "");
  };

  return (
    <div className="space-y-12 text-left">
      
      {/* Page Header */}
      <section className="text-center space-y-4">
        <span className="px-3 py-1 rounded-full bg-primary-main/10 text-primary-main text-xs font-bold uppercase tracking-widest">
          {t("navContact")}
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-primary-main tracking-tight">
          {t("contactTitle")}
        </h1>
        <p className="text-gray-600 text-sm max-w-xl mx-auto leading-relaxed">
          Entre em contato conosco, envie uma mensagem para a nossa equipe pastoral, solicite apoio de oração ou tire suas dúvidas.
        </p>
      </section>

      {/* Grid: Details, WhatsApp and Map/Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Info Col */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Contact Cards */}
          <div className="bg-white p-6 rounded-3xl border border-primary-main/5 shadow-sm space-y-6 text-left">
            <h3 className="font-display font-bold text-base text-primary-main border-b border-gray-100 pb-3">
              Canais de Atendimento
            </h3>
            
            <div className="space-y-4 text-xs">
              {/* Whatsapp */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-50 text-green-600 rounded-xl">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-500">WhatsApp</span>
                  <a
                    href={`https://wa.me/${getCleanWhatsapp()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-primary-main text-sm hover:text-accent-gold-dark mt-0.5"
                  >
                    {settings.whatsapp_number}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary-main/5 text-primary-main rounded-xl">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-500">E-mail</span>
                  <a
                    href={`mailto:${t("contactEmail")}`}
                    className="font-bold text-primary-main text-sm hover:text-accent-gold-dark mt-0.5"
                  >
                    faleconosco@reinandoemvida.com.br
                  </a>
                </div>
              </div>

              {/* Social networks */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-accent-gold/10 text-primary-main rounded-xl">
                  <MessageSquare className="w-4 h-4 text-accent-gold-dark" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-500">Redes Sociais</span>
                  <div className="flex items-center gap-3 mt-1.5">
                    {settings.facebook_url && (
                      <a
                        href={settings.facebook_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-primary-main/10 hover:text-primary-main border border-gray-100 text-gray-500"
                        title="Facebook"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                    )}
                    {settings.instagram_url && (
                      <a
                        href={settings.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-primary-main/10 hover:text-primary-main border border-gray-100 text-gray-500"
                        title="Instagram"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {settings.youtube_channel_url && (
                      <a
                        href={settings.youtube_channel_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-primary-main/10 hover:text-primary-main border border-gray-100 text-gray-500"
                        title="YouTube"
                      >
                        <Youtube className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Congregation Locations */}
          <div className="bg-white p-6 rounded-3xl border border-primary-main/5 shadow-sm space-y-5 text-left">
            <h3 className="font-display font-bold text-base text-primary-main border-b border-gray-100 pb-3">
              Nossos Templos
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent-gold-dark shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-bold text-primary-main">{t("contactSP")}</span>
                  <span className="text-gray-600 mt-0.5">{t("contactSPAddress")}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent-gold-dark shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-bold text-primary-main">{t("contactRP")}</span>
                  <span className="text-gray-600 mt-0.5">{t("contactRPAddress")}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Contact Form Col */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-primary-main/5 shadow-sm text-left space-y-6">
          <h3 className="font-display font-bold text-base text-primary-main border-b border-gray-100 pb-3">
            Envie sua Mensagem
          </h3>

          {success && (
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-xs font-semibold text-green-700 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Mensagem enviada com sucesso! Em breve entraremos em contato.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                  Seu Nome
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome Completo"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-primary-main"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                  Seu E-mail
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@exemplo.com"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-primary-main"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                Assunto
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ex: Pedido de Oração, Escala, Dúvidas..."
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-primary-main"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                Mensagem
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escreva sua mensagem aqui..."
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-primary-main"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-primary-main hover:bg-primary-dark text-accent-gold font-bold text-xs shadow-md shadow-primary-main/10 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Mensagem</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
