import type { QuickSortStep } from "@/types/algorithm";

/**
 * Generates all steps of quick sort algorithm (Lomuto partition) for visualization.
 * @param inputArray - array of numbers to sort
 * @returns array of steps representing the algorithm execution
 */
export function generateQuickSortSteps(inputArray: number[]): QuickSortStep[] {
  const steps: QuickSortStep[] = [];
  const array = [...inputArray];
  const sortedIndices: number[] = [];

  // Initial state
  steps.push({
    type: "initial",
    array: [...array],
    range: [0, array.length - 1],
    pivotIndex: -1,
    comparing: null,
    swapping: null,
    sortedIndices: [...sortedIndices],
    descriptionKey: "algorithms.quick-sort.steps.initial",
    descriptionParams: {},
  });

  function partition(low: number, high: number) {
    const pivotValue = array[high];

    // Select pivot step
    steps.push({
      type: "selectPivot",
      array: [...array],
      range: [low, high],
      pivotIndex: high,
      comparing: null,
      swapping: null,
      sortedIndices: [...sortedIndices],
      descriptionKey: "algorithms.quick-sort.steps.selectPivot",
      descriptionParams: { pivot: pivotValue, index: high },
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      // Compare step
      steps.push({
        type: "compare",
        array: [...array],
        range: [low, high],
        pivotIndex: high,
        comparing: j,
        swapping: null,
        sortedIndices: [...sortedIndices],
        descriptionKey: "algorithms.quick-sort.steps.compare",
        descriptionParams: {
          value: array[j],
          index: j,
          pivot: pivotValue,
        },
      });

      if (array[j] <= pivotValue) {
        i++;

        if (i !== j) {
          // Swap step
          const valI = array[i];
          const valJ = array[j];
          [array[i], array[j]] = [array[j], array[i]];

          steps.push({
            type: "swap",
            array: [...array],
            range: [low, high],
            pivotIndex: high,
            comparing: null,
            swapping: [i, j],
            sortedIndices: [...sortedIndices],
            descriptionKey: "algorithms.quick-sort.steps.swap",
            descriptionParams: {
              valI,
              valJ,
              indexI: i,
              indexJ: j,
            },
          });
        } else {
          // No swap needed (i === j)
          steps.push({
            type: "noSwap",
            array: [...array],
            range: [low, high],
            pivotIndex: high,
            comparing: j,
            swapping: null,
            sortedIndices: [...sortedIndices],
            descriptionKey: "algorithms.quick-sort.steps.noSwap",
            descriptionParams: { value: array[j], index: j },
          });
        }
      } else {
        // Element greater than pivot, no swap
        steps.push({
          type: "noSwapGreater",
          array: [...array],
          range: [low, high],
          pivotIndex: high,
          comparing: j,
          swapping: null,
          sortedIndices: [...sortedIndices],
          descriptionKey: "algorithms.quick-sort.steps.noSwapGreater",
          descriptionParams: { value: array[j], pivot: pivotValue },
        });
      }
    }

    // Place pivot in its final position
    const pivotFinalPos = i + 1;
    if (pivotFinalPos !== high) {
      const valPivot = array[high];
      const valAtPos = array[pivotFinalPos];
      [array[pivotFinalPos], array[high]] = [array[high], array[pivotFinalPos]];

      steps.push({
        type: "pivotPlaced",
        array: [...array],
        range: [low, high],
        pivotIndex: pivotFinalPos,
        comparing: null,
        swapping: [pivotFinalPos, high],
        sortedIndices: [...sortedIndices],
        descriptionKey: "algorithms.quick-sort.steps.pivotPlaced",
        descriptionParams: {
          pivot: valPivot,
          position: pivotFinalPos,
          swappedWith: valAtPos,
        },
      });
    } else {
      // Pivot is already in place
      steps.push({
        type: "pivotPlaced",
        array: [...array],
        range: [low, high],
        pivotIndex: pivotFinalPos,
        comparing: null,
        swapping: null,
        sortedIndices: [...sortedIndices],
        descriptionKey: "algorithms.quick-sort.steps.pivotPlaced",
        descriptionParams: {
          pivot: array[pivotFinalPos],
          position: pivotFinalPos,
          swappedWith: array[pivotFinalPos],
        },
      });
    }

    sortedIndices.push(pivotFinalPos);

    return pivotFinalPos;
  }

  function quickSort(low: number, high: number) {
    if (low < high) {
      const pivotIndex = partition(low, high);
      quickSort(low, pivotIndex - 1);
      quickSort(pivotIndex + 1, high);
    } else if (low === high) {
      // Single element is already sorted
      sortedIndices.push(low);
    }
  }

  quickSort(0, array.length - 1);

  // Final sorted state
  steps.push({
    type: "sorted",
    array: [...array],
    range: [0, array.length - 1],
    pivotIndex: -1,
    comparing: null,
    swapping: null,
    sortedIndices: array.map((_, i) => i),
    descriptionKey: "algorithms.quick-sort.steps.sorted",
    descriptionParams: {},
  });

  return steps;
}
