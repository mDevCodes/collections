import "@/styles/globals.css";
import type { Metadata } from "next";
import NavBar from "../components/NavBar";
import Providers from "../components/Providers";
import { Lobster, Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lobster = Lobster({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lobster",
});

export const metadata: Metadata = {
  title: "Collections App",
  description: "Collect your favorite records and albums",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lobster.variable} ${inter.variable}`}>
      <body className="font-inter">
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
