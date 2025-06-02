"use client";

import { useRef, useEffect, useState } from "react";
import NavLogo from "../../components/navLogo";
import NavList from "../../components/navList";
import gsap from "gsap";

export default function Search() {
  const cariRef = useRef(null);
  const deskripsiRef = useRef(null);

  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    setError(null);
    setResult([]);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(keyword.trim())}`);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.message || 'Failed to fetch results');
      }
      
      setResult(data);
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message || 'An error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-[family-name:var(--font-geist-sans)]">
      <nav className="container flex flex-wrap items-center justify-between mx-auto text-gray-700 gap-x-5 px-10 py-6">
        <NavLogo />
        <NavList />
      </nav>

      <main className="my-20 px-4 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-small text-gray-900 mb-6 leading-tight text-center">
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

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 w-full max-w-xl mb-8">
          <input
            placeholder="Masukkan kata kunci (aksara / latin / terjemahan)..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            type="text"
            className="flex-1 p-4 text-gray-900 border border-gray-300 rounded-lg bg-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !keyword.trim()}
            className={`px-6 py-4 rounded-lg text-white text-sm transition-all duration-200 ${
              loading || !keyword.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Mencari...
              </span>
            ) : (
              'Cari'
            )}
          </button>
        </form>

        {error && (
          <div className="w-full max-w-2xl mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {result.length > 0 ? (
          <div className="w-full max-w-2xl space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Ditemukan {result.length} hasil
            </p>
            {result.map((item, i) => (
              <div
                key={i}
                className="p-6 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Aksara</span>
                    <p className="text-lg font-medium text-gray-900">{item.aksara}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Latin</span>
                    <p className="text-gray-900">{item.latin}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Terjemahan</span>
                    <p className="text-gray-900">{item.terjemahan}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !loading && !error ? (
          <p className="text-gray-500 text-center">
            Belum ada hasil. Silakan masukkan kata kunci untuk mencari.
          </p>
        ) : null}
      </main>

      <footer className="py-8 mt-auto">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <a
            href="/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kelompok 14
          </a>
          . Semua Hak Dilindungi.
        </p>
      </footer>
    </div>
  );
}
