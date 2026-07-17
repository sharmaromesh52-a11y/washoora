"use client";

export default function ProcessTimeline() {
  const steps = [
    {
      num: "01",
      title: "Digital Registration",
      desc: "Customer schedules service via the live secure matrix portal with coordinate-based area locking.",
      tag: "INCOMING NODE"
    },
    {
      num: "02",
      title: "Crew Deployment",
      desc: "An expert technician is assigned through the master admin workspace and dispatched to your exact location.",
      tag: "LIVE DISPATCH"
    },
    {
      num: "03",
      title: "Premium Cosmetic Care",
      desc: "High-pressure foam processing, deep interior machine vacuuming, and professional wax finishing applied at your doorstep.",
      tag: "PROCESSING SERVICE"
    },
    {
      num: "04",
      title: "Automated Invoicing",
      desc: "Instant cryptographic digital invoice compiled and transmitted straight to the user's mobile interface.",
      tag: "NODE COMPLETED"
    }
  ];

  return (
    <section className="bg-[#000000] py-24 px-6 relative overflow-hidden border-t border-zinc-950">
      {/* Ambient Glow Node */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none select-none" />

      <div className="max-w-6xl mx-auto">
        <p className="text-[#1488fc] uppercase tracking-[4px] font-bold text-xs text-center">
          OPERATIONAL PIPELINE
        </p>
        <h2 className="text-4xl font-extrabold text-center mt-3 bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent tracking-tight">
          How Luxury Logistics Work
        </h2>

        {/* Timeline Grid Control */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 relative">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="bg-[#171719] border border-zinc-950 hover:border-zinc-800 p-6 rounded-2xl relative shadow-xl transition-all duration-300 group flex flex-col justify-between min-h-[220px]"
            >
              <div>
                {/* Step Header */}
                <div className="flex justify-between items-start">
                  <span className="text-3xl font-extrabold font-mono text-zinc-800 group-hover:text-[#1488fc]/30 transition-colors duration-300">
                    {step.num}
                  </span>
                  <span className="text-[9px] font-mono bg-[#000000] border border-zinc-900 text-zinc-500 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                    {step.tag}
                  </span>
                </div>

                {/* Step Content */}
                <h3 className="text-white font-bold text-base mt-4 tracking-wide group-hover:text-[#1488fc] transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-zinc-500 text-xs mt-2 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>

              {/* Decorative Connective Line for Desktop Grid */}
              {idx < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[1px] bg-zinc-900 z-10 pointer-events-none" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}