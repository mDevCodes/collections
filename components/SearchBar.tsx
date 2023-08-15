export default function SearchBar() {
  return (
    <div className="m-auto w-3/4 flex justify-center mt-10 relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 absolute bottom-5 left-5 text-black"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search for your favorite records"
        className="w-5/6 p-3 pl-14 rounded-full text-black"
      />
      <button className="ml-8 p-4 border-2 rounded-full">Search</button>
    </div>
  );
}
