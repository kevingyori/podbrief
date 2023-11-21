"use client";
import {
  Podcast,
  signUpEmailAtom,
} from "@/app/lib/store";
import { useAtom } from "jotai";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Edit, Loader, LogOut, MailX, PartyPopper } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import SubbedPodcastCard from "./SubbedPodcastCard";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "./ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Reveal from "./Reveal";

const handleSubscribe = async (email: string, setLoading: Dispatch<SetStateAction<boolean>>, router: AppRouterInstance) => {
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

const handleUnsubscribe = async (email: string) => {
  console.log("unsubscribe");

  // await fetch("/api/unsubscribeFromAll", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     email: email,
  //   }),
  // });
};

type CustomDialogProps = {
  trigger: any,
  title: string,
  description: string,
  cancelTitle: string,
  actionTitle: string,
  action: any
}


function CustomDialog({
  trigger, title, description, cancelTitle, actionTitle, action
}: CustomDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* <Button variant='outline'> Unsubscribe </Button> */}
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelTitle}</AlertDialogCancel>
          <AlertDialogAction
            onClick={action}
          >{actionTitle}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function SignupDashboard({ type, podcasts }: { type: "signup" | "dashboard", podcasts: Podcast[], setPodcasts: any }) {
  const router = useRouter();
  const [email] = useAtom(signUpEmailAtom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("podcasts", podcasts);
  }, [podcasts]);

  return (
    <Reveal>
      <AnimatePresence>
        <motion.div
          key="signupDashboard"
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
                  return <SubbedPodcastCard podcast={podcast} key={podcast?.uuid} />
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
          {type === 'dashboard' &&
            <div>
              <div className="flex flex-row gap-2">
                <CustomDialog
                  title='Are you sure you want to unsubscribe?'
                  description="Your subscription will end on the 5th of nov"
                  cancelTitle="Cancel"
                  actionTitle="Unsubscribe"
                  action={() => handleUnsubscribe(email)}
                  trigger={
                    <Button
                      className="w-full h-14 mt-2 text-md bg-white opacity-95 bg-[#ffffffd0]"
                      variant="secondary"
                    // disabled={podcasts.length > 0 ? false : true}
                    >
                      Unsubscribe
                      {loading ? (
                        <Loader className="animate-spin ml-2" />
                      ) : (
                        <MailX className="ml-2" />
                      )}
                    </Button>
                  } />
                <Button
                  className="w-full h-14 mt-2 text-md bg-[#ffffffd0]  opacity-95"
                  variant="secondary"
                  onClick={() => supabase.auth.signOut()}
                >
                  Sign out
                  <LogOut className="ml-2" />
                </Button>
              </div>

              <Link href="/signup/1">
                <Button
                  className="w-full h-14 mt-2 text-md opacity-95"
                  variant="secondary"
                // disabled={podcasts.length > 0 ? false : true}
                >
                  Edit
                  <Edit className="ml-2" />
                </Button>
              </Link>
            </div>
          }

          {type === 'signup' &&
            <div>
              <div className="flex flex-row gap-2">
                <Button
                  className="w-full h-14 mt-2 text-md bg-white opacity-95 bg-[#ffffffd0]"
                  variant="secondary"
                  disabled={podcasts.length > 0 ? false : true}
                  onClick={() => handleSubscribe(email, setLoading, router)}
                >
                  Subscribe
                  {loading ? (
                    <Loader className="animate-spin ml-2" />
                  ) : (
                    <PartyPopper className="ml-2" />
                  )}
                </Button>
              </div>

              <Link href="/signup/1">
                <Button
                  className="w-full h-14 mt-2 text-md opacity-95"
                  variant="secondary"
                // disabled={podcasts.length > 0 ? false : true}
                >
                  Edit
                  <Edit className="ml-2" />
                </Button>
              </Link>
            </div>
          }
        </motion.div>
      </AnimatePresence>
    </Reveal>
  );
}
