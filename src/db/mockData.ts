import { Language } from "@/components/LanguageContext";

export interface Settings {
  instituto_url: string;
  player_status: "online" | "offline";
  radio_stream_url: string;
  youtube_live_url: string;
  whatsapp_number: string;
  facebook_url: string;
  instagram_url: string;
  youtube_channel_url: string;
  popup_enabled: boolean;
  popup_title_pt: string;
  popup_title_en: string;
  popup_title_es: string;
  popup_text_pt: string;
  popup_text_en: string;
  popup_text_es: string;
  popup_link: string;
  stripe_key: string;
  mercado_pago_key: string;
  paypal_client_id: string;
  usdt_wallet: string;
  hero_title_pt: string;
  hero_title_en: string;
  hero_title_es: string;
  hero_subtitle_pt: string;
  hero_subtitle_en: string;
  hero_subtitle_es: string;
  hero_verse_pt: string;
  hero_verse_en: string;
  hero_verse_es: string;
  hero_title_size: string;
  pastor_name: string;
  pastor_role_pt: string;
  pastor_role_en: string;
  pastor_role_es: string;
  pastor_title_pt: string;
  pastor_title_en: string;
  pastor_title_es: string;
  pastor_quote_pt: string;
  pastor_quote_en: string;
  pastor_quote_es: string;
  pastor_desc_pt: string;
  pastor_desc_en: string;
  pastor_desc_es: string;
  pastor_image_url: string;
  show_hero_badge?: boolean;
  pastor_about_pt?: string;
  pastor_about_en?: string;
  pastor_about_es?: string;
  card1_title?: string;
  card1_desc?: string;
  card1_cta?: string;
  card1_link?: string;
  card2_title?: string;
  card2_desc?: string;
  card2_cta?: string;
  card2_link?: string;
  card3_title?: string;
  card3_desc?: string;
  card3_cta?: string;
  card3_link?: string;
  card4_title?: string;
  card4_desc?: string;
  card4_cta?: string;
  card4_link?: string;
  radio_transmission_type?: "live" | "recorded";
  radio_recorded_url?: string;
  radio_recorded_loop?: boolean;
  birthday_message_pt?: string;
  birthday_message_en?: string;
  birthday_message_es?: string;
  mural_auto_approve?: boolean;
}

export type MuralCategory = "testimony" | "prayer";
export type MuralStatus = "pending" | "approved" | "rejected";

export interface MuralPost {
  id: string;
  author_name: string;
  is_anonymous: boolean;
  email?: string;
  category: MuralCategory;
  message: string;
  image_url?: string;
  created_at: string;
  prayed_count: number;
  status: MuralStatus;
}

export interface BirthdayItem {
  id: string;
  name: string;
  day: number;
  month: number;
  image_url?: string;
  is_active: boolean;
}

export interface DBMessage {
  id: string;
  type: "video" | "audio" | "study" | "devotional";
  title_pt: string;
  title_en: string;
  title_es: string;
  author: string;
  content_pt: string;
  content_en: string;
  content_es: string;
  url: string;
  date: string;
}

export interface MinistryPost {
  id: string;
  category: "jovem" | "kids" | "louvor";
  title_pt: string;
  title_en: string;
  title_es: string;
  content_pt: string;
  content_en: string;
  content_es: string;
  media_url: string;
  download_url?: string;
  date: string;
}

export interface ShopItem {
  id: string;
  title_pt: string;
  title_en: string;
  title_es: string;
  description_pt: string;
  description_en: string;
  description_es: string;
  price: number;
  image_url: string;
  download_url: string;
}

export interface NewsPost {
  id: string;
  title_pt: string;
  title_en: string;
  title_es: string;
  content_pt: string;
  content_en: string;
  content_es: string;
  image_url: string;
  date: string;
  time: string;
}

export interface EventItem {
  id: string;
  title_pt: string;
  title_en: string;
  title_es: string;
  description_pt: string;
  description_en: string;
  description_es: string;
  date: string;
  location: string;
  is_service: boolean;
  image_url?: string;
  is_past?: boolean;
}

export interface Volunteer {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  lgpd_consent: boolean;
  date: string;
}

export interface MissionaryProject {
  id: string;
  title_pt: string;
  title_en: string;
  title_es: string;
  description_pt: string;
  description_en: string;
  description_es: string;
  image_url: string;
  goal_amount: number;
  collected_amount: number;
}

