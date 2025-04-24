// src/app/logistics/page.tsx
"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FaShippingFast, FaShieldAlt, FaRoute } from "react-icons/fa";
import { useLocale } from "@/context/LocaleContext";
import { AbstractIntlMessages } from "next-intl";

// --- Функция getTranslation ---
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

// --- Данные и иконки преимуществ ---
const logisticsAdvantagesData = [{ id: 1 }, { id: 2 }, { id: 3 }];
const logisticsIcons = [
  <FaShippingFast key={1} />,
  <FaShieldAlt key={2} />,
  <FaRoute key={3} />,
];

// --- Компонент страницы ---
export default function LogisticsPage() {
  const { messages } = useLocale();

  // --- Обертка для переводов этой страницы ---
  const t = (key: string, fallback: string) =>
    getTranslation(messages, "LogisticsPage", key, fallback);

  // --- Функция для получения перевода преимущества ---
  const getAdvantageT = (
    id: number,
    field: "title" | "text",
    fallback: string
  ) => t(`advantages.${id}.${field}`, fallback);

  return (
    <>
      {/* --- Шапка --- */}
      <section className="bg-base-200 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-base-content">
            {t("page_title", "Логистика и Поставки")}
          </h1>
          <p className="text-lg md:text-xl text-muted mt-3 max-w-3xl mx-auto">
            {t(
              "page_subtitle",
              "Обеспечиваем своевременную и безопасную доставку газа по всей территории России и в страны ближнего зарубежья, используя современный транспорт и оптимальные маршруты."
            )}
          </p>
        </div>
      </section>

      {/* --- Секция 1: Описание + Карта --- */}
      <section className="py-24 md:py-32 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Левая колонка: Текст */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content mb-6">
                {t("geography_title", "Наша география поставок")}
              </h2>
              <div className="prose prose-lg max-w-none prose-p:text-muted prose-p:leading-relaxed prose-li:text-muted prose-headings:text-base-content prose-headings:font-heading prose-headings:mb-3 prose-headings:mt-8 prose-ul:text-base">
                {" "}
                {/* Уменьшил текст списка */}
                {/* ПОЛНЫЙ ТЕКСТ-ЗАГЛУШКА */}
                <p>
                  {t(
                    "geography_p1",
                    "Мы располагаем развитой логистической сетью, охватывающей более 70 регионов Российской Федерации, а также страны ближнего зарубежья, включая Казахстан, Беларусь и другие. Это позволяет нам оперативно реагировать на запросы клиентов из самых разных уголков нашей страны и за ее пределами, гарантируя широкие возможности для вашего бизнеса."
                  )}
                </p>
                <p>
                  {t(
                    "geography_p2",
                    "Наши специалисты подбирают оптимальный маршрут и вид транспорта для каждого заказа, учитывая объем, расстояние и требования к срокам. Мы гарантируем соблюдение всех норм безопасности при перевозке опасных грузов (ДОПОГ), что подтверждено соответствующими лицензиями и допусками на транспортные средства и персонал."
                  )}
                </p>
                <h3>
                  {t("transport_title", "Виды используемого транспорта:")}
                </h3>
                <ul>
                  <li>
                    {t(
                      "transport_item1",
                      'Автомобильные газовозы различной вместимости (от 5 до 40 тонн) для гибкой доставки "до двери" и обеспечения потребностей объектов без доступа к ж/д путям.'
                    )}
                  </li>
                  <li>
                    {t(
                      "transport_item2",
                      "Железнодорожные цистерны для СУГ для экономичной и эффективной перевозки крупных партий газа на большие расстояния по всей сети железных дорог."
                    )}
                  </li>
                  <li>
                    {t(
                      "transport_item3",
                      "Возможность организации мультимодальных перевозок с использованием нескольких видов транспорта (например, ж/д + авто) для доставки в удаленные или труднодоступные регионы."
                    )}
                  </li>
                </ul>
              </div>
            </div>
            {/* Правая колонка: Карта */}
            <div className="order-1 lg:order-2 relative h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl border border-base-300">
              <Image
                src="/images/map.jpg" // Убедитесь, что изображение существует
                alt={t("map_alt", "Карта поставок Аргойл")}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                className="rounded-lg"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Секция 2: Преимущества логистики --- */}
      <section className="py-24 md:py-32 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content mb-4">
              {t("advantages_title", "Преимущества нашей логистики")}
            </h2>
            {/* Можно добавить подзаголовок */}
            <p className="text-lg text-muted max-w-2xl mx-auto">
              {t(
                "advantages_subtitle",
                "Мы не просто доставляем газ, мы предлагаем комплексные логистические решения:"
              )}
            </p>
          </div>
          {/* Сетка преимуществ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {logisticsAdvantagesData.map((adv, index) => {
              // --- ПОЛУЧАЕМ ПЕРЕВОДЫ ---
              const title = getAdvantageT(
                adv.id,
                "title",
                `Преимущество ${adv.id}`
              );
              const text = getAdvantageT(
                adv.id,
                "text",
                `Полное описание логистического преимущества номер ${adv.id}.`
              );

              return (
                <div
                  key={adv.id}
                  className="card p-6 md:p-8 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-primary text-4xl mb-5 flex justify-center">
                    {logisticsIcons[index]}
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-base-content mb-2">
                    {title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- Секция CTA --- */}
      <section className="py-24 md:py-32 bg-base-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content mb-4">
            {t("cta_title", "Нужна консультация по доставке?")}
          </h2>
          <p className="text-lg text-muted mb-8 max-w-xl mx-auto">
            {t(
              "cta_subtitle",
              "Наши менеджеры готовы ответить на ваши вопросы и рассчитать точную стоимость и сроки доставки газа до вашего объекта с учетом всех ваших требований."
            )}
          </p>
          <Link href="/contacts" className="btn btn-primary btn-lg">
            {t("cta_button", "Связаться с нами")}
          </Link>
        </div>
      </section>
    </>
  );
}
