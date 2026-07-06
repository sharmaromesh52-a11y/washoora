export default function Services() {
  const services = [
    {
      icon: "🚗",
      title: "Exterior Wash",
      price: "₹299",
      desc: "High-pressure foam wash with premium shampoo for a spotless shine.",
    },
    {
      icon: "🧼",
      title: "Interior Detailing",
      price: "₹499",
      desc: "Deep vacuum cleaning, dashboard polishing and interior sanitization.",
    },
    {
      icon: "✨",
      title: "Ceramic Coating",
      price: "₹999",
      desc: "Long-lasting protection with a glossy showroom finish.",
    },
    {
      icon: "🛞",
      title: "Tyre & Alloy Care",
      price: "₹399",
      desc: "Professional tyre dressing and alloy wheel cleaning.",
    },
    {
      icon: "🔧",
      title: "Engine Bay Cleaning",
      price: "₹699",
      desc: "Safe engine compartment cleaning without damaging components.",
    },
    {
      icon: "🏠",
      title: "Doorstep Service",
      price: "Free Visit",
      desc: "Premium car care at your home or office anywhere in the city.",
    },
  ];

  return (
    <section
      id="services"
      className="bg-[#0B0F19] text-white py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <h2 className="text-center text-5xl font-extrabold mb-4">
          Our Services
        </h2>

        <p className="text-center text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
          Professional doorstep car washing and detailing services with premium
          quality products and trained experts.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((item, index) => (

            <div
              key={index}
              className="group rounded-3xl bg-[#111827] border border-gray-800 p-8 transition-all duration-300 hover:-translate-y-3 hover:border-blue-500 hover:shadow-[0_0_35px_rgba(59,130,246,0.25)]"
            >

              <div className="text-6xl mb-6 transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {item.title}
              </h3>

              <p className="text-gray-400 leading-7 mb-6">
                {item.desc}
              </p>

              <div className="text-3xl font-bold text-blue-400 mb-8">
                {item.price}
              </div>

              <button className="w-full bg-green-500 hover:bg-green-600 py-4 rounded-xl font-semibold transition duration-300">
                Book Now
              </button>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}