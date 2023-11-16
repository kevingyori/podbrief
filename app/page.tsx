import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import Expectations from "@/components/Expectations";
import CtaSection from "@/components/CtaSection";
import HeaderCta from "@/components/HeaderCta";

export default async function Home() {

  return (
    <main className="">
      <div className="md:max-w-7xl mx-auto md:pt-10">
        <HeaderCta />
        <Expectations />
        <Testimonials />
        <CtaSection />
      </div>
      <Footer />
    </main>
  );
}
