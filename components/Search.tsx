"use client";
import SearchResults from "./SearchResults";
// import { SearchForm } from "./SearchForm";

function Search() {
  return (
    <div
      className="flex flex-col"
      style={{
        height: "calc(100dvh - 3rem)",
      }}
    >
      <SearchResults />
      {/* <SearchForm /> */}
    </div>
  );
}

export default Search;
