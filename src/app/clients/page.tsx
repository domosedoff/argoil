// src/app/clients/page.tsx
import React from "react";
import Link from "next/link";
// Импортируем иконку для ссылок на скачивание
import { FaDownload } from "react-icons/fa";

// Данные clientLinks оставляем как есть
const clientLinks = [
  {
    id: "how-to-start",
    text: "Как стать клиентом?",
    link: "/clients#how-to-start",
  },
  {
    id: "delivery-terms",
    text: "Условия поставок",
    link: "/clients#delivery-terms",
  },
  { id: "contracts", text: "Типовые договоры", link: "/clients#contracts" },
  {
    id: "request-quote",
    text: "Запрос коммерческого предложения",
    link: "/contacts?subject=КП",
  },
  {
    id: "quality",
    text: "Стандарты качества продукции",
    link: "/products#quality",
  },
  { id: "cabinet", text: "Личный кабинет (скоро)", link: "#" },
];

export default function ClientsPage() {
  return (
    <>
      {/* Верхняя секция с заголовком */}
      {/* Оставляем градиент для выразительности */}
      <section className="bg-gradient-to-r from-brand-dark via-primary to-accent py-12 md:py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          {/* Используем новые размеры */}
          <h1 className="text-4xl md:text-5xl font-heading font-bold">
            Клиентам и Партнерам
          </h1>
          {/* Используем text-lg */}
          <p className="text-lg md:text-xl text-gray-200 mt-2 max-w-3xl mx-auto">
            {" "}
            {/* Увеличил max-w */}
            Информация для начала и ведения успешного сотрудничества с нашей
            компанией.
          </p>
        </div>
      </section>

      {/* Основной контент страницы */}
      {/* Используем фон base-100 (белый) */}
      <section className="py-16 md:py-20 bg-base-100">
        {/* Ограничиваем ширину для читаемости */}
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Секция: Как стать клиентом */}
          <div id="how-to-start" className="mb-16 scroll-mt-20">
            {" "}
            {/* Увеличил mb */}
            {/* Используем новые размеры и цвета */}
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content mb-6">
              {clientLinks.find((link) => link.id === "how-to-start")?.text ||
                "Как стать клиентом?"}
            </h2>
            {/* Настраиваем стили prose для соответствия палитре */}
            <div className="prose prose-lg max-w-none prose-p:text-muted prose-li:text-muted prose-strong:text-base-content prose-a:text-primary hover:prose-a:text-primary-focus">
              <p>
                {/* TODO: Добавить текст */}
                Начать сотрудничество с нами просто. Мы работаем как с
                юридическими, так и с физическими лицами (индивидуальными
                предпринимателями). Основные шаги:
              </p>
              <ol>
                <li>
                  Оставьте заявку через форму на сайте или свяжитесь с нашим
                  отделом продаж по телефону [Ваш телефон].
                </li>
                <li>
                  Наш менеджер уточнит ваши потребности (объемы, график
                  поставок, местоположение).
                </li>
                <li>
                  Мы подготовим для вас индивидуальное коммерческое предложение.
                </li>
                <li>
                  После согласования условий заключается договор поставки.
                </li>
                <li>Вы получаете качественный газ точно в срок!</li>
              </ol>
              <p>
                Для заключения договора потребуются стандартные учредительные
                документы для юридических лиц или паспортные данные и ИНН для
                ИП.
              </p>
            </div>
          </div>

          {/* Секция: Условия поставок */}
          <div id="delivery-terms" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content mb-6">
              {clientLinks.find((link) => link.id === "delivery-terms")?.text ||
                "Условия поставок"}
            </h2>
            <div className="prose prose-lg max-w-none prose-p:text-muted prose-li:text-muted prose-strong:text-base-content prose-a:text-primary hover:prose-a:text-primary-focus">
              <p>
                {/* TODO: Добавить текст */}
                Мы предлагаем гибкие условия поставок, адаптированные под нужды
                вашего бизнеса:
              </p>
              <ul>
                <li>
                  Минимальный объем заказа: [Указать минимальный объем,
                  например, 5 тонн].
                </li>
                <li>
                  География доставки: Вся Россия и страны СНГ (см. раздел{" "}
                  <Link href="/logistics">Логистика</Link>).
                </li>
                <li>Транспорт: Автомобильные и железнодорожные цистерны.</li>
                <li>
                  Условия оплаты: Предоплата, частичная оплата, отсрочка платежа
                  для постоянных клиентов (обсуждается индивидуально).
                </li>
                <li>
                  Сроки поставки: От [X] дней с момента согласования заявки
                  (зависит от региона и объема).
                </li>
              </ul>
            </div>
          </div>

          {/* Секция: Типовые договоры */}
          <div id="contracts" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content mb-6">
              {clientLinks.find((link) => link.id === "contracts")?.text ||
                "Типовые договоры"}
            </h2>
            <div className="prose prose-lg max-w-none prose-p:text-muted prose-li:text-muted prose-strong:text-base-content prose-a:text-primary hover:prose-a:text-primary-focus">
              <p>
                {/* TODO: Добавить текст */}
                Для вашего удобства мы предоставляем образцы типовых договоров
                поставки...
              </p>
              {/* Используем flex для иконки и ссылки */}
              <ul className="list-none pl-0 space-y-3">
                <li>
                  <a
                    href="/docs/contract-sample-legal.pdf"
                    download
                    className="inline-flex items-center text-primary hover:text-primary-focus group"
                  >
                    <FaDownload className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />{" "}
                    {/* Иконка */}
                    <span>
                      Скачать типовой договор для юридических лиц (.pdf)
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
                    <span>Скачать типовой договор для ИП (.pdf)</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Секция: Стандарты качества */}
          <div id="quality" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content mb-6">
              {clientLinks.find((link) => link.id === "quality")?.text ||
                "Стандарты качества продукции"}
            </h2>
            <div className="prose prose-lg max-w-none prose-p:text-muted prose-li:text-muted prose-strong:text-base-content prose-a:text-primary hover:prose-a:text-primary-focus">
              <p>
                Вся поставляемая нами продукция соответствует действующим ГОСТам
                и стандартам качества РФ...
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