// Helpers to get translated text from a database item dynamically
export function getTranslated<T>(item: T, field: string, lang: Language): string {
  const key = `${field}_${lang}` as keyof T;
  const defaultKey = `${field}_pt` as keyof T;
  return (item[key] || item[defaultKey] || "") as string;
}

// Convert standard, short, or watch YouTube links to standard embed URL format
export function getYouTubeEmbedUrl(url: string): string {
  if (!url) return "";
  
  // Regex to extract video ID from common YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  
  return url;
}

export const initialSettings: Settings = {
  instituto_url: "https://instituto.reinandoemvida.com.br",
  player_status: "online",
  radio_stream_url: "https://stream.zeno.fm/0vy38b4u2p8uv", // Exemplo de URL de rádio pública de áudio
  youtube_live_url: "https://www.youtube.com/embed/live_stream?channel=UC4g10N4e2A0b34XpZpZ9gaw", // Exemplo de canal ao vivo
  whatsapp_number: "+55 11 98721-8914",
  facebook_url: "https://facebook.com/reinandoemvida",
  instagram_url: "https://instagram.com/reinandoemvida",
  youtube_channel_url: "https://youtube.com/reinandoemvida",
  popup_enabled: true,
  popup_title_pt: "Culto Especial de Celebração",
  popup_title_en: "Special Celebration Service",
  popup_title_es: "Culto Especial de Celebración",
  popup_text_pt: "Participe conosco neste domingo às 19h do nosso Culto da Abundante Graça. Venha reinar em vida!",
  popup_text_en: "Join us this Sunday at 7 PM for our Service of Abundant Grace. Come reign in life!",
  popup_text_es: "¡Participe con nosotros este domingo a las 19h en nuestro Culto de la Abundante Gracia. Venga a reinar en vida!",
  popup_link: "/eventos",
  stripe_key: "pk_test_mock_stripe_key_12345",
  mercado_pago_key: "APP_USR-mock-mercado-pago-key-67890",
  paypal_client_id: "mock_paypal_client_id_abcde",
  usdt_wallet: "TYL9H7dZcQjA7V8v1WqUeE3xZy5R6T7y8u", // Exemplo de carteira Tron TRC20
  hero_title_pt: "Bem-vindo à Igreja Reinando em Vida",
  hero_title_en: "Welcome to Reinando em Vida Church",
  hero_title_es: "Bienvenido a la Igreja Reinando em Vida",
  hero_subtitle_pt: "Uma igreja viva, fundamentada na palavra da Graça de Deus. Reinando em vida por meio de Jesus Cristo.",
  hero_subtitle_en: "A living church, founded on the word of God's Grace. Reigning in life through Jesus Christ.",
  hero_subtitle_es: "Una igreja viva, fundada en la palabra de la Gracia de Dios. Reinando en vida por medio de Jesucristo.",
  hero_verse_pt: "'...muito mais os que recebem a abundância da graça, e do dom da justiça, reinarão em vida por meio de um só, Jesus Cristo.' — Romanos 5:17",
  hero_verse_en: "'...much more they which receive abundance of grace and of the gift of righteousness shall reign in life by one, Jesus Christ.' — Romanos 5:17",
  hero_verse_es: "'...mucho más reinarán en vida por medio de uno solo, Jesucristo, los que reciben la abundancia de la gracia e del don de la justiça.' — Romanos 5:17",
  hero_title_size: "auto",
  pastor_name: "Pr. Samuel Rodrigues",
  pastor_role_pt: "Pastor Presidente",
  pastor_role_en: "President Pastor",
  pastor_role_es: "Pastor Presidente",
  pastor_title_pt: "Nossa missão é pregar a Graça de Deus",
  pastor_title_en: "Our mission is to preach the Grace of God",
  pastor_title_es: "Nuestra misión es predicar la Gracia de Dios",
  pastor_quote_pt: "Temos como chamada restaurar a verdade do amor incondicional e perfeito do Pai revelado ao apóstolo Paulo. Fomos justificados por meio do sacrifício na cruz e reinamos em vida por meio de Cristo.",
  pastor_quote_en: "We are called to restore the truth of the Father's unconditional and perfect love revealed to the Apostle Paul. We were justified through the sacrifice on the cross and we reign in life through Christ.",
  pastor_quote_es: "Nuestra llamada es restaurar la verdad del amor incondicional y perfecto del Padre revelado al apóstol Pablo. Fuimos justificados por medio del sacrificio en la cruz y reinamos em vida por medio de Cristo.",
  pastor_desc_pt: "Convidamos você e sua família a nos fazerem uma visita presencial em uma de nossas congregações. Nossa comunidade está pronta para acolher todos aqueles que buscam entender a suficiência da Graça e caminhar com fé e amor.",
  pastor_desc_en: "We invite you and your family to visit us in person at one of our congregations. Our community is ready to welcome all who seek to understand the sufficiency of Grace and walk with faith and love.",
  pastor_desc_es: "Invitamos a usted y a su familia a hacernos una visita presencial en uma de nuestras congregaciones. Nuestra comunidad está lista para acoger a todos aquellos que buscan entender la suficiencia de la Gracia y caminar con fe y amor.",
  pastor_image_url: "/images/pastor_samuel.png",
  show_hero_badge: true,
  pastor_about_pt: "Saudações na graça e na paz de nosso Senhor Jesus! Nossa missão é proclamar a verdade da nova aliança, onde o amor de Deus é incondicional e o sacrifício de Cristo é suficiente. Convidamos você e sua família a viverem a plenitude da graça de Deus, reinando em todas as áreas da vida.",
  pastor_about_en: "Greetings in the grace and peace of our Lord Jesus! Our mission is to proclaim the truth of the new covenant, where God's love is unconditional and Christ's sacrifice is sufficient. We invite you and your family to live the fullness of God's grace, reigning in every area of life.",
  pastor_about_es: "¡Saludos en la graça e na paz de nosso Senhor Jesus! Nossa missão é proclamar a verdade do novo pacto, onde o amor de Deus é incondicional e o sacrifício de Cristo é suficiente. Le convidamos a você e sua família a viverem a plenitude da graça de Deus, reinando em todas as áreas da vida.",
  card1_title: "Dízimos e Ofertas",
  card1_desc: "Contribua de forma voluntária, segura e rápida para expandir o Evangelho da Graça.",
  card1_cta: "Colaborar",
  card1_link: "/colabore",
  card2_title: "Localizações",
  card2_desc: "Encontre o templo mais próximo em São Paulo (Santana) ou Ribeirão Preto.",
  card2_cta: "Onde estamos",
  card2_link: "/contato",
  card3_title: "CONTEÚDOS E EDIFICAÇÃO",
  card3_desc: "Acesse o blog de notícias, plano de leitura bíblica, rádio online e boletins semanais.",
  card3_cta: "VER CONTEÚDOS",
  card3_link: "/conteudos",
  card4_title: "Cursos e Materiais",
  card4_desc: "Acesse a plataforma de estudos bíblicos do Instituto Reinando em Vida.",
  card4_cta: "Acessar Instituto",
  card4_link: "/conteudos",
  radio_transmission_type: "live",
  radio_recorded_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  radio_recorded_loop: true,
  birthday_message_pt: "A Igreja Reinando em Vida deseja a todos os aniversariantes deste mês que abundem na graça, na paz e no conhecimento de nosso Senhor Jesus Cristo. Vocês são bênção!",
  birthday_message_en: "Reinando em Vida Church wishes all birthday celebrants of this month to abound in grace, peace, and the knowledge of our Lord Jesus Christ. You are blessed!",
  birthday_message_es: "La Iglesia Reinando en Vida desea a todos los cumpleañeros de este mes que abunden en la gracia, la paz y el conocimiento de nuestro Señor Jesucristo. ¡Son bendecidos!",
  mural_auto_approve: false,
};

