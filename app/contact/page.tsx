import Footer from "@/components/Footer";

function Page() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-2.5rem)] text-white">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg mb-8 px-5">
          Please feel free to contact us if you need anything.
        </p>
        <div className="flex flex-col items-center justify-center bg-gray-100 p-8 rounded-lg shadow-lg text-black">
          <p className="text-lg mb-4">Email: contact@example.com</p>
          <p className="text-lg">Address: 123 Main St, London UK</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Page;
