"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import type {
  BinarySearchStep,
  BubbleSortStep,
  BSTStep,
  MergeSortStep,
  QuickSortStep,
  SelectionSortStep,
  AlgorithmMeta,
} from "@/types/algorithm";
import type { ExtendedContentConfig } from "@/types/extended-content";
import { AlgorithmDescription } from "@/components/algorithm/algorithm-description";
import { ComplexityTable } from "@/components/algorithm/complexity-table";
import { CodeExample } from "@/components/algorithm/code-example";
import { LeetCodeTasks } from "@/components/algorithm/leetcode-tasks";
import { VisualizationContainer } from "@/components/algorithm/visualization/visualization-container";
import { AlgorithmSteps } from "@/components/algorithm/algorithm-steps";
import { AlgorithmAnalysis } from "@/components/algorithm/algorithm-analysis";
import { AlgorithmApplications } from "@/components/algorithm/algorithm-applications";
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
    | BSTStep[]
    | MergeSortStep[]
    | QuickSortStep[]
    | SelectionSortStep[];
  extendedContent?: ExtendedContentConfig;
}

/**
 * Fixed page order for all algorithms:
 *   Description → Visualization → [Steps] → Complexity → [Analysis] → Code → [Applications] → LeetCode
 */
export function AlgorithmPageClient({
  slug,
  algorithm,
  steps,
  extendedContent,
}: AlgorithmPageClientProps) {
  const t = useTranslations();
  const tAlg = useTranslations("algorithm");
  const categoryId = algorithm.category;

  const tocItems: TocItem[] = useMemo(() => {
    const items: TocItem[] = [
      { id: "description", label: tAlg("description") },
      { id: "visualization", label: tAlg("visualization.title") },
    ];

    if (extendedContent?.steps) {
      items.push({
        id: extendedContent.steps.id,
        label: tAlg(extendedContent.steps.tocLabelKey),
      });
    }

    items.push({ id: "complexity", label: tAlg("complexity") });

    if (extendedContent?.analysis) {
      items.push({
        id: extendedContent.analysis.id,
        label: tAlg(extendedContent.analysis.tocLabelKey),
      });
    }

    items.push({ id: "code-example", label: tAlg("codeExample") });

    if (extendedContent?.applications) {
      items.push({
        id: extendedContent.applications.id,
        label: tAlg(extendedContent.applications.tocLabelKey),
      });
    }

    items.push({ id: "leetcode-tasks", label: tAlg("leetcodeTasks") });

    return items;
  }, [tAlg, extendedContent]);

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

        {/* Steps: how the algorithm works */}
        {extendedContent?.steps && (
          <AlgorithmSteps config={extendedContent.steps} />
        )}

        {/* Complexity */}
        <section id="complexity">
          <ComplexityTable complexity={algorithm.complexity} />
        </section>

        {/* Analysis: detailed complexity breakdown */}
        {extendedContent?.analysis && (
          <AlgorithmAnalysis config={extendedContent.analysis} />
        )}

        {/* Code Examples */}
        <section id="code-example">
          <CodeExample
            typescript={algorithm.codeExamples.typescript}
            python={algorithm.codeExamples.python}
          />
        </section>

        {/* Applications: real-world use cases */}
        {extendedContent?.applications && (
          <AlgorithmApplications config={extendedContent.applications} />
        )}

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
