"use client";
import { Provider } from "jotai";
import SearchResults from "./SearchResults";
import { SearchForm } from "./SearchForm";

function SearchPage() {
  return (
    <div className="h-[calc(100dvh-55px)] mt-4 overflow-hidden">
      <Provider>
        <SearchResults />
        <SearchForm />
      </Provider>
    </div>
  );
}

export default SearchPage;
