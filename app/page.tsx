'use client'
import Testimonials from "@/components/Testimonials";
import Expectations from "@/components/Expectations";
import HeaderCta from "@/components/HeaderCta";
import Reveal from "@/components/Reveal";
import dynamic from "next/dynamic";

const LazyCtaSection = dynamic(() => import("@/components/CtaSection"))
const LazyFooter = dynamic(() => import("@/components/Footer"))

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
          <LazyCtaSection />
        </Reveal>
      </div>
      <LazyFooter />
    </main>
  );
}
