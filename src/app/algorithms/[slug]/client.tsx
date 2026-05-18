"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import type {
  BinarySearchStep,
  BubbleSortStep,
  MergeSortStep,
  QuickSortStep,
  AlgorithmMeta,
} from "@/types/algorithm";
import { AlgorithmDescription } from "@/components/algorithm/algorithm-description";
import { ComplexityTable } from "@/components/algorithm/complexity-table";
import { CodeExample } from "@/components/algorithm/code-example";
import { LeetCodeTasks } from "@/components/algorithm/leetcode-tasks";
import { VisualizationContainer } from "@/components/algorithm/visualization/visualization-container";
import {
  TableOfContents,
  type TocItem,
} from "@/components/algorithm/table-of-contents";
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
  steps:
    | BinarySearchStep[]
    | BubbleSortStep[]
    | MergeSortStep[]
    | QuickSortStep[];
}

export function AlgorithmPageClient({
  slug,
  algorithm,
  steps,
}: AlgorithmPageClientProps) {
  const t = useTranslations();
  const tAlg = useTranslations("algorithm");
  const categoryId = algorithm.category;

  const tocItems: TocItem[] = useMemo(
    () => [
      { id: "description", label: tAlg("description") },
      { id: "visualization", label: tAlg("visualization.title") },
      { id: "complexity", label: tAlg("complexity") },
      { id: "code-example", label: tAlg("codeExample") },
      { id: "leetcode-tasks", label: tAlg("leetcodeTasks") },
    ],
    [tAlg],
  );

  return (
    <div className="flex gap-8 items-start">
      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col gap-8">
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
        <section id="description">
          <AlgorithmDescription slug={slug} />
        </section>

        {/* Visualization */}
        <section id="visualization">
          <VisualizationContainer steps={steps} algorithmSlug={slug} />
        </section>

        {/* Complexity */}
        <section id="complexity">
          <ComplexityTable complexity={algorithm.complexity} />
        </section>

        {/* Code Examples */}
        <section id="code-example">
          <CodeExample
            typescript={algorithm.codeExamples.typescript}
            python={algorithm.codeExamples.python}
          />
        </section>

        {/* LeetCode Tasks */}
        <section id="leetcode-tasks">
          <LeetCodeTasks tasks={algorithm.leetcodeTasks} />
        </section>
      </div>

      {/* Table of Contents — right sidebar */}
      <TableOfContents items={tocItems} />
    </div>
  );
}
