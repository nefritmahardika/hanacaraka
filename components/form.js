import React from "react";

export default function Form() {
  return (
  <div className="w-full max-h-screen flex flex-col items-center justify-around lg:flex-row">
    <div>
      <label htmlFor="text-input" className="block mb-2 text-sm font-medium text-black text-center">
        Teks
      </label>
      <textarea
        id="text-input"
        className="block w-70 h-90 p-4 text-black border border-black rounded-md bg-white text-sm resize-none overflow-auto"
      />
    </div>
    <div>
      <label htmlFor="text-input" className="block mb-2 text-sm font-medium text-black text-center">
        Aksara
      </label>
      <textarea
        id="text-input"
        className="block w-70 h-90 p-4 text-black border border-black rounded-md bg-white text-sm resize-none overflow-auto"
      />
    </div>
  </div>
);
}