"use client";
import { selectedPodcastsAtom, signUpEmailAtom } from "@/app/lib/store";
import { OTPForm } from "@/components/OTPForm";
import { Button } from "@/components/ui/button";
import supabase from "@/lib/supabase";
import { Provider, useAtom } from "jotai";
import Link from "next/link";
import { useState } from "react";

const createUser = async (email: string, userId: string) => {
  try {
    const user = await fetch("/api/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        userId: userId,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

const createSubscription = async (userId: string, podcastIds: string[]) => {
  try {
    const user = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        podcasts: podcastIds,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

function Page() {
  const [email, setEmail] = useAtom(signUpEmailAtom);
  const [isVerified, setIsVerified] = useState(false);
  const [selectedPodcasts, setSelectedPodcasts] = useAtom(selectedPodcastsAtom);

  const onVerified = (userData: any) => {
    try {
      const podcastIds = selectedPodcasts.map((podcast) => podcast?.uuid);
      createUser(email, userData.user.id);
      createSubscription(userData.user.id, podcastIds as string[]);
      setIsVerified(true);
    } catch (error) {
      console.error(error);
    } finally {
      setSelectedPodcasts([]);
      setEmail("");
    }
  };

  return (
    <Provider>
      <div className="text-white flex-col gap-3 font-semibold flex items-center w-full justify-center pt-10 md:max-w-xl md:mx-auto">
        {isVerified ? (
          <>
            <h1 className="text-xl">Yay! You have subbed!</h1>
            <h2>Next steps</h2>
            <h3>Manage subscription</h3>
            <Link href="/dashboard">
              <Button
              // onClick={() => {
              //   supabase.auth.getUser().then((result: any) => {
              //     console.log("result", result);
              //   });
              // }}
              >
                Go to my dashboard
              </Button>
            </Link>
          </>
        ) : (
          <>
            Verify your email to get started.
            <OTPForm onVerified={onVerified} />
          </>
        )}
      </div>
    </Provider>
  );
}

export default Page;
