import RCSlider from 'rc-slider';
import 'rc-slider/assets/index.css';
import React, { FC, useState } from 'react';

interface SliderProps {
    onChange: (value: number) => void
}

export const Slider: FC<SliderProps> = ({ onChange }: SliderProps) => {
    const [value, setValue] = useState<number>(3);

    const handleChange = (value: number) => {
        setValue(value);
        onChange(value);
    }

    return <div className='w-96'>
        <RCSlider min={3} max={15} value={value} onChange={handleChange}></RCSlider>
    </div>
}