'use client';
import { selectedPodcastsAtom } from "@/app/lib/store";
import { SignupDashboard } from "@/components/SignupDashboard";
import { Provider, useAtom } from "jotai";

function Container() {
  const [selectedPodcasts, setSelectedPodcasts] = useAtom(selectedPodcastsAtom);
  return (
    <div className="md:mx-auto md:max-w-xl overflow-hidden w-[100dvh]">
      <SignupDashboard type="signup" podcasts={selectedPodcasts} setPodcasts={setSelectedPodcasts} />
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
