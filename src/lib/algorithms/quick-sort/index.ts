import type { AlgorithmMeta } from "@/types/algorithm";
import { generateQuickSortSteps } from "./steps";

export const meta: AlgorithmMeta = {
  slug: "quick-sort",
  category: "sorting",
  complexity: {
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)",
  },
  leetcodeTasks: [
    {
      number: 912,
      title: "Sort an Array",
      difficulty: "medium",
      url: "https://leetcode.com/problems/sort-an-array/",
    },
    {
      number: 215,
      title: "Kth Largest Element in an Array",
      difficulty: "medium",
      url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    },
    {
      number: 973,
      title: "K Closest Points to Origin",
      difficulty: "medium",
      url: "https://leetcode.com/problems/k-closest-points-to-origin/",
    },
    {
      number: 347,
      title: "Top K Frequent Elements",
      difficulty: "medium",
      url: "https://leetcode.com/problems/top-k-frequent-elements/",
    },
  ],
  codeExamples: {
    typescript: `function quickSort(arr: number[], low = 0, high = arr.length - 1): void {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
}

function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Place pivot in its final position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// Usage example
const unsorted = [38, 27, 43, 3, 9, 82, 10];
const sorted = [...unsorted]; // Copy to avoid mutating original
quickSort(sorted);
console.log(sorted); // [3, 9, 10, 27, 38, 43, 82]`,
    python: `def quick_sort(arr: list[int], low: int = 0, high: int | None = None) -> None:
    if high is None:
        high = len(arr) - 1

    if low < high:
        pivot_index = partition(arr, low, high)
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)


def partition(arr: list[int], low: int, high: int) -> int:
    pivot = arr[high]
    i = low - 1

    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    # Place pivot in its final position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1


# Usage example
unsorted = [38, 27, 43, 3, 9, 82, 10]
sorted_arr = unsorted.copy()  # Copy to avoid mutating original
quick_sort(sorted_arr)
print(sorted_arr)  # [3, 9, 10, 27, 38, 43, 82]`,
  },
};

export const generateSteps = generateQuickSortSteps;

export const defaultInput = {
  array: [38, 27, 43, 3, 9, 82, 10],
};
