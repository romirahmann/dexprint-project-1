/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // ✅ Scroll detection ringan
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Scroll native (super ringan)
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  const menuItems = ["Home", "Layanan", "Produk", "Kontak"];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-lg bg-white/90 shadow-md"
          : "bg-transparent backdrop-blur-none"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 transition-colors duration-300">
        {/* LOGO */}
        <img src="/images/brand.png" alt="" className="w-40" />

        {/* MENU DESKTOP */}
        <ul
          className={`hidden md:flex space-x-8 font-medium transition-colors duration-300 ${
            scrolled ? "text-[#ff9a3e]" : "text-white"
          }`}
        >
          {menuItems.map((item) => (
            <li key={item}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                onClick={() => handleScrollTo(item.toLowerCase())}
                className={`transition-colors ${
                  scrolled ? "hover:text-[#ff7f00]" : "hover:text-[#ff9a3e]"
                }`}
              >
                {item}
              </motion.button>
            </li>
          ))}
        </ul>

        {/* CTA BUTTON */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`hidden md:block px-5 py-2 rounded-full font-semibold transition-all duration-200 shadow-md ${
            scrolled
              ? "bg-[#ff9a3e] text-white hover:bg-[#ff7f00]"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          Order Now
        </motion.button>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setOpen((o) => !o)}
          className={`md:hidden focus:outline-none transition-colors ${
            scrolled ? "text-[#ff9a3e]" : "text-white"
          }`}
        >
          {open ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden bg-[#1a1a1a]/90 backdrop-blur-md border-t border-white/10"
          >
            <ul className="flex flex-col items-center py-4 space-y-4 font-medium text-white">
              {menuItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleScrollTo(item.toLowerCase())}
                    className="hover:text-[#ff9a3e] transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
              <li>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => setOpen(false)}
                  className="bg-[#ff9a3e] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#ff7f00] transition-colors duration-200"
                >
                  Order Now
                </motion.button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
