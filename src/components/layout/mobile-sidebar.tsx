"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/data/algorithms";
import { Search, ArrowUpDown } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  search: <Search className="h-4 w-4" />,
  sorting: <ArrowUpDown className="h-4 w-4" />,
};

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  const t = useTranslations();
  const pathname = usePathname();

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 md:hidden"
        onClick={onClose}
      />
      {/* Sidebar panel */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar-background border-r border-border p-4 md:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-sidebar-foreground">
            {t("common.sidebarToggle")}
          </span>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>
        <nav>
          {categories.map((category) => (
            <div key={category.id} className="mb-4">
              <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {categoryIcons[category.id]}
                {t(`categories.${category.id}`)}
              </div>
              <ul className="space-y-0.5">
                {category.algorithms.map((slug) => {
                  const href = `/algorithms/${slug}`;
                  const isActive = pathname === href;
                  return (
                    <li key={slug}>
                      <Link
                        href={href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        )}
                      >
                        {t(`algorithms.${slug}.title`)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
