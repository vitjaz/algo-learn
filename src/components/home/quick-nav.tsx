"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { categories } from "@/lib/data/algorithms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ArrowUpDown } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  search: <Search className="h-6 w-6" />,
  sorting: <ArrowUpDown className="h-6 w-6" />,
};

export function QuickNav() {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">{t("home.quickNavTitle")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                {categoryIcons[category.id]}
                {t(`categories.${category.id}`)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                {t(`home.${category.id}Desc`)}
              </p>
              <ul className="space-y-1">
                {category.algorithms.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/algorithms/${slug}`}
                      className="text-sm text-primary hover:underline"
                    >
                      → {t(`algorithms.${slug}.title`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
