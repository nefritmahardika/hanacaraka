"use client";

import { useEffect, useState } from "react";

export default function Welcome() {
  const greetings = ["Selamat Datang", "Sugeng Rawuh"];
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentGreetingIndex((prev) => (prev + 1) % greetings.length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [greetings.length]);

  return (
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            <span
              className={`inline-block transition-opacity duration-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {greetings[currentGreetingIndex]}
            </span>{" "}
            di <span className="bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent">Hanacaraka</span>
          </h1>
  );
}
