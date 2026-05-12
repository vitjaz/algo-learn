import { notFound } from "next/navigation";
import type {
  BinarySearchStep,
  BubbleSortStep,
  QuickSortStep,
} from "@/types/algorithm";
import { getAlgorithm, algorithmModules } from "@/lib/algorithms";
import { AlgorithmPageClient } from "./client";

interface AlgorithmPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(algorithmModules).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: AlgorithmPageProps) {
  const { slug } = await params;
  const algorithm = getAlgorithm(slug);
  if (!algorithm) return { title: "Not Found" };

  const title = slug
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

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

  // Generate visualization steps using the algorithm module
  const mod = algorithmModules[slug];
  if (!mod) {
    notFound();
  }

  const steps = mod.generateSteps(
    ...(Object.values(mod.defaultInput) as unknown[]),
  ) as BinarySearchStep[] | BubbleSortStep[] | QuickSortStep[];

  return (
    <AlgorithmPageClient slug={slug} algorithm={algorithm} steps={steps} />
  );
}
