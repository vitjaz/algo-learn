import type { SelectionSortStep } from "@/types/algorithm";

/**
 * Generates all steps of selection sort algorithm for visualization.
 * @param inputArray - array of numbers to sort
 * @returns array of steps representing the algorithm execution
 */
export function generateSelectionSortSteps(
  inputArray: number[],
): SelectionSortStep[] {
  const steps: SelectionSortStep[] = [];
  const array = [...inputArray];
  const sortedIndices: number[] = [];

  // Initial state
  steps.push({
    type: "initial",
    array: [...array],
    range: [0, array.length - 1],
    minIndex: null,
    comparing: null,
    swapping: null,
    sortedIndices: [...sortedIndices],
    descriptionKey: "algorithms.selection-sort.steps.initial",
    descriptionParams: {},
  });

  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // Start scanning for minimum
    steps.push({
      type: "scanMin",
      array: [...array],
      range: [i, n - 1],
      minIndex: minIdx,
      comparing: null,
      swapping: null,
      sortedIndices: [...sortedIndices],
      descriptionKey: "algorithms.selection-sort.steps.scanMin",
      descriptionParams: { value: array[minIdx], index: minIdx },
    });

    for (let j = i + 1; j < n; j++) {
      // Compare step
      steps.push({
        type: "compare",
        array: [...array],
        range: [i, n - 1],
        minIndex: minIdx,
        comparing: j,
        swapping: null,
        sortedIndices: [...sortedIndices],
        descriptionKey: "algorithms.selection-sort.steps.compare",
        descriptionParams: {
          current: array[j],
          min: array[minIdx],
          index: j,
        },
      });

      if (array[j] < array[minIdx]) {
        minIdx = j;

        // New minimum found
        steps.push({
          type: "newMin",
          array: [...array],
          range: [i, n - 1],
          minIndex: minIdx,
          comparing: null,
          swapping: null,
          sortedIndices: [...sortedIndices],
          descriptionKey: "algorithms.selection-sort.steps.newMin",
          descriptionParams: { value: array[minIdx], index: minIdx },
        });
      }
    }

    // Swap minimum with current position
    if (minIdx !== i) {
      const valI = array[i];
      const valMin = array[minIdx];
      [array[i], array[minIdx]] = [array[minIdx], array[i]];

      steps.push({
        type: "swap",
        array: [...array],
        range: [i, n - 1],
        minIndex: null,
        comparing: null,
        swapping: [i, minIdx],
        sortedIndices: [...sortedIndices],
        descriptionKey: "algorithms.selection-sort.steps.swap",
        descriptionParams: {
          valI,
          valMin,
          indexI: i,
          indexMin: minIdx,
        },
      });
    }

    sortedIndices.push(i);
  }

  // Last element is automatically sorted
  sortedIndices.push(n - 1);

  // Final sorted state
  steps.push({
    type: "sorted",
    array: [...array],
    range: [0, n - 1],
    minIndex: null,
    comparing: null,
    swapping: null,
    sortedIndices: array.map((_, i) => i),
    descriptionKey: "algorithms.selection-sort.steps.sorted",
    descriptionParams: {},
  });

  return steps;
}
