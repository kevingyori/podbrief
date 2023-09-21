import { createUserAfterSignup } from "@/app/lib/dbFunctionsForKev/createUserAfterSignup";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = "https://qcqfhwyxvoqaqxgawien.supabase.co";
const supabaseApiKey = process.env.SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseApiKey, {
  auth: {
    persistSession: false,
  },
});

export async function POST(request: Request) {
  const body = await request.json();
  console.log("body", body);
  try {
    // create a new user in database

    const { data, error } = await supabase.auth.signInWithOtp({
      email: body.email,
    });
    console.log("data", data);

    // create a new subscriber in database

    createUserAfterSignup(data?.user?.id, body.email);

    // send a welcome email to the subscriber

    // create podcast in database
    return NextResponse.json("yay", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", { status: 500 });
  }
}
