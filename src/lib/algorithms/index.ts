import type { AlgorithmMeta } from "@/types/algorithm";
import * as binarySearch from "./binary-search";
import * as bubbleSort from "./bubble-sort";
import * as mergeSort from "./merge-sort";
import * as quickSort from "./quick-sort";

export { categories } from "./categories";

export interface AlgorithmModule {
  meta: AlgorithmMeta;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generateSteps: (...args: any[]) => any[];
  defaultInput: Record<string, unknown>;
}

export const algorithmModules: Record<string, AlgorithmModule> = {
  "binary-search": {
    meta: binarySearch.meta,
    generateSteps: binarySearch.generateSteps,
    defaultInput: binarySearch.defaultInput,
  },
  "bubble-sort": {
    meta: bubbleSort.meta,
    generateSteps: bubbleSort.generateSteps,
    defaultInput: bubbleSort.defaultInput,
  },
  "merge-sort": {
    meta: mergeSort.meta,
    generateSteps: mergeSort.generateSteps,
    defaultInput: mergeSort.defaultInput,
  },
  "quick-sort": {
    meta: quickSort.meta,
    generateSteps: quickSort.generateSteps,
    defaultInput: quickSort.defaultInput,
  },
};

const algorithms: Record<string, AlgorithmMeta> = Object.fromEntries(
  Object.entries(algorithmModules).map(([slug, mod]) => [slug, mod.meta]),
);

export function getAlgorithm(slug: string): AlgorithmMeta | undefined {
  return algorithms[slug];
}

export function getAllAlgorithms(): AlgorithmMeta[] {
  return Object.values(algorithms);
}

export function getAlgorithmsByCategory(categoryId: string): AlgorithmMeta[] {
  return Object.values(algorithms).filter((a) => a.category === categoryId);
}
