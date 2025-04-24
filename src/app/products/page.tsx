// src/app/products/page.tsx
"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { useLocale } from "@/context/LocaleContext";
import { AbstractIntlMessages } from "next-intl";

// --- Функция getTranslation ---
const getTranslation = (
  messages: AbstractIntlMessages,
  ns: string,
  key: string,
  fb: string
): string => {
  // Проверяем messages и namespace
  if (typeof messages === "object" && messages !== null && messages[ns]) {
    const nsMessages = messages[ns] as AbstractIntlMessages; // Неймспейс точно объект

    // Обработка простых и вложенных ключей
    const keys = key.split(".");
    let current: unknown = nsMessages; // Начинаем с unknown

    for (const k of keys) {
      // Проверяем, что current - это объект и ключ k существует
      if (current && typeof current === "object" && k in current) {
        // Утверждаем тип для следующего шага (осторожно!)
        current = (current as Record<string, unknown>)[k];
      } else {
        current = undefined; // Ключ не найден на пути
        break;
      }
    }

    // Возвращаем значение, только если это непустая строка
    if (typeof current === "string" && current.trim() !== "") {
      return current;
    }
  }
  // Возвращаем фоллбэк во всех остальных случаях
  // console.warn(`Translation not found for key: ${ns}.${key}`);
  return fb;
};

// Тип для продукта (можно убрать, если не используется)
// interface ProductData { id: string; imageSrc?: string | null; }

// Данные каталога (только ID и картинки)
const productCatalogData = [
  { id: "sug", imageSrc: "/images/products/sug.jpg" },
  { id: "propan", imageSrc: "/images/products/propan.jpg" },
  { id: "butan", imageSrc: "/images/products/butan.jpg" },
  { id: "pba", imageSrc: "/images/products/pba.jpg" },
];

// --- Компонент страницы ---
export default function ProductsPage() {
  const { messages } = useLocale();

  const t = (key: string, fallback: string) =>
    getTranslation(messages, "ProductsPage", key, fallback);
  const getProductT = (
    productId: string,
    key: "name" | "shortDescription" | "description" | "features",
    fallback: string
  ): string => t(`${productId}.${key}`, fallback);

  // Исправленная функция для получения характеристик
  const getProductFeatures = (productId: string): string[] => {
    // Получаем строку с характеристиками (или пустую строку)
    const featuresString = getProductT(productId, "features", "");
    // Проверяем, что это не пустая строка перед разделением
    if (featuresString) {
      return featuresString
        .split("|")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);
    }
    return []; // Возвращаем пустой массив, если строка пустая
  };

  return (
    <>
      {/* Верхняя секция */}
      <section className="bg-gradient-to-r from-primary via-primary/80 to-accent py-16 md:py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold">
            {t("page_title", "Наша Продукция")}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mt-3 max-w-3xl mx-auto">
            {t(
              "page_subtitle",
              "Предлагаем широкий ассортимент качественных сжиженных газов для различных нужд, соответствующих самым строгим стандартам ГОСТ."
            )}
          </p>
        </div>
      </section>

      {/* Секция каталога */}
      <section className="py-24 md:py-32 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:gap-16">
            {productCatalogData.map((product) => {
              const name = getProductT(
                product.id,
                "name",
                `Продукт ${product.id}`
              );
              const shortDesc = getProductT(product.id, "shortDescription", "");
              const description = getProductT(
                product.id,
                "description",
                `Полное и детальное описание продукта ${name}, его свойств, областей применения и преимуществ использования.`
              );
              const features = getProductFeatures(product.id);
              const featuresTitle = t(
                "features_title",
                "Ключевые особенности:"
              );
              const requestPriceBtn = t("request_price_btn", "Запросить цену");
              const photoPlaceholder = t("photo_placeholder", "Фото продукта");

              return (
                <div
                  key={product.id}
                  id={product.id}
                  className="card p-0 grid grid-cols-1 md:grid-cols-3 gap-0 scroll-mt-24 overflow-hidden rounded-xl"
                >
                  <div className="md:col-span-1 relative h-64 md:h-auto md:min-h-[350px] overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                    {product.imageSrc ? (
                      <Image
                        src={product.imageSrc}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                        quality={80}
                        className="transition-transform duration-500 ease-in-out hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-base-300 flex items-center justify-center text-muted">
                        {photoPlaceholder}
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-2 p-6 md:p-8 lg:p-10 flex flex-col">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-heading font-semibold text-base-content mb-2">
                        {name}
                      </h2>
                      {shortDesc && (
                        <p className="text-sm text-muted mb-4 font-medium">
                          {shortDesc}
                        </p>
                      )}
                      <p className="text-muted mb-6 leading-relaxed text-base">
                        {description}
                      </p>
                      {features && features.length > 0 && (
                        <div className="mb-8">
                          <h4 className="text-lg font-semibold text-base-content mb-3">
                            {featuresTitle}
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 list-none p-0 text-muted text-base">
                            {features.map((feature, index) => (
                              <li key={index} className="flex items-center">
                                <FaCheckCircle className="text-success mr-2 h-4 w-4 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="mt-auto pt-5 border-t border-base-300">
                      <Link
                        href={`/contacts?subject=Запрос цены: ${encodeURIComponent(name)}`}
                        className="btn btn-secondary btn-sm"
                      >
                        {requestPriceBtn}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Секция CTA */}
      <section className="py-24 md:py-32 bg-base-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content mb-4">
            {t("cta_title", "Готовы обсудить поставки?")}
          </h2>
          <p className="text-lg text-muted mb-8 max-w-xl mx-auto">
            {t(
              "cta_subtitle",
              "Свяжитесь с нашим отделом продаж для получения консультации и индивидуального коммерческого предложения, адаптированного под ваши потребности."
            )}
          </p>
          <Link href="/contacts" className="btn btn-primary btn-lg">
            {t("cta_button", "Запросить предложение")}
          </Link>
        </div>
      </section>
    </>
  );
}
