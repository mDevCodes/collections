import "@/styles/globals.css";
import type { Metadata } from "next";
import NavBar from "../components/NavBar";
import Providers from "../components/Providers";
import { Lobster, Inter } from "next/font/google";

const base = Inter({ subsets: ["latin"], variable: "--font-base" });
const heading = Lobster({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
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
    <html lang="en" className={`${base.variable} ${heading.variable}`}>
      <body className="font-base">
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
