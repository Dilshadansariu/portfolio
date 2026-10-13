import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Loader from "@/components/Loader";
import FloatingCTA from "@/components/FloatingCTA";
import Spotlight from "@/components/Spotlight";

export default function Home() {
  return (
    <main className="noise relative">
      <Loader />
      <Spotlight />
      <CustomCursor />
      <Nav />
      <Hero />
      <About />
      <Services />
      <Work />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
