// src/components/layout/Footer.tsx
"use client"; // Компонент содержит клиентские виджеты и Link

import Link from "next/link"; // Используется в навигации и ссылке на логистику
import Image from "next/image"; // Используется для мини-карты
import QuotesWidget from "@/components/widgets/QuotesWidget"; // Импорт виджета котировок

const Footer = () => {
  // Используется в копирайте
  const currentYear = new Date().getFullYear();

  return (
    // Общая обертка для виджетов и футера
    <div className="bg-gray-100">
      {/* ----- Секция виджетов ----- */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {" "}
          {/* items-start чтобы колонки были одной высоты */}
          {/* Виджет котировок */}
          <QuotesWidget />
          {/* Виджет с мини-картой */}
          <div className="bg-white p-4 rounded shadow h-full flex flex-col">
            {" "}
            {/* h-full и flex чтобы ссылка была внизу */}
            <h4 className="font-semibold text-brand-dark mb-2">
              География поставок
            </h4>
            <p className="text-sm text-gray-500 mb-3">
              Осуществляем поставки по РФ и странам ближнего зарубежья.
            </p>
            {/* Контейнер для изображения карты */}
            <div className="relative h-24 md:h-32 w-full rounded overflow-hidden border flex-grow">
              {" "}
              {/* flex-grow чтобы карта занимала место */}
              <Image
                src="/images/map.jpg" // Убедитесь, что путь верный
                alt="Карта поставок"
                layout="fill"
                objectFit="cover" // или 'contain'
                className="rounded"
              />
            </div>
            {/* Ссылка на страницу логистики */}
            <div className="text-right mt-2 pt-2 border-t border-gray-200">
              {" "}
              {/* Отделяем ссылку линией */}
              <Link
                href="/logistics"
                className="text-primary hover:underline text-sm font-medium"
              >
                Подробнее о логистике →
              </Link>
            </div>
          </div>
          {/* Конец виджета с мини-картой */}
        </div>
      </div>
      {/* ----- Конец Секции виджетов ----- */}

      {/* ----- Основной футер ----- */}
      <footer className="bg-brand-dark text-gray-300 pt-10 pb-6">
        <div className="container mx-auto px-4">
          {/* ----- Содержимое футера ----- */}
          <div className="flex flex-wrap text-left lg:text-left">
            {/* Секция 1: О компании (кратко) */}
            <div className="w-full lg:w-5/12 px-4 mb-6 lg:mb-0">
              <h4 className="text-xl font-heading font-semibold text-white mb-3">
                Название Компании {/* TODO: Заменить */}
              </h4>
              <p className="text-sm text-gray-400 mb-4">
                Надежный поставщик сжиженного газа и нефтепродуктов.
                {/* TODO: Заменить на краткий слоган или описание */}
              </p>
              {/* Можно добавить логотип в футер */}
              {/* <Link href="/" className="inline-block mb-4">
                 <img src="/logo-white.svg" alt="Лого" className="h-8"/>
               </Link> */}
            </div>

            {/* Секция 2: Навигация */}
            <div className="w-full lg:w-3/12 px-4 mb-6 lg:mb-0">
              <span className="block uppercase text-white text-sm font-semibold mb-3">
                Навигация
              </span>
              <ul className="list-unstyled space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    О компании
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Продукция
                  </Link>
                </li>
                <li>
                  <Link
                    href="/logistics"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Логистика
                  </Link>
                </li>
                <li>
                  <Link
                    href="/clients"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Клиентам
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacts"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Контакты
                  </Link>
                </li>
              </ul>
            </div>

            {/* Секция 3: Контакты (кратко) */}
            <div className="w-full lg:w-4/12 px-4">
              <span className="block uppercase text-white text-sm font-semibold mb-3">
                Контакты
              </span>
              <ul className="list-unstyled space-y-2 text-sm">
                {/* TODO: Заменить на реальные данные */}
                <li className="text-gray-400 ">Адрес: Город, Улица, Дом</li>
                <li className="text-gray-400 ">
                  Телефон:{" "}
                  <a
                    href="tel:+71234567890"
                    className="hover:text-white transition-colors"
                  >
                    +7 (123) 456-78-90
                  </a>
                </li>
                <li className="text-gray-400 ">
                  Email:{" "}
                  <a
                    href="mailto:info@example.com"
                    className="hover:text-white transition-colors"
                  >
                    info@example.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* ----- Конец Содержимого футера ----- */}

          {/* Разделитель и копирайт */}
          <hr className="my-6 border-gray-700" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full px-4 mx-auto text-center">
              <div className="text-sm text-gray-500 font-light py-1">
                © {currentYear} Название Компании. Все права защищены.
                {/* TODO: Заменить Название Компании */}
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* ----- Конец Основного футера ----- */}
    </div> // Закрываем общую обертку
  );
};

export default Footer; // Экспорт по умолчанию
