import NavLogo from "../../components/navLogo";
import NavList from "../../components/navList";
import Image from "next/image";
import Footer from "../../components/footer";

export default function About() {
  const people = [
    {
      name: "Muhammad Nefrit Mahardika",
      npm: "140810220006",
      image: "/images/nefrit.jpeg",
    },
    {
      name: "Rafa Agustant",
      npm: "140810220016",
      image: "/images/rafa.jpeg",
    },
    {
      name: "Farhan Karisma",
      npm: "140810210042",
      image: "/images/farhan.jpeg",
    },
  ];

  return (
    <div className="font-sans min-h-screen relative pb-32">
      <nav className="container flex flex-wrap items-center justify-between mx-auto text-gray-700 gap-x-5 px-6 md:px-10 py-6">
        <NavLogo />
        <NavList />
      </nav>

      <main className="bg-white flex flex-col items-center justify-center px-4 md:px-10 py-16">
        <h1 className="text-lg font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent">Tentang Kami</h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">
          {people.map((person, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-6 rounded-xl border border-blue-500 w-full max-w-xs mx-auto">
              <Image
                src={person.image}
                alt={person.name}
                width={150}
                height={150}
                className="object-cover mb-4"
              />

              <h2 className="text-lg bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent font-semibold text-center">
                {person.name}
              </h2>
              <p className="bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent text-center">{person.npm}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
