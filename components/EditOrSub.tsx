"use client";
import { selectedPodcastsAtom, signUpEmailAtom } from "@/app/lib/store";
import { Provider, useAtom } from "jotai";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Edit, Edit2, Edit3, Loader, PartyPopper } from "lucide-react";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

function EditOrSub() {
  const router = useRouter();
  const [email, setEmail] = useAtom(signUpEmailAtom);
  const [selectedPodcasts, setSelectedPodcasts] = useAtom(selectedPodcastsAtom);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = () => {
    setLoading(true);
    const podcastIds = selectedPodcasts.map((podcast) => podcast?.uuid);
    console.log("podcastIds", podcastIds);
    fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        podcasts: podcastIds,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setSelectedPodcasts([]);
          setEmail("");
          router.push("/signup/3");
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log("finally");
        setLoading(false);
      });
  };

  // console.log("email", email);
  // console.log("selectedPodcasts", selectedPodcasts);
  return (
    <div>
      <Provider>
        <div className=" p-2">
          <h2 className="text-white text-xl font-semibold mb-3 mt-2 ">
            Your podcasts
          </h2>
          <div className="flex gap-2 flex-col ">
            {selectedPodcasts.map((podcast) => {
              return (
                <div key={podcast?.uuid}>
                  {/* <div className="border-[3px] border-white peer-data-[state=checked]:border-yellow-600 peer-data-[state=checked]:bg-gray-100 inline-block rounded-lg bg-white min-w-full"> */}
                  <Card
                    // key={podcast.uuid}
                    className="overflow-hidden"
                  >
                    <CardHeader className="flex-row p-3 gap-2 items-center py-2 bg-opacity-0 ">
                      <div className="min-w-[80px] rounded-md">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={podcast?.imageUrl}
                          alt={podcast?.name}
                          className="w-20 h-20 rounded-md bg-[#A7BABA]"
                          loading="lazy"
                          onError={(e) => {
                            // console.error("error loading image", e);
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder.png";
                          }}
                          // onLoad={(e) => {
                          //   console.log("image loaded", e);
                          // }}
                        />
                      </div>
                      <div className="flex-col">
                        <CardTitle className="text-lg overflow-hidden whitespace-nowrap">
                          {podcast?.name}
                        </CardTitle>
                        <CardDescription className="h-[3.75rem] overflow-hidden pr-5 hyphens-auto text-ellipsis">
                          {podcast?.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    {/* <CardContent>wow</CardContent> */}
                  </Card>
                </div>
                // </div>
              );
            })}
          </div>
          <Link href="/signup/1">
            <Button
              className="w-full h-14 mt-2 text-md bg-white opacity-95"
              variant="secondary"
              disabled={selectedPodcasts.length > 0 ? false : true}
            >
              Edit
              <Edit className="ml-2" />
            </Button>
          </Link>
          <Button
            className="w-full h-14 mt-2 text-md bg-white opacity-95"
            variant="secondary"
            disabled={selectedPodcasts.length > 0 ? false : true}
            onClick={handleSubscribe}
          >
            Subscribe
            {loading ? (
              <Loader className="animate-spin ml-2" />
            ) : (
              <PartyPopper className="ml-2" />
            )}
          </Button>
        </div>
      </Provider>
    </div>
  );
}

export default EditOrSub;
