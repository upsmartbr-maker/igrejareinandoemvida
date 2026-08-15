"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";
import { useData } from "./DataContext";
import { Mail, Phone, ShieldCheck } from "lucide-react";

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


export default function Footer() {
  const { t } = useLanguage();
  const { settings } = useData();

  return (
    <footer className="bg-primary-dark text-white/90 border-t border-accent-gold/15 mt-auto pb-24 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Col 1: About Info */}
          <div className="flex flex-col text-left col-span-1 md:col-span-1.5">
            <div className="flex items-center gap-2 mb-4">
              <Image 
                src="/images/logo.png" 
                alt="Logo Reinando em Vida" 
                width={36}
                height={36}
                className="object-contain bg-white/10 rounded-lg p-0.5"
              />
              <span className="text-white font-display font-extrabold text-sm tracking-widest uppercase">
                REINANDO EM VIDA
              </span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed max-w-sm mb-6">
              Uma comunidade de fé cristã fundamentada na mensagem do evangelho da graça de Deus (Atos 20:24), encorajando todos a viverem livres e vitoriosos em Jesus Cristo.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {settings.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-accent-gold/20 hover:text-accent-gold transition-all text-white/80"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-accent-gold/20 hover:text-accent-gold transition-all text-white/80"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.youtube_channel_url && (
                <a
                  href={settings.youtube_channel_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-accent-gold/20 hover:text-accent-gold transition-all text-white/80"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="flex flex-col text-left">
            <h4 className="font-display font-bold text-xs text-accent-gold tracking-widest uppercase mb-4">
              Links Rápidos
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <Link href="/" className="hover:text-accent-gold transition-colors">{t("navHome")}</Link>
              </li>
              <li>
                <Link href="/quem-somos" className="hover:text-accent-gold transition-colors">{t("navAbout")}</Link>
              </li>
              <li>
                <Link href="/mensagens" className="hover:text-accent-gold transition-colors">{t("navMessages")}</Link>
              </li>
              <li>
                <Link href="/ministerios" className="hover:text-accent-gold transition-colors">{t("navMinistries")}</Link>
              </li>
              <li>
                <Link href="/conteudos" className="hover:text-accent-gold transition-colors">{t("navContent")}</Link>
              </li>
              <li>
                <Link href="/eventos" className="hover:text-accent-gold transition-colors">{t("navEvents")}</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact details */}
          <div className="flex flex-col text-left">
            <h4 className="font-display font-bold text-xs text-accent-gold tracking-widest uppercase mb-4">
              {t("navContact")}
            </h4>
            <ul className="space-y-3.5 text-xs text-white/85">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-semibold">WhatsApp</span>
                  <a
                    href={`https://wa.me/${settings.whatsapp_number.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent-gold transition-colors"
                  >
                    {settings.whatsapp_number}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-semibold">E-mail</span>
                  <a href="mailto:faleconosco@reinandoemvida.com.br" className="hover:text-accent-gold transition-colors">
                    faleconosco@reinandoemvida.com.br
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Privacy & Compliance */}
          <div className="flex flex-col text-left col-span-1">
            <h4 className="font-display font-bold text-xs text-accent-gold tracking-widest uppercase mb-4">
              Segurança e Privacidade
            </h4>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-accent-gold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>LGPD Compliance</span>
              </div>
              <p className="text-[10px] text-white/70 leading-relaxed">
                Esta plataforma está em total conformidade com a Lei Geral de Proteção de Dados. Todos os formulários possuem consentimento livre e informado.
              </p>
              <Link
                href="/privacidade"
                className="text-[10px] text-accent-gold underline hover:text-white transition-colors"
              >
                Política de Privacidade
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-white/55">
          <span>
            &copy; {new Date().getFullYear()} Igreja Evangélica Reinando em Vida. Todos os direitos reservados.
          </span>
          <div className="flex gap-4">
            <Link href="/privacidade" className="hover:text-accent-gold transition-colors">Política de Privacidade</Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-accent-gold transition-colors">Painel Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
