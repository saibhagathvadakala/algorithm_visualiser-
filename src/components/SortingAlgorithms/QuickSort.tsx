import { swapper } from '../Helpers/Swapper';


/**
 * Returns nested array with indices which will indicate if given indices must be swapped
 * based on the quick sort algorithm.
 * [[index1: number, index2: number, swap: boolean], ...]
 */
export const quickSort = async (array: number[], length: number) => {
    let steps: Array<[number, number, boolean]> = [];
    await divider(steps, array, 0, length-1);
    return steps;
};

const divider = async(steps: Array<[number, number, boolean]>, array: number[], start: number, end: number) => {
    if(start < end) {
        let pivot = await partition(steps, array, start, end);
        await divider(steps, array, start, pivot - 1);
        await divider(steps, array, pivot + 1, end);
    }
};

const partition = async (steps: Array<[number, number, boolean]>, array: number[], start: number, end: number) => {
    let prevIndex = start - 1;
    for (let index = start; index < end; ++index) {
        if (index !== end) {
            steps.push([index, end, !true]);
        }
        if (array[index] < array[end]) {
            ++prevIndex;
            await swapper(array, index, prevIndex);
            steps.push([index, prevIndex, true]);
        }
    }
    await swapper(array, prevIndex + 1, end);
    steps.push([end, prevIndex + 1, true]);
    return prevIndex + 1;
};