import Image from "next/image";

export default function NavBar() {
  return (
    <div className="flex font-secondary space-x-3">
      <h1 className="text-4xl">Collections</h1>
      <Image
        src="/../public/images/profile-picture.jpg"
        width={50}
        height={50}
        alt="User profile picture"
        className="rounded-full"
      />
    </div>
  );
}
