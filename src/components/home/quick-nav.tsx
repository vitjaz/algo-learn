"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { categories } from "@/lib/algorithms";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Search, ArrowUpDown, ArrowRight } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  search: <Search className="size-5" />,
  sorting: <ArrowUpDown className="size-5" />,
};

export function QuickNav() {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-6 pb-8">
      <h2 className="text-2xl font-bold text-center">
        {t("home.quickNavTitle")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="group hover:shadow-md transition-all duration-200 hover:border-primary/20"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-primary">
                {categoryIcons[category.id]}
                {t(`categories.${category.id}`)}
              </CardTitle>
              <CardDescription>{t(`home.${category.id}Desc`)}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {category.algorithms.map((slug) => (
                  <Link
                    key={slug}
                    href={`/algorithms/${slug}`}
                    className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors group/link"
                  >
                    <ArrowRight className="size-3.5 group-hover/link:translate-x-0.5 transition-transform text-muted-foreground" />
                    {t(`algorithms.${slug}.title`)}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
