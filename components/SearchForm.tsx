"use client";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useAtom } from "jotai";
import { searchQueryAtom, searchResultsAtom } from "@/app/lib/store";
import { ArrowRight } from "lucide-react";
import {
  selectedPodcastsAtom,
  selectedPodcastsLengthAtom,
} from "@/app/lib/store";
import { useRouter } from "next/navigation";

export const searchFormSchema = z.object({
  searchQuery: z.string(),
  // .min(4, {
  //   message: "Podcast name must be at least 4 characters long",
  // })
  // .max(50, {
  //   message: "Podcast name must be at most 50 characters long",
  // }),
});

const getData = async ({ searchQuery }: { searchQuery: string }) => {
  try {
    // ki kell irni a teljes url-t, mert ez a component a szerveren fut
    // ha a client oldalon futna, akkor a /api/test is eleg lenne
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

import React from "react";

export default function SearchButton() {
  const router = useRouter();
  const [selectedPodcasts] = useAtom(selectedPodcastsAtom);
  const handleSubmit = () => {
    console.log("submitted");
    router.push("/wow");
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

  function onSubmit(values: z.infer<typeof searchFormSchema>) {
    getData({ searchQuery: values.searchQuery })
      .then((data) => {
        console.log(data);
        setSearchResults(data.searchForTerm.podcastSeries);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
            <Search />
          </Button>
        </form>
      </Form>
      <SearchButton />
    </div>
  );
};
