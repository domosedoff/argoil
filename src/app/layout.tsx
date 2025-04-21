// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css"; // Убедитесь, что globals.css импортируется

// --- Шрифты ---
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

// --- МЕТАДАННЫЕ (Общие для сайта) ---
// TODO: Заменить "Название Компании" и другие данные на реальные
export const metadata: Metadata = {
  metadataBase: new URL("https://argoil.complexmedia.ru"), // TODO: Заменить на ВАШ РЕАЛЬНЫЙ ДОМЕН
  title: {
    default: "Аргойл - Оптовые поставки СУГ", // Заголовок по умолчанию
    template: "%s | Аргойл", // Шаблон для заголовков дочерних страниц
  },
  description:
    'Компания "Аргойл" - ваш надежный партнер по оптовым поставкам сжиженного углеводородного газа (СУГ), пропана и бутана по России и СНГ. Собственная логистика, гарантия качества.',
  keywords: [
    "СУГ",
    "аргойл",
    "argoil",
    "пропан",
    "бутан",
    "оптом",
    "газ оптом",
    "поставки газа",
    "газовозы",
    "сжиженный газ",
    "доставка газа",
  ],
  // --- Open Graph (для соцсетей) ---
  openGraph: {
    title: "Аргойл - Оптовые поставки СУГ",
    description:
      "Надежный партнер по оптовым поставкам сжиженного газа по России и СНГ.",
    url: "https://argoil.complexmedia.ru", // TODO: Заменить на ВАШ РЕАЛЬНЫЙ ДОМЕН
    siteName: "Аргойл",
    // TODO: Добавить URL к изображению для превью в соцсетях (должно быть в public/)
    // images: [ { url: '/og-image.png', width: 1200, height: 630, alt: 'Логотип Аргойл' } ],
    locale: "ru_RU",
    type: "website",
  },
  // --- Для поисковиков ---
  robots: {
    // Правила для роботов
    index: true, // Разрешить индексацию
    follow: true, // Разрешить переход по ссылкам
    googleBot: {
      // Специально для Google
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // --- Иконки ---
  // Next.js автоматически подхватит icon.ico/icon.png/icon.svg/apple-icon.png из папки src/app/
  // Можно также указать явно:
  // icons: {
  //   icon: '/favicon.ico', // или '/icon.png' или '/icon.svg'
  //   apple: '/apple-icon.png',
  // },
};

// --- Компонент Layout ---
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="antialiased flex flex-col min-h-screen bg-base-100">
        {" "}
        {/* Добавил bg-base-100 */}
        <Header />
        {/* Убрал flex-grow с main, т.к. футер теперь может быть разной высоты из-за виджетов */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
