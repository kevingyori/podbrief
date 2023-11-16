import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type PodcastImageProps = {
  src: string | undefined;
  alt: string | undefined;
  uuid: string | undefined;
  animationDuration: number;
  renderDelay?: number;
};
function PodcastImage({ src, alt, uuid, animationDuration, renderDelay = 275 }: PodcastImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  delay(renderDelay).then(() => setIsLoading(false));

  return <>
    <AnimatePresence mode="popLayout">
      <motion.img
        layout
        key={uuid}
        initial={{ opacity: 0 }}
        animate={!isLoading && { opacity: 1, }}
        transition={{ duration: animationDuration }}
        exit={{ opacity: 1 }}
        src={src}
        alt={alt}
        placeholder="/placeholder.png"
        className="w-20 h-20 rounded-md bg-[#a7baad]"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "/placeholder.png";
        }}
      />
    </AnimatePresence>
  </>
}

export { PodcastImage }
