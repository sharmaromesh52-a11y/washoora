"use client";

export default function Pricing() {
  const plans = [
    {
      title: "Basic Wash",
      price: "₹199",
      features: ["Exterior Foam Wash", "Tyre Cleaning", "Microfiber Dry", "30 Minutes Service"],
      popular: false
    },
    {
      title: "Premium Wash",
      price: "₹499",
      features: ["Exterior + Interior", "Vacuum Cleaning", "Dashboard Polish", "Tyre Shine", "Microfiber Finish"],
      popular: true
    },
    {
      title: "Luxury Detailing",
      price: "₹999+",
      features: ["Complete Detailing", "Ceramic Protection", "Premium Interior Care", "Paint Enhancement"],
      popular: false
    }
  ];

  const handlePlanClick = (planName: string) => {
    // 🚀 Trigger custom global event to open the main booking modal automatically
    const modalTriggerButton = document.querySelector('[data-booking-trigger="true"]') as HTMLButtonElement;
    if (modalTriggerButton) {
      modalTriggerButton.click();
    } else {
      // Fallback fallback triggering via standard custom trigger architecture
      window.dispatchEvent(new CustomEvent("open-booking-modal", { detail: { service: planName } }));
    }
  };

  return (
    <section className="bg-[#000000] py-24 px-6 relative overflow-hidden border-t border-zinc-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#1488fc] uppercase tracking-[4px] font-bold text-xs">TRANSPARENT VALUE</p>
          <h2 className="text-4xl font-extrabold mt-3 bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent tracking-tight">
            Select Your Service Grid
          </h2>
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
                <h3 className="text-white font-extrabold text-2xl tracking-tight mb-2">{plan.title}</h3>
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

              {/* Connected Active Action Button Node */}
              <button 
                onClick={() => handlePlanClick(plan.title)}
                className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 transform active:scale-[0.98] ${
                  plan.popular 
                    ? "bg-[#1488fc] hover:bg-[#1488fc]/90 text-white shadow-[0_4px_20px_rgba(20,136,252,0.2)]" 
                    : "bg-[#10b981] hover:bg-[#0ea5e9] text-white"
                }`}
              >
                Book {plan.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}