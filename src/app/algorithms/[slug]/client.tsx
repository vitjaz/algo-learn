"use client";

import type { BinarySearchStep, BubbleSortStep, AlgorithmMeta } from "@/types/algorithm";
import { AlgorithmDescription } from "@/components/algorithm/algorithm-description";
import { ComplexityTable } from "@/components/algorithm/complexity-table";
import { CodeExample } from "@/components/algorithm/code-example";
import { LeetCodeTasks } from "@/components/algorithm/leetcode-tasks";
import { VisualizationContainer } from "@/components/algorithm/visualization/visualization-container";
import { Separator } from "@/components/ui/separator";

interface AlgorithmPageClientProps {
  slug: string;
  algorithm: AlgorithmMeta;
  steps: BinarySearchStep[] | BubbleSortStep[];
}

export function AlgorithmPageClient({ slug, algorithm, steps }: AlgorithmPageClientProps) {
  return (
    <div className="space-y-8">
      {/* Description */}
      <AlgorithmDescription slug={slug} />

      <Separator />

      {/* Visualization */}
      <VisualizationContainer steps={steps} algorithmSlug={slug} />

      <Separator />

      {/* Complexity */}
      <ComplexityTable complexity={algorithm.complexity} />

      <Separator />

      {/* Code Examples */}
      <CodeExample
        typescript={algorithm.codeExamples.typescript}
        python={algorithm.codeExamples.python}
      />

      <Separator />

      {/* LeetCode Tasks */}
      <LeetCodeTasks tasks={algorithm.leetcodeTasks} />
    </div>
  );
}
