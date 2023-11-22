import { motion } from "framer-motion";
import { PodcastImage } from "./PodcastImage";
import { Podcast } from "@/app/lib/store";
import { removeClickedPodcast } from "@/lib/utils";

export default function SelectedPodcast({ podcast, selectedPodcasts, setSelectedPodcasts }:
  { podcast: Podcast, selectedPodcasts: Podcast[], setSelectedPodcasts: any }) {
  return (
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
  )
}
