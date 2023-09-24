"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import OtpInput from "react-otp-input";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useAtom } from "jotai";
import { signUpEmailAtom } from "@/app/lib/store";
import supabase from "@/lib/supabase";

const FormSchema = z.object({
  otpcode: z.string().min(6).max(6),
});

async function verifyOtp(email: string, token: string) {
  console.log("email", email, "token", token);
  try {
    const { data: otpData, error: otpError } = await supabase.auth.verifyOtp({
      email: email,
      token: token,
      type: "email",
    });
    console.log("otpData", otpData);
    return otpData;
  } catch (error) {
    console.log("otpError", error);
    throw error;
  }
}

export function OTPForm({
  isVerified,
  setIsVerified,
}: {
  isVerified: boolean;
  setIsVerified: any;
}) {
  const [email, setEmail] = useAtom(signUpEmailAtom);
  const [otp, setOtp] = useState("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data?: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });

    console.log("otpdata", otp);
    verifyOtp(email, otp)
      .then((data) => {
        console.log("data", data);
        setIsVerified(true);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  return (
    <Form {...form}>
      <div className="flex flex-row gap-2 text-black">
        {/* <Button onClick={() => onSubmit(otp)}>Log otp</Button> */}
        <form onSubmit={form.handleSubmit(onSubmit)} className=" ">
          <FormField
            control={form.control}
            name="otpcode"
            render={({ field }) => (
              // <FormItem>
              // {/* <FormControl> */}
              // {/* <Input
              //     placeholder="123456"
              //     className="text-black"
              //     type="number"
              //     maxLength={6}
              //     {...field}
              //   /> */}
              <FormItem>
                <FormControl>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    // {...field}
                    renderInput={(props) => (
                      // had to remove the padding to get the input to show
                      <Input {...props} className="px-0" />
                    )}
                    renderSeparator={() => <div className="w-2" />}
                  />
                </FormControl>
              </FormItem>
              //   {/* </FormControl> */}
              //   {/* <FormMessage /> */}
              // {/* </FormItem> */}
            )}
          />
        </form>
        <Button type="submit" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </Form>
  );
}
