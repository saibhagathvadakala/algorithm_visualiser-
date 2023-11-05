import React, { useState } from 'react';
import './Speed.css'

/**
 * Speed selection UI component
 */
interface SpeedProps {
    speed: number;
    onChange: (option: string, speed: number) => void;
}


const Speed: React.FC<SpeedProps> = (props) => {
    const [speedValue, setSpeedValue] = useState(props.speed);

    return (
    <div className='speedSelect'>
        <label className='speedLabel'>
            Sorting Speed:
        </label>
        <input 
            className='speedSlider'
            type='range'
            min={1}
            max={50}
            defaultValue={props.speed}
            onChange={(event) => {
                const newSpeed = parseInt(event.target.value);
                props.onChange("speed" ,newSpeed);
                setSpeedValue(newSpeed);
            }}
        />
        <p>{speedValue}x</p>
        <p className='speedWarning'>(Note: Higher number of elements is slower!)</p>
    </div>
    )
}

export default Speed