// src/components/sections/ClientsPartnersSection.tsx
"use client"; // Компонент может содержать интерактивность (обработчик для disabled ссылок)

import Link from "next/link";
import React from "react";

// Иконка-плейсхолдер для кнопок
const ArrowRightIcon = () => (
  // Используем currentColor, чтобы иконка наследовала цвет текста родителя
  <svg
    className="w-5 h-5 ml-2 text-current"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    ></path>
  </svg>
);

// Данные-заглушки для кнопок/ссылок
// TODO: Заменить на данные из файла, когда он будет предоставлен
const clientLinks = [
  { id: 1, text: "Как стать клиентом?", link: "/clients#how-to-start" },
  { id: 2, text: "Условия поставок", link: "/clients#delivery-terms" },
  { id: 3, text: "Типовые договоры", link: "/clients#contracts" },
  {
    id: 4,
    text: "Запрос коммерческого предложения",
    link: "/contacts?subject=КП",
  },
  { id: 5, text: "Стандарты качества продукции", link: "/products#quality" },
  { id: 6, text: "Личный кабинет (скоро)", link: "#" }, // Неактивная ссылка
];

const ClientsPartnersSection = () => {
  return (
    // Используем основной темный фон из палитры
    <section className="py-16 md:py-24 bg-brand-dark text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          {/* Заголовок */}
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
            Клиентам и Партнерам
          </h2>
          {/* Описание - используем более светлый оттенок серого для читаемости на темном фоне */}
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Мы ценим каждого партнера и стремимся сделать сотрудничество
            максимально удобным и выгодным. Узнайте больше о наших условиях и
            возможностях.
          </p>
        </div>

        {/* Сетка для кнопок/ссылок */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-4xl mx-auto">
          {clientLinks.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              // Стилизуем ссылку как карточку/кнопку
              className={`group flex items-center justify-between text-left p-4 rounded-lg transition duration-300 ease-in-out border  ${
                item.link === "#"
                  ? // Стиль для неактивной: приглушенный фон и текст, без hover-эффектов
                    "bg-gray-700/30 border-gray-600 text-gray-400 cursor-not-allowed"
                  : // Стиль для активной: полупрозрачный фон и обводка, эффект при наведении
                    "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 text-white"
              }`}
              // Предотвращаем переход по неактивной ссылке
              onClick={(e) => {
                if (item.link === "#") {
                  e.preventDefault();
                }
              }}
              // Добавляем aria-disabled для доступности
              aria-disabled={item.link === "#"}
            >
              <span className="font-medium">{item.text}</span>
              {/* Показываем иконку только для активных ссылок */}
              {item.link !== "#" && (
                // Добавляем анимацию для иконки
                <span className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ease-in-out">
                  <ArrowRightIcon /> {/* Иконка наследует text-white */}
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
