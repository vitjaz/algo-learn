import { notFound } from "next/navigation";
import { getAlgorithm } from "@/lib/data/algorithms";
import { generateBinarySearchSteps } from "@/lib/algorithms/binary-search";
import { generateBubbleSortSteps } from "@/lib/algorithms/bubble-sort";
import { AlgorithmPageClient } from "./client";

interface AlgorithmPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: "binary-search" },
    { slug: "bubble-sort" },
  ];
}

export async function generateMetadata({ params }: AlgorithmPageProps) {
  const { slug } = await params;
  const algorithm = getAlgorithm(slug);
  if (!algorithm) return { title: "Not Found" };

  return {
    title: `${slug === "binary-search" ? "Binary Search" : "Bubble Sort"} — Algo Learn`,
    description: `Learn ${slug === "binary-search" ? "Binary Search" : "Bubble Sort"} algorithm with interactive visualizations.`,
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
    steps = generateBinarySearchSteps([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23);
  } else if (slug === "bubble-sort") {
    steps = generateBubbleSortSteps([64, 34, 25, 12, 22, 11, 90]);
  }

  return (
    <AlgorithmPageClient
      slug={slug}
      algorithm={algorithm}
      steps={steps!}
    />
  );
}
