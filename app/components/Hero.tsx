"use client";

export default function Hero() {
  const handleWhatsAppClick = () => {
    const message = "Hello Washoora! I want to book a doorstep premium wash/detailing service.";
    window.open(`https://wa.me/919511539740?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleCallClick = () => {
    window.location.href = "tel:919511539740";
  };

  return (
    <section className="relative bg-[#000000] min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden">
      
      {/* Background Graphic Grid Ambient Accent */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1488fc]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* Top Premium Meta Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6 animate-fade-in">
          <span className="bg-[#1488fc]/10 border border-[#1488fc]/30 text-[#1488fc] text-[10px] font-mono uppercase tracking-widest font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_0_15px_rgba(20,136,252,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1488fc] animate-pulse" />
            PREMIUM SERVICE
          </span>
          <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-sans font-bold px-3 py-1.5 rounded-full">
            📍 Jhunjhunu, Rajasthan
          </span>
          <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-sans font-bold px-3 py-1.5 rounded-full">
            ⚡ Professional Doorstep Car Wash
          </span>
        </div>

        {/* Dynamic Structural Headline */}
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl">
          Professional <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#1488fc] via-[#3ca2ff] to-white bg-clip-text text-transparent">
            Doorstep Car Wash
          </span>
        </h1>

        {/* Subtitle Payload Context */}
        <p className="text-zinc-400 text-sm sm:text-base mt-6 max-w-xl leading-relaxed font-medium">
          Premium foam wash and professional detailing at your doorstep. <br />
          No travel. No waiting. Just spotless architectural results.
        </p>

        {/* Starting Price Metric Tag */}
        <div className="mt-8 flex items-baseline gap-2 bg-zinc-900/40 border border-zinc-900/80 px-5 py-2.5 rounded-2xl">
          <span className="text-zinc-500 font-mono text-[10px] uppercase font-bold tracking-widest">STARTING AT</span>
          <span className="text-white text-3xl font-black font-sans tracking-tight">₹199</span>
        </div>

        {/* Double Contact Action Core Panel */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          
          {/* Main Action WhatsApp Trigger Node */}
          <button 
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-[#25d366] hover:bg-[#20ba5a] text-black font-extrabold text-sm rounded-full tracking-wide transition-all duration-200 shadow-[0_4px_25px_rgba(37,211,102,0.25)] transform active:scale-[0.98]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.411 0 11.983 0c3.184.001 6.177 1.242 8.426 3.496 2.249 2.254 3.487 5.252 3.484 8.437-.006 6.644-5.357 11.993-11.93 11.993-1.999-.002-3.961-.504-5.709-1.458L0 24zm6.59-4.846c1.66.986 3.292 1.493 4.813 1.496 5.373 0 9.742-4.343 9.745-9.676 0-2.583-1.012-5.01-2.848-6.84A9.55 9.55 0 0 0 11.985 1.39c-5.379 0-9.752 4.343-9.756 9.678-.002 1.749.499 3.407 1.448 4.887L2.64 21.465l5.811-1.526z"/>
            </svg>
            Book Doorstep Wash
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>

          {/* Connected Voice Line Audio Node */}
          <button 
            onClick={handleCallClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 font-extrabold text-sm rounded-full tracking-wide transition-all duration-200 active:scale-[0.98]"
          >
            <svg className="w-4 h-4 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-1C7.42 18 2 12.58 2 6V3z"/>
            </svg>
            Call Now
          </button>

        </div>

        {/* Horizontal Visual Checks Core Badges Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8 text-zinc-500 font-medium text-xs">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="text-[#1488fc] text-sm">✓</span> Doorstep Service
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="text-[#1488fc] text-sm">✓</span> Premium Chemicals
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="text-[#1488fc] text-sm">✓</span> Eco Water Saving
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="text-[#1488fc] text-sm">✓</span> Transparent Pricing
          </div>
        </div>

      </div>
    </section>
  );
}