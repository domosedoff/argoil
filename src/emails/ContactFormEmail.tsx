// src/emails/ContactFormEmail.tsx
import React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Hr,
} from "@react-email/components";

interface ContactFormEmailProps {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const ContactFormEmail: React.FC<ContactFormEmailProps> = ({
  name,
  email,
  phone,
  message,
}) => {
  return (
    <Html lang="ru">
      <Head />
      <Preview>Новое сообщение с контактной формы сайта</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Новое сообщение с сайта</Heading>
          <Section>
            <Text style={paragraph}>
              Вы получили новое сообщение через контактную форму:
            </Text>
            <Hr style={hr} />
            <Text style={paragraph}>
              <strong>Имя:</strong> {name}
            </Text>
            <Text style={paragraph}>
              <strong>Email:</strong> {email}
            </Text>
            {phone && (
              <Text style={paragraph}>
                <strong>Телефон:</strong> {phone}
              </Text>
            )}
            <Hr style={hr} />
            <Text style={paragraph}>
              <strong>Сообщение:</strong>
            </Text>
            <Text style={paragraph}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Стили для email (инлайновые)
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};
const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  border: "1px solid #f0f0f0",
  borderRadius: "4px",
};
const heading = {
  fontSize: "24px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
  textAlign: "center" as const,
};
const paragraph = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#484848",
  padding: "0 20px",
};
const hr = { borderColor: "#f0f0f0", margin: "20px 0" };

export default ContactFormEmail; // Экспорт для использования в API Route
