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
      email: email,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setEmail(values.email);
    router.push("/signup/1");
  }

  useEffect(() => {
    router.prefetch("/signup/1");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 md:max-w-sm mt-32"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="name@probablygmail.com"
                    className="h-14 -mb-5 text-md text-black bg-[#ffffff8d] focus-visible:ring-gray-400 border-white"
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
      <Link
        className="md:max-w-sm w-full text-center mt-2 text-lg"
        href="/dashboard"
      >
        Sign in
      </Link>
    </div>
  );
}

export default SignupForm;
