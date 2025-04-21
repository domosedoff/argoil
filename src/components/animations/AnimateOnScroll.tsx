// src/components/animations/AnimateOnScroll.tsx
"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number | "some" | "all";
  once?: boolean;
}

const AnimateOnScroll: React.FC<Props> = ({
  children,
  className,
  delay = 0,
  amount = 0.3, // Старт при 30% видимости
  once = true, // Анимировать один раз
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: amount, once: once });

  const variants = {
    hidden: { opacity: 0, y: 30 }, // Начало: прозрачно, снизу
    visible: { opacity: 1, y: 0 }, // Конец: непрозрачно, на месте
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnScroll;
