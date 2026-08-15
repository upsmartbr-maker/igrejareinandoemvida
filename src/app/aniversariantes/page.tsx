"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { useData } from "@/components/DataContext";
import { Cake, Calendar, Gift, ChevronRight, User } from "lucide-react";
import Link from "next/link";

export default function AniversariantesPage() {
  const { language } = useLanguage();
  const { birthdays, settings } = useData();

  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);

  const monthsNames = [
    "",
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];

  // Filter active birthdays for the selected month
  const activeBirthdays = birthdays.filter(
    (b) => b.is_active && b.month === selectedMonth
  );

  // Helper to extract initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const congratsMessage = settings.birthday_message_pt || "A Igreja Reinando em Vida deseja a todos os aniversariantes deste mês que abundem na graça, na paz e no conhecimento de nosso Senhor Jesus Cristo. Vocês são bênção!";

  return (
    <div className="bg-[#0A1B10] text-gray-200 min-h-screen w-full">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-10 space-y-12">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-emerald-450 font-semibold uppercase tracking-wider">
          <Link href="/" className="hover:text-yellow-400 transition-colors">Início</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/conteudos" className="hover:text-yellow-400 transition-colors">Conteúdos</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-400">Aniversariantes</span>
        </div>

        {/* Page Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/15 border border-accent-gold/20 text-accent-gold text-xs font-bold uppercase tracking-wider">
            <Gift className="w-4 h-4" />
            <span>Comunhão & Celebração</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white leading-tight">
            Aniversariantes de <span className="text-accent-gold">{monthsNames[selectedMonth]}</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Celebramos a vida de cada um de nossos irmãos neste mês especial. Que a suficiência da Graça guie os seus caminhos!
          </p>
        </div>

        {/* Month Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-emerald-900/20 pb-4">
          {monthsNames.map((monthName, idx) => {
            if (idx === 0) return null;
            const isCurrent = idx === currentMonth;
            const isSelected = idx === selectedMonth;
            return (
              <button
                key={idx}
                onClick={() => setSelectedMonth(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-accent-gold text-[#0A1B10] shadow-md scale-105 font-bold"
                    : isCurrent
                    ? "bg-emerald-950/60 border border-emerald-800/40 text-accent-gold hover:bg-[#122E1A]"
                    : "bg-emerald-950/20 border border-emerald-900/10 text-gray-400 hover:text-white hover:bg-emerald-950/40"
                }`}
              >
                {monthName.substring(0, 3)}
                {isCurrent && " •"}
              </button>
            );
          })}
        </div>

        {/* Birthdays Grid */}
        <div className="space-y-6">
          {activeBirthdays.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {activeBirthdays.map((b) => (
                <div
                  key={b.id}
                  className="bg-emerald-950/20 border border-emerald-800/20 hover:border-accent-gold/30 hover:bg-emerald-950/40 rounded-3xl p-5 text-center transition-all duration-300 group shadow-sm flex flex-col justify-between items-center"
                >
                  <div className="relative mb-4">
                    {/* Circle Photo Container */}
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-800/30 group-hover:border-accent-gold/40 transition-colors flex items-center justify-center bg-[#08140C] shadow-inner shrink-0">
                      {b.image_url ? (
                        <img
                          src={b.image_url}
                          alt={b.name}
                          className="w-full h-full object-cover aspect-square"
                        />
                      ) : (
                        <span className="font-display font-extrabold text-xl text-accent-gold">
                          {getInitials(b.name)}
                        </span>
                      )}
                    </div>
                    {/* Mini floating cake icon */}
                    <div className="absolute -bottom-1.5 -right-1.5 bg-accent-gold text-[#08140C] p-1.5 rounded-full shadow border border-emerald-900/30">
                      <Cake className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-sm text-white group-hover:text-accent-gold transition-colors line-clamp-2">
                      {b.name}
                    </h3>
                    <span className="inline-block text-[10px] font-extrabold tracking-wide uppercase px-2 py-0.5 rounded-full bg-emerald-900/40 text-emerald-450 border border-emerald-800/20">
                      Dia {b.day}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-emerald-950/10 border border-emerald-900/10 rounded-3xl max-w-xl mx-auto space-y-3">
              <Gift className="w-8 h-8 text-gray-500 mx-auto" />
              <h3 className="font-display font-bold text-sm text-white">Nenhum aniversário</h3>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Não há aniversariantes cadastrados ou ativos para {monthsNames[selectedMonth]} no momento.
              </p>
            </div>
          )}
        </div>

        {/* Pastoral Congratulatory Message Card */}
        {congratsMessage && (
          <div className="max-w-3xl mx-auto bg-emerald-950/30 border border-emerald-850/40 rounded-3xl p-6 md:p-8 text-center relative overflow-hidden shadow-lg mt-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-800 via-accent-gold to-emerald-800" />
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-accent-gold/10 border border-accent-gold/25 flex items-center justify-center mx-auto text-accent-gold">
                <Cake className="w-5 h-5" />
              </div>
              <h3 className="font-display font-extrabold text-base md:text-lg text-white">
                Felicitações da Igreja
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 italic leading-relaxed">
                "{congratsMessage}"
              </p>
              <div className="text-[10px] text-accent-gold font-bold uppercase tracking-widest mt-2">
                — Igreja Reinando em Vida
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
