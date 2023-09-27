"use client";
import {
  Podcast,
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
import { SearchForm } from "./SearchForm";
import { motion, AnimatePresence } from "framer-motion";

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
    selectedPodcasts: Podcast[],
    podcast: any,
    value: boolean | string
  ) => {
    const uuid = podcast.uuid;
    if (selectedPodcasts.length === 3 && value) {
      // setSelectedPodcasts(selectedPodcasts);
      return;
    }
    if (value) {
      setSelectedPodcasts([...selectedPodcasts, podcast]);
      return;
    } else {
      setSelectedPodcasts(
        selectedPodcasts.filter((item) => item?.uuid !== uuid)
      );
      return;
    }
  };

  const handleCheckedChange = (e: boolean | string, podcast: Podcast) => {
    // blue console log for debugging, with hour and minute
    console.log(
      "%chandleCheckedChange",
      "color: #00ffff",
      new Date().toLocaleTimeString()
    );
    updateSelectedPodcasts(selectedPodcasts, podcast, e);
    // setSelectedPodcasts((prev) => updateSelectedPodcasts(prev, podcast, e));
  };

  const removeClickedPodcast = (podcast: Podcast) => {
    // green console log for debugging, with hour and minute
    console.log(
      "%cremoveClickedPodcast",
      "color: #00ff00",
      new Date().toLocaleTimeString()
    );
    setSelectedPodcasts(
      selectedPodcasts.filter((item) => item?.uuid !== podcast.uuid)
    );
  };

  return (
    <div className="flex flex-col max-h-full md:max-w-xl md:mx-auto gap-2">
      <AnimatePresence mode="popLayout">
        <div className="text-xl text-white text-center mb-4">
          Select your favorite podcasts ({selectedPodcastsLength}/3)
        </div>
        <motion.div
          key="selectedPodcasts"
          className="flex flex-row justify-center mb-2 gap-5"
          layout
          initial={{ opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.4, opacity: 0 }}
          transition={{ type: "spring" }}
        >
          <AnimatePresence mode="popLayout">
            {selectedPodcasts.map((podcast) => (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: "spring" }}
                key={podcast?.uuid}
                onClick={() => removeClickedPodcast(podcast)}
                className="cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={podcast?.imageUrl}
                  alt={podcast?.name}
                  className="w-20 h-20 rounded-md bg-[#a7baad]"
                  loading="lazy"
                  onError={(e) => {
                    // console.error("error loading image", e);
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.png";
                  }}
                  // onLoad={(e) => {
                  //   console.log("image loaded", e);
                  // }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* <ScrollArea className="h-[calc(100dvh-240px)] mb-2"> */}
        <ScrollArea className="">
          <motion.div
            key="searchResults"
            className="flex flex-col gap-2 "
            layout
            initial={{ opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring" }}
          >
            {searchResults.map((podcast) => (
              // <div key={podcast.uuid} className="flex flex-row">
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
                  className="border-[3px] border-white peer-data-[state=checked]:border-gray-900 peer-data-[state=checked]:bg-gray-100 inline-block rounded-lg bg-white min-w-full cursor-pointer"
                >
                  <Card
                    // key={podcast.uuid}
                    className="  bg-[#ffffff00]"
                  >
                    <CardHeader className="flex flex-row p-2 gap-2 items-center bg-opacity-0 ">
                      <div className="min-w-[80px] rounded-md">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={podcast.imageUrl}
                          alt={podcast.name}
                          className="w-20 h-20 rounded-md bg-[#A7BABA]"
                          loading="lazy"
                          onError={(e) => {
                            // console.error("error loading image", e);
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder.png";
                          }}
                          // onLoad={(e) => {
                          //   console.log("image loaded", e);
                          // }}
                        />
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
                    {/* <CardContent>wow</CardContent> */}
                  </Card>
                </Label>
              </div>
            ))}
          </motion.div>
        </ScrollArea>

        <SearchForm />
      </AnimatePresence>
    </div>
  );
}

export default SearchResults;
