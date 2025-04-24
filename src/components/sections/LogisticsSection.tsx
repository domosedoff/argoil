// src/components/sections/LogisticsSection.tsx [РЕФАКТОРИНГ ДЛЯ useLocale]
"use client"; // <-- ОБЯЗАТЕЛЬНО

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useLocale } from "@/context/LocaleContext"; // Наш хук
import { AbstractIntlMessages } from "next-intl"; // Тип

// --- Функция getTranslation (импортируем или определяем) ---
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

const LogisticsSection = () => {
  const { messages } = useLocale(); // Получаем сообщения

  // Переводы для этой секции
  const t = (key: string, fallback: string) =>
    getTranslation(messages, "LogisticsSection", key, fallback);
  const sectionTitle = t("section_title", "Логистика и Поставки");
  const mainTitle = t(
    "main_title",
    "Гибкая и надежная доставка по всей территории"
  );
  const descP1 = t(
    "description_p1",
    "Обладая собственным и партнерским парком специализированного транспорта, мы обеспечиваем своевременную и безопасную доставку газа в любую точку России и стран ближнего зарубежья."
  );
  const descP2 = t(
    "description_p2",
    "Наша логистическая служба работает круглосуточно, чтобы гарантировать выполнение поставок точно в срок, соблюдая все нормы и стандарты безопасности."
  );
  const featuresTitle = t("features_list_title", "Ключевые преимущества:"); // Используем ключ для заголовка списка
  const feature1 = t("feature_1", "Доставка автоцистернами и ж/д транспортом.");
  const feature2 = t("feature_2", "Соблюдение графиков поставок.");
  const feature3 = t("feature_3", "Контроль качества на всех этапах.");
  const feature4 = t("feature_4", "Оптимальные логистические маршруты.");
  const buttonMore = t("button_more", "Подробнее о логистике");
  const mapAlt = t("map_alt", "Карта поставок газа"); // Для alt изображения

  return (
    // Используем цвета из палитры
    <section className="py-16 md:py-24 bg-base-100">
      {" "}
      {/* Фон base-100 (белый) */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {" "}
          {/* Увеличил gap */}
          {/* Левая колонка: Текст */}
          <div className="order-2 lg:order-1">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
              {sectionTitle}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content mb-6">
              {" "}
              {/* Увеличил mb */}
              {mainTitle}
            </h2>
            {/* Используем .prose для лучшей стилизации текста */}
            <div className="prose prose-lg max-w-none prose-p:text-muted prose-li:text-muted prose-headings:text-base-content prose-headings:font-heading">
              <p>{descP1}</p>
              <p>{descP2}</p>
              {/* Используем h3 внутри prose */}
              <h3 className="text-xl !mt-8 !mb-3">{featuresTitle}</h3>{" "}
              {/* Используем ! для переопределения стилей prose, если нужно */}
              <ul className="text-base !pl-0">
                {" "}
                {/* Уменьшаем текст списка, убираем отступ */}
                <li>{feature1}</li>
                <li>{feature2}</li>
                <li>{feature3}</li>
                <li>{feature4}</li>
              </ul>
            </div>
            {/* Кнопка */}
            <div className="mt-8">
              {" "}
              {/* Отступ для кнопки */}
              <Link href="/logistics" className="btn btn-primary">
                {buttonMore}
              </Link>
            </div>
          </div>
          {/* Правая колонка: Изображение карты */}
          <div className="order-1 lg:order-2 relative h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl border border-base-200">
            <Image
              src="/images/map.jpg" // Используем плейсхолдер
              alt={mapAlt}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogisticsSection;
