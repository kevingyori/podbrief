'use client';
import Search from "@/components/Search";
import { Provider } from "jotai";

const Page = () => {
  return (
    <Provider>
      <div className="px-2">
        <Search />
      </div>
    </Provider>
  );
};

export default Page;
