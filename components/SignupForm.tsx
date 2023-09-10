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

const formSchema = z.object({
  email: z.string().email(),
});

const SignupForm = () => {
  const router = useRouter();
  router.prefetch("/signup");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                  <Input placeholder="name@probablygmail.com" {...field} />
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
};

export default SignupForm;
