// src/app/logistics/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import React from "react";
import Link from "next/link"; // Убедимся, что Link импортирован
// Импортируем нужные иконки
import { FaShippingFast, FaShieldAlt, FaRoute } from "react-icons/fa";

// --- МЕТАДАННЫЕ ---
// TODO: Адаптировать текст под вашу компанию
export const metadata: Metadata = {
  title: "Логистика и поставки",
  description:
    'Информация о логистических возможностях компании "Аргойл": география поставок СУГ по РФ и СНГ, виды транспорта (авто, ж/д), преимущества нашей доставки.',
};

// --- Данные для преимуществ ---
// Определяем тип для преимущества (необязательно, но хорошая практика)
interface Advantage {
  id: number;
  title: string;
  text: string;
  icon: React.ReactNode; // Тип для React-компонента иконки
}

const logisticsAdvantages: Advantage[] = [
  {
    id: 1,
    title: "Соблюдение сроков",
    text: "Точное планирование и контроль доставки.",
    icon: <FaShippingFast />,
  },
  {
    id: 2,
    title: "Безопасность",
    text: "Строгое соответствие нормам перевозки ОГ.",
    icon: <FaShieldAlt />,
  },
  {
    id: 3,
    title: "Гибкость",
    text: "Подбор оптимального транспорта и маршрута.",
    icon: <FaRoute />,
  },
];

// --- Компонент страницы ---
export default function LogisticsPage() {
  return (
    <>
      {/* Шапка */}
      <section className="bg-base-200 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-base-content">
            Логистика и Поставки
          </h1>
          <p className="text-lg md:text-xl text-muted mt-3 max-w-3xl mx-auto">
            Обеспечиваем своевременную и безопасную доставку газа по России и
            СНГ.
          </p>
        </div>
      </section>

      {/* Секция 1: Описание + Карта */}
      <section className="py-24 md:py-32 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Левая колонка: Текст */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content mb-6">
                Наша география поставок
              </h2>
              {/* Используем .prose для стилизации текста */}
              <div className="prose prose-lg max-w-none prose-p:text-muted prose-li:text-muted prose-headings:text-base-content prose-headings:font-heading prose-headings:mb-3 prose-headings:mt-6 prose-ul:text-lg">
                {/* TODO: Заменить на реальный текст */}
                <p>
                  Мы располагаем развитой логистической сетью, охватывающей
                  более 70 регионов Российской Федерации, а также страны
                  ближнего зарубежья, включая [перечислить страны, например,
                  Казахстан, Беларусь]. Доставка осуществляется собственным и
                  привлеченным автотранспортом (газовозы различной вместимости),
                  а также железнодорожными цистернами.
                </p>
                <p>
                  Наши специалисты подбирают оптимальный маршрут и вид
                  транспорта для каждого заказа, учитывая объем, расстояние и
                  требования к срокам. Мы гарантируем соблюдение всех норм
                  безопасности при перевозке опасных грузов.
                </p>
                <h3>Виды транспорта:</h3>
                <ul>
                  <li>Автомобильные газовозы (от 5 до 40 тонн).</li>
                  <li>Железнодорожные цистерны для СУГ.</li>
                  <li>Возможность организации мультимодальных перевозок.</li>
                </ul>
              </div>
            </div>

            {/* Правая колонка: Карта */}
            <div className="order-1 lg:order-2 relative h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl border border-base-300">
              <Image
                src="/images/map.jpg" // TODO: Заменить путь и alt
                alt="Карта поставок Аргойл"
                fill // Используем fill
                sizes="(max-width: 1024px) 100vw, 50vw" // Пример sizes
                style={{ objectFit: "cover" }} // Используем style
                className="rounded-lg"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Секция 2: Преимущества логистики */}
      <section className="py-24 md:py-32 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content mb-4">
              Преимущества нашей логистики
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {logisticsAdvantages.map((adv) => (
              <div
                key={adv.id}
                className="card p-6 md:p-8 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                {/* Используем цвет primary для иконок */}
                <div className="text-primary text-4xl mb-5 flex justify-center">
                  {adv.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-base-content mb-2">
                  {adv.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{adv.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Секция CTA */}
      <section className="py-24 md:py-32 bg-base-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content mb-4">
            Нужна консультация по доставке?
          </h2>
          <p className="text-lg text-muted mb-8 max-w-xl mx-auto">
            Наши менеджеры рассчитают стоимость и сроки доставки до вашего
            объекта.
          </p>
          <Link href="/contacts" className="btn btn-primary btn-lg">
            Связаться с нами
          </Link>
        </div>
      </section>
    </>
  );
}
