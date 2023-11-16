import SignupForm from "@/components/SignupForm";
import Image from "next/image";
import hero from "@/public/iphone-with-podcasts.png";

function HeaderCta() {
  return (
    <header className="md:flex-row md:flex md:justify-between md:mt-12 md:mx-4">
      <div className="flex flex-col">
        <h1 className="md:text-left md:max-w-2xl font-medium text-3xl leading-[2rem] text-center mt-12 xsm:mt-14 xsm:text-4xl ">
          Meet Your Personal Podcaster
        </h1>
        <h2 className="text-center mt-5 px-4 md:px-0 text-md leading-snug xsm:text-lg md:text-left md:max-w-xl mb-10">
          Never miss the wisdom of your favorite podcasts, summarized for your convenience.
        </h2>
        <SignupForm />
      </div>
      <div className="flex justify-center w-full mt-10 md:mt-0 mx-2 md:mx-0">
        <div>
          <Image src={hero} alt="Hero image" width={400} priority />
        </div>
      </div>
    </header>
  )
}

export default HeaderCta
