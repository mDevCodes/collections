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

export const metadata: Metadata = {
  title: "Collections App",
  description: "Collect your favorite records and albums",
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
