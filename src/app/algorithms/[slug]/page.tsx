import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type {
  BinarySearchStep,
  BubbleSortStep,
  MergeSortStep,
  QuickSortStep,
} from "@/types/algorithm";
import { getAlgorithm, algorithmModules } from "@/lib/algorithms";
import { AlgorithmPageClient } from "./client";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

const algorithmTitles: Record<string, string> = {
  "binary-search": "Бинарный поиск",
  "bubble-sort": "Сортировка пузырьком",
  "merge-sort": "Сортировка слиянием",
  "quick-sort": "Быстрая сортировка",
};

interface AlgorithmPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(algorithmModules).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: AlgorithmPageProps): Promise<Metadata> {
  const { slug } = await params;
  const algorithm = getAlgorithm(slug);
  if (!algorithm) return { title: "Не найдено" };

  const ruTitle = algorithmTitles[slug] || slug;
  const title = `${ruTitle} — Algo Learn`;
  const description = `Изучите алгоритм «${ruTitle}» с интерактивными визуализациями. Пошаговые анимации, примеры кода и задачи на LeetCode.`;
  const ogImageUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(ruTitle)}&desc=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/algorithms/${slug}`,
      siteName: "Algo Learn",
      locale: "ru_RU",
      type: "article",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `Algo Learn — ${ruTitle}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function AlgorithmPage({ params }: AlgorithmPageProps) {
  const { slug } = await params;
  const algorithm = getAlgorithm(slug);

  if (!algorithm) {
    notFound();
  }

  // Generate visualization steps using the algorithm module
  const mod = algorithmModules[slug];
  if (!mod) {
    notFound();
  }

  const steps = mod.generateSteps(
    ...(Object.values(mod.defaultInput) as unknown[]),
  ) as
    | BinarySearchStep[]
    | BubbleSortStep[]
    | MergeSortStep[]
    | QuickSortStep[];

  return (
    <AlgorithmPageClient slug={slug} algorithm={algorithm} steps={steps} />
  );
}