export const initialMessages: DBMessage[] = [
  {
    id: "msg-1",
    type: "video",
    title_pt: "Reinando em Vida por meio de Jesus",
    title_en: "Reigning in Life through Jesus",
    title_es: "Reinando en Vida por medio de Jesús",
    author: "Pr. Samuel Rodrigues",
    content_pt: "Estudo aprofundado de Romanos 5:17 sobre como a graça abundante e o dom da justiça nos capacitam a reinar sobre o pecado, a escravidão e as circunstâncias da vida terrena.",
    content_en: "In-depth study of Romans 5:17 on how abundant grace and the gift of righteousness empower us to reign over sin, bondage, and the circumstances of earthly life.",
    content_es: "Estudio profundo de Romanos 5:17 sobre cómo la gracia abundante y el don de la justicia nos capacitan para reinar sobre el pecado, la esclavitud y las circunstancias de la vida terrenal.",
    url: "https://www.youtube.com/embed/kJQP7kiw5Fk", // Exemplo de vídeo de música/palavra no YouTube
    date: "2026-07-20",
  },
  {
    id: "msg-2",
    type: "audio",
    title_pt: "A suficiência do Sacrifício de Cristo",
    title_en: "The Sufficiency of Christ's Sacrifice",
    title_es: "La Suficiencia del Sacrificio de Cristo",
    author: "Pr. Samuel Rodrigues",
    content_pt: "Mensagem ministrada com base no livro de Hebreus capítulos 9 e 10. Compreenda como a consciência de pecado foi removida de uma vez por todas pelo sangue de Jesus.",
    content_en: "Message preached based on the book of Hebrews chapters 9 and 10. Understand how consciousness of sin was removed once and for all by the blood of Jesus.",
    content_es: "Mensaje predicado basado en el libro de Hebreos capítulos 9 y 10. Comprenda cómo la conciencia de pecado fue quitada de una vez por todas por la sangre de Jesús.",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Link de áudio público de teste
    date: "2026-07-15",
  },
  {
    id: "msg-3",
    type: "study",
    title_pt: "Entendendo a Eleição Soberana (Efésios 1)",
    title_en: "Understanding Sovereign Election (Ephesians 1)",
    title_es: "Entendiendo la Elección Soberana (Efesios 1)",
    author: "Pr. Samuel Rodrigues",
    content_pt: "Guia completo de estudo bíblico sobre a predestinação e eleição em amor. Focado na segurança eterna do crente e no plano eterno de Deus na nova aliança.",
    content_en: "Complete Bible study guide on predestination and election in love. Focused on the eternal security of the believer and God's eternal plan in the new covenant.",
    content_es: "Guía completa de estudio bíblico sobre la predestinación y elección en amor. Enfocado en la seguridad eterna del creyente y el plan eterno de Dios en el nuevo pacto.",
    url: "https://drive.google.com/file/d/demo-study-pdf/view?usp=sharing",
    date: "2026-07-10",
  },
  {
    id: "msg-4",
    type: "devotional",
    title_pt: "Sem Condenação em Cristo",
    title_en: "No Condemnation in Christ",
    title_es: "Ninguna Condenación en Cristo",
    author: "Pr. Samuel Rodrigues",
    content_pt: "Nenhuma condenação há para os que estão em Cristo Jesus (Romanos 8:1). Comece o seu dia livre de culpas e acusações, sabendo que você foi perdoado e justificado diante do Pai.",
    content_en: "There is therefore now no condemnation to them which are in Christ Jesus (Romans 8:1). Start your day free of guilt and accusations, knowing that you are forgiven and justified before the Father.",
    content_es: "Ahora, pues, ninguna condenación hay para los que están en Cristo Jesús (Romanos 8:1). Empiece su día libre de culpas y acusaciones, sabiendo que ha sido perdonado y justificado ante el Padre.",
    url: "",
    date: "2026-07-24",
  },
];

