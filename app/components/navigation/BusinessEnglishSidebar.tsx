"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  businessEnglishNav,
  getModuleBaseHref,
  getModuleHref,
} from "@/app/lib/businessNavigation";

export function BusinessEnglishSidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Business English modules"
      className="rounded-2xl border border-white/15 bg-white/10 p-3 shadow-lg backdrop-blur-sm"
    >
      <div className="space-y-2">
        {businessEnglishNav.map((item) => {
          const href = getModuleHref(item.slug);
          const baseHref = getModuleBaseHref(item.slug);
          const isActive = pathname === href || pathname === baseHref || pathname.startsWith(`${baseHref}/`);

          return (
            <Link
              key={item.slug}
              href={href}
              className={`block rounded-xl border-l-4 px-4 py-3 transition-all duration-200 ease-in-out ${
                isActive
                  ? "border-l-blue-400 bg-blue-500/20 text-blue-100"
                  : "border-l-transparent bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              <p className="text-sm font-semibold leading-5">{item.title}</p>
              <p className="mt-1 text-xs leading-5 text-slate-300">{item.description}</p>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
