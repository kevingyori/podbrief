import { get } from "http";
import { atom } from "jotai";
import data from "@/data.json";

const podcastSeries = data.searchForTerm.podcastSeries;

type selectedPodcast =
  | {
      uuid: string;
      value: boolean;
    }
  | null
  | undefined;

export const searchQueryAtom = atom("");
export const searchResultsAtom = atom(podcastSeries);
export const selectedPodcastsAtom = atom<selectedPodcast[]>([]);
export const selectedPodcastsLengthAtom = atom(
  (get) => get(selectedPodcastsAtom).length
);
export const signUpEmailAtom = atom("");
