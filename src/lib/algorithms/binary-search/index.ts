import type { AlgorithmMeta } from "@/types/algorithm";
import type { ExtendedContentConfig } from "@/types/extended-content";
import { generateBinarySearchSteps } from "./steps";

export const meta: AlgorithmMeta = {
  slug: "binary-search",
  category: "search",
  complexity: {
    best: "O(1)",
    average: "O(log n)",
    worst: "O(log n)",
    space: "O(1)",
  },
  leetcodeTasks: [
    {
      number: 704,
      title: "Binary Search",
      difficulty: "easy",
      url: "https://leetcode.com/problems/binary-search/",
    },
    {
      number: 35,
      title: "Search Insert Position",
      difficulty: "easy",
      url: "https://leetcode.com/problems/search-insert-position/",
    },
    {
      number: 69,
      title: "Sqrt(x)",
      difficulty: "easy",
      url: "https://leetcode.com/problems/sqrtx/",
    },
    {
      number: 162,
      title: "Find Peak Element",
      difficulty: "medium",
      url: "https://leetcode.com/problems/find-peak-element/",
    },
    {
      number: 374,
      title: "Guess Number Higher or Lower",
      difficulty: "easy",
      url: "https://leetcode.com/problems/guess-number-higher-or-lower/",
    },
  ],
  codeExamples: {
    typescript: `function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    // Find the middle index
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // Found the target
    } else if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }

  return -1; // Target not found
}

// Usage example
const sortedArray = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
const result = binarySearch(sortedArray, 23);
console.log(result); // 5 (index of 23)`,
    python: `def binary_search(arr: list[int], target: int) -> int:
    left = 0
    right = len(arr) - 1

    while left <= right:
        # Find the middle index
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid  # Found the target
        elif arr[mid] < target:
            left = mid + 1  # Search right half
        else:
            right = mid - 1  # Search left half

    return -1  # Target not found

# Usage example
sorted_array = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
result = binary_search(sorted_array, 23)
print(result)  # 5 (index of 23)`,
  },
};

export const generateSteps = generateBinarySearchSteps;

export const defaultInput = {
  array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
  target: 23,
};

export const extendedContent: ExtendedContentConfig = {
  steps: {
    id: "how-it-works",
    tocLabelKey: "howItWorks",
    i18nBase: "algorithms.binary-search.howItWorks",
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
        subItemKeys: ["step3a", "step3b", "step3c"],
      },
      { titleKey: "step4Title", descriptionKey: "step4" },
    ],
  },
  analysis: {
    id: "complexity-analysis",
    tocLabelKey: "complexityAnalysis",
    i18nBase: "algorithms.binary-search.complexityAnalysis",
    items: [
      {
        titleKey: "timeTitle",
        descriptionKeys: ["timeBest", "timeAverage", "timeWorst"],
        icon: "zap",
      },
      {
        titleKey: "spaceTitle",
        descriptionKeys: ["spaceIterative", "spaceRecursive"],
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
    i18nBase: "algorithms.binary-search.applications",
    items: [
      { titleKey: "app1Title", descriptionKey: "app1", icon: "database" },
      { titleKey: "app2Title", descriptionKey: "app2", icon: "database" },
      { titleKey: "app3Title", descriptionKey: "app3", icon: "code" },
      { titleKey: "app4Title", descriptionKey: "app4", icon: "search" },
      { titleKey: "app5Title", descriptionKey: "app5", icon: "lightbulb" },
      { titleKey: "app6Title", descriptionKey: "app6", icon: "target" },
    ],
  },
};
