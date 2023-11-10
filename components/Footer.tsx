import Link from "next/link"

export default function Component() {
  return (
    <footer className="w-full py-8 px-4 md:px-6">
      <div className="container flex flex-col md:flex-row justify-between items-center text-[#eceffd]">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <Link className="text-sm font-medium underline hover:text-white text-center" href="#">
            Terms & Conditions
          </Link>
          <Link className="text-sm font-medium underline hover:text-white text-center" href="#">
            Privacy Policy
          </Link>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
          <Link className="text-sm font-medium underline hover:text-white text-center" href="#">
            About Us
          </Link>
          <Link className="text-sm font-medium underline hover:text-white text-center" href="#">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  )
}
