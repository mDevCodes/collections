import Image from "next/image";
import Link from "next/link";
import { Lobster } from "next/font/google";

const lobster = Lobster({ weight: "400", subsets: ["latin"] });

export default function NavBar() {
  // return <p>test</p>;

  return (
    <header
      className={`flex justify-between items-center border-b-2 border-white p-4 ${lobster.className}`}
    >
      <Link href="/">
        <svg
          className="h-7 w-7"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </Link>

      <h1 className="text-4xl">Collections</h1>

      <Link href="/user-profile">
        <Image
          src="/images/profile-picture.jpg"
          width={50}
          height={50}
          alt="User profile picture"
          className="rounded-full"
        />
      </Link>
    </header>
  );
}
