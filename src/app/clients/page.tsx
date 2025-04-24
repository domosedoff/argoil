// src/app/clients/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import { useLocale } from "@/context/LocaleContext";
import { AbstractIntlMessages } from "next-intl";

// --- Функция getTranslation (Исправленная для вложенных ключей) ---
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

// Данные ссылок/секций (ID для ключей перевода)
// ТЕПЕРЬ ЭТОТ МАССИВ ИСПОЛЬЗУЕТСЯ
const clientSectionsData = [
  { id: "how-to-start" },
  { id: "delivery-terms" },
  { id: "contracts" },
  { id: "quality" },
];

export default function ClientsPage() {
  const { messages } = useLocale();

  // Обертка для переводов этой страницы
  const t = (
    key: string,
    fallback: string,
    params?: Record<string, string | number>
  ) => {
    let text = getTranslation(messages, "ClientsPage", key, fallback);
    if (params && text) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(`{${paramKey}}`, String(paramValue));
      });
    }
    return text;
  };

  // Функция для получения заголовка секции по ID
  const getSectionTitle = (id: string, fallback: string) => t(id, fallback);

  return (
    <>
      {/* Шапка */}
      <section className="bg-gradient-to-r from-brand-dark via-primary to-accent py-16 md:py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold">
            {t("page_title", "Клиентам и Партнерам")}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mt-3 max-w-3xl mx-auto">
            {t(
              "page_subtitle",
              "Вся необходимая информация для комфортного и продуктивного начала и ведения сотрудничества с нашей компанией."
            )}
          </p>
        </div>
      </section>

      {/* Основной контент */}
      <section className="py-24 md:py-32 bg-base-100">
        <div className="container mx-auto px-4 max-w-4xl">
          {" "}
          {/* Ограничиваем ширину */}
          {/* Генерируем секции на основе clientSectionsData */}
          {clientSectionsData.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="mb-16 scroll-mt-24"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content mb-6">
                {getSectionTitle(section.id, `Заголовок ${section.id}`)}
              </h2>
              <div className="prose prose-lg max-w-none prose-p:text-muted prose-li:text-muted prose-strong:text-base-content prose-a:text-primary hover:prose-a:text-primary-focus">
                {/* --- Контент для каждой секции --- */}

                {/* Как стать клиентом */}
                {section.id === "how-to-start" && (
                  <>
                    <p>
                      {t(
                        "how-to-start_p1",
                        "Начать сотрудничество с нами просто..."
                      )}
                    </p>
                    <ol>
                      <li>{t("how-to-start_step1", "Оставьте заявку...")}</li>
                      <li>
                        {t("how-to-start_step2", "Наш менеджер свяжется...")}
                      </li>
                      <li>{t("how-to-start_step3", "Подготовим КП...")}</li>
                      <li>{t("how-to-start_step4", "Заключаем договор...")}</li>
                      <li>{t("how-to-start_step5", "Вы получаете газ!")}</li>
                    </ol>
                    <p>
                      {t("how-to-start_p2", "Для договора нужны документы...")}
                    </p>
                  </>
                )}

                {/* Условия поставок */}
                {section.id === "delivery-terms" && (
                  <>
                    <p>
                      {t("delivery-terms_p1", "Предлагаем гибкие условия...")}
                    </p>
                    <ul>
                      <li>
                        {t("delivery-terms_item1", "Минимальный объем...")}
                      </li>
                      <li>
                        {t("delivery-terms_item2", "География...")}{" "}
                        <Link href="/logistics" className="font-medium">
                          {getTranslation(
                            messages,
                            "Navigation",
                            "logistics",
                            "Логистика"
                          )}
                        </Link>
                        {t("delivery-terms_item2_end", ".")}.
                      </li>
                      <li>
                        {t(
                          "delivery-terms_item3",
                          "Используем свой транспорт..."
                        )}
                      </li>
                      <li>
                        {t(
                          "delivery-terms_item4",
                          "Условия оплаты индивидуальны..."
                        )}
                      </li>
                      <li>{t("delivery-terms_item5", "Сроки поставки...")}</li>
                    </ul>
                  </>
                )}

                {/* Типовые договоры */}
                {section.id === "contracts" && (
                  <>
                    <p>
                      {t(
                        "contracts_p1",
                        "Для удобства предоставляем образцы..."
                      )}
                    </p>
                    <p>
                      {t(
                        "contracts_p2",
                        "Финальный договор может отличаться..."
                      )}
                    </p>
                    <ul className="list-none pl-0 space-y-3 mt-6">
                      <li>
                        <a
                          href="/docs/contract-sample-legal.pdf"
                          download
                          className="inline-flex items-center text-primary hover:text-primary-focus group"
                        >
                          <FaDownload className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                          <span>
                            {t(
                              "contract_link_legal",
                              "Скачать договор для юр. лиц (.pdf)"
                            )}
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="/docs/contract-sample-ip.pdf"
                          download
                          className="inline-flex items-center text-primary hover:text-primary-focus group"
                        >
                          <FaDownload className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                          <span>
                            {t(
                              "contract_link_ip",
                              "Скачать договор для ИП (.pdf)"
                            )}
                          </span>
                        </a>
                      </li>
                    </ul>
                  </>
                )}

                {/* Стандарты качества */}
                {section.id === "quality" && (
                  <>
                    <p>
                      {t("quality_p1", "Гарантируем высочайшее качество...")}
                    </p>
                    <p>
                      {t("quality_link_text_part1", "Подробную информацию...")}
                      <Link href="/products" className="font-medium">
                        {getTranslation(
                          messages,
                          "Navigation",
                          "products",
                          "Продукция"
                        )}
                      </Link>
                      {t(
                        "quality_link_text_part3",
                        " или запросить у менеджера."
                      )}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
