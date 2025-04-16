// src/app/products/page.tsx
import Image from "next/image"; // Для изображений продукции
import React from "react";

// Пример данных для каталога продукции (более подробный)
// TODO: Заменить на реальные данные о продукции
const productCatalog = [
  {
    id: "sug", // Используем id для якорей
    name: "Сжиженный углеводородный газ (СУГ)",
    shortDescription: "Смесь пропана и бутана (СПБТ), ГОСТ 20448-90",
    description:
      "Универсальное и экономичное топливо для коммунально-бытового потребления, автотранспорта (ГБО) и промышленных нужд. Поставляется в различных пропорциях пропана и бутана в зависимости от сезона и требований заказчика.",
    imageSrc: "/images/products/sug.jpg", // Путь к изображению продукта
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
    imageSrc: "/images/products/propan.jpg",
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
    imageSrc: "/images/products/butan.jpg",
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
    imageSrc: "/images/products/pba.jpg",
    features: [
      "Октановое число 100-110",
      "Снижение износа двигателя",
      "Уменьшение вредных выбросов",
      "Экономия на топливе",
    ],
  },
  // Добавить другие виды продукции по необходимости
];

export default function ProductsPage() {
  return (
    <>
      {/* Верхняя секция с заголовком */}
      <section className="bg-gradient-to-r from-primary via-primary/80 to-accent py-12 md:py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold">
            Наша Продукция
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mt-2 max-w-2xl mx-auto">
            Предлагаем широкий ассортимент качественных сжиженных газов для
            различных нужд.
          </p>
        </div>
      </section>

      {/* Секция каталога */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12">
            {" "}
            {/* Продукты идут списком друг под другом */}
            {productCatalog.map((product) => (
              // Добавляем id к секции для возможности якорения по ссылке (как /products#sug)
              <div
                key={product.id}
                id={product.id}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-6 md:p-8 rounded-lg shadow-md scroll-mt-20"
              >
                {" "}
                {/* scroll-mt для смещения при переходе по якорю */}
                {/* Колонка 1: Изображение (опционально) */}
                <div className="md:col-span-1 relative h-48 md:h-full rounded overflow-hidden bg-gray-200 flex items-center justify-center">
                  {product.imageSrc ? (
                    <Image
                      src={product.imageSrc} // TODO: Добавить реальные пути к фото
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <span className="text-gray-400">Фото продукта</span>
                  )}
                </div>
                {/* Колонка 2 и 3: Информация */}
                <div className="md:col-span-2">
                  <h2 className="text-2xl md:text-3xl font-heading font-semibold text-brand-dark mb-1">
                    {product.name}
                  </h2>
                  {product.shortDescription && (
                    <p className="text-sm text-gray-500 mb-4">
                      {product.shortDescription}
                    </p>
                  )}
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Характеристики / Особенности */}
                  {product.features && product.features.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-brand-dark mb-2">
                        Ключевые особенности:
                      </h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {product.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Кнопка (опционально, если нужна отдельная страница продукта) */}
                  {/* <div className="mt-6">
                    <Link href={`/products/${product.id}`} className="text-primary hover:text-accent font-medium">
                      Подробнее о продукте →
                    </Link>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Секция CTA (Призыв к действию) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-brand-dark mb-4">
            Готовы обсудить поставки?
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            Свяжитесь с нашим отделом продаж для получения консультации и
            индивидуального коммерческого предложения.
          </p>
          <a
            href="/contacts" // Или прямая ссылка на форму запроса
            className="inline-block bg-primary hover:bg-opacity-80 text-white font-semibold py-3 px-8 rounded-md transition duration-300 ease-in-out"
          >
            Запросить предложение
          </a>
        </div>
      </section>
    </>
  );
}
