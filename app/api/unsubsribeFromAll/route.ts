import { supabase } from "../supabase";
import { NextResponse } from "next/server";
import { unSubscribeFromChannel } from "@/app/lib/dbFunctionsForKev/subscribeToChannel";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("body", body);
  try {
    // get subscriptions
    const { data: subscriptions, error: subscriptionFetchError } =
      await supabase
        .from("subscriptions")
        .select("channel_id")
        .eq("user_id", body.userId);

    if (subscriptionFetchError) {
      console.log("subscriptionFetchError", subscriptionFetchError);
      return NextResponse.json(subscriptionFetchError, { status: 500 });
    }

    // unsubscribe from each channel
    subscriptions.forEach(async (podcast: any) => {
      await unSubscribeFromChannel(body.userId, podcast);
    });
    // await unSubscribeFromChannel(
    //   "a6f21689-00f8-4fc1-aa50-2d958dcd40ed",
    //   "49cc55e1-4258-43a0-adf3-a0a71aa62c49"
    // );
    console.log("successful unsubscribe");
    return NextResponse.json("yay", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", { status: 500 });
  }
}
