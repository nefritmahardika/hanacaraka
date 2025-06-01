import NavLogo from "../../components/navLogo";
import NavList from "../../components/navList";
import Footer from "../../components/footer";

export default function Search() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <nav className="container flex flex-wrap items-center justify-between mx-auto text-gray-700 gap-x-5 px-10 py-6">
        <NavLogo />
        <NavList />
      </nav>

      <main className="max-h-screen my-40 bg-white flex items-center justify-center my-0">
      </main>
      <Footer />
    </div>
  );
}
