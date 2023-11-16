"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import EditOrSub from "@/components/EditOrSub";
import { OTPForm } from "@/components/OTPForm";
import { subscribedPodcastsAtom } from "../lib/store";

async function signInWithEmail(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: false,
    },
  });
  console.log("signInWithEmail", data);
  console.log("signInWithEmail error", error);
  return [data, error];
}

// async function verifyOtp(email: string, token: string) {
//   console.log("email", email, "token", token);
//   try {
//     const { data: otpData, error: otpError } = await supabase.auth.verifyOtp({
//       email: email,
//       token: token,
//       type: "email",
//     });
//     console.log("otpData", otpData);
//   } catch (error) {
//     console.log("otpError", error);
//   }
// }


const fetchSubscription = async (userId: string) => {
  try {
    const response = await fetch("/api/getSubscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

function Page() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [loginEmail, setLoginEmail] = useState(null);
  const [emailLoading, setEmailLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [subscribedPodcasts, setSubscribedPodcasts] = useState(
    subscribedPodcastsAtom
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchSubscription(session.user.id).then((data) => {
          setSubscribedPodcasts(data);
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // useEffect(() => {
  //   console.log("subscribedPodcasts", subscribedPodcasts);
  // }, [subscribedPodcasts]);

  const handleEmail = async (email: string) => {
    setEmailLoading(true);
    const [data, error] = await signInWithEmail(email);
    if (error) {
      console.error(error);
    } else {
      console.log("email data", data);
      setLoginEmail(data);
    }
    setEmailLoading(false);
  };

  // const handleOtp = async (email: string, token: string) => {
  //   setOtpLoading(true);
  //   await verifyOtp(email, token);
  //   setOtpLoading(false);
  // };

  if (!session) {
    return (
      <div className="mt-[50%] md:mt-[30%] flex justify-center items-center">
        {!loginEmail ? (
          <div>
            <Input
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-64 h-14 mb-2 text-md text-black bg-[#ffffff8d] focus-visible:ring-gray-400 border-white"
            />
            <Button
              className="w-full h-14 mt-2 text-md bg-white opacity-95"
              variant="secondary"
              onClick={() => handleEmail(email)}
            >
              Sign in with email
              {emailLoading ? (
                <Loader className="animate-spin ml-2" />
              ) : (
                <Mail className="ml-2" />
              )}
            </Button>
          </div>
        ) : (
          <OTPForm />
        )}
      </div>
    );
  } else {
    return (
      <div className="md:mx-auto md:max-w-xl">
        <EditOrSub type="unsub" podcasts={subscribedPodcasts} setPodcasts={setSubscribedPodcasts} />
      </div>
    );
  }
}

export default Page;
