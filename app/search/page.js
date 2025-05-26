import NavLogo from "../../components/navLogo";
import NavList from "../../components/navList";
import Link from "next/link";

export default function Search() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <nav className="container flex flex-wrap items-center justify-between mx-auto text-gray-700 gap-x-5 px-10 py-6">
        <NavLogo />
        <NavList />
      </nav>

      <main className="max-h-screen my-40 bg-white flex flex-col items-center justify-center">
        <h1 className="text-5xl font-small text-gray-900 mb-6 leading-tight">
          Cari{" "}
          <span className="bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent">
            Aksara
          </span>
        </h1>
        <div className="flex gap-4">
          <input
            placeholder="Masukkan pencarian..."
            type="text"
            id="large-input"
            className="block w-100 lg:w-200 p-4 text-gray-900 border border-gray-300 rounded-sm bg-white-50 text-base focus:outline-none"
          />
             <Link href="/search" passHref>
              <button className="h-full w-15 bg-blue-600 hover:bg-blue-300 rounded-sm text-sm text-white transition">
                Search
              </button>
            </Link>
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
          </a>{" "}
          © Semua Hak Dilindungi.
        </p>
      </footer>
    </div>
  );
}
