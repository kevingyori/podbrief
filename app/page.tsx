// "use client";
// 👆 ettol client oldalon fut a kod, nem a szerveren
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import SignupForm from "@/components/SignupForm";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

const getData = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/test", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default async function Home() {
  const testData = await getData();
  console.log(testData);

  // const supabase = createServerComponentClient({ cookies });
  // const { data: users } = await supabase.from("users").select();

  return (
    <main className="">
      <section className="flex flex-col min-h-[100dvh] p-4 text-white">
        {/* <ul className="my-auto text-foreground">
        {users?.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul> */}
        <h1 className="md:text-left md:max-w-xl font-serif font-bold text-[2.8rem] leading-[3rem] text-center mt-24 xsm:mt-14 xsm:text-4xl ">
          Five minute podcast briefing in your inbox
        </h1>
        <h2 className="text-center mt-5 px-4 md:px-0 text-[1.2rem] leading-snug xsm:text-lg md:text-left md:max-w-xl">
          Get curated podcast summaries within seconds. Search, add your
          favorites, and receive a weekly newsletter for informed listening.
        </h2>
        {/* <span className="mt-52 xsm:mt-24 text-center md:text-left">
          Get your briefing now!
        </span> */}
        <SignupForm />
      </section>
      <section className="mt-12 px-2 text-black">
        <h2 className="font-serif text-4xl mb-4">A few other things here</h2>
        <p className="mb-52">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          porro quod distinctio harum sequi omnis nostrum consectetur mollitia
          ipsum rem!
        </p>
      </section>
    </main>
  );
}
