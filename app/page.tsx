import Image from "next/image";
import Link from "next/link";

  const getData = async () => {
    try {
      const response = await fetch('/api/test');
      const jsonData = await response.json();
      return jsonData
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

export default async function Home() {

  const data = await getData()
  console.log(data)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>wow such empty</div>
    </main>
  );
}