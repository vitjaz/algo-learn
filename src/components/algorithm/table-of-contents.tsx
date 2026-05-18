"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

/**
 * Scroll-based TOC active tracking:
 * Finds the last section whose top edge has crossed above a reference line
 * (100px from viewport top). This is more reliable than IntersectionObserver
 * for sequential section tracking, especially near the bottom of the page.
 */
export function TableOfContents({ items }: TableOfContentsProps) {
  const t = useTranslations("algorithm");
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const isClickScrolling = useRef(false);

  const handleClick = useCallback((id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      isClickScrolling.current = true;
      setActiveId(id);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Ignore scroll-based updates during the animated scroll
      setTimeout(() => {
        isClickScrolling.current = false;
      }, 1000);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const TOP_OFFSET = 100;
      let currentId = items[0]?.id ?? "";

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= TOP_OFFSET) {
          currentId = item.id;
        }
      }

      setActiveId(currentId);
    };

    // Run once on mount to set initial state
    handleScroll();

    // Find the scrollable parent (the overflow-y-auto container in app-shell)
    const scrollParent = document.querySelector(".overflow-y-auto");
    const target = scrollParent instanceof HTMLElement ? scrollParent : window;

    target.addEventListener("scroll", handleScroll, { passive: true });
    return () => target.removeEventListener("scroll", handleScroll);
  }, [items]);

  return (
    <nav
      aria-label={t("tableOfContents")}
      className="hidden xl:flex sticky top-8 w-52 shrink-0 self-start flex-col gap-1"
    >
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        {t("tableOfContents")}
      </span>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => handleClick(item.id, e)}
          className={cn(
            "text-sm py-1.5 pl-3 border-l-2 transition-colors",
            activeId === item.id
              ? "border-primary text-primary font-medium"
              : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50",
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
