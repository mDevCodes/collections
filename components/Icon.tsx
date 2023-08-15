import clsx from "clsx";
type Props = {
  type: "home" | "search";
  positionProps?: {
    position?: "static" | "fixed" | "absolute" | "relative" | "sticky";
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
};

export default function Icon({ type, positionProps }: Props) {
  if (type === "home") {
    return (
      <>
        <svg
          className={`w-7 h-7 ${clsx(positionProps)}`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </>
    );
  } else if (type === "search") {
    return (
      <>
        <svg
          className={`w-5 h-5 ${clsx(positionProps)}`}
          fill="none"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </>
    );
  }
}
