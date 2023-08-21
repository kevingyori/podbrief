// "use client";
// 👆 ettol client oldalon fut a kod, nem a szerveren
import Image from "next/image";
import Link from "next/link";
import {createClient} from '@supabase/supabase-js'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)


const getData = async () => {
  try {
    // ki kell irni a teljes url-t, mert ez a component a szerveren fut
    // ha a client oldalon futna, akkor a /api/test is eleg lenne
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
  console.log(testData)

  const supabase = createServerComponentClient({ cookies });
  const { data: users } = await supabase.from("users").select();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>wow such empty</div>
      <ul className="my-auto text-foreground">
        {users?.map((user:any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <div>hello</div>
    </main>
  );
}
