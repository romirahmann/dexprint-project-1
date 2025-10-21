import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-lg bg-white/30 shadow-md"
          : "bg-transparent backdrop-blur-none"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* LOGO */}
        <h1 className="text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a3e] to-[#6b6b6b]">
          Dexprint
        </h1>

        {/* MENU DESKTOP */}
        <ul className="hidden md:flex space-x-8 font-medium text-white">
          {["Home", "Layanan", "Produk", "Portofolio", "Kontak"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="hover:text-[#ff9a3e] transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA BUTTON */}
        <button className="hidden md:block bg-[#ff9a3e] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#ff7f00] transition-all duration-300 hover:scale-105 shadow-md">
          Order Now
        </button>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white focus:outline-none"
        >
          {open ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden bg-[#1a1a1a]/90 backdrop-blur-md border-t border-white/10">
          <ul className="flex flex-col items-center py-4 space-y-4 text-white font-medium">
            {["Home", "Layanan", "Produk", "Portofolio", "Kontak"].map(
              (item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="hover:text-[#ff9a3e] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
            <li>
              <button
                onClick={() => setOpen(false)}
                className="bg-[#ff9a3e] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#ff7f00] transition-all duration-300"
              >
                Order Now
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