export const initialMinistryPosts: MinistryPost[] = [
  {
    id: "min-1",
    category: "jovem",
    title_pt: "Geração Graça - A nossa liberdade em Cristo",
    title_en: "Grace Generation - Our Freedom in Christ",
    title_es: "Generación Gracia - Nuestra Libertad en Cristo",
    content_pt: "Nosso último encontro jovem debateu a santidade sob a ótica da graça, longe do legalismo. Baixe o guia de estudos para compartilhar no seu grupo de discipulado.",
    content_en: "Our last youth meeting discussed holiness from the perspective of grace, away from legalism. Download the study guide to share in your discipleship group.",
    content_es: "Nuestro último encuentro juvenil debatió la santidad desde la perspectiva de la gracia, lejos del legalismo. Descargue la guía de estudios para compartir en su grupo de discipulado.",
    media_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60",
    download_url: "https://drive.google.com/file/d/demo-youth-guide/view?usp=sharing",
    date: "2026-07-22",
  },
  {
    id: "min-2",
    category: "kids",
    title_pt: "Pequenos Reis - Desenhos Bíblicos para Colorir",
    title_en: "Little Kings - Bible Coloring Pages",
    title_es: "Pequeños Reyes - Dibujos Bíblicos para Colorear",
    content_pt: "Preparamos um livreto especial de colorir baseado nas epístolas de Paulo para ajudar as crianças a compreenderem a justiça divina de forma lúdica. Baixe o PDF completo.",
    content_en: "We prepared a special coloring booklet based on Paul's epistles to help children understand divine righteousness in a fun way. Download the complete PDF.",
    content_es: "Preparamos un cuadernillo de colorear especial basado en las epístolas de Pablo para ayudar a los niños a comprender la justicia divina de forma divertida. Descargue el PDF completo.",
    media_url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&auto=format&fit=crop&q=60",
    download_url: "https://drive.google.com/file/d/demo-kids-coloring/view?usp=sharing",
    date: "2026-07-18",
  },
  {
    id: "min-3",
    category: "louvor",
    title_pt: "Galeria de Cânticos - Justificado Fui",
    title_en: "Worship Gallery - Justified I Am",
    title_es: "Galería de Alabanza - Justificado Fui",
    content_pt: "Ouça e aprenda a cifra do louvor 'Justificado Fui', que celebra a obra consumada de Cristo na cruz e a nossa nova identidade como filhos de Deus.",
    content_en: "Listen to and learn the chords of the worship song 'Justified I Am', which celebrates Christ's finished work on the cross and our new identity as God's children.",
    content_es: "Escuche y aprenda los acordes del canto de alabanza 'Justificado Fui', que celebra la obra consumada de Cristo en la cruz y nuestra nueva identidad como hijos de Dios.",
    media_url: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=60",
    download_url: "https://drive.google.com/file/d/demo-chords-praise/view?usp=sharing",
    date: "2026-07-12",
  },
];

