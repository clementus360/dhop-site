import { connection } from "next/server";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { VotedBest } from "@/components/VotedBest";
import { ExploreMore } from "@/components/ExploreMore";
import { BreakfastPizza } from "@/components/BreakfastPizza";
import { WhyDhop } from "@/components/WhyDhop";
import { Faq } from "@/components/Faq";
import { Mission } from "@/components/Mission";
import { Testimonials } from "@/components/Testimonials";
import { MoreThanPizza } from "@/components/MoreThanPizza";
import { Catering } from "@/components/Catering";
import { Merch } from "@/components/Merch";
import { Partners } from "@/components/Partners";
import { Location } from "@/components/Location";
import { Footer } from "@/components/Footer";

export default async function Home() {
  await connection();
  return (
    <main className="relative">
      <Header />
      <Hero />
      <ExploreMore />
      <BreakfastPizza />
      <WhyDhop />
      <Faq />
      <VotedBest />
      <Mission />
      <Testimonials />
      <MoreThanPizza />
      <Catering />
      <Merch />
      <Partners />
      <Location />
      <Footer />
    </main>
  );
}
