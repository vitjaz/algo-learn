import type { AlgorithmMeta } from "@/types/algorithm";
import type { ExtendedContentConfig } from "@/types/extended-content";
import { generateMergeSortSteps } from "./steps";

export const meta: AlgorithmMeta = {
  slug: "merge-sort",
  category: "sorting",
  complexity: {
    best: "O(nlogn)",
    average: "O(nlogn)",
    worst: "O(nlogn)",
    space: "O(n)",
  },
  leetcodeTasks: [
    {
      number: 912,
      title: "Sort an Array",
      difficulty: "medium",
      url: "https://leetcode.com/problems/sort-an-array/",
    },
    {
      number: 88,
      title: "Merge Sorted Array",
      difficulty: "easy",
      url: "https://leetcode.com/problems/merge-sorted-array/",
    },
    {
      number: 21,
      title: "Merge Two Sorted Lists",
      difficulty: "easy",
      url: "https://leetcode.com/problems/merge-two-sorted-lists/",
    },
    {
      number: 23,
      title: "Merge k Sorted Lists",
      difficulty: "hard",
      url: "https://leetcode.com/problems/merge-k-sorted-lists/",
    },
  ],
  codeExamples: {
    typescript: `function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Copy remaining elements
  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);

  return result;
}

// Usage example
const unsorted = [38, 27, 43, 3, 9, 82, 10];
const sorted = mergeSort(unsorted);
console.log(sorted); // [3, 9, 10, 27, 38, 43, 82]`,
    python: `def merge_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)


def merge(left: list[int], right: list[int]) -> list[int]:
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    # Copy remaining elements
    result.extend(left[i:])
    result.extend(right[j:])

    return result


# Usage example
unsorted = [38, 27, 43, 3, 9, 82, 10]
sorted_arr = merge_sort(unsorted)
print(sorted_arr)  # [3, 9, 10, 27, 38, 43, 82]`,
  },
};

export const generateSteps = generateMergeSortSteps;

export const defaultInput = {
  array: [38, 27, 43, 3, 9, 82, 10],
};

export const extendedContent: ExtendedContentConfig = {
  steps: {
    id: "how-it-works",
    tocLabelKey: "howItWorks",
    i18nBase: "algorithms.merge-sort.howItWorks",
    introKey: "intro",
    callout: {
      titleKey: "example",
      descriptionKeys: ["exampleStep1", "exampleStep2"],
      mono: true,
    },
    items: [
      { titleKey: "step1Title", descriptionKey: "step1" },
      { titleKey: "step2Title", descriptionKey: "step2" },
      {
        titleKey: "step3Title",
        descriptionKey: "step3",
        subItemKeys: ["step3a", "step3b"],
      },
      { titleKey: "step4Title", descriptionKey: "step4" },
    ],
  },
  analysis: {
    id: "complexity-analysis",
    tocLabelKey: "complexityAnalysis",
    i18nBase: "algorithms.merge-sort.complexityAnalysis",
    items: [
      {
        titleKey: "timeTitle",
        descriptionKeys: ["timeBest", "timeAverage", "timeWorst"],
        icon: "zap",
      },
      {
        titleKey: "spaceTitle",
        descriptionKeys: ["spaceAuxiliary", "spaceStable"],
        icon: "database",
      },
    ],
    callout: {
      titleKey: "comparisonTitle",
      descriptionKeys: ["comparison"],
    },
  },
  applications: {
    id: "applications",
    tocLabelKey: "applications",
    i18nBase: "algorithms.merge-sort.applications",
    items: [
      { titleKey: "app1Title", descriptionKey: "app1", icon: "database" },
      { titleKey: "app2Title", descriptionKey: "app2", icon: "code" },
      {
        titleKey: "app3Title",
        descriptionKey: "app3",
        icon: "arrow-right-left",
      },
      { titleKey: "app4Title", descriptionKey: "app4", icon: "search" },
      { titleKey: "app5Title", descriptionKey: "app5", icon: "lightbulb" },
      { titleKey: "app6Title", descriptionKey: "app6", icon: "target" },
    ],
  },
};
