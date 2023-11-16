'use client';
import { selectedPodcastsAtom } from "@/app/lib/store";
import EditOrSub from "@/components/EditOrSub";
import { Provider, useAtom } from "jotai";

function Container() {
  const [selectedPodcasts, setSelectedPodcasts] = useAtom(selectedPodcastsAtom);
  return (
    <div className="md:mx-auto md:max-w-xl">
      <EditOrSub type="sub" podcasts={selectedPodcasts} setPodcasts={setSelectedPodcasts} />
    </div>
  )
}

function Page() {
  return (
    <Provider>
      <Container />
    </Provider>
  );
}

export default Page;
