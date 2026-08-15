"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFullWidth = pathname === "/" || pathname === "/colabore" || pathname === "/aniversariantes";

  if (isFullWidth) {
    return (
      <main className="flex-1 w-full animate-fade-in">
        {children}
      </main>
    );
  }

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in bg-background-warm text-gray-800">
      {children}
    </main>
  );
}
