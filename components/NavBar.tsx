import Image from "next/image";
import Link from "next/link";
import { Lobster } from "next/font/google";

const lobster = Lobster({ weight: "400", subsets: ["latin"] });
import Icon from "./Icon";

export default function NavBar() {
  return (
    <header
      className={`flex justify-between items-center border-b-2 border-white p-4 ${lobster.className}`}
    >
      <Link href="/">
        <Icon />
      </Link>

      <Link href="/">
        <h1 className="text-4xl">Collections</h1>
      </Link>

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
