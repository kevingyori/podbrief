"use client";
import { Provider } from "jotai";
import React from "react";
import SearchResults from "./SearchResults";
import { SearchForm } from "./SearchForm";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

function SearchPage() {
  return (
    <div className="h-[calc(100dvh-55px)] mt-4 overflow-hidden">
      <Provider>
        <SearchResults />
        <SearchForm />
        <Button
          className="w-full h-14 mt-2 text-md bg-white opacity-95"
          variant="secondary"
        >
          Continue
          <ArrowRight className="ml-2" />
        </Button>
      </Provider>
    </div>
  );
}

export default SearchPage;
