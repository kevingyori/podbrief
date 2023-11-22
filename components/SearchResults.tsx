"use client";
import {
  Podcast,
  searchQueryAtom,
  selectedPodcastsAtom,
} from "@/app/lib/store";
import { useAtom } from "jotai";
import { ScrollArea } from "./ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { SearchResult } from "./SearchResult";
import { useQuery } from "@tanstack/react-query";
import { fetchPodcasts } from "@/app/lib/data/search";
import dynamic from "next/dynamic";

const LazyPodcastSearch = dynamic(() => import("./SearchForm"));
const LazySelectedPodcast = dynamic(() => import("./SelectedPodcast"));

function SearchResults() {
  const [searchQuery] = useAtom(searchQueryAtom);
  const [selectedPodcasts, setSelectedPodcasts] = useAtom(selectedPodcastsAtom);

  const { data: searchResults } = useQuery({
    queryKey: ['searchResults', searchQuery],
    queryFn: () => fetchPodcasts(searchQuery),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  return (
    <div className="flex flex-col justify-between h-full md:max-w-xl md:mx-auto gap-2">
      <div
        className="text-xl text-white text-center mb-4">
        Select your favorite podcasts ({selectedPodcasts?.length}/3)
      </div>

      {/* List of selected podcasts */}
      <div
        // key="selectedPodcasts"
        className="flex flex-row justify-center mb-2 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {selectedPodcasts.map((podcast) => (
            <LazySelectedPodcast key={podcast?.uuid} podcast={podcast} selectedPodcasts={selectedPodcasts} setSelectedPodcasts={setSelectedPodcasts} />
          ))}
        </AnimatePresence>
      </div>

      {/* Search results */}
      {searchResults?.length !== 0 &&
        <ScrollArea className="z-10">
          <motion.div
            key="searchResults"
            layout
            className="flex flex-col gap-2"
          >
            {searchResults?.map((podcast: Podcast) => (
              <SearchResult
                key={podcast?.uuid}
                podcast={podcast}
              />
            ))}
          </motion.div>
        </ScrollArea>
      }

      {/* Search form */}

      <LazyPodcastSearch />
    </div>
  );
}

export default SearchResults;
