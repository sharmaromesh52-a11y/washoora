export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[#0B0F19] text-white py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">

        <h2 className="text-5xl font-extrabold text-center mb-4">
          Contact Us
        </h2>

        <p className="text-center text-gray-400 mb-14 text-lg">
          Book your premium doorstep car wash today.
        </p>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Contact Details */}

          <div className="bg-[#111827] rounded-3xl p-8 shadow-xl">

            <h3 className="text-3xl font-bold mb-8">
              Washoora Luxury Car Wash
            </h3>

            <div className="space-y-7 text-lg">

              <div>
                <p className="text-gray-400 mb-1">📍 Address</p>

                <p className="font-medium leading-8">
                  302, Kamal Heights,
                  <br />
                  Modi Road,
                  <br />
                  Jhunjhunu, Rajasthan
                </p>

                <a
                  href="https://maps.app.goo.gl/oNQJM8Np5JB4qrxPA?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-400 hover:text-blue-300 font-semibold"
                >
                  View on Google Maps →
                </a>
              </div>

              <div>
                <p className="text-gray-400 mb-1">📞 Phone</p>

                <a
                  href="tel:+919511539740"
                  className="text-green-400 hover:text-green-300 font-medium"
                >
                  +91 95115 39740
                </a>
              </div>

              <div>
                <p className="text-gray-400 mb-1">💬 WhatsApp</p>

                <a
                  href="https://wa.me/919511539740"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 font-medium"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <div>
                <p className="text-gray-400 mb-1">✉️ Email</p>

                <a
                  href="mailto:hello@washoora.in"
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  hello@washoora.in
                </a>
              </div>

            </div>

          </div>

          {/* Google Maps Card */}

          <div className="bg-[#111827] rounded-3xl flex flex-col items-center justify-center text-center p-10 shadow-xl">

            <div className="text-6xl mb-6">
              📍
            </div>

            <h3 className="text-3xl font-bold mb-4">
              Visit Our Office
            </h3>

            <p className="text-gray-400 mb-8 leading-7">
              302, Kamal Heights,
              <br />
              Modi Road,
              <br />
              Jhunjhunu, Rajasthan
            </p>

            <a
              href="https://maps.app.goo.gl/oNQJM8Np5JB4qrxPA?g_st=aw"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition"
            >
              📍 Open in Google Maps
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}