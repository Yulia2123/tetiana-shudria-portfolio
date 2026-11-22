import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Contacts from "@/components/Contacts/Contacts";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
