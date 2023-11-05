import React from 'react'
import './Elements.css'

/**
 * Element selection UI component
 */
interface ElementProps {
  elements: number;
  onChange: (option: string, elements: number) => void;
}


const Elements: React.FC<ElementProps> = (props) => {
  return (
    <span className='elementSelect'>
        <label className='elementLabel'>
            Number of elements:
        </label>
        <input
            className='int_input'
            type='number'
            min={1}
            max={100}
            defaultValue={props.elements}
            onChange={(event) => props.onChange("elements", parseInt(event.target.value))}
        />
    </span>
  )
}

export default Elements