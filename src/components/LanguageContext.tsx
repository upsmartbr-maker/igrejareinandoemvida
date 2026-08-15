"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "pt" | "en" | "es";

interface Translations {
  [key: string]: {
    pt: string;
    en: string;
    es: string;
  };
}

export const translations: Translations = {
  // Navigation
  navHome: { pt: "Início", en: "Home", es: "Inicio" },
  navAbout: { pt: "Quem Somos", en: "About Us", es: "Quiénes Somos" },
  navMessages: { pt: "Mensagens", en: "Messages", es: "Mensajes" },
  navMinistries: { pt: "Ministérios", en: "Ministries", es: "Ministerios" },
  navContent: { pt: "Conteúdos", en: "Content", es: "Contenidos" },
  navEvents: { pt: "Eventos", en: "Events", es: "Eventos" },
  navGive: { pt: "Colabore", en: "Give", es: "Colabora" },
  navContact: { pt: "Contato", en: "Contact", es: "Contacto" },
  navInstitute: { pt: "Instituto", en: "Institute", es: "Instituto" },
  navAdmin: { pt: "Painel Admin", en: "Admin Panel", es: "Panel Admin" },

  // General buttons and actions
  btnWatchLive: { pt: "Assista ao Vivo", en: "Watch Live", es: "Ver en Vivo" },
  btnCalendar: { pt: "Agenda", en: "Calendar", es: "Calendario" },
  btnDonate: { pt: "Doe Agora", en: "Donate Now", es: "Donar Ahora" },
  btnVolunteer: { pt: "Seja Voluntário", en: "Volunteer", es: "Ser Voluntario" },
  btnReadMore: { pt: "Ler Mais", en: "Read More", es: "Leer Más" },
  btnDownload: { pt: "Download", en: "Download", es: "Descargar" },
  btnBuy: { pt: "Comprar", en: "Buy", es: "Comprar" },
  btnSend: { pt: "Enviar", en: "Send", es: "Enviar" },
  btnCancel: { pt: "Cancelar", en: "Cancel", es: "Cancelar" },
  btnDetails: { pt: "Ver Detalhes", en: "Details", es: "Ver Detalles" },
  btnSave: { pt: "Salvar", en: "Save", es: "Guardar" },
  loading: { pt: "Carregando...", en: "Loading...", es: "Cargando..." },

  // Hero Section
  heroTitle: {
    pt: "Bem-vindo à Igreja Reinando em Vida",
    en: "Welcome to Reinando em Vida Church",
    es: "Bienvenido a la Iglesia Reinando em Vida",
  },
  heroSubtitle: {
    pt: "Uma igreja viva, fundamentada na palavra da Graça de Deus. Reinando em vida por meio de Jesus Cristo.",
    en: "A living church, founded on the word of God's Grace. Reigning in life through Jesus Christ.",
    es: "Una iglesia viva, fundada en la palabra de la Gracia de Dios. Reinando en vida por medio de Jesucristo.",
  },
  heroBibleVerse: {
    pt: "'...muito mais os que recebem a abundância da graça, e do dom da justiça, reinarão em vida por meio de um só, Jesus Cristo.' — Romanos 5:17",
    en: "'...much more they which receive abundance of grace and of the gift of righteousness shall reign in life by one, Jesus Christ.' — Romanos 5:17",
    es: "'...mucho más reinarán en vida por medio de uno solo, Jesucristo, los que reciben la abundancia de la gracia e del don de la justicia.' — Romanos 5:17",
  },

  // Pop-up
  popupTitleDefault: { pt: "Próximo Culto Especial", en: "Next Special Service", es: "Próximo Culto Especial" },
  popupClose: { pt: "Fechar", en: "Close", es: "Cerrar" },

  // Quem Somos
  aboutTitle: { pt: "Uma Instituição na Graça de Deus", en: "An Institution in God's Grace", es: "Una Institución en la Gracia de Dios" },
  aboutPastorMsg: { pt: "Mensagem do Pastor Presidente", en: "Message from the Presiding Pastor", es: "Mensaje del Pastor Presidente" },
  aboutPastorName: { pt: "Pr. Samuel Rodrigues", en: "Pastor Samuel Rodrigues", es: "Pastor Samuel Rodrigues" },
  aboutPastorText: {
    pt: "Saudações na graça e na paz de nosso Senhor Jesus! Nossa missão é proclamar a verdade da nova aliança, onde o amor de Deus é incondicional e o sacrifício de Cristo é suficiente. Convidamos você e sua família a viverem a plenitude da graça de Deus, reinando em todas as áreas da vida.",
    en: "Greetings in the grace and peace of our Lord Jesus! Our mission is to proclaim the truth of the new covenant, where God's love is unconditional and Christ's sacrifice is sufficient. We invite you and your family to live the fullness of God's grace, reigning in every area of life.",
    es: "¡Saludos en la gracia y la paz de nuestro Señor Jesús! Nuestra misión es proclamar la verdad del nuevo pacto, donde el amor de Deus es incondicional y el sacrificio de Cristo es suficiente. Le invitamos a usted y a su familia a vivir la plenitud de la gracia de Dios, reinando en todas las áreas de la vida.",
  },
  aboutMissionTitle: { pt: "Nossa Missão e Visão", en: "Our Mission and Vision", es: "Nuestra Misión y Visión" },
  aboutMissionText: {
    pt: "Edificar a igreja no pleno conhecimento do Filho de Deus, atingindo a maturidade da fé (Efésios 4:13). Cremos na sujeição voluntária e amorosa ao Pai dos espíritos para de fato vivermos (Hebreus 12:9).",
    en: "To build up the church in the full knowledge of the Son of God, reaching the maturity of faith (Ephesians 4:13). We believe in voluntary and loving subjection to the Father of spirits that we may indeed live (Hebrews 12:9).",
    es: "Edificar a la iglesia en el pleno conocimiento del Hijo de Dios, alcanzando la madurez de la fe (Efesios 4:13). Creemos en la sujeción voluntaria y amorosa al Padre de los espíritus para vivir de verdad (Hebreos 12:9).",
  },
  aboutFaithTitle: { pt: "Nossa Fé", en: "Our Faith", es: "Nuestra Fe" },
  aboutFaithText: {
    pt: "Cremos na eleição soberana de Deus em amor antes da fundação do mundo (Efésios 1:4-5), na justificação gratuita pela fé e na redenção eterna em Cristo Jesus. Somos aceitos no Amado para louvor da Sua glória.",
    en: "We believe in God's sovereign election in love before the foundation of the world (Ephesians 1:4-5), in free justification by faith, and eternal redemption in Christ Jesus. We are accepted in the Beloved to the praise of His glory.",
    es: "Creemos en la elección soberana de Dios en amor antes de la fundación del mundo (Efesios 1:4-5), en la justificación gratuita por la fe y en la redención eterna en Cristo Jesús. Somos aceptados en el Amado para alabanza de Su gloria.",
  },
  aboutCommTitle: { pt: "Nossa Comunidade", en: "Our Community", es: "Nuestra Comunidad" },
  aboutCommText: {
    pt: "Uma família baseada na revelação do evangelho de Paulo (Romanos a Hebreus), vivendo em comunhão, encorajando uns aos outros a manifestar a soberania e a abundância da graça em nossa vida diária.",
    en: "A family based on the revelation of Paul's gospel (Romans to Hebrews), living in fellowship, encouraging one another to manifest the sovereignty and abundance of grace in our daily lives.",
    es: "Una familia basada en la revelación del evangelio de Pablo (Romans a Hebreos), viviendo en comunión, animándonos unos a otros a manifestar la soberanía y la abundancia de la gracia en nuestra vida diaria.",
  },

  // Mensagens
  msgVideos: { pt: "Sermões em Vídeo", en: "Video Sermons", es: "Sermones en Video" },
  msgAudios: { pt: "Sermões em Áudio", en: "Audio Sermons", es: "Sermones en Audio" },
  msgStudies: { pt: "Estudos Bíblicos", en: "Bible Studies", es: "Estudios Bíblicos" },
  msgDevotionals: { pt: "Devocionais", en: "Devotionals", es: "Devocionales" },
  msgFilterAll: { pt: "Todos", en: "All", es: "Todos" },
  msgSearch: { pt: "Buscar mensagens...", en: "Search messages...", es: "Buscar mensajes..." },

  // Ministerios
  minYouth: { pt: "Espaço Jovem", en: "Youth Space", es: "Espacio Joven" },
  minKids: { pt: "Espaço Kids", en: "Kids Space", es: "Espacio Kids" },
  minPraise: { pt: "Cantos & Louvores", en: "Praise & Worship", es: "Alabanza y Adoración" },
  minShop: { pt: "Cursos e Materiais", en: "Courses & Materials", es: "Cursos y Materiales" },
  minDownloadFiles: { pt: "Arquivos para Download", en: "Files for Download", es: "Archivos para Descargar" },
  minPraiseGallery: { pt: "Galeria de Louvores", en: "Worship Gallery", es: "Galería de Alabanzas" },
  minFree: { pt: "Gratuito", en: "Free", es: "Gratis" },
  minPaid: { pt: "Pago", en: "Paid", es: "De Pago" },

  contentBlog: { pt: "Notícias & Blog", en: "News & Blog", es: "Noticias y Blog" },
  contentRadio: { pt: "Rádio Online", en: "Online Radio", es: "Radio en Línea" },
  contentReading: { pt: "Plano de Leitura Bíblica", en: "Bible Reading Plan", es: "Plan de Lectura Bíblica" },
  contentBulletins: { pt: "Boletins Semanais (PDF)", en: "Weekly Bulletins (PDF)", es: "Boletines Semanales (PDF)" },
  contentMural: { pt: "Mural da Comunidade", en: "Community Wall", es: "Mural de la Comunidad" },
  contentLivePodcast: { pt: "Podcast / Transmissão", en: "Podcast / Live Stream", es: "Podcast / Transmisión" },
  contentRadioOffline: { pt: "Rádio fora do ar no momento", en: "Radio offline at the moment", es: "Radio fuera del aire en este momento" },

  // Mural
  muralTitle: { pt: "Mural da Comunidade & Oração", en: "Community Wall & Prayer Requests", es: "Mural de la Comunidad y Oración" },
  muralSubtitle: { pt: "Compartilhe testemunhos, vitórias e pedidos de oração. Interceda pelos irmãos!", en: "Share testimonies, victories and prayer requests. Intercede for one another!", es: "¡Comparta testimonios, victorias y peticiones de oración. Interceda por los hermanos!" },
  muralCreateBtn: { pt: "Criar Publicação", en: "New Post", es: "Crear Publicación" },
  muralCategoryTestimony: { pt: "Testemunhos & Conquistas", en: "Testimonies & Victories", es: "Testimonios y Logros" },
  muralCategoryPrayer: { pt: "Pedidos de Oração", en: "Prayer Requests", es: "Peticiones de Oración" },
  muralCategoryAll: { pt: "Todos os Posts", en: "All Posts", es: "Todas las Publicaciones" },
  muralPrayBtn: { pt: "Interceder / Orei por isso", en: "I Prayed for This", es: "Interceder / Oré por esto" },
  muralPrayedActive: { pt: "Você orou por isso", en: "You prayed for this", es: "Oraste por esto" },

  // Eventos
  evtTitle: { pt: "Calendário e Eventos", en: "Calendar & Events", es: "Calendario y Eventos" },
  evtUpcoming: { pt: "Próximos Eventos", en: "Upcoming Events", es: "Próximos Eventos" },
  evtWeekly: { pt: "Cultos Semanais", en: "Weekly Services", es: "Cultos Semanales" },
  evtPast: { pt: "Eventos Anteriores", en: "Past Events", es: "Eventos Anteriores" },
  evtGallery: { pt: "Galeria de Fotos", en: "Photo Gallery", es: "Galería de Fotos" },

  // Colabore
  giveTitle: { pt: "Dízimos e Ofertas", en: "Tithes & Offerings", es: "Diezmos y Ofrendas" },
  giveSubtitle: {
    pt: "Contribua com alegria para a expansão do Reino de Deus e a proclamação da Palavra da Graça.",
    en: "Contribute with joy for the expansion of God's Kingdom and the proclamation of the Word of Grace.",
    es: "Contribuya con alegría para la expansión del Reino de Dios y la proclamación de la Palabra de la Gracia.",
  },
  giveFormValue: { pt: "Valor da Contribuição (R$)", en: "Contribution Value (BRL)", es: "Valor de Contribución (BRL)" },
  giveFormType: { pt: "Tipo de Contribuição", en: "Contribution Type", es: "Tipo de Contribución" },
  giveFormSingle: { pt: "Contribuição Única", en: "Single Contribution", es: "Contribución Única" },
  giveFormMonthly: { pt: "Recorrente Mensal", en: "Monthly Recurring", es: "Recurrente Mensual" },
  giveFormGateway: { pt: "Forma de Pagamento", en: "Payment Gateway", es: "Método de Pago" },
  giveFormUsdtWallet: { pt: "Endereço da Carteira USDT (Rede TRC20)", en: "USDT Wallet Address (TRC20 Network)", es: "Dirección de Cartera USDT (Red TRC20)" },
  giveFormUsdtCopy: { pt: "Copiar Carteira", en: "Copy Wallet Address", es: "Copiar Dirección" },
  giveFormUsdtCopied: { pt: "Carteira Copiada!", en: "Wallet Copied!", es: "¡Dirección Copiada!" },
  giveFormUsdtProof: { pt: "Upload do Comprovante (USDT)", en: "Upload Proof of Payment (USDT)", es: "Subir Comprobante de Pago (USDT)" },
  giveFormId: { pt: "Identificação Opcional (E-mail ou Telefone)", en: "Optional ID (Email or Phone)", es: "Identificación Opcional (Email o Teléfono)" },
  giveFormSubmit: { pt: "Prosseguir para Pagamento", en: "Proceed to Payment", es: "Proceder al Pago" },
  giveFormSuccess: { pt: "Simulação de pagamento iniciada com sucesso!", en: "Payment simulation initiated successfully!", es: "¡Simulación de pagamento iniciada con éxito!" },
  giveProjectsTitle: { pt: "Projetos Missionários", en: "Missionary Projects", es: "Proyectos Misioneros" },
  giveVolunteersTitle: { pt: "Seja um Voluntário", en: "Become a Volunteer", es: "Sé un Voluntario" },
  giveVolName: { pt: "Nome Completo", en: "Full Name", es: "Nombre Completo" },
  giveVolWhatsapp: { pt: "WhatsApp com DDD", en: "WhatsApp with Country Code", es: "WhatsApp con Código de Área" },
  giveVolEmail: { pt: "Endereço de E-mail", en: "Email Address", es: "Dirección de Correo" },
  giveVolLgpd: {
    pt: "Estou de acordo e autorizo a coleta dos meus dados conforme a LGPD para fins de contato da igreja.",
    en: "I agree and authorize the collection of my data in accordance with the LGPD for church contact purposes.",
    es: "Estoy de acuerdo y autorizo la recopilación de mis datos de conformidad con la LGPD para fines de contacto de la iglesia.",
  },
  giveVolSuccess: { pt: "Cadastro realizado com sucesso! Em breve entraremos em contato.", en: "Registration successful! We will contact you soon.", es: "¡Registro exitoso! Nos pondremos en contacto pronto." },

  // Contato
  contactTitle: { pt: "Fale Conosco", en: "Contact Us", es: "Contáctenos" },
  contactSP: { pt: "São Paulo - Santana", en: "São Paulo - Santana", es: "São Paulo - Santana" },
  contactRP: { pt: "Ribeirão Preto - SP", en: "Ribeirão Preto - SP", es: "Ribeirão Preto - SP" },
  contactSPAddress: { pt: "Rua Voluntários da Pátria, 1200 - Santana, São Paulo - SP", en: "Voluntários da Pátria St, 1200 - Santana, São Paulo - SP", es: "Calle Voluntários da Pátria, 1200 - Santana, São Paulo - SP" },
  contactRPAddress: { pt: "Av. Independência, 3400 - Ribeirão Preto - SP", en: "Independência Ave, 3400 - Ribeirão Preto - SP", es: "Av. Independencia, 3400 - Ribeirão Preto - SP" },
  contactPhone: { pt: "Telefone / WhatsApp", en: "Phone / WhatsApp", es: "Teléfono / WhatsApp" },
  contactEmail: { pt: "E-mail de Contato", en: "Contact Email", es: "Correo de Contacto" },
  contactSocial: { pt: "Nossas Redes Sociais", en: "Our Social Networks", es: "Nuestras Redes Sociales" },

  // Player Persistente
  playerRadioTitle: { pt: "Rádio Reinando em Vida", en: "Reinando em Vida Radio", es: "Radio Reinando en Vida" },
  playerLive: { pt: "AO VIVO", en: "LIVE", es: "EN VIVO" },
  playerRadioDesc: { pt: "Sintonizado na Graça de Deus", en: "Tuned to God's Grace", es: "Sintonizado en la Gracia de Dios" },
  playerOnline: { pt: "Online", en: "Online", es: "Online" },
  playerOffline: { pt: "Offline", en: "Offline", es: "Offline" },

  // Admin
  adminTitle: { pt: "Painel Administrativo Unificado", en: "Unified Admin Panel", es: "Panel de Administración Unificado" },
  adminLoginTitle: { pt: "Acesso Restrito", en: "Restricted Access", es: "Acceso Restringido" },
  adminPassword: { pt: "Senha do Administrador", en: "Admin Password", es: "Contraseña de Administrador" },
  adminLoginBtn: { pt: "Entrar", en: "Login", es: "Entrar" },
  adminError: { pt: "Senha inválida. Tente novamente.", en: "Invalid password. Try again.", es: "Contraseña inválida. Intente de nuevo." },
  adminWelcome: { pt: "Bem-vindo ao Painel de Controle", en: "Welcome to the Control Panel", es: "Bienvenido al Panel de Control" },
  adminTabSettings: { pt: "Configurações Gerais", en: "General Settings", es: "Ajustes Generales" },
  adminTabMessages: { pt: "Vídeos & Estudos", en: "Videos & Studies", es: "Videos y Estudios" },
  adminTabMinistry: { pt: "Ministérios & Louvor", en: "Ministries & Praise", es: "Ministerios y Alabanza" },
  adminTabShop: { pt: "Loja & Materiais", en: "Shop & Materials", es: "Tienda y Materiales" },
  adminTabEvents: { pt: "Eventos & Cultos", en: "Events & Services", es: "Eventos y Cultos" },
  adminTabNews: { pt: "Notícias & Blog", en: "News & Blog", es: "Noticias y Blog" },
  adminTabVolunteers: { pt: "Voluntários", en: "Volunteers", es: "Voluntarios" },
  adminPopupSection: { pt: "Configuração do Pop-up da Home", en: "Home Pop-up Configuration", es: "Configuración de Pop-up de Inicio" },
  adminPopupEnable: { pt: "Ativar Pop-up de Avisos", en: "Enable Announcement Pop-up", es: "Activar Pop-up de Anuncios" },
  adminSaveSuccess: { pt: "Configurações salvas com sucesso!", en: "Settings saved successfully!", es: "¡Configuraciones guardadas con éxito!" },
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("reinando_lang") as Language;
      if (savedLang && (savedLang === "pt" || savedLang === "en" || savedLang === "es")) {
        return savedLang;
      }
    }
    return "pt";
  });


  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("reinando_lang", lang);
  };

  const t = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][language] || translations[key]["pt"];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
