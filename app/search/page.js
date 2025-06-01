"use client";

import NavLogo from "../../components/navLogo";
import NavList from "../../components/navList";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const dataContoh = [
  {
    title: "Pertunjukan Topeng Monyet",
    latin:
      "Titingalan  punika  anggenipun  angebaraken,  munyukipun  dipun jogedaken, jogedipun cara cantrik, mendet lampahan petilan cariyos topeng",
    aksara:
      "ꦠꦶꦠꦶꦔꦭꦤ꧀ꦥꦸꦤꦶꦏꦄꦁꦒꦺꦤꦶꦥꦸꦤ꧀ꦄꦔꦺꦧꦫꦏꦺꦤ꧀꧈ꦩꦸꦚꦸꦏꦶꦥꦸꦤ꧀ꦢꦶꦥꦸꦚ꧀ꦗꦺꦴꦒꦺꦢꦏꦺꦤ꧀꧈ꦗꦺꦴꦒꦺꦢꦶꦥꦸꦚ꧀ꦕꦫꦕꦤ꧀ꦠꦿꦶꦏ꧀꧈ꦩꦺꦤ꧀ꦢꦺꦠ꧀ꦭꦩ꧀ꦥꦲꦤ꧀ꦥꦺꦠꦶꦭꦚ꧀ꦕꦫꦶꦪꦺꦴꦱ꧀ꦠꦺꦴꦥꦺꦁ",
    terjemahan:
      "Pertunjukan  ini  mempertontonkan  monyet  yang  dibuat  berjoget menyerupai cantrik, dengan  mengambil  fragmen  cerita  topeng",
  },
];

export default function Search() {
  const cariRef = useRef(null);
  const deskripsiRef = useRef(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      cariRef.current,
      { xPercent: -120, opacity: 0.5 },
      { xPercent: 0, opacity: 1, duration: 1 }
    );
    gsap.fromTo(
      deskripsiRef.current,
      { xPercent: 120, opacity: 0.5 },
      { xPercent: 0, opacity: 1, duration: 1 }
    );
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => setModalVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setModalVisible(false);
    }
  }, [isModalOpen]);

const handleSearch = () => {
  const trimmed = query.trim();
  setSearchKeyword(trimmed);

  if (trimmed.length < 3) {
    setResults([]);
    return;
  }

  const filtered = dataContoh.filter((item) =>
    [item.title, item.latin, item.aksara, item.terjemahan]
      .filter(Boolean)
      .some((field) =>
        field.toLowerCase().includes(trimmed.toLowerCase())
      )
  );

  setResults(filtered);
};


  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setSelectedItem(null);
      setIsModalOpen(false);
    }, 200);
  };

  return (
    <div className="font-sans min-h-screen relative pb-32">
      <nav className="container flex flex-wrap items-center justify-between mx-auto text-gray-700 gap-x-5 px-10 py-6">
        <NavLogo />
        <NavList />
      </nav>

      <main className="my-40 bg-white flex flex-col items-center justify-center">
        <h1 className="text-5xl font-medium text-gray-900 mb-6 leading-tight">
          <span ref={cariRef} className="relative inline-block">
            Cari{" "}
          </span>
          <span
            ref={deskripsiRef}
            className="relative inline-block bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent"
          >
            Deskripsi
          </span>
        </h1>

        <div className="flex gap-4">
          <input
            placeholder="Masukkan pencarian..."
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="block h-12 w-100 lg:w-200 p-4 text-gray-900 border border-gray-300 rounded-sm text-base focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="h-12 w-20 bg-blue-600 border border-blue-600 hover:bg-white hover:text-blue-600 rounded-sm text-sm text-white transition px-4"
          >
            Search
          </button>
        </div>

        {searchKeyword && (
          <>
            {results.length > 0 ? (
              <div className="mt-8 w-[80%] bg-white border border-gray-300 rounded-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Hasil Pencarian:</h2>
                <ul className="space-y-2">
                  {results.map((item, idx) => (
                    <li
                      key={idx}
                      onClick={() => handleItemClick(item)}
                      className="cursor-pointer text-gray-800 mt-4 w-full bg-white border border-gray-300 rounded-sm p-6 hover:bg-blue-50 transition"
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="mt-8 w-[90%] lg:w-[60%] bg-red-50 border border-red-300 rounded-sm p-6 text-red-700">
                {`Tidak ada "${searchKeyword}", silakan cari dengan kata kunci lain.`}
              </div>
            )}
          </>
        )}

        {isModalOpen && selectedItem && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/10">
            <div
              className={`bg-white w-[80%] max-w-md p-8 rounded-sm border border-gray-300 relative transform transition-all duration-200 ease-out ${
                modalVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <h3 className="text-xl font-bold mb-4">{selectedItem.title}</h3>
              <h3 className="text-md font-bold mb-2">Latin</h3>
              {selectedItem.latin && (
                <p className="text-gray-700 mb-4">{selectedItem.latin}</p>
              )}
              <h3 className="text-md font-bold mb-2">Aksara</h3>
              {selectedItem.aksara && (
                <p className="text-gray-700 mb-4">{selectedItem.aksara}</p>
              )}
              <h3 className="text-md font-bold mb-2">Terjemahan</h3>
              {selectedItem.terjemahan && (
                <p className="text-gray-700 mb-4">{selectedItem.terjemahan}</p>
              )}

              <div className="flex justify-center mt-6">
                <button
                  onClick={closeModal}
                  className="absolute right-5 bottom-5 px-3 py-2 bg-red-500 text-white text-xs rounded-sm border border-red-400 hover:bg-white hover:text-red-500 transition-colors duration-200"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="flex items-center justify-center absolute inset-x-0 bottom-0 my-10">
        <p className="text-xs text-gray-400">
          <a
            href="/"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kelompok 14
          </a>{" "}
          © Semua Hak Dilindungi.
        </p>
      </footer>
    </div>
  );
}
