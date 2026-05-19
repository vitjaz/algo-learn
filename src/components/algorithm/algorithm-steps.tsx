"use client";

import { useTranslations } from "next-intl";
import type { StepsConfig } from "@/types/extended-content";

export function AlgorithmSteps({ config }: { config: StepsConfig }) {
  const t = useTranslations(config.i18nBase);

  return (
    <section id={config.id} className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold">{t("title")}</h2>

      {config.introKey && (
        <p className="text-muted-foreground leading-relaxed">
          {t(config.introKey)}
        </p>
      )}

      <div className="flex flex-col gap-5">
        {config.items.map((item, i) => (
          <div key={i} className="flex flex-col gap-2">
            <h3 className="text-base font-semibold">{t(item.titleKey)}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t(item.descriptionKey)}
            </p>
            {item.subItemKeys && (
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                {item.subItemKeys.map((key) => (
                  <li key={key}>{t(key)}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {config.callout && (
        <div className="rounded-lg bg-muted/40 p-5 flex flex-col gap-2">
          <span className="text-sm font-semibold">
            {t(config.callout.titleKey)}
          </span>
          {config.callout.descriptionKeys.map((key) => (
            <p
              key={key}
              className={
                config.callout?.mono
                  ? "font-mono bg-background/60 rounded px-3 py-2 text-sm text-muted-foreground"
                  : "text-sm text-muted-foreground leading-relaxed"
              }
            >
              {t(key)}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
