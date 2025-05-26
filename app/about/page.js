import NavLogo from "../../components/navLogo";
import NavList from "../../components/navList";

export default function Search() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <nav className="container flex flex-wrap items-center justify-between mx-auto text-gray-700 gap-x-5 px-10 py-6">
        <NavLogo />
        <NavList />
      </nav>

      <main className="max-h-screen my-40 bg-white flex items-center justify-center my-0">
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
