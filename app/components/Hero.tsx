"use client";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-[#000000] overflow-hidden px-6 py-20 border-b border-zinc-900/50">
      
      {/* 🌌 Cyberpunk Premium Glassmorphism Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1488fc]/10 rounded-full blur-[140px] pointer-events-none select-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none select-none" />
      
      {/* 🏁 Luxury Technical Grid Matrix Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none select-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Elite Badge Token */}
        <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800/80 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <span className="w-1.5 h-1.5 bg-[#1488fc] rounded-full animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-zinc-400">
            Next-Gen Detailing Infrastructure
          </span>
        </div>

        {/* Premium Corporate Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          Premium Doorstep Care <br />
          <span className="bg-gradient-to-r from-white via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
            For Luxury Vehicles
          </span>
        </h1>

        {/* Sub-text Node */}
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed font-sans font-medium">
          Professional mobile vehicle servicing platform deployed directly to your coordinates. High-end automotive cosmetics tailored for premium aesthetics.
        </p>

        {/* Statistics Matrix Overlay */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto pt-10 border-t border-zinc-900/80 font-mono text-zinc-500 text-[11px]">
          <div className="text-center">
            <p className="text-white font-bold text-xl sm:text-2xl tracking-tight mb-0.5 font-sans">500+</p>
            <p className="uppercase tracking-wider text-[9px] font-bold text-zinc-600">Cars Cleaned</p>
          </div>
          <div className="text-center border-x border-zinc-900/80">
            <p className="text-[#1488fc] font-bold text-xl sm:text-2xl tracking-tight mb-0.5 font-sans">5 ★</p>
            <p className="uppercase tracking-wider text-[9px] font-bold text-zinc-600">Client Rating</p>
          </div>
          <div className="text-center">
            <p className="text-emerald-400 font-bold text-xl sm:text-2xl tracking-tight mb-0.5 font-sans">100%</p>
            <p className="uppercase tracking-wider text-[9px] font-bold text-zinc-600">Satisfaction</p>
          </div>
        </div>

      </div>
    </section>
  );
}