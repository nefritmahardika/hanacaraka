import NavLogo from "../components/navLogo";
import NavList from "../components/navList";
import Welcome from "../components/welcome";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <nav className="container flex flex-wrap items-center justify-between mx-auto text-gray-700 gap-x-5 px-10 py-6">
        <NavLogo />
        <NavList />
      </nav>

      <main className="max-h-screen my-40 bg-white flex items-center justify-center my-0">
        <div className="max-w-md lg:max-w-xl text-center">
          <Welcome />
          <p className="text-gray-600 text-sm md:text-md mb-8">
            Hanacaraka merupakan platform search engine aksara Jawa berdasarkan
            literatur kuno{" "}
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
            <button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition">
              Mulai Mencari
            </button>
            <button className="p-3 bg-gray-200 hover:bg-gray-300 text-gray rounded-md text-sm transition">
              Tentang Kami
            </button>
          </div>
        </div>
      </main>
              <footer className="flex items-center justify-center absolute inset-x-0 bottom-0 my-10">
          <p className="text-xs text-gray-400">
            {" "}
            <a
              href="/"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kelompok 14
            </a> © Semua Hak Dilindungi.
          </p>
        </footer>
    </div>
  );
}