export const initialShopItems: ShopItem[] = [
  {
    id: "shop-1",
    title_pt: "Curso: Introdução às Epístolas Paulinas",
    title_en: "Course: Introduction to Pauline Epistles",
    title_es: "Curso: Introducción a las Epístolas Paulinas",
    description_pt: "Um curso completo de 12 aulas cobrindo os fundamentos teológicos de Romanos a Filemon. Foco total na Nova Aliança de Graça.",
    description_en: "A complete 12-lecture course covering the theological foundations of Romans to Philemon. Full focus on the New Covenant of Grace.",
    description_es: "Un curso completo de 12 clases que cubre los fundamentos teológicos de Romanos a Filemón. Enfoque total en el Nuevo Pacto de Gracia.",
    price: 49.9,
    image_url: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=800&auto=format&fit=crop&q=60",
    download_url: "https://drive.google.com/file/d/demo-pauline-course-paid/view?usp=sharing",
  },
  {
    id: "shop-2",
    title_pt: "E-book: O Escândalo da Graça de Deus",
    title_en: "E-book: The Scandal of God's Grace",
    title_es: "E-book: El Escándalo de la Gracia de Dios",
    description_pt: "Um guia gratuito em formato e-book que desmistifica o legalismo religioso e apresenta o amor de Deus sem limites.",
    description_en: "A free e-book guide that demystifies religious legalism and presents God's limitless love.",
    description_es: "Una guía gratuita en formato e-book que desmitifica el legalismo religioso y presenta el amor de Dios sin límites.",
    price: 0,
    image_url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=60",
    download_url: "https://drive.google.com/file/d/demo-grace-ebook-free/view?usp=sharing",
  },
  {
    id: "shop-3",
    title_pt: "Estudo Avançado: A Lei vs A Graça",
    title_en: "Advanced Study: Law vs Grace",
    title_es: "Estudio Avanzado: La Ley vs La Gracia",
    description_pt: "Material didático rico em PDF comparando o ministério da morte (tábuas de pedra) com o ministério da justiça (Espírito Santo).",
    description_en: "Rich PDF teaching material comparing the ministry of death (stone tablets) with the ministry of righteousness (Holy Spirit).",
    description_es: "Material didáctico rico en PDF que compara el ministerio de muerte (tablas de piedra) con el ministerio de justicia (Espíritu Santo).",
    price: 19.9,
    image_url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=60",
    download_url: "https://drive.google.com/file/d/demo-law-grace-paid/view?usp=sharing",
  },
];

