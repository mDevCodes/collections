import Icon from "./Icon";

export default function SearchBar() {
  return (
    <div className="m-auto w-3/4 flex justify-center mt-10 relative">
      <Icon
        type="search"
        positionProps={{
          position: "absolute",
          bottom: "bottom-5",
          left: "left-5",
        }}
      />
      <input
        type="text"
        placeholder="Search for your favorite records"
        className="w-5/6 p-3 pl-14 rounded-full text-black"
      />
      <button className="ml-8 p-4 border-2 rounded-full">Search</button>
    </div>
  );
}
