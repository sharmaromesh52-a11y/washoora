"use client";

export default function Pricing() {
  const plans = [
    {
      title: "Exterior Wash",
      price: "₹199",
      features: ["High-pressure foam wash", "Premium outer shine shampoo", "Tyre cleaning & dressing", "Microfiber lint-free dry"],
      popular: false
    },
    {
      title: "Interior Detailing",
      price: "₹349",
      features: ["Deep cabin vacuuming", "Dashboard & console polish", "Door panels machine cleaning", "Premium interior sanitization"],
      popular: true
    },
    {
      title: "Bike/Scooty Wash",
      price: "₹79",
      features: ["Premium doorstep foam wash", "Detail chain/rim cleaning", "High-gloss liquid wax coat", "Two-wheeler cosmetic finish"],
      popular: false
    }
  ];

  const handlePlanClick = (planName: string) => {
    // 🚀 Fire event directly targeting custom dynamic portal context
    window.dispatchEvent(new CustomEvent("open-booking-modal", { detail: { service: planName } }));
  };

  return (
    <section id="services" className="bg-[#000000] py-24 px-6 relative overflow-hidden border-t border-zinc-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#1488fc] uppercase tracking-[4px] font-bold text-xs">OUR SERVICES</p>
          <h2 className="text-4xl font-extrabold mt-3 bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent tracking-tight">
            Premium Doorstep Care
          </h2>
          <p className="text-zinc-500 text-xs mt-2">Professional vehicle detailing and washing services deployed directly to your coordinates.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`bg-[#171719] border rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular 
                  ? "border-[#1488fc]/40 shadow-[0_0_40px_rgba(20,136,252,0.1)] scale-105 z-10" 
                  : "border-zinc-900 shadow-xl"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1488fc] text-white text-[10px] font-mono uppercase tracking-wider font-bold px-4 py-1 rounded-full shadow-[0_4px_12px_rgba(20,136,252,0.3)]">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-white font-extrabold text-xl tracking-tight mb-4">{plan.title}</h3>
                <p className="text-[#1488fc] font-sans font-black text-4xl tracking-tight mb-6">{plan.price}</p>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-zinc-400 text-xs font-medium">
                      <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => handlePlanClick(plan.title)}
                className="w-full py-3.5 bg-[#10b981] hover:bg-[#1488fc] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 transform active:scale-[0.98]"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}