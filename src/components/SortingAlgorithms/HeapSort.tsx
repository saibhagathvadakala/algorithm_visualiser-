import { swapper } from '../Helpers/Swapper';


/**
 * Returns nested array with indices which will indicate if given indices must be swapped
 * based on the heap sort algorithm.
 * [[index1: number, index2: number, swap: boolean], ...]
 */
export const heapSort = async (array: number[], length: number) => {
    let steps: Array<[number, number, boolean]> = [];
    for (let index = Math.ceil(length / 2) - 1; index >= 0; --index) {
        await heapify(steps, array, length, index);
    }
    for (let index = length - 1; index >= 0; --index) {
        steps.push([index, 0, true]);
        await swapper(array, index, 0);
        await heapify(steps, array, index, 0);
    }
    return steps;
};

const heapify = async (steps: Array<[number, number, boolean]>, array: number[], length: number, index: number) => {
    let largest = index;
    let left = 2 * index + 1, right = 2 * index + 2;
    
    if (left < length && array[left] > array[largest]) {
        largest = left;
    }
    if (right < length && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== index) {
        steps.push([index, largest, true]);
        await swapper(array, index, largest);
        await heapify(steps, array, length, largest);
    }
};