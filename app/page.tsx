"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BookingModal from "./components/BookingModal";
import Services from "./components/Services";
import ProcessTimeline from "./components/ProcessTimeline";
import About from "./components/About";
import WhyChoose from "./components/WhyChoose";
import Pricing from "./components/Pricing";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CallButton from "./components/CallButton";
import WhatsappButton from "./components/WhatsappButton";

export default function Home() {
  return (
    <div className="bg-[#000000] min-h-screen relative overflow-x-hidden text-white font-sans selection:bg-[#1488fc]/30">
      
      {/* 🔮 GLOBAL CORPORATE LUXURY GLOW CONTROLS */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-[#1488fc]/5 to-transparent pointer-events-none z-0" />
      <div className="absolute top-[120vh] left-[-200px] w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[280vh] right-[-200px] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* 🏁 GLOBAL AUTOMOTIVE TECH MATRIX OVERLAY */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* CORE WEB APP STRUCTURE LAYOUT */}
      <div className="relative z-10">
        <Navbar />
        <Hero />

        {/* Floating Modal System Interlocking */}
        <div className="flex justify-center py-12 relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[200px] h-[50px] bg-green-500/10 rounded-full blur-2xl opacity-60" />
          </div>
          <BookingModal />
        </div>

        <Services />
        <ProcessTimeline />
        <About />
        <WhyChoose />
        <Pricing />
        <Gallery />
        <Testimonials />
        <Faq />
        <Contact />
        <Footer />
        <CallButton />
        <WhatsappButton />
      </div>
    </div>
  );
}
