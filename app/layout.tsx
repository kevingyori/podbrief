import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "PodBrief",
  description: "Never miss the wisdom of your favorite podcasts, summarized for your convenience.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <head>
      </head>
      <body className="bg-background text-white">
        <Providers>
          < Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
