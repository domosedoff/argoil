// src/components/forms/ContactForm.tsx [Перепроверенный]
"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocale } from "@/context/LocaleContext";
import { AbstractIntlMessages } from "next-intl";

// --- Функция getTranslation (Импортируем или определяем здесь) ---
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

// --- Компонент Формы ---
const ContactForm: React.FC = () => {
  const { messages } = useLocale();

  // --- Функция перевода для формы (мемоизированная) ---
  const t = useCallback(
    (key: string, fallback: string) =>
      getTranslation(messages, "ContactForm", key, fallback),
    [messages]
  ); // Зависимость от messages

  // --- СХЕМА ВАЛИДАЦИИ Zod с Переводами ---
  const contactFormSchema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(2, { message: t("validation_name_min", "Минимум 2 символа") }),
        email: z.string().email({
          message: t("validation_email_invalid", "Некорректный email"),
        }),
        phone: z.string().optional(),
        message: z.string().min(10, {
          message: t("validation_message_min", "Минимум 10 символов"),
        }),
      }),
    [t]
  ); // Зависимость от мемоизированной t

  type ContactFormInputs = z.infer<typeof contactFormSchema>;

  // Состояния
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  // Обработчик отправки
  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setIsLoading(true);
    setFormMessage(null);
    setIsError(false);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        // Обработка ошибок валидации с сервера или других ошибок
        let serverErrorMessage = t(
          "error_submit_generic",
          "Ошибка при отправке формы."
        ); // Дефолтная ошибка
        if (result.errors && typeof result.errors === "object") {
          // Собираем ошибки валидации Zod с сервера (если они есть)
          serverErrorMessage =
            Object.values(result.errors).flat().join(". ") + ".";
        } else if (result.message && typeof result.message === "string") {
          // Используем сообщение об ошибке от сервера (например, от Resend)
          serverErrorMessage = result.message;
        }
        throw new Error(serverErrorMessage);
      }

      setFormMessage(
        t("success_message", "Ваше сообщение успешно отправлено!")
      );
      setIsError(false);
      reset(); // Очищаем форму
    } catch (error: unknown) {
      console.error("Form submission error:", error);
      setIsError(true);
      // Показываем сообщение из объекта Error или общую ошибку
      setFormMessage(
        error instanceof Error
          ? error.message
          : t("error_submit_generic", "Произошла ошибка.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Поле Имя */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-base-content mb-1"
        >
          {t("label_name", "Имя")} <span className="text-error">*</span>
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className={`input-field ${errors.name ? "border-error focus:border-error focus:ring-error" : "border-base-300"}`}
        />
        {errors.name && (
          <p className="text-error text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Поле Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-base-content mb-1"
        >
          {t("label_email", "Email")} <span className="text-error">*</span>
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className={`input-field ${errors.email ? "border-error focus:border-error focus:ring-error" : "border-base-300"}`}
        />
        {errors.email && (
          <p className="text-error text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Поле Телефон */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-base-content mb-1"
        >
          {t("label_phone", "Телефон")}
        </label>
        <input
          type="tel"
          id="phone"
          {...register("phone")}
          className="input-field border-base-300"
        />
      </div>

      {/* Поле Сообщение */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-base-content mb-1"
        >
          {t("label_message", "Сообщение")}{" "}
          <span className="text-error">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className={`input-field h-auto ${errors.message ? "border-error focus:border-error focus:ring-error" : "border-base-300"}`}
        />
        {errors.message && (
          <p className="text-error text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Кнопка и Сообщения */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full"
        >
          {isLoading
            ? t("button_sending", "Отправка...")
            : t("button_submit", "Отправить сообщение")}
        </button>
      </div>
      {formMessage && (
        <div
          className={`mt-4 text-center p-3 rounded-md text-sm ${isError ? "bg-error/10 text-error" : "bg-success/10 text-success"}`}
        >
          {formMessage}
        </div>
      )}

      {/* Общий класс для полей ввода */}
      <style jsx>{`
        .input-field {
          @apply block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-base-content bg-base-100 transition duration-150 ease-in-out;
        }
        .input-field.border-error {
          @apply border-error focus:ring-error focus:border-error;
        }
      `}</style>
    </form>
  );
};

export default ContactForm;
