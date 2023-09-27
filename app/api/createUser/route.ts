import { createUserAfterSignup } from "@/app/lib/dbFunctionsForKev/createUserAfterSignup";
import { NextResponse } from "next/server";
import { supabase } from "../supabase";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("body", body);
  try {
    console.log("start signup");

    // create a new user in database

    await createUserAfterSignup(body.userId, body.email);
    // await createUserAfterSignup(
    //   "a6f21689-00f8-4fc1-aa50-2d958dcd40ed",
    //   "gyorijonatan@gmail.com"
    // );
    console.log("successful signup");

    // send welcome email to the subscriber

    return NextResponse.json("user created", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", { status: 500 });
  }
}
