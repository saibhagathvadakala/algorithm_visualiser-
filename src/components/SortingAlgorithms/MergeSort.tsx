/**
 * Returns nested array with indices which will indicate if given indices must be swapped,
 * indices involved and that these steps are based on the merge sort algorithm
 * [[index1: number, index2: number, swap: boolean], ...]
 */
export const mergeSort = async (array: number[], length: number) => {
    let steps: Array<[number, number, number[], boolean]> = [];
    await divide(array, steps, 0, length - 1);
    return steps;
};

const divide = async (array: number[], steps: Array<[number, number, number[], boolean]>, start: number, end: number) => {
    if (start < end) {
        let mid = Math.floor((end + start) / 2);
        await divide(array, steps, start, mid);
        await divide(array, steps, mid + 1, end);
        await merge(array, steps, start, mid, end);
    }
};

const merge = async (array: number[], steps: Array<[number, number, number[], boolean]>, start: number, mid: number, end: number) => {
    let sortedArray: number[] = [];
    let i = start, j = mid + 1;
    while (i <= mid && j <= end) {
        if (array[i] <= array[j]) sortedArray.push(array[i++]);
        else sortedArray.push(array[j++]);
    }
    while(i <= mid) {
        sortedArray.push(array[i++]);
    }
    while(j <= end) {
        sortedArray.push(array[j++]);
    }

    let indices: number[] = [];
    for(let i = start ; i <= end ; ++i) {
        indices.push(i);
    }
    for(let i = start ; i <= end ; ++i) {
        array[i] = sortedArray[i - start];
        steps.push([i, array[i], indices, true]);
    }
};