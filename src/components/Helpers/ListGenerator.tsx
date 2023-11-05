/**
 * Generates and returns a random array/list of elements from 1-100 with a given number of elements 
 */
const listGenerator = (elements: number) => {
    let list: any[] = [];
    let min = 1, max = 100;
    for (let counter = 0; counter < elements ; ++counter) {
        let num: number = Math.floor(Math.random() * (max - min + 1) + min);
        list.push({key: num, classType: 'normal'});
    }
    return list;
};

export default listGenerator;