import clsx from "clsx";

type Props = {
  type: "home" | "search";
  className?: string;
  size?: "small" | "medium";
};

export default function Icon({ type, className, size }: Props) {
  const sizes = {
    small: "h-5 w-5",
    medium: "h-7 w-7",
  };

  const sizeClass =
    size === "small"
      ? sizes.small
      : size === "medium"
      ? sizes.medium
      : undefined;

  if (type === "home") {
    return (
      <>
        <svg
          className={clsx(sizeClass, className)}
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
  }

  if (type === "search") {
    return (
      <>
        <svg
          className={clsx(size, className)}
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

  return null;
}
