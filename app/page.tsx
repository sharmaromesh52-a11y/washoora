import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BookingModal from "./components/BookingModal";
import Services from "./components/Services";
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
    <>
      <Navbar />
      <Hero />

      <div className="flex justify-center py-8">
        <BookingModal />
      </div>

      <Services />
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
    </>
  );
}