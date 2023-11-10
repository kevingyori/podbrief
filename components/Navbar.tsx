import Link from "next/link"

function Navbar() {
  return (
    <nav className="w-full text-2xl block mt-2">
      <div className="md:max-w-7xl mx-auto flex justify-between">
        {/* left side */}
        <Link
          className="md:max-w-sm text-center mt-2 ml-4 text-lg"
          href="/"
        >
          Podbrief
        </Link>
        {/* right side */}
        <div className="mr-4">
          <Link
            className="md:max-w-sm text-right mt-2 text-sm"
            href="/dashboard"
          >
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
