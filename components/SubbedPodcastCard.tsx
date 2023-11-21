import { PodcastImage } from "./PodcastImage";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

function SubbedPodcastCard({ podcast }: { podcast: any }) {
  return (
    <div key={podcast?.uuid}>
      {/* <div className="border-[3px] border-white peer-data-[state=checked]:border-yellow-600 peer-data-[state=checked]:bg-gray-100 inline-block rounded-lg bg-white min-w-full"> */}
      <Card
        className="overflow-hidden"
      >
        <CardHeader className="flex-row p-3 gap-2 items-center py-2 bg-opacity-0 ">
          <div className="min-w-[80px] rounded-md">
            <PodcastImage src={podcast.imageUrl} alt={podcast.name} animationDuration={0} uuid={podcast.uuid} />
            {/* <img */}
            {/*   src={podcast?.imageUrl} */}
            {/*   alt={podcast?.name} */}
            {/*   className="w-20 h-20 rounded-md bg-[#A7BABA]" */}
            {/*   loading="lazy" */}
            {/*   onError={(e) => { */}
            {/*     const target = e.target as HTMLImageElement; */}
            {/*     target.src = "/placeholder.png"; */}
            {/*   }} */}
            {/* /> */}
          </div>
          <div className="shrink">
            <div className="grid">
              <CardTitle className="text-lg shrink overflow-hidden whitespace-nowrap ">
                {podcast?.name}
              </CardTitle>
              <CardDescription className="h-[3.75rem] shrink overflow-hidden hyphens-auto text-ellipsis text-foreground">
                {podcast?.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}

export default SubbedPodcastCard
