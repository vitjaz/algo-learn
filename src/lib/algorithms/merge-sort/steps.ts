import type { MergeSortStep } from "@/types/algorithm";

/**
 * Generates all steps of merge sort algorithm for visualization.
 * @param inputArray - array of numbers to sort
 * @returns array of steps representing the algorithm execution
 */
export function generateMergeSortSteps(inputArray: number[]): MergeSortStep[] {
  const steps: MergeSortStep[] = [];
  const array = [...inputArray];
  const sortedIndices: number[] = [];

  // Initial state
  steps.push({
    type: "initial",
    array: [...array],
    range: [0, array.length - 1],
    leftRange: null,
    rightRange: null,
    leftIndex: null,
    rightIndex: null,
    placing: null,
    sortedIndices: [],
    descriptionKey: "algorithms.merge-sort.steps.initial",
    descriptionParams: {},
  });

  function mergeSort(left: number, right: number) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    // Split step
    steps.push({
      type: "split",
      array: [...array],
      range: [left, right],
      leftRange: [left, mid],
      rightRange: [mid + 1, right],
      leftIndex: null,
      rightIndex: null,
      placing: null,
      sortedIndices: [...sortedIndices],
      descriptionKey: "algorithms.merge-sort.steps.split",
      descriptionParams: { left, mid, right },
    });

    mergeSort(left, mid);
    mergeSort(mid + 1, right);
    merge(left, mid, right);
  }

  function merge(left: number, mid: number, right: number) {
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);
    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
      // Compare step
      steps.push({
        type: "compare",
        array: [...array],
        range: [left, right],
        leftRange: [left, mid],
        rightRange: [mid + 1, right],
        leftIndex: i,
        rightIndex: j,
        placing: null,
        sortedIndices: [...sortedIndices],
        descriptionKey: "algorithms.merge-sort.steps.compare",
        descriptionParams: {
          leftVal: leftArr[i],
          rightVal: rightArr[j],
        },
      });

      if (leftArr[i] <= rightArr[j]) {
        array[k] = leftArr[i];
        steps.push({
          type: "place",
          array: [...array],
          range: [left, right],
          leftRange: [left, mid],
          rightRange: [mid + 1, right],
          leftIndex: i,
          rightIndex: j,
          placing: k,
          sortedIndices: [...sortedIndices],
          descriptionKey: "algorithms.merge-sort.steps.placeLeft",
          descriptionParams: {
            value: leftArr[i],
            position: k,
          },
        });
        i++;
      } else {
        array[k] = rightArr[j];
        steps.push({
          type: "place",
          array: [...array],
          range: [left, right],
          leftRange: [left, mid],
          rightRange: [mid + 1, right],
          leftIndex: i,
          rightIndex: j,
          placing: k,
          sortedIndices: [...sortedIndices],
          descriptionKey: "algorithms.merge-sort.steps.placeRight",
          descriptionParams: {
            value: rightArr[j],
            position: k,
          },
        });
        j++;
      }
      k++;
    }

    // Copy remaining elements from leftArr
    while (i < leftArr.length) {
      array[k] = leftArr[i];
      steps.push({
        type: "place",
        array: [...array],
        range: [left, right],
        leftRange: [left, mid],
        rightRange: [mid + 1, right],
        leftIndex: i,
        rightIndex: null,
        placing: k,
        sortedIndices: [...sortedIndices],
        descriptionKey: "algorithms.merge-sort.steps.placeRemaining",
        descriptionParams: {
          value: leftArr[i],
          position: k,
        },
      });
      i++;
      k++;
    }

    // Copy remaining elements from rightArr
    while (j < rightArr.length) {
      array[k] = rightArr[j];
      steps.push({
        type: "place",
        array: [...array],
        range: [left, right],
        leftRange: [left, mid],
        rightRange: [mid + 1, right],
        leftIndex: null,
        rightIndex: j,
        placing: k,
        sortedIndices: [...sortedIndices],
        descriptionKey: "algorithms.merge-sort.steps.placeRemaining",
        descriptionParams: {
          value: rightArr[j],
          position: k,
        },
      });
      j++;
      k++;
    }

    // If this is the final merge (entire array), mark all as sorted
    if (left === 0 && right === array.length - 1) {
      for (let idx = 0; idx < array.length; idx++) {
        sortedIndices.push(idx);
      }
    }

    // Merge complete step
    steps.push({
      type: "mergeComplete",
      array: [...array],
      range: [left, right],
      leftRange: [left, mid],
      rightRange: [mid + 1, right],
      leftIndex: null,
      rightIndex: null,
      placing: null,
      sortedIndices: [...sortedIndices],
      descriptionKey: "algorithms.merge-sort.steps.mergeComplete",
      descriptionParams: { left, right },
    });
  }

  mergeSort(0, array.length - 1);

  // Final sorted state
  steps.push({
    type: "sorted",
    array: [...array],
    range: [0, array.length - 1],
    leftRange: null,
    rightRange: null,
    leftIndex: null,
    rightIndex: null,
    placing: null,
    sortedIndices: array.map((_, i) => i),
    descriptionKey: "algorithms.merge-sort.steps.sorted",
    descriptionParams: {},
  });

  return steps;
}
