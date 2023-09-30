import Image from "next/image";
import Link from "next/link";
import { Lobster } from "next/font/google";

const lobster = Lobster({ weight: "400", subsets: ["latin"] });
import Icon from "./Icon";

export default function NavBar() {
  return (
    <header
      className={`flex justify-between items-center border-b border-gray-800 p-4 ${lobster.className}`}
    >
      <Link href="/">
        <h1 className="text-2xl">Collections</h1>
      </Link>

      <Link href="/user-profile">
        <Image
          src="/images/profile-picture.jpg"
          width={32}
          height={32}
          alt="User profile picture"
          className="rounded-full"
        />
      </Link>
    </header>
  );
}
