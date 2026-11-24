import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Projects from "@/components/Projects/Projects";
import HowIWork from "@/components/HowIWork/HowIWork";
import About from "@/components/About/About";
import Contacts from "@/components/Contacts/Contacts";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <HowIWork />
        <About />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
