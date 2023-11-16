import { Podcast, selectedPodcastsAtom } from "@/app/lib/store";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { PodcastImage } from "./PodcastImage";
import { useAtom } from "jotai";
import { updateSelectedPodcasts } from "@/lib/utils";

type SearchResultProps = {
  podcast: Podcast
}

export function SearchResult({ podcast }: SearchResultProps) {
  const [selectedPodcasts, setSelectedPodcasts] = useAtom(selectedPodcastsAtom);
  if (podcast) {
    return (
      <div>
        <Checkbox
          id={podcast.uuid}
          className="hidden peer group"
          onCheckedChange={(e) => updateSelectedPodcasts(e, podcast, selectedPodcasts, setSelectedPodcasts)}
          checked={selectedPodcasts.some(
            (item) => item?.uuid === podcast.uuid
          )}
        />
        <Label
          htmlFor={podcast.uuid}
          className="border-[3px] border-white peer-data-[state=checked]:border-goldDark peer-data-[state=checked]:bg-gray-100 inline-block rounded-lg bg-white min-w-full cursor-pointer"
        >
          <Card
            className="bg-[#ffffff00]"
          >
            <CardHeader className="flex flex-row p-2 gap-2 items-center bg-opacity-0 ">
              <div className="min-w-[80px] w-20 h-20 rounded-md">
                <PodcastImage src={podcast.imageUrl} alt={podcast.name} animationDuration={0} uuid={podcast.uuid} />
              </div>
              <div className="shrink">
                <div className="grid">
                  <CardTitle className="text-lg shrink overflow-hidden whitespace-nowrap ">
                    {podcast.name}
                  </CardTitle>
                  <CardDescription className="h-[3.75rem] shrink overflow-hidden hyphens-auto text-ellipsis">
                    {podcast.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Label>
      </div>
    )
  } else {
    return null
  }
}
