import React from "react";
import Image from "next/image";

export default function NavLogo() {
  return (
       <div className="flex text-gray-700 gap-x-3 items-center">
        <a href="" target="_self">
          <Image src="/icon.svg" alt="Profile" width={20} height={20} />
        </a>
        <a href="" target="_self" className="font-semibold text-lg bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent">
          Hanacaraka
        </a>
      </div>
  );
}