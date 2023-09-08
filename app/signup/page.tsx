import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SearchForm } from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";

const Page = () => {
  return (
    <div className="px-2">
      <SearchResults />
      <SearchForm />
      <Button
        className="w-full h-14 mt-2 text-md bg-white opacity-95"
        variant="secondary"
      >
        Continue
        <ArrowRight className="ml-2" />
      </Button>
    </div>
  );
};

export default Page;
