"use client";
import {
  searchQueryAtom,
  searchResultsAtom,
  selectedPodcastsAtom,
  selectedPodcastsLengthAtom,
} from "@/app/lib/store";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import data from "@/data.json";
import { ScrollArea } from "./ui/scroll-area";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

function SearchResults() {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [searchResults, setSearchResults] = useAtom(searchResultsAtom);
  const [selectedPodcasts, setSelectedPodcasts] = useAtom(selectedPodcastsAtom);
  const [selectedPodcastsLength, setSelectedPodcastsLength] = useAtom(
    selectedPodcastsLengthAtom
  );

  useEffect(() => {
    // pink console log for debugging, with hour and minute
    console.log(
      "%cSearchResults",
      "color: #ff00ff",
      new Date().toLocaleTimeString()
    );
    console.log("searchResults", searchResults);
    console.log("selectedPodcasts", selectedPodcasts);
    console.log("selectedPodcastsLength", selectedPodcastsLength);
  }, [searchResults, selectedPodcasts, selectedPodcastsLength]);

  const updateSelectedPodcasts = (
    selectedPodcasts: { uuid: string; value: boolean }[],
    podcast: any,
    value: boolean
  ) => {
    const uuid = podcast.uuid;
    if (selectedPodcasts.length === 5 && value) {
      return selectedPodcasts;
    }
    if (value) {
      return [...selectedPodcasts, { uuid: uuid, value: value }];
    } else {
      return selectedPodcasts.filter((item) => item.uuid !== uuid);
    }
  };

  const handleCheckedChange = (e: boolean | string, podcast: any) => {
    // blue console log for debugging, with hour and minute
    console.log(
      "%chandleCheckedChange",
      "color: #00ffff",
      new Date().toLocaleTimeString()
    );
    setSelectedPodcasts((prev) => updateSelectedPodcasts(prev, podcast, e));
  };

  return (
    <div className="">
      <div className="text-xl text-white text-center mb-4">
        Select your favorite podcasts ({selectedPodcastsLength}/5)
      </div>
      <ScrollArea className="h-[calc(100dvh-240px)] mb-2">
        <div className="flex flex-col gap-2 ">
          {searchResults.map((podcast) => (
            // <div key={podcast.uuid} className="flex flex-row">
            <div key={podcast.uuid}>
              <Checkbox
                id={podcast.uuid}
                className="hidden peer group"
                onCheckedChange={(e) => handleCheckedChange(e, podcast)}
                checked={selectedPodcasts.some(
                  (item) => item.uuid === podcast.uuid
                )}
              />
              <Label
                htmlFor={podcast.uuid}
                className="border-[3px] border-white peer-data-[state=checked]:border-yellow-600 peer-data-[state=checked]:bg-gray-100 inline-block rounded-lg bg-white"
              >
                <Card
                  key={podcast.uuid}
                  className=" max-w-[calc(100vw-1.5rem)] bg-[#ffffff00] overflow-hidden"
                >
                  <CardHeader className="flex-row p-3 gap-2 items-center py-2 bg-opacity-0 ">
                    <div className="min-w-[80px] rounded-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={podcast.imageUrl}
                        alt={podcast.name}
                        className="w-20 h-20 rounded-md bg-[#A7BABA]"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "/placeholder.png";
                        }}
                      />
                    </div>
                    <div className="flex-col">
                      <CardTitle className="text-lg overflow-hidden whitespace-nowrap">
                        {podcast.name}
                      </CardTitle>
                      <CardDescription className="h-[3.75rem] overflow-hidden hyphens-auto text-ellipsis">
                        {podcast.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  {/* <CardContent>wow</CardContent> */}
                </Card>
              </Label>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default SearchResults;
