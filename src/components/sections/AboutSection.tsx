// src/components/sections/AboutSection.tsx [Исправлен перевод преимуществ]
"use client";

import Link from "next/link";
import React from "react";
import {
  FaCheckCircle,
  FaShieldAlt,
  FaTruckMoving,
  FaHandshake,
} from "react-icons/fa"; // Иконки
import { useLocale } from "@/context/LocaleContext"; // Наш хук
import { AbstractIntlMessages } from "next-intl"; // Тип

// --- Функция getTranslation (импортируем или определяем) ---
const getTranslation = (
  messages: AbstractIntlMessages,
  ns: string,
  key: string,
  fb: string
): string => {
  // ... (полный код функции getTranslation) ...
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

// --- Данные преимуществ (только ID) ---
const advantagesData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
// --- Иконки преимуществ ---
const advantagesIcons = [
  <FaCheckCircle key={1} />,
  <FaShieldAlt key={2} />,
  <FaTruckMoving key={3} />,
  <FaHandshake key={4} />,
];

// --- Данные ключевых показателей ---
const keyFigures = [
  { value: "> 10", labelKey: "key_figure_years" },
  { value: "70+", labelKey: "key_figure_regions" },
  { value: "500+", labelKey: "key_figure_partners" },
  { value: "24/7", labelKey: "key_figure_support" },
];

// --- Компонент AboutSection ---
const AboutSection = () => {
  const { messages } = useLocale(); // Получаем сообщения

  // Функция перевода для этой секции
  const tSect = (key: string, fallback: string) =>
    getTranslation(messages, "AboutSection", key, fallback);
  // Функция перевода для данных со страницы AboutPage (преимущества)
  const tPage = (
    key: string,
    fallback: string,
    params?: Record<string, string | number>
  ) => {
    let text = getTranslation(messages, "AboutPage", key, fallback);
    if (params && text) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(`{${paramKey}}`, String(paramValue));
      });
    }
    return text;
  };

  // Получаем переводы для секции О компании
  const sectionTitle = tSect("section_title", "О компании");
  const mainTitle = tSect(
    "main_title",
    "Ваш стратегический партнер в поставках газа"
  );
  const descP1 = tSect(
    "description_p1",
    "Мы специализируемся на оптовых поставках..."
  );
  const descP2 = tSect(
    "description_p2",
    "Многолетний опыт и отлаженная логистика..."
  );
  const buttonMore = tSect("button_more", "Узнать больше");
  // Перевод заголовка для блока с цифрами
  const figuresTitle = tSect("key_figures_title", "Ключевые показатели"); // Используем свой ключ для секции
  // Перевод подписей для цифр
  const getFigureLabel = (key: string) =>
    tSect(key, key.replace("key_figure_", ""));

  // Переводы для блока преимуществ (берем из AboutPage)
  const advantagesTitle = tPage("advantages_title", "Наши преимущества");
  const advantagesSubtitle = tPage(
    "advantages_subtitle",
    "Почему ведущие предприятия выбирают нас:"
  );

  return (
    // Фон base-200, overflow-hidden для асимметрии картинки
    <section className="py-16 md:py-24 bg-base-200 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* --- Блок О КОМПАНИИ (Текст + Картинка) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-12 lg:gap-16 items-center mb-20 md:mb-28">
          {/* Левая колонка: Текст */}
          <div className="lg:col-span-4">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
              {sectionTitle}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content mb-6">
              {mainTitle}
            </h2>
            {/* Используем .prose для стилизации */}
            <div className="prose prose-lg max-w-none prose-p:text-muted">
              <p>{descP1}</p>
              <p>{descP2}</p>
            </div>
            <div className="mt-8">
              <Link href="/about" className="btn btn-primary">
                {buttonMore}
              </Link>
            </div>
          </div>
          {/* Правая колонка: Изображение */}
          <div className="lg:col-span-3 relative h-80 md:h-96 lg:h-[450px] rounded-lg shadow-xl lg:mt-8">
            <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold opacity-70">
                Место для фото
              </span>
            </div>
          </div>
        </div>

        {/* --- Блок КЛЮЧЕВЫЕ ПОКАЗАТЕЛИ --- */}
        <h3 className="text-2xl md:text-3xl font-heading text-center font-semibold text-base-content mb-10 md:mb-12">
          {figuresTitle}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center mb-20 md:mb-28">
          {" "}
          {/* Добавил отступ снизу */}
          {keyFigures.map(
            (
              figure // Убрал index
            ) => (
              <div key={figure.labelKey} className="card p-6 hover:shadow-xl">
                {" "}
                {/* Используем labelKey как key */}
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {figure.value}
                </div>
                <div className="text-muted font-medium text-sm uppercase tracking-wider">
                  {getFigureLabel(figure.labelKey)}
                </div>
              </div>
            )
          )}
        </div>

        {/* --- Блок ПРЕИМУЩЕСТВА --- */}
        <div>
          {" "}
          {/* Убрал лишний отступ сверху, т.к. он есть у предыдущего блока */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content mb-4">
              {advantagesTitle}
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              {advantagesSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* ИСПРАВЛЕННЫЙ ЦИКЛ: Используем advantagesData и переводы */}
            {advantagesData.map((adv, index) => {
              // Получаем переводы для текущего преимущества из неймспейса AboutPage
              const title = tPage(
                `advantages.${adv.id}.title`,
                `Преимущество ${adv.id}`
              );
              const text = tPage(
                `advantages.${adv.id}.text`,
                `Описание преимущества ${adv.id}`
              );

              return (
                <div
                  key={adv.id}
                  className="card p-6 text-center flex flex-col items-center"
                >
                  <div className="text-primary text-4xl mb-4">
                    {advantagesIcons[index]} {/* Иконка по индексу */}
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-base-content mb-2">
                    {title} {/* Используем перевод */}
                  </h3>
                  <p className="text-muted text-sm flex-grow">
                    {text} {/* Используем перевод */}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Не забудьте определить или импортировать getTranslation
// const getTranslation = ...

export default AboutSection;
