import React, { useState } from 'react';
import './InputField.css'

/**
 * InputField UI component
 */

// Components
import Elements from './Elements/Elements';
import Algorithms from './Algorithms/Algorithms';
import Speed from './Speed/Speed'

interface Variables {
  algorithms: string[];
  elements: number;
  speed: number;
}

interface InputFieldProps {
  start: () => void;
  randomise: (value: number) => void;
  onChange: (option: string, value:any) => void;
}

const InputField: React.FC<InputFieldProps> = ({ start, randomise, onChange }) => {
  /* eslint-disable */
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Bubble sort');
  const [numberOfElements, setNumberOfElements] = useState(10);
  const [speed, setSpeed] = useState(10);
  /* eslint-enable */

  // Component Functions
  const handleElementChange = (option: string, chosenElements: number) => {
    setNumberOfElements(chosenElements);
    onChange(option, chosenElements)
  };

  const handleAlgorithmChange = (option: string, chosenAlgorithm: string) => {
    setSelectedAlgorithm(chosenAlgorithm);
    onChange(option, chosenAlgorithm);
  };

  const handleSpeedChange = (option: string, chosenSpeed: number) => {
    setSpeed(chosenSpeed);
    onChange(option, chosenSpeed)
  };

  const setRandomColour = (button: HTMLButtonElement) => {
    const colours = ['#cdeeed', '#f4a7b9', '#a7f4b9', '#cb95d9', '#79b6c7', '#f0d3cd'];
    const randomColour = colours[Math.floor(Math.random() * colours.length)];
    button.style.backgroundColor = randomColour;
  }

  let variables: Variables = {
    algorithms: ['Bubble Sort', 'Quick Sort', 'Insertion Sort', 'Merge Sort', 'Heap Sort', 'Selection Sort'],
    elements: 10,
    speed: 10
};


  return (
    <form className='inputInterface' onSubmit={(e) => e.preventDefault()}>
      <Elements onChange={handleElementChange} elements={variables.elements} />
      {/* DEBUG: Print numberOfElements elements to interface*/}
      {/* {numberOfElements} */}
      
      <Algorithms onChange={handleAlgorithmChange} algorithms={variables.algorithms} />
      {/* DEBUG: Print selectedAlgorithm to interface*/}
      {/* {selectedAlgorithm} */}

      <Speed onChange={handleSpeedChange} speed={variables.speed} />
      {/* DEBUG: Print speed to interface*/}
      {/* {speed} */}

      <div className='buttons'>
        <button
          type='button'
          className='randomizeButton'
          onMouseOver={(e) => {
            setRandomColour(e.currentTarget as HTMLButtonElement);
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f0f0'
          }}
          onClick={() => randomise(1)}
        >
          Randomize Numbers
        </button>
        <button type='button' className='sortButton' onClick={start}>Start Sorting</button>
      </div>
    </form>
  )
}

export default InputField