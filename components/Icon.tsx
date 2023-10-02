import clsx from "clsx";

type Props = {
  type: "search" | "no-img" | "clear";
  className?: string;
  size?: "xsmall" | "small" | "medium";
};

const sizes = {
  xsmall: "h-4 w-4",
  small: "h-5 w-5",
  medium: "h-7 w-7",
};

export default function Icon({ type, className, size = "medium" }: Props) {
  if (type === "search") {
    return (
      <>
        <svg
          className={clsx(sizes[size], className)}
          fill="none"
          viewBox="0 0 24 24"
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

  if (type === "no-img") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={clsx(sizes[size], className)}
        viewBox="0 0 32 32"
        fill="currentColor"
      >
        <path d="M30 3.414 28.586 2 2 28.586 3.414 30l2-2H26a2.003 2.003 0 0 0 2-2V5.414ZM26 26H7.414l7.793-7.793 2.379 2.379a2 2 0 0 0 2.828 0L22 19l4 3.997Zm0-5.832-2.586-2.586a2 2 0 0 0-2.828 0L19 19.168l-2.377-2.377L26 7.414ZM6 22v-3l5-4.997 1.373 1.374 1.416-1.416-1.375-1.375a2 2 0 0 0-2.828 0L6 16.172V6h16V4H6a2.002 2.002 0 0 0-2 2v16Z" />
        <path
          d="M0 0h32v32H0z"
          data-name="&lt;Transparent Rectangle&gt;"
          style={{
            fill: "none",
          }}
        />
      </svg>
    );
  }

  if (type === "clear") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={clsx(sizes[size], className)}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    );
  }
  return null;
}
