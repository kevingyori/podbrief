import { Podcast } from "@/app/lib/store"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const runtime = 'edge' // 'nodejs' (default) | 'edge'

export function getBaseURL() {
  if (typeof window !== 'undefined') {
    return ''
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'http://localhost:3000'
}

export function updateSelectedPodcasts(
  value: boolean | string,
  podcast: any,
  selectedPodcasts: Podcast[],
  setSelectedPodcasts: any
) {
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

export function removeClickedPodcast(uuid: string, selectedPodcasts: Podcast[], setSelectedPodcasts: any) {
  console.log(
    "%cremoveClickedPodcast",
    "color: #00ff00",
    new Date().toLocaleTimeString()
  );

  setSelectedPodcasts(
    selectedPodcasts.filter((item) => item?.uuid !== uuid)
  );
};
