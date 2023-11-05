import { swapper } from '../Helpers/Swapper';


/**
 * Returns nested array with indices which will indicate if given indices must be swapped
 * based on the bubble sort algorithm.
 * [[index1: number, index2: number, swap: boolean], ...]
 */
export const bubbleSort = async (array: number[], length: number) => {
    let steps: Array<[number, number, boolean]> = [];
    for (let i = 0; i < length - 1; ++i) {
        for (let j = 0; j < length - i - 1; ++j) {
            if (array[j] > array[j + 1]) {
                await swapper(array, j, j + 1);
                steps.push([j, j + 1, true]);
            }
            else {
                steps.push([j, j + 1, !true]);
            }
        }
    }
    return steps;
};