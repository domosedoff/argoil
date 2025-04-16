// src/app/api/send-email/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { ContactFormEmail } from "@/emails/ContactFormEmail"; // Шаблон письма (создадим ниже)

// Получаем ключ API из переменных окружения
const resend = new Resend(process.env.RESEND_API_KEY);

// Определяем схему валидации данных формы с помощью Zod
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Имя должно содержать минимум 2 символа" }),
  email: z.string().email({ message: "Некорректный email адрес" }),
  phone: z.string().optional(), // Телефон необязательный
  message: z
    .string()
    .min(10, { message: "Сообщение должно содержать минимум 10 символов" }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Валидируем тело запроса по схеме Zod
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      // Если валидация не прошла, возвращаем ошибки
      return NextResponse.json(
        { errors: validationResult.error.flatten().fieldErrors },
        { status: 400 } // Bad Request
      );
    }

    // Валидация прошла, данные в validationResult.data
    const { name, email, phone, message } = validationResult.data;

    // Отправляем письмо с помощью Resend
    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // TODO: Замените на ваш подтвержденный email/домен
      to: ["domosedov@mail.ru"], // TODO: Замените на ваш email
      subject: `Новое сообщение с сайта от ${name}`,
      react: ContactFormEmail({ name, email, phone, message }), // Используем React-компонент для тела письма
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { message: "Ошибка при отправке email.", error: error.message },
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json(
      { message: "Сообщение успешно отправлено!", data },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("API Error:", err);
    let message = "Внутренняя ошибка сервера.";
    if (err instanceof Error) {
      message = err.message;
    }
    return NextResponse.json(
      { message: "Ошибка сервера.", error: message },
      { status: 500 }
    );
  }
}
