function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-3rem)] text-white">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg mb-8">
        Please feel free to contact us if you need anything.
      </p>
      <div className="flex flex-col items-center justify-center bg-gray-100 p-8 rounded-lg shadow-lg text-black">
        <p className="text-lg mb-4">Email: contact@example.com</p>
        <p className="text-lg">Address: 123 Main St, London UK</p>
      </div>
    </div>
  );
}

export default Page;
