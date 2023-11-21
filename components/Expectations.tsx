import { EXAMPLE_SUMMARIES } from "@/lib/constants"

function Expectations() {
  return (
    <section className="py-12 md:pt-24 px-2 md:px-4 md:mt-16">
      <h2 className="text-4xl font-medium tracking-tight lg:text-4xl lg:leading-[3.5rem] mb-8">What to Expect</h2>
      <div className="grid gap-8 md:gap-12 lg:grid-cols-3">
        {EXAMPLE_SUMMARIES.map((summary, i) => (
          <div className="space-y-4" key={i}>
            <div>
              <h3 className="text-2xl font-medium tracking-tighter">{summary.title}</h3>
              <p className="text-muted-foreground">{summary.episode}</p>
            </div>
            <p>{summary.summary}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Expectations
