"use client";

import { useTranslations } from "next-intl";
import type { LeetCodeTask } from "@/types/algorithm";
import { ExternalLink } from "lucide-react";

interface LeetCodeTasksProps {
  tasks: LeetCodeTask[];
}

const difficultyStyles: Record<string, string> = {
  easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  medium:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  hard: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

export function LeetCodeTasks({ tasks }: LeetCodeTasksProps) {
  const t = useTranslations("algorithm");

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{t("leetcodeTasks")}</h2>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <a
            key={task.number}
            href={task.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground font-mono text-sm font-medium">
                #{task.number}
              </span>
              <span className="text-sm font-medium">{task.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${difficultyStyles[task.difficulty]}`}
              >
                {t(`leetcodeDifficulty.${task.difficulty}`)}
              </span>
              <ExternalLink className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
