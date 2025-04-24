// src/app/layout.tsx [ДЛЯ ПЛАНА Б - С LocaleProvider]

import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css"; // Путь к стилям
import { LocaleProvider } from "@/context/LocaleContext"; // <-- Импорт нашего Провайдера

// Шрифты
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Статические метаданные
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: { default: "Аргойл - Поставки СУГ и Газа", template: "%s | Аргойл" },
  description:
    "Оптовые поставки сжиженного углеводородного газа (СУГ), пропана, бутана по России и СНГ.",
};

// Viewport
export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

// Компонент RootLayout (СИНХРОННЫЙ)
// НЕ ПРИНИМАЕТ locale в params
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Атрибут lang будет обновляться клиентским компонентом HtmlLangUpdater внутри LocaleProvider
    <html
      lang="ru"
      className={`${inter.className} ${montserrat.className} h-full`}
    >
      <body className="flex min-h-full flex-col bg-base-100 antialiased">
        {/* Оборачиваем все в наш LocaleProvider */}
        <LocaleProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
