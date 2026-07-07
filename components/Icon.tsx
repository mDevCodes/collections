import clsx from "clsx";

type Props = {
  type:
    | "search"
    | "no-img"
    | "clear"
    | "heart"
    | "heart-filled"
    | "plus"
    | "check"
    | "grid"
    | "list"
    | "sun"
    | "moon"
    | "home"
    | "user"
    | "disc"
    | "trash";
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

  if (type === "grid") {
    return (
      <svg
        className={clsx(sizes[size], className)}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    );
  }

  if (type === "list") {
    return (
      <svg
        className={clsx(sizes[size], className)}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
      >
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    );
  }

  if (type === "sun") {
    return (
      <svg
        className={clsx(sizes[size], className)}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
        <line x1="4.9" y1="4.9" x2="6.8" y2="6.8" />
        <line x1="17.2" y1="17.2" x2="19.1" y2="19.1" />
        <line x1="4.9" y1="19.1" x2="6.8" y2="17.2" />
        <line x1="17.2" y1="6.8" x2="19.1" y2="4.9" />
      </svg>
    );
  }

  if (type === "moon") {
    return (
      <svg
        className={clsx(sizes[size], className)}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
      >
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    );
  }

  if (type === "home") {
    return (
      <svg
        className={clsx(sizes[size], className)}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.7}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10.5 12 3l9 7.5"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 9.5V20h13V9.5" />
      </svg>
    );
  }

  if (type === "user") {
    return (
      <svg
        className={clsx(sizes[size], className)}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.7}
        stroke="currentColor"
      >
        <circle cx="12" cy="8" r="4" />
        <path strokeLinecap="round" d="M4 20c0-3.3 3.6-5.5 8-5.5s8 2.2 8 5.5" />
      </svg>
    );
  }

  if (type === "disc") {
    return (
      <svg
        className={clsx(sizes[size], className)}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.6}
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    );
  }

  if (type === "trash") {
    return (
      <svg
        className={clsx(sizes[size], className)}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.6}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 6.75h15m-13 0 .866 12.142A2 2 0 0 0 9.36 20.75h5.28a2 2 0 0 0 1.994-1.858L17.5 6.75m-9 0V4.5a1.5 1.5 0 0 1 1.5-1.5h2a1.5 1.5 0 0 1 1.5 1.5v2.25m-4 4v6m4-6v6"
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
