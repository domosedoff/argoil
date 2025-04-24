// src/components/sections/ClientsPartnersSection.tsx [ВОССТАНОВЛЕННЫЙ]
"use client";

import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
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

// --- Иконка ---
const ArrowRightIcon = () => (
  <FaArrowRight className="w-4 h-4 ml-2 text-current opacity-70 group-hover:opacity-100 transition-opacity" />
);

// --- Данные ссылок (только ID и link) ---
const clientLinksData = [
  { id: "how-to-start", link: "/clients#how-to-start" },
  { id: "delivery-terms", link: "/clients#delivery-terms" },
  { id: "contracts", link: "/clients#contracts" },
  { id: "quality", link: "/products#quality" },
  { id: "cabinet", link: "#" },
];

const ClientsPartnersSection = () => {
  const { messages } = useLocale();

  // Функция перевода для этого неймспейса
  const t = (key: string, fallback: string) =>
    getTranslation(messages, "ClientsPartnersSection", key, fallback);

  // Функция для получения текста кнопки
  const getButtonLabel = (key: string, fallback: string): string => {
    let label = getTranslation(messages, "ClientsPage", key, "");
    if (!label) {
      label = getTranslation(messages, "Navigation", key, fallback);
    }
    if (key === "cabinet") {
      label = getTranslation(
        messages,
        "ClientsPage",
        "cabinet_link_text",
        "Личный кабинет (скоро)"
      );
    }
    if (!label) label = fallback;
    return label;
  };

  return (
    <section className="py-16 md:py-24 bg-brand-dark text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
            {t("main_title", "Клиентам и Партнерам")}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t(
              "subtitle",
              "Мы ценим каждого партнера и стремимся сделать сотрудничество максимально удобным и выгодным. Узнайте больше о наших условиях и возможностях."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-4xl mx-auto">
          {clientLinksData.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className={`group flex items-center justify-between text-left p-4 rounded-lg transition duration-300 ease-in-out border ${
                item.link === "#"
                  ? "bg-gray-700/30 border-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-white/5 border-white/20 hover:bg-white/15 hover:border-white/40 text-white"
              }`}
              onClick={(e) => {
                if (item.link === "#") e.preventDefault();
              }}
              aria-disabled={item.link === "#"}
            >
              <span className="font-medium">
                {getButtonLabel(item.id, `Кнопка ${item.id}`)}
              </span>
              {item.link !== "#" && (
                <span className="group-hover:translate-x-1 transition-transform duration-300 ease-in-out">
                  <ArrowRightIcon />
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsPartnersSection;
