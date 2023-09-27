import { createUserAfterSignup } from "@/app/lib/dbFunctionsForKev/createUserAfterSignup";
import { NextResponse } from "next/server";
import { supabase } from "../supabase";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("body", body);
  try {
    console.log("start signup");
    // check if user exists in supabase
    const { data: fetchedUser, error: userFetchError } = await supabase
      .from("users")
      .select("email")
      .eq("email", body.email);

    console.log("fetchedUser", fetchedUser);
    if (fetchedUser?.length) {
      console.log("user already exists");
      return NextResponse.json("user already exists", { status: 500 });
    }

    // user does not exist

    // sign up new user

    const { data, error } = await supabase.auth.signInWithOtp({
      email: body.email,
    });
    console.log("data", data);

    console.log("successful signup");

    // send welcome email to the subscriber

    return NextResponse.json("sent email to new user", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", { status: 500 });
  }
}
