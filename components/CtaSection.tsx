import { Button } from "@/components/ui/button"
import SectionHeader from "./SectionHeader"
import SignupForm from "./SignupForm"

function CtaSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-4 px-4 md:px-6">
        <div className="space-y-3">
          {/* <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Stay Informed. Stay Ahead.</h2> */}
          <SectionHeader>Stay Informed. Stay Ahead.</SectionHeader>
          <p
            className="max-w-[600px] mx-auto text-center text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Why listen for hours when you can read in minutes? Get the essence of your favorite podcasts without missing
            out. Subscribe now and experience the future of learning.
          </p>
        </div>
        <div className="w-full max-w-sm mx-auto mt-14">
          <SignupForm />
        </div>
      </div>
    </section>
  )
}

export default CtaSection
