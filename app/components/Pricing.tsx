export default function Pricing() {
  const plans = [
    {
      title: "Basic Wash",
      price: "₹199",
      badge: "",
      features: [
        "Exterior Foam Wash",
        "Tyre Cleaning",
        "Microfiber Dry",
        "30 Minutes Service",
      ],
    },
    {
      title: "Premium Wash",
      price: "₹499",
      badge: "Most Popular",
      features: [
        "Exterior + Interior",
        "Vacuum Cleaning",
        "Dashboard Polish",
        "Tyre Shine",
        "Microfiber Finish",
      ],
    },
    {
      title: "Luxury Detailing",
      price: "₹999+",
      badge: "",
      features: [
        "Complete Detailing",
        "Ceramic Protection",
        "Premium Interior Care",
        "Paint Enhancement",
      ],
    },
  ];

  return (
    <section className="bg-[#0B0F19] py-24 px-6 text-white">
      <div className="max-w-7xl mx-auto">

        <p className="text-blue-400 uppercase tracking-[5px] font-semibold text-center">
          PRICING
        </p>

        <h2 className="text-5xl font-bold text-center mt-4">
          Choose Your Package
        </h2>

        <p className="text-gray-400 text-center mt-5 mb-16">
          Affordable pricing with premium quality service.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {plans.map((plan, index) => (

            <div
              key={index}
              className={`rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-2 ${
                plan.badge
                  ? "border-blue-500 bg-[#111827] shadow-[0_0_35px_rgba(59,130,246,0.25)]"
                  : "border-gray-800 bg-[#111827]"
              }`}
            >

              {plan.badge && (
                <div className="inline-block bg-blue-500 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  {plan.badge}
                </div>
              )}

              <h3 className="text-3xl font-bold">
                {plan.title}
              </h3>

              <div className="text-5xl text-blue-400 font-bold mt-6 mb-8">
                {plan.price}
              </div>

              <ul className="space-y-4 text-gray-300">

                {plan.features.map((feature, i) => (
                  <li key={i}>
                    ✅ {feature}
                  </li>
                ))}

              </ul>

              <button className="mt-10 w-full bg-green-500 hover:bg-green-600 rounded-xl py-4 font-semibold transition">
                Book Now
              </button>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}