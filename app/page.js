"use client";

import React from "react";
import NavLogo from "../components/navLogo";
import NavList from "../components/navList";
import Welcome from "../components/welcome";
import Link from "next/link";
import gsap from "gsap";
import { useRef } from "react";
import { useEffect } from "react";

export default function Home() {
  const captionRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      captionRef.current,
      { opacity: 0, filter: "blur(10px)", scale: 0.5 },
      { duration: 2 ,opacity: 1, filter: "blur(0px)", scale: 1 }
    );
  });

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <nav className="container flex flex-wrap items-center justify-between mx-auto text-gray-700 gap-x-5 px-10 py-6">
        <NavLogo />
        <NavList />
      </nav>

      <main className="max-h-screen my-40 bg-white flex items-center justify-center my-0">
        <div ref={captionRef} className="max-w-sm lg:max-w-2xl text-center">
          <Welcome />
          <p className="text-gray-600 text-sm md:text-md mb-8">
            Hanacaraka merupakan platform search engine mencari detail cerita rakyat jawa lama berdasarkan{" "}
            <a
              href="https://bintangpusnas.perpusnas.go.id/konten/BKYWMRX8/straatvertoningen-transliterasi-dan-terjemahan-naskah-seni-pertunjukan-jalanan"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Straatvertoningen : Transliterasi dan Terjemahan Naskah Seni
              Pertunjukan Jalanan
            </a>
            .
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/search" passHref>
              <button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition">
                Mulai Mencari
              </button>
            </Link>

            <Link href="/about" passHref>
              <button className="p-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md text-sm transition">
                Tentang Kami
              </button>
            </Link>
          </div>
        </div>
      </main>
      <footer className="flex items-center justify-center absolute inset-x-0 bottom-0 my-10">
        <p className="text-xs text-gray-400">
          {" "}
          <Link href="/about" passHref>
            Kelompok 14
          </Link>{" "}
          © Semua Hak Dilindungi.
        </p>
      </footer>
    </div>
  );
}