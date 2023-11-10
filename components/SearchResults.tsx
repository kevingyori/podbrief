"use client";
import {
  Podcast,
  searchQueryAtom,
  searchResultsAtom,
  selectedPodcastsAtom,
  selectedPodcastsLengthAtom,
} from "@/app/lib/store";
import { useAtom } from "jotai";
import { useEffect, memo } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { SearchForm } from "./SearchForm";
import { motion, AnimatePresence } from "framer-motion";
import SearchResult from "./SearchResult";
import { PodcastImage } from "./PodcastImage";

function SearchResults() {
  // const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [searchResults, setSearchResults] = useAtom(searchResultsAtom);
  const [selectedPodcasts, setSelectedPodcasts] = useAtom(selectedPodcastsAtom);
  const [selectedPodcastsLength, setSelectedPodcastsLength] = useAtom(
    selectedPodcastsLengthAtom
  );

  useEffect(() => {
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
    console.log(
      "%chandleCheckedChange",
      "color: #00ffff",
      new Date().toLocaleTimeString()
    );

    updateSelectedPodcasts(selectedPodcasts, podcast, e);
    // setSelectedPodcasts((prev) => updateSelectedPodcasts(prev, podcast, e));
  };

  const removeClickedPodcast = (podcast: Podcast) => {
    console.log(
      "%cremoveClickedPodcast",
      "color: #00ff00",
      new Date().toLocaleTimeString()
    );

    setSelectedPodcasts(
      selectedPodcasts.filter((item) => item?.uuid !== podcast?.uuid)
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
                className="cursor-pointer bg-red-500"
              >
                <PodcastImage src={podcast?.imageUrl} alt={podcast?.name} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

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
              <SearchResult
                key={podcast?.uuid}
                podcast={podcast}
                handleCheckedChange={handleCheckedChange}
                selectedPodcasts={selectedPodcasts}
              />
            ))}
          </motion.div>
        </ScrollArea>

        <SearchForm />
      </AnimatePresence>
    </div>
  );
}

export default SearchResults;
