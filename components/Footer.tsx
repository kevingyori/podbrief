function Footer() {
  const thisYear = new Date().getFullYear();
  return (
    <div>
      <footer className="flex flex-col items-center bg-neutral-100 text-center dark:bg-neutral-600 lg:text-left">
        <div className="container p-6">
          <div className="grid place-items-center md:grid-cols-2 lg:grid-cols-4">
            <a href="/contact" className="mb-5 md:mb-0">
              Contact us
            </a>
            <div className="w-full bg-neutral-200 p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200 rounded-md">
              © {thisYear} by{" "}
              <a className="text-neutral-800 dark:text-neutral-400" href="/">
                PodBrief
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
