// src/app/clients/page.tsx
import React from "react";
import Link from "next/link"; // Для ссылок

// Данные-заглушки для кнопок/ссылок с главной страницы (для заголовков секций)
// TODO: Заменить на данные из файла, когда он будет предоставлен
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
      <section className="bg-gradient-to-r from-brand-dark via-primary to-accent py-12 md:py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold">
            Клиентам и Партнерам
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mt-2 max-w-2xl mx-auto">
            Информация для начала и ведения успешного сотрудничества с нашей
            компанией.
          </p>
        </div>
      </section>

      {/* Основной контент страницы */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {" "}
          {/* Ограничим ширину для лучшей читаемости */}
          {/* Секция: Как стать клиентом */}
          <div id="how-to-start" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-heading font-bold text-brand-dark mb-4">
              {clientLinks.find((link) => link.id === "how-to-start")?.text ||
                "Как стать клиентом?"}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              {" "}
              {/* Используем Tailwind Typography для стилизации текста */}
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
          <div id="delivery-terms" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-heading font-bold text-brand-dark mb-4">
              {clientLinks.find((link) => link.id === "delivery-terms")?.text ||
                "Условия поставок"}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
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
          <div id="contracts" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-heading font-bold text-brand-dark mb-4">
              {clientLinks.find((link) => link.id === "contracts")?.text ||
                "Типовые договоры"}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                {/* TODO: Добавить текст */}
                Для вашего удобства мы предоставляем образцы типовых договоров
                поставки. Вы можете ознакомиться с ними, чтобы понять основные
                условия сотрудничества. Обратите внимание, что финальный договор
                может содержать индивидуальные условия, согласованные с вашим
                менеджером.
              </p>
              {/* TODO: Добавить ссылки на скачивание файлов */}
              <ul className="list-none pl-0">
                <li>
                  <a
                    href="/docs/contract-sample-legal.pdf"
                    download
                    className="text-primary hover:underline"
                  >
                    Скачать типовой договор для юридических лиц (.pdf)
                  </a>
                </li>
                <li>
                  <a
                    href="/docs/contract-sample-ip.pdf"
                    download
                    className="text-primary hover:underline"
                  >
                    Скачать типовой договор для ИП (.pdf)
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Секция: Стандарты качества (ссылка на раздел Продукция) */}
          <div id="quality" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-heading font-bold text-brand-dark mb-4">
              {clientLinks.find((link) => link.id === "quality")?.text ||
                "Стандарты качества продукции"}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Вся поставляемая нами продукция соответствует действующим ГОСТам
                и стандартам качества РФ. Подробную информацию о стандартах и
                сертификатах вы можете найти в разделе{" "}
                <Link href="/products">Продукция</Link> или запросить у вашего
                менеджера.
              </p>
            </div>
          </div>
          {/* Можно добавить другие релевантные секции */}
        </div>
      </section>
    </>
  );
}
