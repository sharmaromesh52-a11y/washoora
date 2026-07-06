export default function WhyChoose() {
  const features = [
    {
      icon: "⚡",
      title: "Fast Service",
      desc: "Quick and efficient doorstep car wash with minimal waiting time.",
    },
    {
      icon: "🧴",
      title: "Premium Products",
      desc: "We use high-quality shampoos, waxes and detailing products.",
    },
    {
      icon: "👨‍🔧",
      title: "Expert Team",
      desc: "Professionally trained staff for premium car care.",
    },
    {
      icon: "💧",
      title: "Water Efficient",
      desc: "Smart washing techniques that save water without compromising quality.",
    },
    {
      icon: "🏠",
      title: "Doorstep Convenience",
      desc: "We come to your home or office, saving your valuable time.",
    },
    {
      icon: "⭐",
      title: "Customer Satisfaction",
      desc: "Our priority is delivering a premium experience every time.",
    },
  ];

  return (
    <section className="bg-[#08111F] py-24 px-6 text-white">
      <div className="max-w-7xl mx-auto">

        <p className="text-blue-400 uppercase tracking-[5px] font-semibold text-center">
          WHY CHOOSE US
        </p>

        <h2 className="text-5xl font-bold text-center mt-4">
          Why Washoora?
        </h2>

        <p className="text-gray-400 text-center mt-5 max-w-3xl mx-auto">
          Premium doorstep car care with quality, convenience and professional service.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {features.map((item, index) => (

            <div
              key={index}
              className="group bg-[#111827] border border-gray-800 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-[0_0_35px_rgba(59,130,246,0.25)]"
            >

              <div className="text-5xl mb-6 group-hover:scale-110 transition">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {item.title}
              </h3>

              <p className="text-gray-400 leading-7">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}