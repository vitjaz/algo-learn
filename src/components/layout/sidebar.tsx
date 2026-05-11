"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/data/algorithms";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search, ArrowUpDown } from "lucide-react";
import { useState } from "react";

const categoryIcons: Record<string, React.ReactNode> = {
  search: <Search className="h-4 w-4" />,
  sorting: <ArrowUpDown className="h-4 w-4" />,
};

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col border-r border-border bg-sidebar-background transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Sidebar header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        {!collapsed && (
          <span className="text-sm font-semibold text-sidebar-foreground">
            {t("common.sidebarToggle")}
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 ml-auto"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? t("common.expandSidebar") : t("common.collapseSidebar")}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        {categories.map((category) => (
          <div key={category.id} className="mb-4">
            {!collapsed && (
              <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {categoryIcons[category.id]}
                {t(`categories.${category.id}`)}
              </div>
            )}
            <ul className="space-y-0.5">
              {category.algorithms.map((slug) => {
                const href = `/algorithms/${slug}`;
                const isActive = pathname === href;
                return (
                  <li key={slug}>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                        collapsed && "justify-center px-1"
                      )}
                      title={collapsed ? t(`algorithms.${slug}.title`) : undefined}
                    >
                      {collapsed && <span className="text-xs">📌</span>}
                      {!collapsed && t(`algorithms.${slug}.title`)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
