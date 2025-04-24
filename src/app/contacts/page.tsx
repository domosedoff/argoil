// src/app/contacts/page.tsx
"use client";

import React from "react";
// Убедитесь, что путь импорта карты правильный (ui или common)
import YandexMap from "@/components/ui/YandexMap";
import ContactForm from "@/components/forms/ContactForm";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import { useLocale } from "@/context/LocaleContext"; // Наш хук
import { AbstractIntlMessages } from "next-intl"; // Тип

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

// --- Данные контактов (статичные) ---
const contactData = {
  address: "123456, г. Москва, ул. Центральная, д. 1, офис 101", // TODO: Заменить
  phone: "+7 (495) 123-45-67", // TODO: Заменить
  phoneLink: "tel:+74951234567",
  email: "info@argoil.complexmedia.ru", // TODO: Заменить
  workingHoursStatic: "Пн-Пт: 9:00 - 18:00, Сб-Вс: выходной", // TODO: Заменить?
  mapCenter: [55.751244, 37.618423] as [number, number], // TODO: Заменить координаты
  placemarkCoords: [55.751244, 37.618423] as [number, number], // TODO: Заменить координаты
};

// --- Компонент страницы ---
export default function ContactsPage() {
  const { messages } = useLocale(); // Получаем сообщения

  // Обертка для переводов
  const t = (key: string, fallback: string) =>
    getTranslation(messages, "ContactsPage", key, fallback);

  return (
    <>
      {/* Шапка */}
      <section className="bg-base-200 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-base-content">
            {t("page_title", "Контакты")}
          </h1>
          <p className="text-lg md:text-xl text-muted mt-3 max-w-3xl mx-auto">
            {t(
              "page_subtitle",
              "Мы всегда на связи! Свяжитесь с нами любым удобным для вас способом или посетите наш офис."
            )}
          </p>
        </div>
      </section>

      {/* Основная секция */}
      <section className="py-24 md:py-32 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-start">
            {/* Левая колонка */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-base-content mb-6">
                {t("coordinates_title", "Наши координаты")}
              </h2>
              <div className="space-y-5 text-lg text-base-content mb-10">
                <p className="flex items-start">
                  <FaMapMarkerAlt className="w-5 h-5 mr-3 mt-1 text-primary flex-shrink-0" />
                  <span>
                    <strong>{t("address_label", "Адрес")}:</strong>{" "}
                    <span className="text-muted">{contactData.address}</span>
                  </span>
                </p>
                <p className="flex items-center">
                  <FaPhoneAlt className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                  <span>
                    <strong>{t("phone_label", "Телефон")}:</strong>{" "}
                    <a
                      href={contactData.phoneLink}
                      className="text-primary hover:text-primary-focus ml-1"
                    >
                      {contactData.phone}
                    </a>
                  </span>
                </p>
                <p className="flex items-center">
                  <FaEnvelope className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                  <span>
                    <strong>{t("email_label", "Email")}:</strong>{" "}
                    <a
                      href={`mailto:${contactData.email}`}
                      className="text-primary hover:text-primary-focus ml-1"
                    >
                      {contactData.email}
                    </a>
                  </span>
                </p>
                <p className="flex items-center">
                  <FaClock className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                  <span>
                    <strong>{t("hours_label", "Часы работы")}:</strong>{" "}
                    <span className="text-muted">
                      {contactData.workingHoursStatic}
                    </span>
                  </span>
                </p>
              </div>

              {/* Форма обратной связи */}
              <div className="pt-8 border-t border-base-300">
                <h3 className="text-2xl font-heading font-semibold text-base-content mb-4">
                  {t("feedback_title", "Обратная связь")}
                </h3>
                <p className="text-muted mb-6">
                  {t(
                    "feedback_text",
                    "Если у вас остались вопросы, предложения или вы хотите сделать запрос на расчет стоимости, пожалуйста, заполните форму ниже, и мы свяжемся с вами в ближайшее время."
                  )}
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Правая колонка: Карта */}
            <div className="h-[400px] md:h-[500px] lg:h-full w-full min-h-[400px] rounded-lg overflow-hidden shadow-lg sticky top-24 border border-base-300">
              <YandexMap
                center={contactData.mapCenter}
                placemark={contactData.placemarkCoords}
                zoom={16}
                mapHeight="100%"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
