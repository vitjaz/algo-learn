"use client";

import { useTranslations } from "next-intl";
import type { ApplicationsConfig } from "@/types/extended-content";
import {
  Database,
  Code,
  Search,
  Lightbulb,
  ArrowRightLeft,
  Target,
  GraduationCap,
  CheckCircle,
  Network,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  database: Database,
  code: Code,
  search: Search,
  lightbulb: Lightbulb,
  "arrow-right-left": ArrowRightLeft,
  target: Target,
  "graduation-cap": GraduationCap,
  "check-circle": CheckCircle,
  network: Network,
};

export function AlgorithmApplications({
  config,
}: {
  config: ApplicationsConfig;
}) {
  const t = useTranslations(config.i18nBase);

  return (
    <section id={config.id} className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold">{t("title")}</h2>

      <div className="grid gap-4">
        {config.items.map((item, i) => {
          const Icon = item.icon ? iconMap[item.icon] : null;
          return (
            <div
              key={i}
              className="flex gap-4 rounded-lg bg-muted/30 p-4 hover:bg-muted/50 transition-colors"
            >
              {Icon && (
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
              )}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-semibold">{t(item.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(item.descriptionKey)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
