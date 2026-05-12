import { notFound } from "next/navigation";
import { getAlgorithm } from "@/lib/data/algorithms";
import { generateBinarySearchSteps } from "@/lib/algorithms/binary-search";
import { generateBubbleSortSteps } from "@/lib/algorithms/bubble-sort";
import { generateQuickSortSteps } from "@/lib/algorithms/quick-sort";
import { AlgorithmPageClient } from "./client";

interface AlgorithmPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: "binary-search" },
    { slug: "bubble-sort" },
    { slug: "quick-sort" },
  ];
}

const algorithmTitles: Record<string, string> = {
  "binary-search": "Binary Search",
  "bubble-sort": "Bubble Sort",
  "quick-sort": "Quick Sort",
};

export async function generateMetadata({ params }: AlgorithmPageProps) {
  const { slug } = await params;
  const algorithm = getAlgorithm(slug);
  if (!algorithm) return { title: "Not Found" };

  const title = algorithmTitles[slug] ?? slug;

  return {
    title: `${title} — Algo Learn`,
    description: `Learn ${title} algorithm with interactive visualizations.`,
  };
}

export default async function AlgorithmPage({ params }: AlgorithmPageProps) {
  const { slug } = await params;
  const algorithm = getAlgorithm(slug);

  if (!algorithm) {
    notFound();
  }

  // Generate visualization steps
  let steps;
  if (slug === "binary-search") {
    steps = generateBinarySearchSteps(
      [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      23,
    );
  } else if (slug === "bubble-sort") {
    steps = generateBubbleSortSteps([64, 34, 25, 12, 22, 11, 90]);
  } else if (slug === "quick-sort") {
    steps = generateQuickSortSteps([38, 27, 43, 3, 9, 82, 10]);
  }

  return (
    <AlgorithmPageClient slug={slug} algorithm={algorithm} steps={steps!} />
  );
}
