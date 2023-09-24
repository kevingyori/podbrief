"use client";
import { OTPForm } from "@/components/OTPForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

function Page() {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className="text-white flex-col gap-3 font-semibold flex items-center w-full justify-center pt-10 md:max-w-xl md:mx-auto">
      {isVerified ? (
        <>
          <h1 className="text-xl">Yay! You have subbed!</h1>
          <h2>Next steps</h2>
          <h3>Manage subscription</h3>
          <Link href="/dashboard">
            <Button>Go to my dashboard</Button>
          </Link>
        </>
      ) : (
        <>
          Verify your email to get started.
          <OTPForm isVerified={isVerified} setIsVerified={setIsVerified} />
        </>
      )}
    </div>
  );
}

export default Page;
