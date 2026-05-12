import type { AlgorithmMeta, Category } from "@/types/algorithm";

export const categories: Category[] = [
  {
    id: "search",
    slug: "search",
    algorithms: ["binary-search"],
  },
  {
    id: "sorting",
    slug: "sorting",
    algorithms: ["bubble-sort", "quick-sort"],
  },
];

export const algorithms: Record<string, AlgorithmMeta> = {
  "binary-search": {
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
  },
  "bubble-sort": {
    slug: "bubble-sort",
    category: "sorting",
    complexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
    },
    leetcodeTasks: [
      {
        number: 912,
        title: "Sort an Array",
        difficulty: "medium",
        url: "https://leetcode.com/problems/sort-an-array/",
      },
      {
        number: 75,
        title: "Sort Colors",
        difficulty: "medium",
        url: "https://leetcode.com/problems/sort-colors/",
      },
      {
        number: 26,
        title: "Remove Duplicates from Sorted Array",
        difficulty: "easy",
        url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
      },
      {
        number: 88,
        title: "Merge Sorted Array",
        difficulty: "easy",
        url: "https://leetcode.com/problems/merge-sorted-array/",
      },
    ],
    codeExamples: {
      typescript: `function bubbleSort(arr: number[]): void {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    // Last i elements are already in place
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap adjacent elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // If no swaps occurred, array is sorted
    if (!swapped) break;
  }
}

// Usage example
const unsorted = [64, 34, 25, 12, 22, 11, 90];
const sorted = [...unsorted]; // Copy to avoid mutating original
bubbleSort(sorted);
console.log(sorted); // [11, 12, 22, 25, 34, 64, 90]`,
      python: `def bubble_sort(arr: list[int]) -> None:
    n = len(arr)

    for i in range(n - 1):
        swapped = False

        # Last i elements are already in place
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                # Swap adjacent elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True

        # If no swaps occurred, array is sorted
        if not swapped:
            break

# Usage example
unsorted = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = unsorted.copy()  # Copy to avoid mutating original
bubble_sort(sorted_arr)
print(sorted_arr)  # [11, 12, 22, 25, 34, 64, 90]`,
    },
  },
  "quick-sort": {
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
  },
};

export function getAlgorithm(slug: string): AlgorithmMeta | undefined {
  return algorithms[slug];
}

export function getAllAlgorithms(): AlgorithmMeta[] {
  return Object.values(algorithms);
}

export function getAlgorithmsByCategory(categoryId: string): AlgorithmMeta[] {
  return Object.values(algorithms).filter((a) => a.category === categoryId);
}
