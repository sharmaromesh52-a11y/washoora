"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BookingModal from "./BookingModal";

export default function Navbar() { const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  return (
   <nav
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    scrolled
      ? "bg-black/90 backdrop-blur-xl shadow-2xl border-b border-blue-500/20"
      : "bg-transparent"
  }`}
>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Washoora"
            width={55}
            height={55}
          />

          <h1 className="text-3xl font-bold text-white">
            WASH<span className="text-blue-500">OORA</span>
          </h1>
        </div>

        <div className="hidden md:flex gap-8 text-white font-medium">
         <a href="#home" className="hover:text-blue-500 transition">
  Home
</a>

<a href="#services" className="hover:text-blue-500 transition">
  Services
</a>

<a href="#about" className="hover:text-blue-500 transition">
  About
</a>

<a href="#gallery" className="hover:text-blue-500 transition">
  Gallery
</a>

<a href="#contact" className="hover:text-blue-500 transition">
  Contact
</a>
        </div>

       <BookingModal />

      </div>
    </nav>
  );
}