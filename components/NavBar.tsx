"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import useUser from "@/lib/supabase/useUser";
import useProfile from "@/lib/supabase/useProfile";
import { useTheme } from "@/lib/theme/ThemeProvider";
import Icon from "./Icon";
import Avatar from "./Avatar";

const navLinks = [
  { href: "/", label: "Home", icon: "home" as const },
  { href: "/search", label: "Search", icon: "search" as const },
  { href: "/library", label: "Library", icon: "grid" as const },
  { href: "/user-profile", label: "Profile", icon: "user" as const },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function Wordmark({ small = false }: { small?: boolean }) {
  return (
    <Link
      href="/"
      className={clsx(
        "flex items-center font-display font-extrabold tracking-[-0.02em]",
        small ? "gap-2 text-[19px]" : "gap-[9px] text-[20px]"
      )}
    >
      <span
        className={clsx(
          "rounded-full bg-accent shadow-[0_0_12px_var(--accent-glow)]",
          small ? "h-2 w-2" : "h-[9px] w-[9px]"
        )}
      />
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

function NavAvatar({ size, avatarVariant }: { size: number; avatarVariant?: number | null }) {
  if (avatarVariant !== null && avatarVariant !== undefined) {
    return <Avatar variant={avatarVariant} size={size} animate={false} />;
  }

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-accent to-[#d98a4a]"
      style={{ width: size, height: size }}
    />
  );
}

/** Sticky translucent nav used by the signed-out marketing shell (landing + register/login). */
function MarketingNav({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky top-0 z-40 border-b border-nav-border bg-bg-translucent backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-[1160px] items-center justify-between px-[18px] py-4 dt:px-8">
        <Wordmark />
        {children}
      </div>
    </div>
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const { user, isLoading } = useUser();
  const { profile } = useProfile();

  if (isLoading) {
    return (
      <div className="sticky top-0 z-20 border-b border-nav-border bg-bg">
        <div className="mx-auto max-w-[1160px] px-8 py-5 dt:px-8">
          <Wordmark />
        </div>
      </div>
    );
  }

  // ----- Signed-out marketing shell -----
  if (!user) {
    if (pathname === "/") {
      return (
        <MarketingNav>
          <div className="flex items-center gap-2 dt:gap-3">
            <ThemeToggle iconOnly />
            <Link
              href="/login"
              className="shrink-0 whitespace-nowrap rounded-full border border-pill-border px-3 py-[9px] font-display text-[13px] font-semibold text-text dt:px-4 dt:text-[14px]"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="shrink-0 whitespace-nowrap rounded-full bg-accent px-[14px] py-[9px] font-display text-[13px] font-semibold text-accent-text dt:px-[18px] dt:text-[14px]"
            >
              Sign up
            </Link>
          </div>
        </MarketingNav>
      );
    }

    if (pathname === "/register" || pathname === "/login") {
      const isRegister = pathname === "/register";
      return (
        <MarketingNav>
          <div className="flex items-center gap-2 text-[14px] text-muted">
            {isRegister ? "Already a member?" : "New here?"}
            <Link
              href={isRegister ? "/login" : "/register"}
              className="font-display text-[14px] font-semibold text-accent"
            >
              {isRegister ? "Log in" : "Sign up"}
            </Link>
          </div>
        </MarketingNav>
      );
    }

    // Other signed-out routes (e.g. browsing /search without an account).
    return (
      <div className="sticky top-0 z-20 border-b border-nav-border bg-bg">
        <div className="mx-auto flex max-w-[1160px] items-center justify-between px-[18px] py-4 dt:px-8 dt:py-5">
          <Wordmark />
          <div className="flex items-center gap-3 dt:gap-7">
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
            <ThemeToggle iconOnly />
            <Link
              href="/login"
              className="rounded-full border border-pill-border px-4 py-[9px] font-display text-[14px] font-semibold text-text"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="hidden rounded-full bg-accent px-[18px] py-[9px] font-display text-[14px] font-semibold text-accent-text dt:inline-block"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ----- Signed-in app shell -----
  return (
    <>
      {/* Desktop nav */}
      <div className="sticky top-0 z-20 hidden border-b border-nav-border bg-bg dt:block">
        <div className="mx-auto flex max-w-[1160px] items-center justify-between px-8 py-5">
          <Wordmark />
          <div className="flex items-center gap-7">
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
              <NavAvatar size={34} avatarVariant={profile?.avatarVariant} />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-20 border-b border-nav-border bg-bg dt:hidden">
        <div className="flex items-center justify-between px-[18px] py-4">
          <Wordmark small />
          <div className="flex items-center gap-3">
            <ThemeToggle iconOnly />
            <Link href="/user-profile">
              <NavAvatar size={34} avatarVariant={profile?.avatarVariant} />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile bottom tab bar */}
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
    </>
  );
}
