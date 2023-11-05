import { swapper } from '../Helpers/Swapper';


/**
 * Returns nested array with indices which will indicate if given indices must be swapped
 * based on the insertion sort algorithm.
 * [[index1: number, index2: number, swap: boolean], ...]
 */
export const insertionSort = async (array: number[], length: number) => {
    let steps: Array<[number, number, boolean]> = [];
    for (let i = 0; i < length - 1; ++i) {
        let j = i;
        while (j >= 0 && array[j] > array[j + 1]) {
            await swapper(array, j, j + 1);
            steps.push([j, j + 1, true]);
            --j;
        }
    }
    return steps;
};