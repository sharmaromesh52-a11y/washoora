import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#0B1220] text-white py-24 px-6"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Image */}
        <div className="relative">
          <Image
            src="/hero.jpg"
            alt="Washoora Car Wash"
            width={700}
            height={500}
            className="rounded-3xl shadow-2xl"
          />

          <div className="absolute -bottom-6 -right-6 bg-blue-600 rounded-2xl px-8 py-6 shadow-xl">
            <h2 className="text-4xl font-bold">500+</h2>
            <p className="text-gray-200">Cars Washed</p>
          </div>
        </div>

        {/* Right Content */}
        <div>

          <p className="uppercase tracking-[6px] text-blue-400 font-semibold mb-3">
            ABOUT WASHOORA
          </p>

          <h2 className="text-5xl font-bold leading-tight mb-6">
            Premium Doorstep Car Wash
            <span className="text-blue-500 block">
              At Your Convenience
            </span>
          </h2>

          <p className="text-gray-300 leading-8 text-lg mb-8">
            Washoora provides premium doorstep car washing services in
            Jhunjhunu. We use high-quality microfiber cloths, premium
            shampoo, and professional equipment to keep your vehicle
            spotless without wasting your time.
          </p>

          <div className="grid grid-cols-2 gap-5 mb-10">

            <div className="bg-[#111827] rounded-xl p-5">
              <h3 className="text-3xl font-bold text-blue-500">500+</h3>
              <p className="text-gray-300 mt-2">
                Happy Customers
              </p>
            </div>

            <div className="bg-[#111827] rounded-xl p-5">
              <h3 className="text-3xl font-bold text-blue-500">100%</h3>
              <p className="text-gray-300 mt-2">
                Doorstep Service
              </p>
            </div>

            <div className="bg-[#111827] rounded-xl p-5">
              <h3 className="text-3xl font-bold text-blue-500">7 Days</h3>
              <p className="text-gray-300 mt-2">
                Availability
              </p>
            </div>

            <div className="bg-[#111827] rounded-xl p-5">
              <h3 className="text-3xl font-bold text-blue-500">★★★★★</h3>
              <p className="text-gray-300 mt-2">
                Customer Rating
              </p>
            </div>

          </div>

          <a
            href="https://wa.me/919515139740"
            className="inline-block bg-green-500 hover:bg-green-600 transition px-8 py-4 rounded-full font-semibold text-lg"
          >
            Book Your Wash
          </a>

        </div>

      </div>
    </section>
  );
}