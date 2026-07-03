import clsx from "clsx";

type Props = {
  type: "search" | "no-img" | "clear" | "heart" | "heart-filled" | "plus" | "check";
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

  if (type === "heart") {
    return (
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
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    );
  }

  if (type === "heart-filled") {
    return (
      <svg
        className={clsx(sizes[size], className)}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 21s-9-4.78-9-12c0-2.485 2.1-4.5 4.688-4.5 1.936 0 3.598 1.126 4.312 2.733.715-1.607 2.377-2.733 4.313-2.733C19.9 4.5 21 6.515 21 9c0 7.22-9 12-9 12z" />
      </svg>
    );
  }

  if (type === "plus") {
    return (
      <svg
        className={clsx(sizes[size], className)}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    );
  }

  if (type === "check") {
    return (
      <svg
        className={clsx(sizes[size], className)}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
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
