import WhyChoose from "./components/WhyChoose";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import WhatsappButton from "./components/WhatsappButton";
import CallButton from "./components/CallButton";
import BookingModal from "./components/BookingModal";

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