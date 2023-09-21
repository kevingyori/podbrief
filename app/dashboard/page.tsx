"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

async function signInWithEmail(email: string) {
  //   const email;
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: false,
      },
    });
    console.log("signInWithEmail", data);
    return data;
  } catch (error) {
    console.log("signInWithEmail", error);
    return error;
  }
}

async function verifyOtp(email: string, token: string) {
  console.log("email", email, "token", token);
  // verify otp
  const { data: otpData, error: otpError } = await supabase.auth.verifyOtp({
    email: email,
    token: token,
    type: "email",
  });
  console.log("otpData", otpData);
  console.log("otpError", otpError);
}

function Page() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [emailData, setEmailData] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleEmail = async (email: string) => {
    const data = await signInWithEmail(email);
    setEmailData(data);
  };

  if (!session) {
    return (
      <div>
        {emailData ? (
          <div>
            <Input
              placeholder="123456"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <Button onClick={() => verifyOtp(email, token)}>Otp</Button>
          </div>
        ) : (
          <div>
            <Input
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={() => handleEmail(email)}>
              Sign in with email
            </Button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        Logged in!
        <div>
          <Button onClick={() => supabase.auth.signOut()}>Sign out</Button>
        </div>
      </div>
    );
  }
}

export default Page;
