"use client";
import {
  Podcast,
  searchQueryAtom,
  selectedPodcastsAtom,
} from "@/app/lib/store";
import { useAtom } from "jotai";
import { ScrollArea } from "./ui/scroll-area";
import { SearchForm } from "./SearchForm";
import { motion, AnimatePresence } from "framer-motion";
import { SearchResult } from "./SearchResult";
import { PodcastImage } from "./PodcastImage";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { fetchPodcasts } from "@/app/lib/data/search";
import { removeClickedPodcast } from "@/lib/utils";

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        key='select-title'
        className="text-xl text-white text-center mb-4">
        Select your favorite podcasts ({selectedPodcasts?.length}/3)
      </motion.div>

      {/* List of selected podcasts */}
      <div
        key="selectedPodcasts"
        className="flex flex-row justify-center mb-2 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {selectedPodcasts.map((podcast) => (
            <motion.div
              layout
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: '5rem', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "smooth" }}
              key={podcast?.uuid}
              onClick={() => podcast && removeClickedPodcast(podcast.uuid, selectedPodcasts, setSelectedPodcasts)}
              className="cursor-pointer"
            >
              <PodcastImage src={podcast?.imageUrl} alt={podcast?.name} uuid={podcast?.uuid} animationDuration={1} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Search results */}
      <AnimatePresence>
        <ScrollArea className="z-10">
          <motion.div
            key="searchResults"
            layout
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
          >
            <div className="flex flex-col gap-2">
              {searchResults?.map((podcast: Podcast) => (
                <SearchResult
                  key={podcast?.uuid}
                  podcast={podcast}
                />
              ))}
            </div>
          </motion.div>
        </ScrollArea>
      </AnimatePresence>

      <SearchForm />
    </div>
  );
}

export default SearchResults;
