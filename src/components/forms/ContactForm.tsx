// src/components/forms/ContactForm.tsx
"use client"; // Форма интерактивна

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Схема Zod должна совпадать со схемой в API Route!
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Минимум 2 символа" }),
  email: z.string().email({ message: "Некорректный email" }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Минимум 10 символов" }),
});

// Определяем тип данных формы из схемы Zod
type ContactFormInputs = z.infer<typeof contactFormSchema>;

const ContactForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset, // Функция для сброса формы
    formState: { errors }, // Получаем ошибки валидации
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema), // Используем резолвер Zod
  });

  // Обработчик отправки формы
  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setIsLoading(true);
    setFormMessage(null);
    setIsError(false);

    try {
      const response = await fetch("/api/send-email", {
        // Отправляем на наш API Route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Обрабатываем ошибки валидации с сервера или другие ошибки
        const errorMessage = result.errors
          ? Object.values(result.errors).flat().join(", ") // Собираем ошибки валидации Zod
          : result.message || "Произошла ошибка при отправке.";
        throw new Error(errorMessage);
      }

      // Успех
      setFormMessage("Ваше сообщение успешно отправлено!");
      setIsError(false);
      reset(); // Очищаем форму
    } catch (error: unknown) {
      console.error("Form submission error:", error);
      setIsError(true);
      setFormMessage(
        error instanceof Error ? error.message : "Произошла ошибка."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Поле Имя */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Имя <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${errors.name ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.name && (
          <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Поле Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${errors.email ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.email && (
          <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Поле Телефон (необязательное) */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Телефон
        </label>
        <input
          type="tel"
          id="phone"
          {...register("phone")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>

      {/* Поле Сообщение */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Сообщение <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${errors.message ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.message && (
          <p className="text-red-600 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Кнопка Отправки и Сообщения */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        >
          {isLoading ? "Отправка..." : "Отправить сообщение"}
        </button>
      </div>

      {/* Отображение сообщения об успехе или ошибке */}
      {formMessage && (
        <div
          className={`mt-4 text-center p-3 rounded-md ${isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
        >
          {formMessage}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
