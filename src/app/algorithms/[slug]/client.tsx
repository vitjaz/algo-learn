"use client";

import { useTranslations } from "next-intl";
import type {
  BinarySearchStep,
  BubbleSortStep,
  QuickSortStep,
  AlgorithmMeta,
} from "@/types/algorithm";
import { AlgorithmDescription } from "@/components/algorithm/algorithm-description";
import { ComplexityTable } from "@/components/algorithm/complexity-table";
import { CodeExample } from "@/components/algorithm/code-example";
import { LeetCodeTasks } from "@/components/algorithm/leetcode-tasks";
import { VisualizationContainer } from "@/components/algorithm/visualization/visualization-container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface AlgorithmPageClientProps {
  slug: string;
  algorithm: AlgorithmMeta;
  steps: BinarySearchStep[] | BubbleSortStep[] | QuickSortStep[];
}

export function AlgorithmPageClient({
  slug,
  algorithm,
  steps,
}: AlgorithmPageClientProps) {
  const t = useTranslations();
  const categoryId = algorithm.category;

  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/" />}>
              {t("common.siteName")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/" />}>
              {t(`categories.${categoryId}`)}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t(`algorithms.${slug}.title`)}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Description */}
      <AlgorithmDescription slug={slug} />

      {/* Visualization */}
      <VisualizationContainer steps={steps} algorithmSlug={slug} />

      {/* Complexity */}
      <ComplexityTable complexity={algorithm.complexity} />

      {/* Code Examples */}
      <CodeExample
        typescript={algorithm.codeExamples.typescript}
        python={algorithm.codeExamples.python}
      />

      {/* LeetCode Tasks */}
      <LeetCodeTasks tasks={algorithm.leetcodeTasks} />
    </div>
  );
}
