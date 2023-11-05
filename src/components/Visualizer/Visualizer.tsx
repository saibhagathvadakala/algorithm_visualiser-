import React, { useState, useEffect } from 'react';
import './Visualizer.css';

/**
 * Visualizer main application component
 */

// Components
import InputField from '../InputField/InputField';
import Display from '../Display/Display';

// Helpers
import listGenerator from '../Helpers/ListGenerator';
import timeout from '../Helpers/Timeout';

// Algorithms
import { getArrayCopy } from '../Helpers/GetArrayCopy';
import { bubbleSort } from '../SortingAlgorithms/BubbleSort';
import { quickSort } from '../SortingAlgorithms/QuickSort';
import { insertionSort } from '../SortingAlgorithms/InsertionSort';
import { mergeSort } from '../SortingAlgorithms/MergeSort';
import { heapSort } from '../SortingAlgorithms/HeapSort';
import { selectionSort } from '../SortingAlgorithms/SelectionSort';

const Visualizer: React.FC = () => {
  /* eslint-disable */
  const [list, setList] = useState<{ key: number; classType: string }[]>([]);
  const [numberOfElements, setNumberOfElements] = useState<number>(10);
  const [speed, setSpeed] = useState<number>(10);
  const [algorithm, setAlgorithm] = useState<string>('Bubble Sort');
  const [isRunning, setIsRunning] = useState(false);


  //Initial generation of new list, and updates other elements on variable change
  useEffect(() => {
    onChange("", null);
    generateList();
  }, [list, numberOfElements, isRunning]);
  /* eslint-enable */


  // Component functions

  // Handles changes in the algorithm, the number of elements, or the speed
  const onChange = (option: string, value: any): void => {
    if (option === 'algorithm' && !isRunning) {
      setAlgorithm(value);
      // console.log('Algorithm set to: ', value); //DEBUG: Prints algorithm change to console
    }
    else if ((option === 'elements' && (value > 0 && value <= 100) && !isRunning)) {
      setNumberOfElements(value);
      generateList();
      // console.log('Number of elements changed to:', value); //DEBUG: Prints element change to console
    }
    else if (option === 'speed' && !isRunning) {
      setSpeed(value);
      // console.log('Speed is set to:', value); //DEBUG: Prints speed change to console
    }
  }

  // Generates a new list of elements whilst not locked
  const generateList = (value: number = 0) => {
    if ((list.length !== numberOfElements && !isRunning) || (Number(value) === 1 && !isRunning)) {
      let newList: { key: number; classType: string }[] = listGenerator(numberOfElements).map(item => ({
        key: item.key,
        classType: 'normal',
      }));
      setList(newList);
      // console.log('New list generated'); //DEBUG: Prints new list generation to console
    }
  };

  // Locks variable changes and buttons
  const lock = (status: boolean) => {
    setIsRunning(status);
  };

  // Initiates the sorting process
  const startSorting = async () => {
    if (!isRunning){
      lock(true)
      // console.log('Starting sorting...'); //DEBUG: Prints sorting start to console
      let moves = await getSteps(algorithm);
      await visualizeSteps(moves);
      await updateCelldone();
      lock(false);
      // console.log('Finished sorting'); //DEBUG: Prints sorting end to console
    }
  }

  // Retrieves the sorting steps for the selected algorithm
  const getSteps = async (method: string) => {
    let steps: any[] = [];
    let array = await getArrayCopy(list);
    
    if (method === 'Bubble Sort') {
      steps = await bubbleSort(array, array.length);
    }
    if (method === 'Quick Sort') {
      steps = await quickSort(array, array.length);
    }
    if (method === 'Insertion Sort') {
      steps = await insertionSort(array, array.length);
    }
    if (method === 'Merge Sort') {
      steps = await mergeSort(array, array.length);
    }
    if (method === 'Heap Sort') {
      steps = await heapSort(array, array.length);
    }
    if (method === 'Selection Sort') {
      steps = await selectionSort(array, array.length);
    }
    return steps;
  }

  // Determines appropriate visualization method based on given sorting algorithm
  const visualizeSteps = async (steps: any[]) => {
    if (steps.length === 0) {
      return;
    }
    if (steps[0][3]) {
      await visualizeStepsWithRange(steps);
    }
    else {
      await visualizeStepsBySwapping(steps);
    }
  }

  // visualizes steps within a range of indices and updates element classes accordingly
  const visualizeStepsWithRange = async (steps: any[]) => {
    let previousRange: number[] = [];
    while (steps.length > 0 && steps[0].length === 4) {
      if (previousRange !== steps[0][2]) {
        await updateElementClass(previousRange, 'normal');
        previousRange = steps[0][2];
        await updateElementClass(steps[0][2], 'current');
      }
      await updateElementValue([steps[0][0], steps[0][1]]);
      steps.shift();
    }
    await visualizeSteps(steps);
  }

  // visualizes steps along two adjacent indices and updates element classes accordingly.
  const visualizeStepsBySwapping = async (steps: any[]) => {
    while (steps.length > 0) {
      let currentStep = steps[0];
      if (currentStep.length !== 3) {
        await visualizeSteps(steps);
        return;
      }
      else {
        let indices: number[] = [currentStep[0], currentStep[1]];
        await updateElementClass(indices, 'current');
        if (currentStep[2] === true) {
          await updateList(indices);
        }
        await updateElementClass(indices, 'normal');
      }
      steps.shift();
    }
  }

  // Updates the state with a new list and adds a delay based on the specified speed.
  const updateStateChanges = async (newList: { key: number; classType: string }[]) => {
    setList(newList);
    await timeout(speed);
  };

  // Updates the list by swapping elements at the provided indices and then calls updateStateChanges to update the state.
  const updateList = async (indices: any[]) => {
    let array = [...list];
    let stored = array[indices[0]].key;
    array[indices[0]].key = array[indices[1]].key;
    array[indices[1]].key = stored;
    await updateStateChanges(array);
  }

  // Updates the value of an element at a given index and calls updateStateChanges to update the state.
  const updateElementValue = async (indices: [number, number]) => {
    let array = [...list];
    array[indices[0]].key = indices[1];
    await updateStateChanges(array);
  }

  // Updates the class type of elements at specified indices and calls updateStateChanges to update the state
  const updateElementClass = async (indices: number[], classType: string) => {
    const updatedList = list.map((element, index) => {
      if (indices.includes(index)) {
        return { ...element, classType };
      }
      return element; 
    });
  
    await updateStateChanges(updatedList);
  };

  // Marks all elements as 'done' by updating their class types.
  const updateCelldone = async () => {
    let indices = [];
    for (let i = 0; i < numberOfElements; i++) {
      indices.push(i);
    }
    await updateElementClass(indices, 'done');
  }

  return (
    <>
      <header className="title">
        <h2>Sorting Algorithm Visualizer</h2>
      </header>
      <div className='visualizer'>
        <div className='leftSide'>
          <div className='visualization'>
            <Display list={list}/>
          </div>  
        </div>
        <div className='rightSide'>
          <div className='controls'>
            <InputField 
              start={startSorting}
              randomise={generateList}
              onChange={onChange}  
            />
          </div>
        </div>
      </div>
      <footer className='footer'>
        <h3>Come by and say Hi!:&nbsp;</h3>
        <a href='https://github.com/AlexTuTruong'>Alex Tu</a>
      </footer>
    </>
  )

}

export default Visualizer