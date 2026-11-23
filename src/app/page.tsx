import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Projects from "@/components/Projects/Projects";
import HowIWork from "@/components/HowIWork/HowIWork";
import Contacts from "@/components/Contacts/Contacts";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <HowIWork />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
