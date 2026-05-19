"use client";

import { useTranslations } from "next-intl";
import type { AnalysisConfig } from "@/types/extended-content";
import { Zap, Database, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = { zap: Zap, database: Database };

export function AlgorithmAnalysis({ config }: { config: AnalysisConfig }) {
  const t = useTranslations(config.i18nBase);

  return (
    <section id={config.id} className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold">{t("title")}</h2>

      <div className="flex flex-col gap-5">
        {config.items.map((item, i) => {
          const Icon = item.icon ? iconMap[item.icon] : null;
          return (
            <div key={i} className="flex flex-col gap-3">
              <h3 className="text-base font-semibold flex items-center gap-2">
                {Icon && <Icon className="size-4 text-primary" />}
                {t(item.titleKey)}
              </h3>
              <div className="flex flex-col gap-2 text-muted-foreground leading-relaxed">
                {item.descriptionKeys.map((key) => (
                  <p key={key}>{t(key)}</p>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {config.callout && (
        <div className="rounded-lg bg-muted/40 p-5 flex flex-col gap-2">
          <span className="text-sm font-semibold">
            {t(config.callout.titleKey)}
          </span>
          {config.callout.descriptionKeys.map((key) => (
            <p
              key={key}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              {t(key)}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
