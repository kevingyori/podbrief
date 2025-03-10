import { supabase } from "../supabase";
import { NextResponse } from "next/server";
import { unSubscribeFromChannel } from "@/app/lib/dbFunctionsForKev/subscribeToChannel";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("body", body);
  try {
    // create podcast in database
    podcasts.forEach(async (podcast: any) => {
      await unSubscribeFromChannel(body.userId, body.podcasts);
    });
    supabase.from("users").delete().match({ id: body.userId });
    console.log("successful unsubscribe");

    return NextResponse.json("successfully unsubscribed", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", { status: 500 });
  }
}
