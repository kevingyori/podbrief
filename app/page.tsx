'use client'
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import Expectations from "@/components/Expectations";
import CtaSection from "@/components/CtaSection";
import HeaderCta from "@/components/HeaderCta";
import Reveal from "@/components/Reveal";

export default function Home() {

  return (
    <main className="">
      <div className="md:max-w-7xl mx-auto md:pt-10">

        <Reveal>
          <HeaderCta />
        </Reveal>
        <Reveal>
          <Expectations />
        </Reveal>
        <Reveal>
          <Testimonials />
        </Reveal>
        <Reveal>
          <CtaSection />
        </Reveal>
      </div>
      <Footer />
    </main>
  );
}
