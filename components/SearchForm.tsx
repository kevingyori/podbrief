"use client";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader, Search } from "lucide-react";
import { useAtom } from "jotai";
import { searchQueryAtom } from "@/app/lib/store";
import { ArrowRight } from "lucide-react";
import { selectedPodcastsAtom } from "@/app/lib/store";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchPodcasts } from "@/app/lib/data/search";
import { lazy } from "react";

export const searchFormSchema = z.object({
  searchQuery: z.string(),
});

export function ContinueButton() {
  const router = useRouter();
  const [selectedPodcasts] = useAtom(selectedPodcastsAtom);
  const handleSubmit = () => {
    router.push("/signup/2");
  };

  return (
    <Button
      className="w-full h-14 mt-2 text-md bg-white opacity-95"
      variant="secondary"
      disabled={selectedPodcasts.length > 0 ? false : true}
      onClick={handleSubmit}
    >
      Continue
      <ArrowRight className="ml-2" />
    </Button>
  );
}

export const PodcastSearch = () => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);

  const { isSuccess, refetch } = useQuery({
    queryKey: ['searchResults', searchQuery],
    queryFn: () => fetchPodcasts(searchQuery),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  function onSubmit(values: z.infer<typeof searchFormSchema>) {
    refetch();
    setSearchQuery(values.searchQuery);
    console.log("searchQuery", searchQuery);
  }

  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  return (
    <div >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="min-w-screen flex items-center space-x-2"
        >
          <FormField
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input
                    placeholder="Search podcast"
                    {...field}
                    className="h-14 text-md text-white focus-visible:ring-transparent border-white"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="text-md h-14 bg-gold hover:bg-goldDark text-black">
            {isSuccess ? <Search /> : <Loader className="animate-spin" />}
          </Button>
        </form>
      </Form>
      <ContinueButton />
    </div>
  );
};

export default PodcastSearch;
