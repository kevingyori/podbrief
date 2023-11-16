import { Podcast } from "@/app/lib/store";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { memo } from "react";
import { PodcastImage } from "./PodcastImage";

type HandleCheckedChange = (e: boolean | string, podcast: Podcast) => void;

type SearchResultProps = {
  podcast: Podcast
  selectedPodcasts: Podcast[]
  handleCheckedChange: HandleCheckedChange
}

function SearchResult({ podcast, selectedPodcasts, handleCheckedChange }: SearchResultProps) {
  if (podcast) {
    return (
      <div key={podcast.uuid}>
        <Checkbox
          id={podcast.uuid}
          className="hidden peer group"
          onCheckedChange={(e) => handleCheckedChange(e, podcast)}
          checked={selectedPodcasts.some(
            (item) => item?.uuid === podcast.uuid
          )}
        />
        <Label
          htmlFor={podcast.uuid}
          className="border-[3px] border-white peer-data-[state=checked]:border-gold peer-data-[state=checked]:bg-gray-100 inline-block rounded-lg bg-white min-w-full cursor-pointer"
        >
          <Card
            className="bg-[#ffffff00]"
          >
            <CardHeader className="flex flex-row p-2 gap-2 items-center bg-opacity-0 ">
              <div className="min-w-[80px] rounded-md">
                <PodcastImage src={podcast.imageUrl} alt={podcast.name} />
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
    return <div></div>
  }
}

export default memo(SearchResult)
