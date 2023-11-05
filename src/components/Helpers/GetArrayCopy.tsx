/**
 * Returns a copy of the given array asyncronously
 * [list: number[]]
 */
export const getArrayCopy = async (array: {key: number}[]): Promise<number[]> => {
    let list: number[] = [];
    let length = array.length
    for (let i = 0; i < length; ++i) {
        list.push(Number(array[i].key));
    }
    return list;
};