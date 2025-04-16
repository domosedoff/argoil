// src/components/widgets/QuotesWidget.tsx
"use client"; // Клиентский компонент

import React, { useState, useEffect } from "react"; // Импорты React

// Интерфейс для данных
interface QuoteData {
  symbol: string;
  name: string;
  value: number | string | null;
  change?: number | string | null; // Может быть числом или строкой с '%'
  currency?: string;
}

const QuotesWidget: React.FC = () => {
  // Состояния компонента
  const [quotes, setQuotes] = useState<QuoteData[]>([
    { symbol: "USD", name: "USD/RUB", value: null, currency: "₽" },
    { symbol: "EUR", name: "EUR/RUB", value: null, currency: "₽" },
    {
      symbol: "BRENT",
      name: "Нефть Brent",
      value: null,
      currency: "$",
      change: null,
    }, // Добавил change: null
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Получение ключа API
  const finnhubApiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

  // Эффект для загрузки данных
  useEffect(() => {
    const fetchQuotes = async () => {
      setIsLoading(true);
      setError(null);
      const updatedQuotes = quotes.map((q) => ({ ...q })); // Создаем копию

      try {
        // 1. Загрузка валют ЦБ РФ
        const cbrResponse = await fetch(
          "https://www.cbr-xml-daily.ru/daily_json.js"
        );
        if (!cbrResponse.ok)
          throw new Error(`Ошибка ЦБ РФ: ${cbrResponse.status}`);
        const cbrData = await cbrResponse.json();

        const usdRate = cbrData.Valute.USD?.Value?.toFixed(2) || "N/A";
        const eurRate = cbrData.Valute.EUR?.Value?.toFixed(2) || "N/A";

        const usdIndex = updatedQuotes.findIndex((q) => q.symbol === "USD");
        if (usdIndex !== -1) updatedQuotes[usdIndex].value = usdRate;

        const eurIndex = updatedQuotes.findIndex((q) => q.symbol === "EUR");
        if (eurIndex !== -1) updatedQuotes[eurIndex].value = eurRate;

        // 2. Загрузка нефти Brent (Finnhub)
        const brentIndex = updatedQuotes.findIndex((q) => q.symbol === "BRENT");
        if (brentIndex !== -1) {
          if (finnhubApiKey) {
            const brentSymbol = "CO1"; // Пример тикера
            const finnhubResponse = await fetch(
              `https://finnhub.io/api/v1/quote?symbol=${brentSymbol}&token=${finnhubApiKey}`
            );

            if (!finnhubResponse.ok) {
              console.error(
                "Finnhub API error status:",
                finnhubResponse.status
              );
              try {
                const errorBody = await finnhubResponse.text();
                console.error("Finnhub API error body:", errorBody);
              } catch {}
              updatedQuotes[brentIndex].value = "Ошибка";
              updatedQuotes[brentIndex].change = null;
            } else {
              const finnhubData = await finnhubResponse.json();
              const brentPrice = finnhubData.c?.toFixed(2) || "N/A";
              const brentChange = finnhubData.dp; // Процентное изменение (число)

              updatedQuotes[brentIndex].value = brentPrice;
              // Сразу формируем строку с %
              updatedQuotes[brentIndex].change =
                typeof brentChange === "number"
                  ? `${brentChange >= 0 ? "+" : ""}${brentChange.toFixed(2)}%`
                  : null;
            }
          } else {
            console.warn("Finnhub API ключ не найден.");
            updatedQuotes[brentIndex].value = "N/A";
            updatedQuotes[brentIndex].change = null;
          }
        }

        setQuotes(updatedQuotes);
      } catch (err: unknown) {
        // Исправленный catch
        console.error("Ошибка загрузки котировок:", err);
        let message = "Не удалось загрузить данные";
        if (err instanceof Error) {
          message = `${message}: ${err.message}`;
        }
        setError(message);
        setQuotes(quotes.map((q) => ({ ...q, value: "Ошибка" }))); // Ставим Ошибку везде
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finnhubApiKey]); // Зависимость от ключа

  // --- РЕНДЕР КОМПОНЕНТА ---
  return (
    <div className="bg-white p-4 rounded shadow text-gray-800">
      <h4 className="font-semibold text-brand-dark mb-3 text-center text-lg">
        Котировки и Валюты
      </h4>
      {isLoading && (
        <div className="text-center text-gray-500">Загрузка...</div>
      )}
      {error && <div className="text-center text-red-600 px-2">{error}</div>}
      {!isLoading && !error && (
        <div className="grid grid-cols-3 gap-4 text-center">
          {quotes.map((quote) => (
            <div key={quote.symbol}>
              <div className="text-sm font-medium text-gray-500">
                {quote.name}
              </div>
              <div className="text-xl font-bold text-brand-dark mt-1 truncate">
                {quote.value}{" "}
                {quote.value !== "N/A" &&
                  quote.value !== "Ошибка" &&
                  quote.currency}
              </div>
              {/* Исправленное отображение изменения цены */}
              {quote.change &&
                typeof quote.change === "string" && ( // Проверяем, что change строка
                  <div
                    className={`text-xs mt-0.5 ${
                      // Проверяем первый символ строки (+ или -) или считаем положительным если нет знака
                      quote.change.startsWith("-")
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {quote.change} {/* Отображаем строку с % */}
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuotesWidget; // Экспорт по умолчанию
