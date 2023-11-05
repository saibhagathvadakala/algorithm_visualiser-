import { swapper } from '../Helpers/Swapper';


/**
 * Returns nested array with indices which will indicate if given indices must be swapped
 * based on the selection sort algorithm.
 * [[index1: number, index2: number, swap: boolean], ...]
 */
export const selectionSort = async (array: number[], length: number) => {
    let steps: Array<[number, number, boolean]> = [];
    for(let i = 0 ; i < length-1 ; ++i) {
        let minIndex = i;
        for(let j = i+1 ; j < length ; ++j) {
            if(array[j] < array[minIndex]) {
                minIndex = j;
            }
            steps.push([j, minIndex, !true]);
        }
        await swapper(array, i, minIndex);
        steps.push([i, minIndex, true]);
    }
    return steps;
};