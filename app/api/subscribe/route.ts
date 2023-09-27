import { supabase } from "../supabase";
import { NextResponse } from "next/server";
import { subscribeToChannel } from "@/app/lib/dbFunctionsForKev/subscribeToChannel";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("body", body);
  const { podcasts } = body;
  try {
    // create podcast in database
    podcasts.forEach(async (podcast: any) => {
      await subscribeToChannel(body.userId, podcast);
    });
    // await subscribeToChannel(
    //   "a6f21689-00f8-4fc1-aa50-2d958dcd40ed",
    //   "49cc55e1-4258-43a0-adf3-a0a71aa62c49"
    // );
    console.log("successful subscribe");
    return NextResponse.json("yay", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", { status: 500 });
  }
}
