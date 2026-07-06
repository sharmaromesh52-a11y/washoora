export default function CallButton() {
  return (
    <a
      href="tel:+919511539740"
      className="fixed bottom-28 right-6 z-[9999] bg-blue-600 hover:bg-blue-700 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.547 2.19a2 2 0 01-.502 1.91l-1.27 1.27a16.001 16.001 0 006.586 6.586l1.27-1.27a2 2 0 011.91-.502l2.19.547A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    </a>
  );
}