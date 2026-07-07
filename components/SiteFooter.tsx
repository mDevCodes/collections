"use client";

import { usePathname } from "next/navigation";
import useUser from "@/lib/supabase/useUser";

const links = ["How it works", "Charts", "Privacy", "Terms"];

export default function SiteFooter() {
  const pathname = usePathname();
  const { user, isLoading } = useUser();

  // Matches the prototype: the dark-navy footer only appears on the
  // signed-out landing page, never inside the register flow or the app.
  if (isLoading || user || pathname !== "/") return null;

  return (
    <footer style={{ background: "#141b2e" }}>
      <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-x-7 gap-y-4 px-[18px] py-5 dt:px-8">
        <div className="flex flex-wrap items-center gap-5">
          <span className="font-display text-[14px] font-bold tracking-[-0.01em] text-[#9aa3b8]">
            Record Collections
          </span>
          <div className="flex flex-wrap gap-[18px]">
            {links.map((label) => (
              <span key={label} className="text-[13px] text-[#6f7a92]">
                {label}
              </span>
            ))}
          </div>
        </div>
        <p className="m-0 font-body text-[11px] tracking-[0.05em] text-[#6f7a92]">
          © 2026 · Designed &amp; built by{" "}
          <span className="font-semibold text-[#9aa3b8]">Grounded Workflows Co.</span>
        </p>
      </div>
    </footer>
  );
}
