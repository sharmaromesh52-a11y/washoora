"use client";

export default function WhatsappButton() {
  return (
    <a
      href="https://wa.me/919511539740"
      target="_blank"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:scale-110 transition-all duration-300 rounded-full p-4 shadow-2xl"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="34"
        fill="white"
        viewBox="0 0 24 24"
      >
        <path d="M20.52 3.48A11.86 11.86 0 0012.04 0C5.41 0 .03 5.38.03 12c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.62A11.94 11.94 0 0012.04 24C18.67 24 24 18.62 24 12a11.9 11.9 0 00-3.48-8.52z"/>
      </svg>
    </a>
  );
}