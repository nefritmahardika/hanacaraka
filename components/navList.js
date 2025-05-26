import React from "react";
import Link from 'next/link';

export default function NavList() {
  return (
    <ul className="flex gap-10 text-sm">
      <li className="hover:underline">
        <Link href="/">Beranda</Link>
      </li>
      <li className="hover:underline">
        <Link href="/search">Pencarian</Link>
      </li>
      <li className="hover:underline">
        <Link href="/about">Tentang</Link>
      </li>
    </ul>
  );
}

