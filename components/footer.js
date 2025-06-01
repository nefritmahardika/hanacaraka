import React from "react";

export default function Footer() {
  return (
 <footer className="flex items-center justify-center absolute inset-x-0 bottom-10">
        <p className="text-xs text-gray-400">
          <a
            href="/about"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kelompok 14
          </a>{""}
          © Semua Hak Dilindungi.
        </p>
 </footer>
);
}