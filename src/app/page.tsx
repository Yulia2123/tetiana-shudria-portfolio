import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import HowIWork from "@/components/HowIWork/HowIWork";
import Contacts from "@/components/Contacts/Contacts";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowIWork />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
