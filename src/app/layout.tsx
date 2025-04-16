// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Header from "src/components/layout/Header"; // <--- Импортируем Header
import Footer from "src/components/layout/Footer"; // <--- Импортируем Footer
import "./globals.css";

// ... (настройки шрифтов inter, montserrat как были) ...
const inter = Inter({
  /* ... */ variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});
const montserrat = Montserrat({
  /* ... */ variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  // ... (metadata как была) ...
  title: "Газовая Компания [Название] - Корпоративный сайт",
  description:
    "Поставки сжиженного углеводородного газа (СУГ) и других газов по России и СНГ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="antialiased flex flex-col min-h-screen">
        {" "}
        {/* <--- Добавили flex flex-col min-h-screen */}
        <Header /> {/* <--- Добавили Header */}
        <main className="flex-grow">
          {" "}
          {/* <--- Обернули children в main и добавили flex-grow */}
          {children}
        </main>
        <Footer /> {/* <--- Добавили Footer */}
      </body>
    </html>
  );
}
