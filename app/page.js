"use client";

import { useRef, useEffect, useState } from "react";
import NavLogo from "../components/navLogo";
import NavList from "../components/navList";
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

  // Function to highlight matching text with better styling
  const highlightText = (text, searchTerm) => {
    if (!searchTerm || !text) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-300 text-yellow-900 px-1 py-0.5 rounded font-semibold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Enhanced function to extract and format story information
  const formatStoryInfo = (ceritaUri, judul, kalimatUri) => {
    let storyName = "Tidak diketahui";
    
    // Prioritas: gunakan judul jika ada, jika tidak gunakan dari URI cerita
    if (judul) {
      storyName = judul;
    } else if (ceritaUri) {
      // Extract the last part after # or /
      const extractedName = ceritaUri.split(/[#/]/).pop();
      
      // Convert camelCase or underscores to readable format
      storyName = extractedName
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/_/g, ' ') // Replace underscores with spaces
        .trim()
        .replace(/^\w/, c => c.toUpperCase()); // Capitalize first letter
    }
    
    // Extract kalimat number from URI if available
    let kalimatInfo = "";
    if (kalimatUri) {
      const kalimatMatch = kalimatUri.match(/kalimat[\/_]?(\d+)/i) || 
                           kalimatUri.match(/sentence[\/_]?(\d+)/i) ||
                           kalimatUri.match(/(\d+)$/);
      if (kalimatMatch) {
        kalimatInfo = ` - Kalimat ${kalimatMatch[1]}`;
      }
    }
    
    return `${storyName}${kalimatInfo}`;
  };

  // Function to get story color based on story name
  const getStoryColor = (storyInfo) => {
    const colors = [
      'bg-blue-50 text-blue-700',
      'bg-green-50 text-green-700',
      'bg-purple-50 text-purple-700',
      'bg-pink-50 text-pink-700',
      'bg-yellow-50 text-yellow-700',
      'bg-indigo-50 text-indigo-700',
      'bg-red-50 text-red-700',
      'bg-teal-50 text-teal-700'
    ];
    
    // Simple hash function to get consistent colors for same stories
    let hash = 0;
    for (let i = 0; i < storyInfo.length; i++) {
      hash = ((hash << 5) - hash + storyInfo.charCodeAt(i)) & 0xffffffff;
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

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
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {result.length > 0 ? (
          <div className="w-full max-w-2xl space-y-4">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                Ditemukan <span className="font-semibold text-blue-600">{result.length}</span> hasil untuk "<span className="font-medium">{keyword}</span>"
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Diurutkan berdasarkan cerita
              </div>
            </div>
            
            {result.map((item, i) => {
              const storyInfo = formatStoryInfo(item.cerita, item.judul, item.kalimat);
              const colorClass = getStoryColor(storyInfo);
              
              return (
                <div
                  key={i}
                  className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-200 hover:border-blue-200"
                >
                  <div className="grid grid-cols-1 gap-4">
                    {/* Enhanced Story Source with better styling */}
                    <div className="mb-3 pb-3 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-2 ${colorClass}`}>
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          📚 {storyInfo}
                        </span>
                        <span className="text-xs text-gray-400">
                          #{i + 1}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content with enhanced styling */}
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1 block">Aksara Jawa</span>
                        <p className="text-lg font-medium text-gray-900 leading-relaxed">
                          {highlightText(item.aksara, keyword)}
                        </p>
                      </div>
                      
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1 block">Transliterasi Latin</span>
                        <p className="text-gray-900 leading-relaxed">
                          {highlightText(item.latin, keyword)}
                        </p>
                      </div>
                      
                      <div className="p-3 bg-green-50 rounded-lg">
                        <span className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1 block">Terjemahan Indonesia</span>
                        <p className="text-gray-900 leading-relaxed">
                          {highlightText(item.terjemahan, keyword)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : !loading && !error ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-lg text-gray-500 mb-2">
              Belum ada hasil pencarian
            </p>
            <p className="text-sm text-gray-400">
              Masukkan kata kunci untuk mencari dalam aksara Jawa, latin, atau terjemahan
            </p>
          </div>
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