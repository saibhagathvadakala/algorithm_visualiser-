import React from 'react'
import './Display.css'


interface DisplayProps {
  list: { key: number; classType: string }[];
}

const Display: React.FC<DisplayProps> = (props) => {
  // Component functions
  const getClass = (value: string) => {
    if (value === 'normal') {
      return 'cell';
    }
    else if (value === 'current') {
      return 'cell current';
    }
    return 'cell done';
  };


  return (
    <div className='display'>
      <div className='list'>
        {props.list.map((element, index) => (
          <div
            className={getClass(element.classType)}
            key={index}
            style={{height : `${element.key - .5}%`}}
            data-value={element.key}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Display