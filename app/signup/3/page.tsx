import { OTPForm } from "@/components/OTPForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

function Page() {
  return (
    <div className="text-white flex-col gap-3 font-semibold flex items-center w-full justify-center pt-10">
      <h1 className="text-xl">Yay! You have subbed!</h1>
      Verify your email to get started.
      <OTPForm />
      <h2>Next steps</h2>
      <h3>Manage subscription</h3>
      <Link href="/dashboard">
        <Button>Go to my dashboard</Button>
      </Link>
    </div>
  );
}

export default Page;
