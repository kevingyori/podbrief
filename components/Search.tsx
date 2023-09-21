"use client";
import { Provider } from "jotai";
import SearchResults from "./SearchResults";
import { SearchForm } from "./SearchForm";

function Search() {
  return (
    <Provider>
      <div
        className="flex flex-col"
        style={{
          height: "calc(100dvh - 3rem)",
        }}
      >
        <SearchResults />
        {/* <SearchForm /> */}
      </div>
    </Provider>
  );
}

export default Search;
