import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import gradient from "@/public/Gradient.png";
import { Provider } from "jotai";
import localFont from "next/font/local";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const plantin = localFont({
  src: [
    {
      path: "./fonts/plantin-400-normal.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/plantin-400-italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/plantin-700-normal.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/plantin-700-italic.woff",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-plantin",
});

export const metadata: Metadata = {
  title: "PodBrief",
  description: "Five minute podcast briefing in your inbox",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plantin.variable} ${inter.variable}`}>
      <head>
        {/* <link rel="stylesheet" href="https://use.typekit.net/zub1qrg.css" /> */}
      </head>
      <body>
        <Image
          className="-z-10 pointer-events-none"
          src={gradient}
          alt="Gradient background"
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            filter: "brightness(0.95)",
          }}
        />
        <span className="text-white w-full font-serif font-bold text-center text-2xl block mt-2">
          <Link href="/">pdbr</Link>
        </span>
        {children}
      </body>
    </html>
  );
}
