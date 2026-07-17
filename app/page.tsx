"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BookingModal from "./components/BookingModal";
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
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-[#1488fc]/5 to-transparent pointer-events-none z-0" />
      
      <div className="relative z-10">
        <Navbar />
        <Hero />

        <div className="flex justify-center py-4 relative">
          <BookingModal />
        </div>

        {/* Ek Single, Fully Functional Luxury Pricing Section */}
        <Pricing />
        
        <ProcessTimeline />
        <About />
        <WhyChoose />
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