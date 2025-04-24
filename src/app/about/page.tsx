// src/app/about/page.tsx
"use client";

import Image from "next/image";
import React from "react";
import {
  FaCheckCircle,
  FaShieldAlt,
  FaTruckMoving,
  FaHandshake,
} from "react-icons/fa";
import { useLocale } from "@/context/LocaleContext";
import { AbstractIntlMessages } from "next-intl";

// --- Функция getTranslation (УБЕДИТЕСЬ, ЧТО ОНА ВЕРНАЯ!) ---
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
      // Проверяем, что current - это объект и ключ k существует
      if (current && typeof current === "object" && k in current) {
        current = (current as Record<string, unknown>)[k]; // Переходим глубже
      } else {
        current = undefined; // Ключ не найден на пути
        break;
      }
    }
    if (typeof current === "string" && current.trim() !== "") return current;
  }
  // console.warn(`Translation missing for: ${ns}.${key}`); // Для отладки
  return fb;
};

// --- Данные и иконки преимуществ ---
const advantagesData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
const advantagesIcons = [
  <FaCheckCircle key={1} />,
  <FaShieldAlt key={2} />,
  <FaTruckMoving key={3} />,
  <FaHandshake key={4} />,
];

// --- Компонент страницы ---
export default function AboutPage() {
  const { messages } = useLocale();

  // --- Обертка для переводов неймспейса 'AboutPage' ---
  const t = (
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

  return (
    <>
      {/* --- Секция 1: Основная информация --- */}
      <section className="py-16 md:py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-12 lg:gap-16 items-center">
            {/* Левая колонка: Текст */}
            <div className="lg:col-span-4">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-base-content mb-6">
                {t("main_title", "О Компании «Аргойл»", {
                  companyName: "Аргойл",
                })}
              </h1>
              {/* Используем .prose для стилизации текста */}
              <div className="prose prose-lg max-w-none prose-p:text-muted prose-p:leading-relaxed">
                {" "}
                {/* Добавил leading-relaxed */}
                <p>
                  {t(
                    "description_p1",
                    "Компания «Аргойл» — ваш надежный и ответственный поставщик сжиженных углеводородных газов (СУГ) на территории Российской Федерации и стран СНГ. С момента основания в [ГОД ОСНОВАНИЯ] году мы зарекомендовали себя как стабильный партнер для промышленных предприятий, агрохолдингов и сетей АЗС, обеспечивая бесперебойные поставки качественного топлива и высокий уровень сервиса.",
                    { companyName: "Аргойл" } // Передаем параметр, если он используется в ключе
                  )}
                </p>
                <p>
                  {t(
                    "description_p2",
                    "Наша миссия — способствовать энергетической стабильности и эффективности бизнеса наших партнеров, предлагая лучшие решения в области поставок газа и нефтепродуктов. Мы гордимся своей репутацией, построенной на многолетнем опыте, профессионализме команды, честности и индивидуальном подходе к потребностям каждого клиента. Мы постоянно развиваемся, улучшаем логистику и расширяем ассортимент, чтобы соответствовать самым высоким требованиям рынка."
                  )}
                </p>
                <p>
                  {t(
                    "description_p3",
                    "Ключевые направления нашей деятельности включают оптовые поставки технического пропана (ПТ), технического бутана (БТ), их смесей (СПБТ), пропан-бутана автомобильного (ПБА), а также широкого спектра других сопутствующих продуктов нефтегазовой отрасли. Вся продукция сертифицирована и соответствует ГОСТ."
                  )}
                </p>
              </div>
            </div>
            {/* Правая колонка: Изображение */}
            <div className="lg:col-span-3 relative h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl border border-base-200">
              <Image
                src="/images/about.png" // Убедитесь, что фото существует
                alt={t("image_alt", "Офис компании Аргойл")}
                fill
                style={{ objectFit: "cover" }}
                quality={85}
                priority // Добавляем priority для важного изображения на странице
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- Секция 2: Наши Преимущества --- */}
      <section className="py-16 md:py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content mb-4">
              {t("advantages_title", "Наши преимущества")}
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              {t(
                "advantages_subtitle",
                "Работая с нами, вы получаете не только качественный продукт, но и ряд весомых преимуществ, которые делают сотрудничество выгодным и удобным:"
              )}
            </p>
          </div>
          {/* Сетка преимуществ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantagesData.map((adv, index) => {
              // --- ПОЛУЧАЕМ ПЕРЕВОДЫ ЗДЕСЬ ---
              const title = t(
                `advantages.${adv.id}.title`,
                `Преимущество ${adv.id}`
              );
              const text = t(
                `advantages.${adv.id}.text`,
                `Полное описание преимущества номер ${adv.id}, подчеркивающее его важность для клиента.`
              );

              return (
                <div
                  key={adv.id}
                  className="card p-6 text-center flex flex-col items-center"
                >
                  <div className="text-primary text-4xl mb-4">
                    {advantagesIcons[index]}
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-base-content mb-2">
                    {/* Используем полученный перевод */}
                    {title}
                  </h3>
                  <p className="text-muted text-sm flex-grow">
                    {/* Используем полученный перевод */}
                    {text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Можно добавить другие секции */}
    </>
  );
}
