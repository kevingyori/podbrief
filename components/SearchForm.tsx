"use client";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader, Search } from "lucide-react";
import { useAtom } from "jotai";
import { searchQueryAtom, searchResultsAtom } from "@/app/lib/store";
import { ArrowRight } from "lucide-react";
import { selectedPodcastsAtom } from "@/app/lib/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const searchFormSchema = z.object({
  searchQuery: z.string(),
});

const getData = async ({ searchQuery }: { searchQuery: string }) => {
  try {
    const response = await fetch("http://localhost:3000/api/searchPodcast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchQuery: searchQuery }),
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default function ContinueButton() {
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

export const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [searchResults, setSearchResults] = useAtom(searchResultsAtom);
  const [loading, setLoading] = useState(false);

  function onSubmit(values: z.infer<typeof searchFormSchema>) {
    setLoading(true);
    console.log("set loading to true");
    getData({ searchQuery: values.searchQuery })
      .then((data) => {
        console.log(data);
        setSearchResults(data.searchForTerm.podcastSeries);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }

  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  return (
    <div>
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
                    className="h-14 text-md bg-[#ffffff8d] focus-visible:ring-transparent border-white"
                  />
                </FormControl>
                <FormMessage className="text-white" />
              </FormItem>
            )}
          />
          <Button type="submit" className="text-md h-14">
            {loading ? <Loader className="animate-spin" /> : <Search />}
          </Button>
        </form>
      </Form>
      <ContinueButton />
    </div>
  );
};
