"use client";

import { useTranslations } from "next-intl";
import type { LeetCodeTask } from "@/types/algorithm";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface LeetCodeTasksProps {
  tasks: LeetCodeTask[];
}

export function LeetCodeTasks({ tasks }: LeetCodeTasksProps) {
  const t = useTranslations("algorithm");

  const difficultyColor: Record<string, string> = {
    easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">{t("leetcodeTasks")}</h2>
      <div className="space-y-2">
        {tasks.map((task) => (
          <a
            key={task.number}
            href={task.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 bg-card rounded-lg border border-border hover:bg-accent/50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground font-mono text-sm">
                #{task.number}
              </span>
              <span className="text-sm font-medium">{task.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={difficultyColor[task.difficulty]}
              >
                {t(`leetcodeDifficulty.${task.difficulty}`)}
              </Badge>
              <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
