import { TESTIMONIALS } from "@/lib/constants"
import SectionHeader from "./SectionHeader"

export default function Component() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-6 xl:px-8">
        {/* <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl"> */}
        {/*   What Our Customers Say */}
        {/* </h2> */}
        <SectionHeader>What Our Customers Say</SectionHeader>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5 md:gap-8 lg:gap-10 mt-20 h-max">
          {TESTIMONIALS.map((testimonial, i) => (
            <div className="flex flex-col items-center justify-between">
              <img
                alt="Testimonial 1"
                className="rounded-full object-cover"
                height="80"
                src="/Gradient.png"
                style={{
                  aspectRatio: "80/80",
                  objectFit: "cover",
                }}
                width="80"
              />
              <blockquote className="text-center text-sm md:text-base lg:text-sm xl:text-base my-2">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex flex-col items-center">
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
