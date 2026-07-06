export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 text-gray-400">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          <div>
            <h2 className="text-3xl font-bold text-white">
              WASH<span className="text-blue-500">OORA</span>
            </h2>

            <p className="mt-4 leading-7">
              Luxury doorstep car washing and premium detailing services in
              Jhunjhunu.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>

            <div className="space-y-3">
              <a href="#home" className="block hover:text-white">Home</a>
              <a href="#services" className="block hover:text-white">Services</a>
              <a href="#about" className="block hover:text-white">About</a>
              <a href="#gallery" className="block hover:text-white">Gallery</a>
              <a href="#contact" className="block hover:text-white">Contact</a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Contact
            </h3>

            <p>📍 302, Kamal Heights,<br />Modi Road, Jhunjhunu</p>

            <p className="mt-3">
              <a
                href="tel:+919511539740"
                className="hover:text-white"
              >
                📞 +91 95115 39740
              </a>
            </p>

            <p className="mt-3">
              <a
                href="https://wa.me/919511539740"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400"
              >
                💬 WhatsApp
              </a>
            </p>

            <p className="mt-3">
              <a
                href="mailto:hello@washoora.in"
                className="hover:text-blue-400"
              >
                ✉️ hello@washoora.in
              </a>
            </p>

          </div>

        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center">

          <p>
            © {new Date().getFullYear()} Washoora Luxury Car Wash. All Rights
            Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}