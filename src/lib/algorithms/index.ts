import type { AlgorithmMeta } from "@/types/algorithm";
import type { ExtendedContentConfig } from "@/types/extended-content";
import * as binarySearch from "./binary-search";
import * as bubbleSort from "./bubble-sort";
import * as insertionSort from "./insertion-sort";
import * as mergeSort from "./merge-sort";
import * as quickSort from "./quick-sort";
import * as selectionSort from "./selection-sort";

export { categories } from "./categories";

export interface AlgorithmModule {
  meta: AlgorithmMeta;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generateSteps: (...args: any[]) => any[];
  defaultInput: Record<string, unknown>;
  extendedContent?: ExtendedContentConfig;
}

export const algorithmModules: Record<string, AlgorithmModule> = {
  "binary-search": {
    meta: binarySearch.meta,
    generateSteps: binarySearch.generateSteps,
    defaultInput: binarySearch.defaultInput,
    extendedContent: binarySearch.extendedContent,
  },
  "bubble-sort": {
    meta: bubbleSort.meta,
    generateSteps: bubbleSort.generateSteps,
    defaultInput: bubbleSort.defaultInput,
    extendedContent: bubbleSort.extendedContent,
  },
  "insertion-sort": {
    meta: insertionSort.meta,
    generateSteps: insertionSort.generateSteps,
    defaultInput: insertionSort.defaultInput,
    extendedContent: insertionSort.extendedContent,
  },
  "merge-sort": {
    meta: mergeSort.meta,
    generateSteps: mergeSort.generateSteps,
    defaultInput: mergeSort.defaultInput,
    extendedContent: mergeSort.extendedContent,
  },
  "quick-sort": {
    meta: quickSort.meta,
    generateSteps: quickSort.generateSteps,
    defaultInput: quickSort.defaultInput,
    extendedContent: quickSort.extendedContent,
  },
  "selection-sort": {
    meta: selectionSort.meta,
    generateSteps: selectionSort.generateSteps,
    defaultInput: selectionSort.defaultInput,
    extendedContent: selectionSort.extendedContent,
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
