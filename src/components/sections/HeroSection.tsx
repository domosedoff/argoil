// src/components/sections/HeroSection.tsx [РЕФАКТОРИНГ ДЛЯ useLocale]
"use client"; // <-- ОБЯЗАТЕЛЬНО

import Link from "next/link";
import { motion } from "framer-motion"; // Анимация остается
import { useLocale } from "@/context/LocaleContext"; // Наш хук
import { AbstractIntlMessages } from "next-intl"; // Тип
import Image from "next/image"; // Импортируем Image для фона

// --- Функция getTranslation (Импортируем или определяем) ---
const getTranslation = (
  messages: AbstractIntlMessages,
  ns: string,
  key: string,
  fb: string
): string => {
  if (typeof messages === "object" && messages !== null && messages[ns]) {
    const nsMessages = messages[ns] as AbstractIntlMessages;
    const keys = key.split(".");
    let current: unknown = nsMessages;
    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = (current as Record<string, unknown>)[k];
      } else {
        current = undefined;
        break;
      }
    }
    if (typeof current === "string" && current.trim() !== "") return current;
  }
  return fb;
};

// Варианты анимации (оставляем как были)
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const HeroSection = () => {
  const { messages } = useLocale(); // Получаем сообщения

  // Переводы для этой секции
  const t = (key: string, fallback: string) =>
    getTranslation(messages, "Hero", key, fallback);
  const titleL1 = t("title_line1", "Надежные поставки газа");
  const titleL2 = t("title_line2", "по России и СНГ");
  // ПОЛНЫЙ ТЕКСТ-ЗАГЛУШКА ДЛЯ ПОДЗАГОЛОВКА
  const subtitle = t(
    "subtitle",
    "Обеспечиваем стабильность и эффективность для вашего бизнеса с помощью поставок высококачественных сжиженных углеводородных газов и продуманной логистики по всей территории РФ и в страны ближнего зарубежья."
  );
  const btnProducts = t("button_products", "Наша продукция");
  const btnContact = t("button_contact", "Связаться с нами");
  // Добавим перевод для alt фона
  const bgAlt = t("background_alt", "Фон секции Hero - Газовая инфраструктура");

  return (
    <section
      // Фон (оставляем bg-brand-dark или добавляем ИЗОБРАЖЕНИЕ)
      className="relative bg-brand-dark text-white py-24 md:py-32 lg:py-40 flex items-center overflow-hidden min-h-[60vh] md:min-h-[70vh]"
    >
      {/* ----- Фоновое изображение/оверлей ----- */}
      <div className="absolute inset-0 z-0">
        {/* Раскомментируйте и настройте, когда будет изображение */}
        <Image
          src="/images/hero-background.jpg" // <-- TODO: Заменить путь к вашему фону
          alt={bgAlt} // Используем перевод
          fill // Используем fill
          style={{ objectFit: "cover" }} // Используем style
          priority
          quality={85}
          // Добавляем немного блюра для фона (опционально)
          // className="filter blur-[2px]"
        />
        {/* Полупрозрачный темный оверлей для читаемости текста */}
        <div className="absolute inset-0 bg-brand-dark/60"></div>
      </div>
      {/* ----- Конец фона ----- */}

      {/* Контейнер для контента */}
      <motion.div
        className="container mx-auto px-4 relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 leading-tight text-white drop-shadow-md" // Добавил легкую тень тексту
          variants={itemVariants}
        >
          {titleL1} <br className="hidden md:block" /> {titleL2}
        </motion.h1>

        <motion.p
          className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto drop-shadow-sm" // Добавил легкую тень тексту
          variants={itemVariants}
        >
          {subtitle} {/* Используем полный текст */}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/products" className="btn btn-primary btn-lg">
            {btnProducts}
          </Link>
          <Link
            href="/contacts"
            className="btn btn-outline-primary btn-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm"
          >
            {" "}
            {/* Добавил легкий фон и блюр для контурной кнопки */}
            {btnContact}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Не забудьте определить или импортировать getTranslation
// const getTranslation = ...

export default HeroSection;
