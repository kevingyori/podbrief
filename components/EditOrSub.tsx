"use client";
import {
  Podcast,
  signUpEmailAtom,
} from "@/app/lib/store";
import { useAtom } from "jotai";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Edit, Loader, LogOut, MailX, PartyPopper } from "lucide-react";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

const handleSubscribe = async (email, setLoading, router) => {
  setLoading(true);
  // const podcastIds = selectedPodcasts.map((podcast) => podcast?.uuid);
  // console.log("podcastIds", podcastIds);
  fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      // podcasts: podcastIds,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        res.json().then((data) => {
          console.error(data);
        });
      }
      if (res.ok) {
        // setSelectedPodcasts([]);
        // setEmail("");
        // res.json().then((data) => {
        //   console.log(data);
        // });
        router.push("/signup/3");
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setLoading(false);
    });
};

const handleUnsubscribe = async (email) => {
  console.log("unsubscribe");
  await fetch("/api/unsubscribeFromAll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
};

export default function EditOrSub({ type, podcasts }: { type: "sub" | "unsub", podcasts: Podcast[], setPodcasts: any }) {
  const router = useRouter();
  const [email] = useAtom(signUpEmailAtom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("podcasts", podcasts);
  }, [podcasts]);

  return (
    <AnimatePresence>
      <motion.div
        key="editOrSub"
        className="flex flex-col h-[calc(100vh-3rem)] px-2 w-screen justify-between md:max-w-xl md:mx-auto"
        initial={{ opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Podcast list */}
        <div className="flex flex-col gap-3 mt-10">
          <h2 className="text-white text-xl font-semibold">Your podcasts</h2>

          <div className="flex gap-2 flex-col ">
            {podcasts.length ? (
              podcasts.map((podcast) => {
                return (
                  <div key={podcast?.uuid}>
                    {/* <div className="border-[3px] border-white peer-data-[state=checked]:border-yellow-600 peer-data-[state=checked]:bg-gray-100 inline-block rounded-lg bg-white min-w-full"> */}
                    <Card
                      // key={podcast.uuid}
                      className="overflow-hidden"
                    >
                      <CardHeader className="flex-row p-3 gap-2 items-center py-2 bg-opacity-0 ">
                        <div className="min-w-[80px] rounded-md">
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
                        <div className="shrink">
                          <div className="grid">
                            <CardTitle className="text-lg shrink overflow-hidden whitespace-nowrap ">
                              {podcast?.name}
                            </CardTitle>
                            <CardDescription className="h-[3.75rem] shrink overflow-hidden hyphens-auto text-ellipsis">
                              {podcast?.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                );
              })
            ) : (
              <div className="text-white text-lg">No podcasts yet</div>
            )}
          </div>
        </div>

        {/* The user's email */}
        <div className="flex flex-col gap-2">
          <h2 className="text-white text-xl font-semibold">Your email</h2>
          <div className="text-white text-lg">{email}</div>
        </div>


        {/* Edit and subscription section */}
        <div>
          <div className="flex flex-row gap-2">
            <Button
              className="w-full h-14 mt-2 text-md bg-white opacity-95 bg-[#ffffffd0]"
              variant="secondary"
              disabled={podcasts.length > 0 ? false : true}
              onClick={type === "sub" ? () => handleSubscribe(email, setLoading, router) : () => handleUnsubscribe(email)}
            >
              {type === "sub" ? "Subscribe" : "Unsubscribe"}
              {loading ? (
                <Loader className="animate-spin ml-2" />
              ) : type === "sub" ? (
                <PartyPopper className="ml-2" />
              ) : (
                <MailX className="ml-2" />
              )}
            </Button>
            {type === "unsub" && (
              <Button
                className="w-full h-14 mt-2 text-md bg-[#ffffffd0]  opacity-95"
                variant="secondary"
                onClick={() => supabase.auth.signOut()}
                disabled={podcasts.length > 0 ? false : true}
              >
                Sign out
                <LogOut className="ml-2" />
              </Button>
            )}
          </div>

          <Link href="/signup/1">
            <Button
              className="w-full h-14 mt-2 text-md opacity-95"
              variant="secondary"
              disabled={podcasts.length > 0 ? false : true}
            >
              Edit
              <Edit className="ml-2" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
