import { supabase } from "../supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("body", body);
  try {
    supabase.from("users").delete().match({ id: body.userId });
    console.log("user deleted");
    return NextResponse.json("user deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", { status: 500 });
  }
}
