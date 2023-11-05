/**
 * Swaps two elements of a given array asyncronously
 */
export const swapper = async (array: any[], index1: number, index2: number) => {
    let temp: number = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
};