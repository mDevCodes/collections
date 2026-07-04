"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import useUser from "@/lib/supabase/useUser";
import { useTheme } from "@/lib/theme/ThemeProvider";
import Icon from "./Icon";

const navLinks = [
  { href: "/", label: "Home", icon: "home" as const },
  { href: "/search", label: "Search", icon: "search" as const },
  { href: "/collection", label: "Collection", icon: "grid" as const },
  { href: "/wishlist", label: "Wishlist", icon: "heart" as const },
  { href: "/user-profile", label: "Profile", icon: "user" as const },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function Wordmark() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-display font-extrabold text-[20px] tracking-[-0.02em] dt:gap-[9px] dt:text-[20px]"
    >
      <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_var(--accent-glow)] dt:h-[9px] dt:w-[9px]" />
      Collections
    </Link>
  );
}

function ThemeToggle({ iconOnly = false }: { iconOnly?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  if (iconOnly) {
    return (
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-pill-border text-text"
      >
        <Icon type={isDark ? "sun" : "moon"} size="small" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-[7px] rounded-full border border-pill-border px-[13px] py-[7px] font-display text-[13px] font-medium text-text"
    >
      <Icon type={isDark ? "sun" : "moon"} size="xsmall" />
      {isDark ? "Light" : "Dark"}
    </button>
  );
}

function Avatar({ size }: { size: number }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-accent to-[#d98a4a]"
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/profile-picture.jpg"
        alt="Your profile picture"
        fill
        className="object-cover"
      />
    </div>
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="sticky top-0 z-20 border-b border-nav-border bg-bg">
        <div className="mx-auto max-w-[1160px] px-8 py-5 dt:px-8">
          <Wordmark />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop nav */}
      <div className="sticky top-0 z-20 hidden border-b border-nav-border bg-bg dt:block">
        <div className="mx-auto flex max-w-[1160px] items-center justify-between px-8 py-5">
          <Wordmark />
          <div className="flex items-center gap-7">
            {user ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      "font-display text-[15px]",
                      isActive(pathname, link.href)
                        ? "font-semibold text-text"
                        : "font-medium text-muted"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <ThemeToggle />
                <Link href="/user-profile">
                  <Avatar size={34} />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/search"
                  className={clsx(
                    "font-display text-[15px]",
                    isActive(pathname, "/search")
                      ? "font-semibold text-text"
                      : "font-medium text-muted"
                  )}
                >
                  Search
                </Link>
                <ThemeToggle />
                <Link href="/login" className="font-display text-[15px] font-medium text-muted">
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="rounded-full border border-pill-border px-4 py-[7px] font-display text-[14px] font-semibold text-text"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-20 border-b border-nav-border bg-bg dt:hidden">
        <div className="flex items-center justify-between px-[18px] py-4">
          <Wordmark />
          <div className="flex items-center gap-3">
            <ThemeToggle iconOnly />
            {user ? (
              <Link href="/user-profile">
                <Avatar size={34} />
              </Link>
            ) : (
              <Link href="/login" className="font-display text-[14px] font-medium text-muted">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile bottom tab bar */}
      {user ? (
        <div
          className="fixed inset-x-0 bottom-0 z-30 flex border-t border-nav-border bg-bg px-1.5 pt-2 dt:hidden"
          style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
        >
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex flex-1 flex-col items-center gap-1 py-1.5 font-display text-[11px]",
                  active ? "font-semibold text-accent" : "font-medium text-muted"
                )}
              >
                <Icon type={link.icon} size="small" />
                {link.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </>
  );
}
