import Image from "next/image";
import BookingModal from "./BookingModal";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen">

      <Image
        src="/hero.jpg"
        alt="Washoora"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40"></div>

      <div className="relative z-10 min-h-screen flex items-center">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white">
            Luxury
            <span className="text-blue-500"> Doorstep </span>
            Car Wash
            <br />
            & Premium Detailing
          </h1>

          <p className="mt-8 max-w-xl text-xl text-gray-300 leading-8">
            Professional car washing, interior detailing,
            ceramic coating and premium cleaning service
            delivered right at your doorstep.
          </p>

          <div className="flex gap-5 mt-10 items-center">

            <BookingModal />

            <a
              href="#services"
              className="border border-white hover:bg-white hover:text-black px-8 py-3 rounded-full font-semibold transition"
            >
              View Services
            </a>

          </div>

          <div className="flex gap-12 mt-16">

            <div>
              <h3 className="text-3xl font-bold text-blue-500">500+</h3>
              <p className="text-gray-400">Cars Cleaned</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-blue-500">5★</h3>
              <p className="text-gray-400">Customer Rating</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-blue-500">100%</h3>
              <p className="text-gray-400">Satisfaction</p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}