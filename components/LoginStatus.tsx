import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

export default function LoginStatus() {
  const { status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (status === "authenticated") {
    return (
      <div className="flex flex-row gap-3 items-center">
        <Link href="/user-profile">
          <Image
            src="/images/profile-picture.jpg"
            width={32}
            height={32}
            alt="User profile picture"
            className="rounded-full"
          />
        </Link>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return <button onClick={() => signIn()}>Sign In</button>;
}
