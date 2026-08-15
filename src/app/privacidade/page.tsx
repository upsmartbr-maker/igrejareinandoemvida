"use client";

import React from "react";
import { ShieldCheck, Info, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto text-left space-y-8 py-4">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="w-10 h-10 rounded-xl bg-primary-main/5 text-primary-main flex items-center justify-center">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-primary-main">
          Política de Privacidade e Proteção de Dados (LGPD)
        </h1>
        <p className="text-gray-500 text-xs font-semibold">
          Última atualização: 24 de Julho de 2026
        </p>
      </div>

      {/* Main Text Content */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-primary-main/5 shadow-sm space-y-6 text-xs sm:text-sm text-gray-600 leading-relaxed">
        
        <section className="space-y-2">
          <h3 className="font-display font-bold text-sm sm:text-base text-primary-main">
            1. Introdução
          </h3>
          <p>
            A Igreja Evangélica Reinando em Vida está comprometida em resguardar a privacidade e proteger os dados pessoais de seus membros, visitantes, voluntários e doadores. Esta Política explica como coletamos, armazenamos e tratamos suas informações de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-sm sm:text-base text-primary-main">
            2. Quais Dados Coletamos?
          </h3>
          <p>
            Coletamos dados estritamente necessários para as finalidades de contato e gestão ministerial:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Formulário de Voluntários:</strong> Nome Completo, WhatsApp e E-mail. Exigimos consentimento expresso antes da submissão.</li>
            <li><strong>Doações e Ofertas:</strong> E-mail ou Telefone (opcionais), valor e método de pagamento. Os dados de cartão e pagamento são processados diretamente pelos gateways seguros (Stripe, Mercado Pago, PayPal) e não são armazenados em nossos servidores.</li>
            <li><strong>Contato Geral:</strong> Nome, E-mail e assunto da mensagem.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-sm sm:text-base text-primary-main">
            3. Como Utilizamos Seus Dados?
          </h3>
          <p>
            Os dados coletados são utilizados exclusivamente para:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Entrar em contato para organizar escalas de voluntariado e atividades da igreja.</li>
            <li>Responder a dúvidas, sugestões ou solicitações de oração enviadas pelo canal de Contato.</li>
            <li>Gerar recibos de doação e processar transações financeiras solicitadas pelo doador.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-sm sm:text-base text-primary-main">
            4. Segurança dos Dados
          </h3>
          <p>
            Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra perda, roubo, acesso não autorizado ou qualquer forma de tratamento ilícito. O acesso aos cadastros de voluntariado é restrito apenas ao Administrador da Igreja por meio de painel de controle protegido por senha.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-sm sm:text-base text-primary-main">
            5. Seus Direitos como Titular dos Dados
          </h3>
          <p>
            Conforme a LGPD, você tem o direito de solicitar a qualquer momento:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Confirmação da existência de tratamento de seus dados.</li>
            <li>Acesso aos dados pessoais mantidos por nós.</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
            <li>Exclusão definitiva de seus dados de nossa base de dados (ex: cancelamento de voluntariado).</li>
          </ul>
          <p className="mt-2">
            Para exercer esses direitos, basta enviar uma mensagem pelo e-mail <strong>faleconosco@reinandoemvida.com.br</strong> com o assunto &ldquo;LGPD - Direitos do Titular&rdquo;.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-sm sm:text-base text-primary-main">
            6. Consentimento
          </h3>
          <p>
            Ao fornecer seus dados em nossos formulários e marcar a caixa de seleção de aceite, você expressa seu consentimento livre, informado e inequívoco para o tratamento de seus dados de acordo com os termos desta política.
          </p>
        </section>

      </div>

      {/* Info Alert Box */}
      <div className="p-4 rounded-2xl bg-primary-main/5 border border-primary-main/10 flex items-start gap-2.5 text-xs text-primary-main">
        <Info className="w-5 h-5 text-accent-gold-dark shrink-0 mt-0.5" />
        <span>
          Esta política aplica-se estritamente ao portal **Igreja Reinando em Vida** (reinandoemvida.com.br). Links externos redirecionados pelo site (como o link do Instituto) possuem políticas de privacidade próprias, das quais não nos responsabilizamos.
        </span>
      </div>

    </div>
  );
}