export const initialNews: NewsPost[] = [
  {
    id: "news-1",
    title_pt: "Inauguração do Templo Santana",
    title_en: "Santana Temple Grand Opening",
    title_es: "Gran Apertura del Templo de Santana",
    content_pt: "É com imensa alegria que celebramos a inauguração do nosso novo templo no bairro de Santana, em São Paulo Capital. Venha participar do culto especial de dedicação neste sábado.",
    content_en: "It is with great joy that we celebrate the opening of our new temple in the Santana neighborhood in São Paulo. Come participate in the special dedication service this Saturday.",
    content_es: "Con inmensa alegría celebramos la inauguración de nuestro nuevo templo en el barrio de Santana, en São Paulo Capital. Venga a participar en el culto especial de dedicación este sábado.",
    image_url: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&auto=format&fit=crop&q=60",
    date: "2026-07-24",
    time: "10:00",
  },
  {
    id: "news-2",
    title_pt: "Conferência Reinar 2026",
    title_en: "Reign Conference 2026",
    title_es: "Conferencia Reinar 2026",
    content_pt: "Estão abertas as inscrições gratuitas para a nossa conferência anual focada no crescimento e maturidade na graça. Três dias de louvor, estudo e comunhão intensos.",
    content_en: "Free registrations are now open for our annual conference focused on growth and maturity in grace. Three days of intense praise, study, and fellowship.",
    content_es: "Ya están abiertas las inscripciones gratuitas para nuestra conferencia anual enfocada en el crecimiento y madurez en la gracia. Tres días de intensa alabanza, estudio y comunión.",
    image_url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=60",
    date: "2026-07-22",
    time: "15:30",
  },
];

export const initialEvents: EventItem[] = [
  {
    id: "evt-1",
    title_pt: "Culto de Domingo - Santana",
    title_en: "Sunday Service - Santana",
    title_es: "Culto de Domingo - Santana",
    description_pt: "Nosso encontro semanal de louvor, oração e exposição da Palavra de Graça em Santana.",
    description_en: "Our weekly service of praise, prayer, and teaching of the Word of Grace in Santana.",
    description_es: "Nuestro encuentro semanal de alabanza, oración y exposición de la Palabra de Gracia en Santana.",
    date: "2026-07-26T19:00:00",
    location: "São Paulo - Santana",
    is_service: true,
  },
  {
    id: "evt-2",
    title_pt: "Culto de Domingo - Ribeirão Preto",
    title_en: "Sunday Service - Ribeirão Preto",
    title_es: "Culto de Domingo - Ribeirão Preto",
    description_pt: "Celebração semanal e comunhão dos irmãos em Ribeirão Preto. Venha desfrutar da graça.",
    description_en: "Weekly celebration and fellowship of brethren in Ribeirão Preto. Come enjoy the grace.",
    description_es: "Celebración semanal y comunión de los hermanos en Ribeirão Preto. Venga a disfrutar de la gracia.",
    date: "2026-07-26T19:00:00",
    location: "Ribeirão Preto - SP",
    is_service: true,
  },
  {
    id: "evt-3",
    title_pt: "Encontro Geração Graça (Jovens)",
    title_en: "Grace Generation Youth Meeting",
    title_es: "Encuentro Generación Gracia (Jóvenes)",
    description_pt: "Bate-papo, dinâmicas e palavra focada na identidade jovem em Cristo e liberdade da graça.",
    description_en: "Talk, dynamics, and word focused on youth identity in Christ and the freedom of grace.",
    description_es: "Charla, dinámicas y palabra enfocada en la identidad juvenil en Cristo y la libertad de la gracia.",
    date: "2026-07-25T18:00:00",
    location: "São Paulo - Santana",
    is_service: false,
    image_url: "https://images.unsplash.com/photo-1529070538774-1883cb3c85fc?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "evt-4",
    title_pt: "Batismo nas Águas e Churrasco",
    title_en: "Water Baptism & BBQ",
    title_es: "Bautismo en Aguas y Barbacoa",
    description_pt: "Celebração de novos irmãos declarando sua união com Cristo em Sua morte, sepultamento e ressurreição.",
    description_en: "Celebration of new brothers and sisters declaring their union with Christ in His death, burial, and resurrection.",
    description_es: "Celebración de nuevos hermanos declarando su unión con Cristo en Su muerte, sepultura y resurrección.",
    date: "2026-06-15T10:00:00",
    location: "Chácara Recanto da Graça",
    is_service: false,
    is_past: true,
    image_url: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&auto=format&fit=crop&q=60",
  },
];

