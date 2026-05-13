"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { categories } from "@/lib/algorithms";
import {
  Search,
  ArrowUpDown,
  Binary,
  Bubbles,
  GitMerge,
  Zap,
  Code2,
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  search: <Search />,
  sorting: <ArrowUpDown />,
};

const algorithmIcons: Record<string, React.ReactNode> = {
  "binary-search": <Binary />,
  "bubble-sort": <Bubbles />,
  "merge-sort": <GitMerge />,
  "quick-sort": <Zap />,
};

export function AppSidebar() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {categories.map((category) => (
          <SidebarGroup key={category.id}>
            <SidebarGroupLabel className="flex items-center gap-2">
              {categoryIcons[category.id]}
              <span>{t(`categories.${category.id}`)}</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {category.algorithms.map((slug) => {
                  const href = `/algorithms/${slug}`;
                  const isActive = pathname === href;
                  return (
                    <SidebarMenuItem key={slug}>
                      <SidebarMenuButton
                        render={<Link href={href} />}
                        isActive={isActive}
                        tooltip={t(`algorithms.${slug}.title`)}
                      >
                        {algorithmIcons[slug] ?? <Code2 />}
                        <span>{t(`algorithms.${slug}.title`)}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          <Code2 className="size-3" />
          <span>v1.0</span>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
