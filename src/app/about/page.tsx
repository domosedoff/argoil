// src/app/about/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import React from "react";
import {
  FaCheckCircle,
  FaShieldAlt,
  FaTruckMoving,
  FaHandshake,
} from "react-icons/fa";

// --- МЕТАДАННЫЕ ---
// TODO: Адаптировать текст под вашу компанию
export const metadata: Metadata = {
  title: "О компании",
  description:
    'Узнайте больше о компании "Аргойл": история, миссия, ценности и преимущества работы с нами как с надежным поставщиком СУГ.',
};

// --- Данные для преимуществ ---
const advantages = [
  {
    id: 1,
    title: "Гарантия качества",
    text: "Строгий контроль качества поставляемой продукции на всех этапах.",
    icon: <FaCheckCircle />,
  },
  {
    id: 2,
    title: "Надежность поставок",
    text: "Соблюдение сроков и объемов благодаря отлаженной логистике.",
    icon: <FaShieldAlt />,
  },
  {
    id: 3,
    title: "Собственный транспорт",
    text: "Современный автопарк специализированных газовозов.",
    icon: <FaTruckMoving />,
  },
  {
    id: 4,
    title: "Гибкие условия",
    text: "Индивидуальный подход к каждому клиенту и партнеру.",
    icon: <FaHandshake />,
  },
];

// --- Компонент страницы ---
export default function AboutPage() {
  return (
    <>
      {/* Секция 1: Основная информация */}
      {/* Увеличенные отступы py-* */}
      <section className="py-24 md:py-32 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-12 lg:gap-16 items-center">
            {/* Левая колонка: Текст */}
            <div className="lg:col-span-4">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-base-content mb-6">
                О Компании «Аргойл» {/* TODO: Подтвердить/Изменить название */}
              </h1>
              {/* Используем .prose для стилизации текста */}
              <div className="prose prose-lg max-w-none prose-p:text-muted prose-headings:text-base-content">
                {/* TODO: Заменить на реальный текст */}
                <p>
                  Компания «Аргойл» — ваш надежный и ответственный поставщик
                  сжиженных углеводородных газов (СУГ) на территории Российской
                  Федерации и стран СНГ. С [Год основания] года мы успешно
                  работаем на рынке, обеспечивая промышленные предприятия,
                  агрохолдинги и частных потребителей качественным топливом.
                </p>
                <p>
                  Наша миссия — способствовать энергетической стабильности и
                  эффективности бизнеса наших партнеров, предлагая лучшие
                  решения в области поставок газа. Мы гордимся своей репутацией,
                  построенной на профессионализме, честности и внимании к
                  потребностям клиентов.
                </p>
                <p>
                  Ключевые направления нашей деятельности включают оптовые
                  поставки пропана, бутана, пропан-бутановых смесей, а также
                  [перечислить другие газы/услуги, если есть].
                </p>
                {/* Можно добавить подзаголовки */}
                {/* <h2>Наша история</h2> <p>...</p> */}
                {/* <h2>Миссия и ценности</h2> <p>...</p> */}
              </div>
            </div>
            {/* Правая колонка: Изображение */}
            <div className="lg:col-span-3 relative h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl border border-base-300">
              <Image
                src="/images/about.jpg" // TODO: Заменить путь и alt
                alt="Офис компании Аргойл"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                quality={85}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Секция 2: Наши Преимущества */}
      {/* Увеличенные отступы py-* */}
      <section className="py-24 md:py-32 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 md:mb-20">
            {" "}
            {/* Увеличил отступ */}
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content mb-4">
              Наши преимущества
            </h2>
            <p className="text-lg text-muted max-w-3xl mx-auto">
              {" "}
              {/* Увеличил max-w */}
              Почему ведущие предприятия выбирают нас в качестве поставщика
              газа:
            </p>
          </div>

          {/* Сетка преимуществ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {advantages.map((adv) => (
              // Добавляем улучшенный hover-эффект
              <div
                key={adv.id}
                className="card p-6 text-center flex flex-col items-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-primary text-4xl mb-5">
                  {" "}
                  {/* Увеличил отступ */}
                  {adv.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-base-content mb-2">
                  {adv.title}
                </h3>
                <p className="text-muted text-sm flex-grow leading-relaxed">
                  {" "}
                  {/* Добавил leading-relaxed */}
                  {adv.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
