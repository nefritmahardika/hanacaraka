import Form from "../components/form";
import NavLogo from "../components/navLogo";
import NavList from "../components/navList";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <nav className="container flex flex-wrap items-center justify-between mx-auto text-gray-700 gap-x-5 px-10 py-6 ">
        <NavLogo />
        <NavList />
      </nav>
      <main className="h-screen">
        <Form />
      </main>
    </div>
  );
}
