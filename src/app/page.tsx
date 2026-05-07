import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ExploreMore } from "@/components/ExploreMore";
import { BreakfastPizza } from "@/components/BreakfastPizza";
import { WhyDhop } from "@/components/WhyDhop";
import { Faq } from "@/components/Faq";
import { Mission } from "@/components/Mission";
import { Testimonials } from "@/components/Testimonials";
import { MoreThanPizza } from "@/components/MoreThanPizza";
import { Partners } from "@/components/Partners";
import { Location } from "@/components/Location";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <ExploreMore />
      <BreakfastPizza />
      <WhyDhop />
      <Faq />
      <Mission />
      <Testimonials />
      <MoreThanPizza />
      <Partners />
      <Location />
      <Footer />
    </main>
  );
}
