// src/components/layout/Footer.tsx [ФИНАЛЬНАЯ ИСПРАВЛЕННАЯ ВЕРСИЯ]
"use client";

import Link from "next/link";
import Image from "next/image";
import QuotesWidget from "@/components/widgets/QuotesWidget";
import { useLocale } from "@/context/LocaleContext"; // Наш хук
import { AbstractIntlMessages } from "next-intl"; // Тип

// --- Функция getTranslation (убедитесь, что она верная) ---
const getTranslation = (
  messages: AbstractIntlMessages,
  ns: string,
  key: string,
  fb: string
): string => {
  if (typeof messages === "object" && messages !== null && messages[ns]) {
    const nsMessages = messages[ns] as AbstractIntlMessages;
    // Обработка простых и вложенных ключей
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
  // console.warn(`Translation missing for: ${ns}.${key}`); // Для отладки
  return fb;
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { messages } = useLocale();

  // Переводы для футера (используем неймспейс 'Footer')
  const t = (key: string, fallback: string) =>
    getTranslation(messages, "Footer", key, fallback);
  // Переводы для навигации (используем неймспейс 'Navigation')
  const tNav = (
    key: "about" | "products" | "logistics" | "clients" | "contacts",
    fallback: string
  ) => getTranslation(messages, "Navigation", key, fallback);

  // Статичные контакты (TODO: заменить)
  const staticAddress = "Город, Улица, Дом";
  const staticPhone = "+7 (123) 456-78-90";
  const staticPhoneLink = "tel:+71234567890";
  const staticEmail = "info@example.com";

  return (
    // Фон секции виджетов и рамка сверху
    <div className="bg-base-200 border-t border-base-300">
      {/* Секция виджетов */}
      <div className="container mx-auto px-4 py-10">
        {" "}
        {/* Увеличил отступ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Виджет котировок */}
          <QuotesWidget />

          {/* Виджет с картой */}
          <div className="bg-white p-4 rounded-lg shadow h-full flex flex-col">
            {" "}
            {/* Добавил rounded-lg */}
            <h4 className="font-semibold text-base-content mb-2">
              {t("logistics_widget_title", "География поставок")}
            </h4>
            <p className="text-sm text-muted mb-3">
              {t(
                "logistics_widget_text",
                "Осуществляем поставки по РФ и странам ближнего зарубежья."
              )}
            </p>
            <div className="relative h-24 md:h-32 w-full rounded overflow-hidden border border-base-200 flex-grow">
              <Image
                src="/images/map.jpg"
                alt={t("map_alt_text", "Карта поставок")}
                fill
                style={{ objectFit: "cover" }}
                className="rounded"
                quality={75}
              />
            </div>
            <div className="text-right mt-3 pt-3 border-t border-base-200">
              {" "}
              {/* Увеличил отступы */}
              <Link
                href="/logistics"
                className="text-primary hover:text-primary-focus text-sm font-medium transition-colors duration-200"
              >
                {t("logistics_widget_link", "Подробнее →")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Основной футер */}
      <footer className="bg-brand-dark text-gray-400 pt-12 pb-8">
        {" "}
        {/* Базовый цвет текста чуть темнее (400) */}
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            {/* Секция 1: О компании */}
            <div className="w-full lg:w-5/12 px-4 mb-8 lg:mb-0">
              {" "}
              {/* Увеличил mb */}
              <h4 className="text-xl font-heading font-semibold text-white mb-3">
                {t("company_name", "Аргойл")}
              </h4>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                {" "}
                {/* Добавил leading-relaxed */}
                {t(
                  "company_slogan",
                  "Надежный поставщик сжиженного газа и нефтепродуктов, обеспечивающий стабильность вашего бизнеса."
                )}
              </p>
            </div>

            {/* Секция 2: Навигация */}
            <div className="w-full lg:w-3/12 px-4 mb-8 lg:mb-0">
              <span className="block uppercase text-white text-sm font-semibold tracking-wider mb-4">
                {" "}
                {/* Добавил трекинг */}
                {t("nav_title", "Навигация")}
              </span>
              <ul className="list-unstyled space-y-2">
                {/* --- ИСПРАВЛЕНЫ СТИЛИ ДЛЯ LINK --- */}
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm pb-1 inline-block"
                  >
                    {tNav("about", "О компании")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm pb-1 inline-block"
                  >
                    {tNav("products", "Продукция")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/logistics"
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm pb-1 inline-block"
                  >
                    {tNav("logistics", "Логистика")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/clients"
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm pb-1 inline-block"
                  >
                    {tNav("clients", "Клиентам")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacts"
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm pb-1 inline-block"
                  >
                    {tNav("contacts", "Контакты")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Секция 3: Контакты */}
            <div className="w-full lg:w-4/12 px-4">
              <span className="block uppercase text-white text-sm font-semibold tracking-wider mb-4">
                {t("contacts_title", "Контакты")}
              </span>
              <ul className="list-unstyled space-y-3 text-sm">
                {" "}
                {/* Увеличил space-y */}
                <li className="text-gray-400 flex items-start">
                  <span className="inline-block w-5 mr-2 mt-0.5 text-gray-500">
                    {" "}
                    {/* Иконка-плейсхолдер */}📍
                  </span>
                  <span>
                    {t("address_label", "Адрес")}: {staticAddress}
                  </span>
                </li>
                <li className="text-gray-400 flex items-center">
                  <span className="inline-block w-5 mr-2 text-gray-500">
                    📞
                  </span>
                  <span>
                    {t("phone_label", "Телефон")}:{" "}
                    <a
                      href={staticPhoneLink}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {staticPhone}
                    </a>
                  </span>
                </li>
                <li className="text-gray-400 flex items-center">
                  <span className="inline-block w-5 mr-2 text-gray-500">
                    ✉️
                  </span>
                  <span>
                    {t("email_label", "Email")}:{" "}
                    <a
                      href={`mailto:${staticEmail}`}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {staticEmail}
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {/* Копирайт */}
          <hr className="my-8 border-gray-700" /> {/* Увеличил отступ */}
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full px-4 mx-auto text-center">
              <div className="text-sm text-gray-500 font-light py-1">
                © {currentYear} {t("company_name", "Аргойл")}.{" "}
                {t("copyright", "Все права защищены")}.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
