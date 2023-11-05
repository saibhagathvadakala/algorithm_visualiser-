import React from 'react'
import './Algorithms.css'

/**
 * Algorithm selection UI component
 */
interface AlgorithmProps {
  algorithms: String[];
  onChange: (option: string, algorithm: string) => void;
}


const Algorithms: React.FC<AlgorithmProps> = (props) => {
  return (
    <span className='algorithmSelect'>
      <label className='algorithmLabel'>
        Sorting Algorithm:
      </label>
      <select 
        name='Algorithm'
        className='algorithmDropdown'
        id='aglorithmId'
        onChange={(event) => props.onChange('algorithm', event.target.value)}
      >
        {props.algorithms.map((algorithm, index) => (
          <option key={index}>
            {algorithm}
          </option>
        ))}
      </select>
    </span>
  )
}

export default Algorithms