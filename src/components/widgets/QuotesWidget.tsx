// src/components/widgets/QuotesWidget.tsx [ФИНАЛЬНАЯ ВЕРСИЯ 2]
"use client";

import React, { useState, useEffect, useCallback } from "react"; // Вернули useCallback для t
import { useLocale } from "@/context/LocaleContext";
import { AbstractIntlMessages } from "next-intl";

// --- Функция getTranslation (убедитесь, что она верна и доступна) ---
const getTranslation = (
  messages: AbstractIntlMessages,
  ns: string,
  key: string,
  fb: string
): string => {
  if (typeof messages === "object" && messages !== null && messages[ns]) {
    const nsMessages = messages[ns] as AbstractIntlMessages;
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
  return fb;
};

// Интерфейс данных
interface QuoteData {
  symbol: string;
  nameKey: string;
  fallbackName: string;
  name: string;
  value: number | string | null;
  change?: number | string | null;
  currency?: string;
}

// Определения котировок
const quoteDefinitions: Omit<QuoteData, "name" | "value" | "change">[] = [
  { symbol: "USD", nameKey: "usd", fallbackName: "USD/RUB", currency: "₽" },
  { symbol: "EUR", nameKey: "eur", fallbackName: "EUR/RUB", currency: "₽" },
  {
    symbol: "BRENT",
    nameKey: "brent",
    fallbackName: "Нефть Brent",
    currency: "$",
  },
];

const QuotesWidget: React.FC = () => {
  const { messages } = useLocale();

  // --- ИСПРАВЛЕНО: Возвращаем useCallback для t, чтобы убрать предупреждение ---
  const t = useCallback(
    (key: string, fallback: string) =>
      getTranslation(messages, "QuotesWidget", key, fallback),
    [messages]
  ); // Зависимость t - только от messages

  // Состояния
  const [quotes, setQuotes] = useState<QuoteData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const finnhubApiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

  // --- Эффект для загрузки данных ---
  useEffect(() => {
    let isMounted = true;

    // Инициализируем/обновляем начальное состояние с переводами
    // Делаем это ПЕРЕД вызовом fetch, чтобы имена были сразу
    const currentTranslatedQuotes = quoteDefinitions.map((def) => ({
      ...def,
      name: t(def.nameKey, def.fallbackName),
      value: null,
      change: null,
    }));
    if (isMounted) {
      // Проверяем перед установкой состояния
      setQuotes(currentTranslatedQuotes);
      setIsLoading(true);
      setError(null);
    }

    const fetchQuoteData = async () => {
      if (!isMounted) return;

      const resultsMap: Partial<
        Record<string, Pick<QuoteData, "value" | "change">>
      > = {};
      let firstFetchError: Error | unknown = null;

      // Запросы API с Promise.allSettled
      const promises = [
        // Валюты
        fetch("https://www.cbr-xml-daily.ru/daily_json.js")
          .then((res) =>
            res.ok
              ? res.json()
              : Promise.reject(
                  new Error(t("error_loading_rates", "Ошибка загрузки курсов"))
                )
          ) // Используем t
          .then((data) => {
            // --- ИСПРАВЛЕНО: Убираем неиспользуемую 'data' ---
            resultsMap["USD"] = {
              value: data.Valute.USD?.Value?.toFixed(2) || "N/A",
            };
            resultsMap["EUR"] = {
              value: data.Valute.EUR?.Value?.toFixed(2) || "N/A",
            };
          })
          .catch((err) => {
            if (err instanceof Error && !firstFetchError) firstFetchError = err;
          }),
        // Нефть
        finnhubApiKey
          ? fetch(
              `https://finnhub.io/api/v1/quote?symbol=CO1&token=${finnhubApiKey}`
            )
              .then((res) =>
                res.ok
                  ? res.json()
                  : Promise.reject(new Error(`Finnhub Error: ${res.status}`))
              )
              .then((data) => {
                // --- ИСПРАВЛЕНО: Убираем неиспользуемую 'data' ---
                const price = data.c?.toFixed(2) || "N/A";
                const changeNum = data.dp;
                const changeStr =
                  typeof changeNum === "number"
                    ? `${changeNum >= 0 ? "+" : ""}${changeNum.toFixed(2)}%`
                    : null;
                resultsMap["BRENT"] = { value: price, change: changeStr };
              })
              .catch((err) => {
                if (err instanceof Error && !firstFetchError)
                  firstFetchError = err;
              })
          : Promise.resolve().then(() => {
              resultsMap["BRENT"] = { value: "N/A" };
            }),
      ];

      await Promise.allSettled(promises);

      if (isMounted) {
        setQuotes(
          (
            prevQuotes // <-- Используем prevQuotes
          ) =>
            prevQuotes.map((q) => {
              // <-- Обновляем существующие элементы
              // --- ИСПРАВЛЕНО: Находим определение по символу ---
              const def = quoteDefinitions.find((d) => d.symbol === q.symbol);
              if (!def) return q; // Если определение не найдено, возвращаем как есть

              const errorValue = t("error_quote", "Ошибка");
              let newValue = resultsMap[q.symbol]?.value ?? q.value; // Используем q.value как фоллбэк
              if (
                newValue === undefined &&
                firstFetchError &&
                (q.symbol === "USD" ||
                  q.symbol === "EUR" ||
                  (q.symbol === "BRENT" && finnhubApiKey))
              ) {
                newValue = errorValue;
              } else if (newValue === undefined) {
                newValue = "N/A";
              }
              const newChange =
                resultsMap[q.symbol]?.change ?? q.change ?? null; // Используем q.change как фоллбэк

              return {
                ...q, // Сохраняем предыдущее состояние (включая имя)
                value: newValue,
                change: newChange,
              };
            })
        );
        // --- ИСПРАВЛЕНО: Проверка типа ошибки ---
        if (firstFetchError) {
          if (firstFetchError instanceof Error) {
            setError(firstFetchError.message);
          } else {
            setError(t("error_loading_generic", "Ошибка загрузки данных"));
          }
        } else {
          setError(null);
        }
        setIsLoading(false);
      }
    };

    fetchQuoteData(); // Вызываем загрузку

    const intervalId = setInterval(fetchQuoteData, 5 * 60 * 1000);
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
    // Зависимости: ключ API и функция перевода t
  }, [finnhubApiKey, t]); // <-- Убрали messages, т.к. t теперь стабильна

  // --- Разметка --- (без изменений)
  return (
    <div className="bg-white p-4 rounded-lg shadow h-full">
      <h4 className="font-semibold text-base-content mb-3 text-center text-lg">
        {t("widget_title", "Котировки и Валюты")}
      </h4>
      {isLoading && quotes.length === 0 && (
        <div className="text-center text-muted">
          {t("loading", "Загрузка...")}
        </div>
      )}
      {error && !isLoading && (
        <div className="text-center text-error px-2 text-sm">{error}</div>
      )}
      {quotes.length > 0 && (
        <div
          className={`grid grid-cols-3 gap-4 text-center ${isLoading && !error ? "opacity-60 transition-opacity duration-300" : ""}`}
        >
          {quotes.map((quote) => (
            <div key={quote.symbol}>
              <div className="text-sm font-medium text-muted">{quote.name}</div>
              <div className="text-xl font-bold text-base-content mt-1 truncate">
                {quote.value === null && isLoading
                  ? t("loading_dots", "...")
                  : quote.value}{" "}
                {quote.value !== "N/A" &&
                  quote.value !== t("error_quote", "Ошибка") &&
                  quote.value !== null &&
                  quote.currency}
              </div>
              {quote.change && typeof quote.change === "string" && (
                <div
                  className={`text-xs mt-0.5 ${quote.change.startsWith("-") ? "text-error" : "text-success"}`}
                >
                  {quote.change}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {!isLoading && !error && quotes.length === 0 && (
        <div className="text-center text-muted">
          {t("no_data", "Нет данных")}
        </div>
      )}
    </div>
  );
};

// Убедитесь, что getTranslation определена или импортирована
// const getTranslation = ...

export default QuotesWidget;
