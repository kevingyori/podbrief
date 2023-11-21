'use client';
import SearchResults from "@/components/SearchResults";
import { Provider } from "jotai";

const Page = () => {
  return (
    <Provider>
      <div
        className="flex flex-col px-2 overflow-hidden"
        style={{
          height: "calc(100dvh - 3rem)",
        }}
      >
        <SearchResults />
      </div>
    </Provider>
  );
};

export default Page;
