import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";
import { DataProvider } from "@/components/DataContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PersistentPlayer from "@/components/PersistentPlayer";
import AnnouncementPopup from "@/components/AnnouncementPopup";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Igreja Reinando em Vida | Uma Igreja Fundamentada na Graça",
  description: "Bem-vindo à Igreja Evangélica Reinando em Vida. Proclamamos a abundante graça de Deus e o dom da justiça, reinando em vida por meio de Jesus Cristo.",
  keywords: ["Igreja", "Graça", "Reinando em Vida", "Jesus Cristo", "Nova Aliança", "Evangélica", "São Paulo", "Santana", "Ribeirão Preto"],
  openGraph: {
    title: "Igreja Reinando em Vida | Fundamentada na Graça",
    description: "Proclamamos a abundante graça de Deus e o dom da justiça, reinando em vida por meio de Jesus Cristo.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background-warm text-gray-800 font-sans">
        <DataProvider>
          <LanguageProvider>
            <Navbar />
            <MainLayoutWrapper>
              {children}
            </MainLayoutWrapper>
            <Footer />
            <AnnouncementPopup />
            <PersistentPlayer />
          </LanguageProvider>
        </DataProvider>
      </body>
    </html>
  );
}
