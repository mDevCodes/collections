"use client";

import Icon from "./Icon";

type Props = {
  setAlbumSearch: (albumSearch: string) => void;
};

export default function SearchBar({ setAlbumSearch }: Props) {
  return (
    <div className="m-auto w-3/4 flex justify-center mt-10 relative">
      <Icon
        type="search"
        className="absolute top-5 left-16 text-black"
        size="small"
      />
      <input
        type="text"
        placeholder="Search for your favorite records"
        className="w-5/6 p-3 pl-14 rounded-full text-black"
        onChange={() => setAlbumSearch}
      />
      <button className="ml-8 p-4 border-2 rounded-full">Search</button>
    </div>
  );
}
