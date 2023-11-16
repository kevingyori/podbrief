"use client";
import { Button } from "./ui/button";
import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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

    console.log("values", values);
    router.push("/signup/1");
  }

  useEffect(() => {
    router.prefetch("/signup/1");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col md:h-32 mx-2 md:mx-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 md:max-w-sm"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="name@probablygmail.com"
                    className="h-14 -mb-5 text-md "
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="text-lg text-black font-medium py-7 w-full bg-gold hover:bg-goldDark"
            variant="secondary"
            type="submit"
          >
            Subscribe for Free
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SignupForm;
