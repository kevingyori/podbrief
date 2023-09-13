"use client";
import { Button } from "./ui/button";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { signUpEmailAtom } from "@/app/lib/store";

const formSchema = z.object({
  email: z.string().email(),
});

function SignupForm() {
  const [email, setEmail] = useAtom(signUpEmailAtom);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setEmail(values.email);
    router.push("/signup");
  }

  useEffect(() => {
    router.prefetch("/signup");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 md:max-w-sm mt-52 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="name@probablygmail.com"
                    className="h-14 -mb-5 text-md text-black"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className=" text-lg py-7 bg-white w-full"
            variant="secondary"
            type="submit"
          >
            Get your briefing now
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SignupForm;
