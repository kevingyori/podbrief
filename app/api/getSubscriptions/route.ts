import { getPodcastChannelInfo } from "@/app/lib/podcastAPI/getPodcastChannelInfo";
import { supabase } from "../supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("body", body);
  const { userId } = body;
  try {
    // get subscriptions from database

    const { data: subscriptions, error: subscriptionFetchError } =
      await supabase
        .from("subscriptions")
        .select("channel_id")
        .eq("user_id", userId);

    if (subscriptionFetchError) {
      console.log("subscriptionFetchError", subscriptionFetchError);
      return NextResponse.json(subscriptionFetchError, { status: 500 });
    }

    // get podcast info from podcast api for each subscription

    const podcastInfo = await Promise.all(
      subscriptions.map(async (subscription: any) => {
        const podcastInfo = await getPodcastChannelInfo(
          subscription.channel_id
        );
        return podcastInfo;
      })
    );

    return NextResponse.json(podcastInfo, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", { status: 500 });
  }
}
