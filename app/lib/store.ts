import { atom } from "jotai";
import data from "@/data.json";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage(() => sessionStorage);

const podcastSeries = data.searchForTerm.podcastSeries as Podcast[];

export type Podcast =
  | {
    uuid: string;
    value: boolean;
    name: string;
    description: string;
    imageUrl: string;
  }
  | null
  | undefined;

export const searchQueryAtom = atom("Huberman Lab");
export const searchResultsAtom = atom(podcastSeries);
export const selectedPodcastsAtom = atomWithStorage<Podcast[]>(
  "selectedPodcasts",
  [],
  storage
);

export const signUpEmailAtom = atomWithStorage<string>(
  "signupEmail",
  "",
  storage
);
export const userIdAtom = atomWithStorage<string>("userId", "", storage);

export const subscribedPodcastsAtom = atomWithStorage<Podcast[]>(
  "selectedPodcasts",
  [],
  storage
);
