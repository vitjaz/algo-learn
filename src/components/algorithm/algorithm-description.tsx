"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { algorithmModules } from "@/lib/algorithms";

const difficultyStyles: Record<string, string> = {
  easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  medium:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  hard: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

interface AlgorithmDescriptionProps {
  slug: string;
}

export function AlgorithmDescription({ slug }: AlgorithmDescriptionProps) {
  const t = useTranslations();
  const tAlg = useTranslations("algorithm");
  const difficulty = algorithmModules[slug]?.meta.difficulty ?? "medium";
  const categoryId = algorithmModules[slug]?.meta.category ?? "sorting";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t(`algorithms.${slug}.title`)}
        </h1>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="w-fit">
            {t(`categories.${categoryId}`)}
          </Badge>
          <span
            className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${difficultyStyles[difficulty]}`}
          >
            {tAlg(`difficulty.${difficulty}`)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">{t("algorithm.description")}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {t(`algorithms.${slug}.description`)}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">{t("algorithm.whyItMatters")}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {t(`algorithms.${slug}.whyItMatters`)}
        </p>
      </div>
    </div>
  );
}