export const initialVolunteers: Volunteer[] = [
  {
    id: "vol-1",
    name: "Carlos Alberto da Silva",
    whatsapp: "+55 11 99999-8888",
    email: "carlos.alberto@email.com",
    lgpd_consent: true,
    date: "2026-07-24T10:00:00",
  },
];

export const initialMissionaryProjects: MissionaryProject[] = [
  {
    id: "proj-1",
    title_pt: "Missão Sertão da Graça",
    title_en: "Sertão Grace Mission",
    title_es: "Misión Sertão de la Gracia",
    description_pt: "Apoio às famílias do sertão nordestino com doação de alimentos, perfuração de poços artesianos e evangelização baseada na pura graça de Cristo.",
    description_en: "Support for families in the northeastern drylands with food donations, drilling water wells, and evangelism based on the pure grace of Christ.",
    description_es: "Apoyo a familias en el sertón del noreste con donación de alimentos, perforación de pozos y evangelización basada en la pura gracia de Cristo.",
    image_url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=60",
    goal_amount: 15000,
    collected_amount: 8750,
  },
  {
    id: "proj-2",
    title_pt: "Alimentando Vidas (Ação Social Santana)",
    title_en: "Feeding Lives (Santana Social Action)",
    title_es: "Alimentando Vidas (Acción Social Santana)",
    description_pt: "Distribuição semanal de refeições e agasalhos para pessoas em situação de vulnerabilidade social nos arredores da estação Santana em São Paulo.",
    description_en: "Weekly distribution of meals and warm clothing to people in situations of social vulnerability near the Santana station in São Paulo.",
    description_es: "Distribución semanal de comidas y ropa de abrigo a personas en situación de vulnerabilidad social cerca de la estación Santana en São Paulo.",
    image_url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=60",
    goal_amount: 5000,
    collected_amount: 3200,
  },
];

export const initialBirthdays: BirthdayItem[] = [
  { id: "bday-1", name: "Pr. Samuel Rodrigues", day: 15, month: 7, is_active: true }, // July
  { id: "bday-2", name: "Helena Rodrigues", day: 22, month: 7, is_active: true },
  { id: "bday-3", name: "Davi Oliveira", day: 5, month: 8, is_active: true }, // August
  { id: "bday-4", name: "Sarah Souza", day: 12, month: 7, is_active: true },
  { id: "bday-5", name: "Lucas Lima", day: 30, month: 12, is_active: true }
];

export const initialMuralPosts: MuralPost[] = [
  {
    id: "mural-1",
    author_name: "Mariana Santos",
    is_anonymous: false,
    email: "mariana.santos@email.com",
    category: "testimony",
    message: "Gostaria de dar glórias a Deus! Esta semana fui contratada no meu novo emprego na área da saúde após 8 meses em oração. Deus é fiel e a Graça Dele nos sustenta sempre!",
    created_at: "2026-07-28T14:30:00",
    prayed_count: 14,
    status: "approved",
  },
  {
    id: "mural-2",
    author_name: "Anônimo",
    is_anonymous: true,
    category: "prayer",
    message: "Peço a intercessão da igreja pela restauração da saúde do meu pai, que passará por uma cirurgia delicada na próxima quinta-feira.",
    created_at: "2026-07-29T09:15:00",
    prayed_count: 27,
    status: "approved",
  },
  {
    id: "mural-3",
    author_name: "Carlos Eduardo",
    is_anonymous: false,
    email: "carlos.eduardo@email.com",
    category: "testimony",
    message: "Agradeço a Deus pela reconciliação na minha família. A mensagem de domingo sobre a Graça e o Perdoar transformou nosso lar!",
    created_at: "2026-07-30T11:00:00",
    prayed_count: 9,
    status: "approved",
  },
  {
    id: "mural-4",
    author_name: "Fernanda Lima",
    is_anonymous: false,
    email: "fernanda.lima@email.com",
    category: "prayer",
    message: "Orando pela minha aprovação no exame de ordem e pela libertação de ansiedade na minha caminhada.",
    created_at: "2026-07-30T16:00:00",
    prayed_count: 5,
    status: "pending",
  },
];

