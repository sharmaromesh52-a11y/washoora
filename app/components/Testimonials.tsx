"use client";

import { useState, useEffect } from "react";

type Review = {
  name: string;
  location: string;
  vehicle: string;
  feedback: string;
  rating: number;
};

export default function Testimonials() {
  const reviewsData: Review[] = [
    {
      name: "Hemant Meena",
      location: "Modi Road",
      vehicle: "Thar",
      feedback: "Best doorstep service in Jhunjhunu! Foam wash quality was premium, and they deep cleaned every single corner of the interior. Highly recommended.",
      rating: 5,
    },
    {
      name: "Vikram Singh",
      location: "Kamal Heights Area",
      vehicle: "Creta",
      feedback: "Bhai maza aa gaya. Interior detailing ki quality ekdam showroom jaisi thi. Ghar baithe itna professional wash milna impossible lagta tha.",
      rating: 5,
    },
    {
      name: "Amit Kumar",
      location: "Housing Board",
      vehicle: "Splendor Plus",
      feedback: "Sirf ₹79 me doorstep bike wash aur sath me premium shining wax! Time par aaye aur ekdam chakachak saaf kiya.",
      rating: 5,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % reviewsData.length);
    }, 4000); // 4 seconds auto-rotation slider
    return () => clearInterval(interval);
  }, [reviewsData.length]);

  return (
    <section id="testimonials" className="bg-[#000000] border-t border-zinc-900 py-24 px-6 text-white overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        <p className="text-[#1488fc] uppercase tracking-[4px] font-bold text-xs text-center">
          CLIENT ARCHITECTURE FEEDBACK
        </p>

        <h2 className="text-4xl font-extrabold text-center mt-3 bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent tracking-tight">
          Trusted by Luxury Owners
        </h2>

        {/* Dynamic Slidable Matrix Card Component */}
        <div className="w-full max-w-2xl bg-[#171719] border border-zinc-800 rounded-2xl p-8 md:p-10 mt-16 relative shadow-2xl transition-all duration-300 min-h-[250px] flex flex-col justify-between">
          <div className="absolute top-4 right-6 text-6xl text-[#1488fc]/10 font-serif pointer-events-none select-none">
            “
          </div>

          <div>
            <div className="flex gap-1 text-amber-400 text-sm mb-4">
              {Array.from({ length: reviewsData[activeIndex].rating }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>

            <p className="text-zinc-300 text-base font-sans italic leading-relaxed transition-opacity duration-300">
              "{reviewsData[activeIndex].feedback}"
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800 flex justify-between items-center">
            <div>
              <h4 className="text-white font-bold text-sm tracking-wide">
                {reviewsData[activeIndex].name}
              </h4>
              <p className="text-zinc-500 text-xs mt-0.5 font-mono">
                {reviewsData[activeIndex].location}, Jhunjhunu
              </p>
            </div>
            
            <span className="bg-[#000000] border border-zinc-800 px-3 py-1 rounded-md text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
              {reviewsData[activeIndex].vehicle}
            </span>
          </div>
        </div>

        {/* Slide Indicator Dots Container Nodes */}
        <div className="flex gap-2.5 mt-6">
          {reviewsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index ? "w-6 bg-[#1488fc]" : "w-1.5 bg-zinc-800"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}