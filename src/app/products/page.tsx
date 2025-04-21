// src/app/products/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import React from "react";
import Link from "next/link"; // Убедимся, что Link импортирован
import { FaCheckCircle } from "react-icons/fa"; // Импортируем иконку для характеристик

// --- МЕТАДАННЫЕ ---
// TODO: Адаптировать текст под вашу компанию
export const metadata: Metadata = {
  title: "Продукция",
  description:
    "Каталог поставляемой продукции: СУГ (пропан-бутан СПБТ), пропан технический (ПТ), бутан технический (БТ), ПБА. Соответствие ГОСТ, гарантия качества.",
};

// --- Тип для продукта ---
interface Product {
  id: string;
  name: string;
  shortDescription?: string;
  description: string;
  imageSrc?: string | null; // Разрешаем null, если фото нет
  features?: string[];
}

// --- Данные каталога ---
// TODO: Заменить на реальные данные о продукции. Убедитесь, что пути imageSrc верны или null.
const productCatalog: Product[] = [
  {
    id: "sug",
    name: "Сжиженный углеводородный газ (СУГ)",
    shortDescription: "Смесь пропана и бутана (СПБТ), ГОСТ 20448-90",
    description:
      "Универсальное и экономичное топливо для коммунально-бытового потребления, автотранспорта (ГБО) и промышленных нужд. Поставляется в различных пропорциях пропана и бутана в зависимости от сезона и требований заказчика.",
    imageSrc: "/images/products/sug.jpg", // Пример пути
    features: [
      "Высокая теплотворная способность",
      "Экологичность (низкий уровень выбросов)",
      "Удобство транспортировки и хранения",
      "Широкий спектр применения",
    ],
  },
  {
    id: "propan",
    name: "Пропан технический (ПТ)",
    shortDescription: "ГОСТ Р 52087-2018",
    description:
      "Чистый пропан высокой концентрации. Идеально подходит для газопламенной обработки металлов, сварки, резки, а также в качестве хладагента и пропеллента.",
    imageSrc: "/images/products/propan.jpg", // Пример пути
    features: [
      "Высокая чистота продукта",
      "Стабильное горение",
      "Подходит для низких температур",
      "Используется в промышленных процессах",
    ],
  },
  {
    id: "butan",
    name: "Бутан технический (БТ)",
    shortDescription: "ГОСТ Р 52087-2018 (как компонент)",
    description:
      "Используется преимущественно как сырье в нефтехимической промышленности для производства синтетических каучуков и других органических соединений. Также применяется в качестве компонента СУГ.",
    imageSrc: "/images/products/butan.jpg", // Пример пути
    features: [
      "Важное химическое сырье",
      "Компонент топливных смесей",
      "Применяется в аэрозолях",
    ],
  },
  {
    id: "pba",
    name: "Пропан-бутан автомобильный (ПБА)",
    shortDescription: "Топливо для транспортных средств с ГБО",
    description:
      "Специально подготовленная смесь пропана и бутана, оптимизированная для использования в двигателях внутреннего сгорания. Обеспечивает экономичную и экологичную работу автотранспорта.",
    imageSrc: "/images/products/pba.jpg", // Пример пути
    features: [
      "Октановое число 100-110",
      "Снижение износа двигателя",
      "Уменьшение вредных выбросов",
      "Экономия на топливе",
    ],
  },
];

// --- Компонент страницы ---
export default function ProductsPage() {
  return (
    <>
      {/* Верхняя секция (шапка) */}
      <section className="bg-gradient-to-r from-primary via-primary/80 to-accent py-16 md:py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold">
            Наша Продукция
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mt-3 max-w-3xl mx-auto">
            Предлагаем широкий ассортимент качественных сжиженных газов для
            различных нужд, соответствующих ГОСТ.
          </p>
        </div>
      </section>

      {/* Секция каталога */}
      <section className="py-24 md:py-32 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:gap-16">
            {productCatalog.map((product) => (
              // Блок продукта
              <div
                key={product.id}
                id={product.id}
                className="card p-0 grid grid-cols-1 md:grid-cols-3 gap-0 scroll-mt-24 overflow-hidden rounded-xl"
              >
                {" "}
                {/* Изменил overflow, добавил rounded-xl */}
                {/* Колонка 1: Изображение */}
                <div className="md:col-span-1 relative h-64 md:h-auto md:min-h-[350px] overflow-hidden">
                  {product.imageSrc ? (
                    <Image
                      src={product.imageSrc}
                      alt={product.name}
                      fill // Используем fill вместо layout="fill" в новых версиях Next.js
                      sizes="(max-width: 768px) 100vw, 33vw" // Пример sizes
                      style={{ objectFit: "cover" }} // Используем style для objectFit
                      quality={80}
                      className="transition-transform duration-500 ease-in-out hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-base-300 flex items-center justify-center text-muted">
                      <span>Фото продукта</span>
                    </div>
                  )}
                </div>
                {/* Колонка 2 и 3: Информация */}
                <div className="md:col-span-2 p-6 md:p-8 lg:p-10 flex flex-col">
                  {" "}
                  {/* Добавил flex flex-col */}
                  <div>
                    {" "}
                    {/* Дополнительная обертка для управления отступами */}
                    <h2 className="text-2xl md:text-3xl font-heading font-semibold text-base-content mb-2">
                      {product.name}
                    </h2>
                    {product.shortDescription && (
                      <p className="text-sm text-muted mb-4 font-medium">
                        {product.shortDescription}
                      </p>
                    )}
                    <p className="text-muted mb-6 leading-relaxed text-base">
                      {product.description}
                    </p>
                    {/* Характеристики */}
                    {product.features && product.features.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-base-content mb-3">
                          Ключевые особенности:
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 list-none p-0 text-muted text-base">
                          {product.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <FaCheckCircle className="text-success mr-2 h-4 w-4 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  {/* Кнопка (Прижата к низу) */}
                  <div className="mt-auto pt-5 border-t border-base-300">
                    {" "}
                    {/* mt-auto прижимает к низу */}
                    <Link
                      href={`/contacts?subject=Запрос цены: ${encodeURIComponent(product.name)}`}
                      className="btn btn-secondary btn-sm"
                    >
                      Запросить цену
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Секция CTA */}
      <section className="py-24 md:py-32 bg-base-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-base-content mb-4">
            Готовы обсудить поставки?
          </h2>
          <p className="text-lg text-muted mb-8 max-w-xl mx-auto">
            Свяжитесь с нашим отделом продаж для получения консультации и
            индивидуального коммерческого предложения.
          </p>
          <Link href="/contacts" className="btn btn-primary btn-lg">
            Запросить предложение
          </Link>
        </div>
      </section>
    </>
  );
}
