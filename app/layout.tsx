import "@/styles/globals.css";
import type { Metadata } from "next";
import NavBar from "../components/NavBar";
import SiteFooter from "../components/SiteFooter";
import Providers from "../components/Providers";
import { Schibsted_Grotesk, Space_Grotesk } from "next/font/google";

const display = Schibsted_Grotesk({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
});
const body = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = "Record Collections App";
const description = "Collect your favorite records and albums";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Record Collections",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 2400,
        height: 1260,
        alt: "Record Collections — every record you own, want, and love in one place",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og-image.png"],
  },
};

const noFlashScript = `
try {
  var theme = localStorage.getItem('theme');
  if (theme === 'dark') document.documentElement.classList.add('dark');
} catch (e) {}
`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="font-body bg-bg text-text" suppressHydrationWarning>
        <Providers>
          <NavBar />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
