"use client";

type ServiceItem = {
  title: string;
  description: string;
  price: string;
};

export default function Services() {
  const servicesData: ServiceItem[] = [
    {
      title: "Exterior Wash",
      description: "High-pressure foam wash with premium shampoo for a spotless outer shine.",
      price: "199",
    },
    {
      title: "Interior Detailing",
      description: "Deep vacuum cleaning, dashboard polishing, and complete interior sanitization.",
      price: "349",
    },
    {
      title: "Bike/Scooty Wash",
      description: "Premium doorstep foam wash, thorough cleaning, and shining wax for two-wheelers.",
      price: "79",
    },
  ];

  return (
    <section id="services" className="bg-[#08111F] py-24 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        
        <p className="text-blue-400 uppercase tracking-[5px] font-semibold text-center">
          OUR SERVICES
        </p>

        <h2 className="text-5xl font-bold text-center mt-4">
          Premium Doorstep Care
        </h2>

        <p className="text-gray-400 text-center mt-5 max-w-3xl mx-auto">
          We bring high-quality vehicle detailing and washing services directly to your doorstep.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-[#0f1b2e] border border-gray-800 rounded-3xl p-8 hover:border-blue-500 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition">
                  {service.title}
                </h3>
                <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-8">
                <p className="text-3xl font-extrabold text-blue-500 font-mono">
                  ₹{service.price}
                </p>
                <button 
                  onClick={() => {
                    const modalBtn = document.querySelector('button[class*="bg-green-500"]') as HTMLButtonElement;
                    if (modalBtn) modalBtn.click();
                  }}
                  className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition active:scale-[0.98]"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}