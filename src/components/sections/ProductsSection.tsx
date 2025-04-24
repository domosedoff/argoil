// src/components/sections/ProductsSection.tsx [Исправленная версия ВАШЕГО кода]
"use client"; // <-- Убедитесь, что это добавлено

import Link from "next/link";
import React from "react";
import { FaBoxOpen } from "react-icons/fa"; // Пример иконки
import { useLocale } from "@/context/LocaleContext"; // Наш хук
import { AbstractIntlMessages } from "next-intl"; // Тип

// --- Функция getTranslation (убедитесь, что она верна и доступна) ---
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

// --- Данные продуктов (только ID и link) ---
const productsData = [
  { id: "sug", link: "/products#sug" },
  { id: "propan", link: "/products#propan" },
  { id: "butan", link: "/products#butan" },
];

// --- Иконки для продуктов (Пример) ---
const productIcons: Record<string, React.ReactNode> = {
  sug: <FaBoxOpen />,
  propan: <FaBoxOpen />, // Заменить
  butan: <FaBoxOpen />, // Заменить
  // pba: <FaBoxOpen />, // Если будете добавлять
};

const ProductsSection = () => {
  const { messages } = useLocale(); // Получаем сообщения

  // Переводы для этой секции
  const t = (key: string, fallback: string) =>
    getTranslation(messages, "ProductsSection", key, fallback);
  const sectionTitle = t("section_title", "Наша продукция");
  const mainTitle = t("main_title", "Основные виды поставляемого газа");
  const detailsLinkText = t("product_details_link", "Подробнее →");
  const allProductsBtnText = t("all_products_button", "Смотреть всю продукцию");

  // --- ИСПРАВЛЕННАЯ Функция для получения переводов продукта ---
  // Используем ОДИН неймспейс ProductsPage и ВЛОЖЕННЫЙ ключ productId.field
  const getProductT = (
    productId: string,
    field: "name" | "shortDescription", // Запрашиваем только нужные поля
    fallback: string
  ): string => {
    // Формируем полный ключ: например, "sug.name" или "propan.shortDescription"
    const fullKey = `${productId}.${field}`;
    // Ищем его в неймспейсе ProductsPage
    return getTranslation(messages, "ProductsPage", fullKey, fallback);
  };

  return (
    // Используем фон base-200
    <section className="py-16 md:py-24 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
            {sectionTitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content">
            {mainTitle}
          </h2>
        </div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {productsData.map((product) => {
            // --- Получаем ПРАВИЛЬНЫЕ переводы ---
            const name = getProductT(
              product.id,
              "name",
              `Продукт ${product.id}`
            );
            const description = getProductT(
              product.id,
              "shortDescription",
              `Краткое описание ${product.id}...`
            );

            return (
              <div
                key={product.id}
                className="card border border-transparent hover:border-primary/30 flex flex-col text-left p-6 md:p-8 group h-full"
              >
                {/* Иконка */}
                <div className="mb-5 text-primary text-4xl">
                  {productIcons[product.id] || <FaBoxOpen />}
                </div>
                {/* Заголовок */}
                <h3 className="text-xl font-heading font-semibold text-base-content mb-3 group-hover:text-primary transition-colors duration-300">
                  {name}
                </h3>
                {/* Описание */}
                <p className="text-muted mb-5 flex-grow text-sm leading-relaxed">
                  {description} {/* Теперь здесь краткое описание */}
                </p>
                {/* Ссылка "Подробнее" */}
                <div className="mt-auto border-t border-base-200 pt-4">
                  <Link
                    href={product.link}
                    className="inline-flex items-center text-primary hover:text-primary-focus font-medium transition-colors text-sm group-hover:underline"
                  >
                    {detailsLinkText}
                    <svg
                      className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Кнопка */}
        <div className="text-center">
          <Link href="/products" className="btn btn-outline-primary">
            {allProductsBtnText}
          </Link>
        </div>
      </div>
    </section>
  );
};

// Убедитесь, что функция getTranslation определена или импортирована
// const getTranslation = ...

export default ProductsSection;
