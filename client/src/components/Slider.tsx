import RCSlider from 'rc-slider';
import 'rc-slider/assets/index.css';
import React, { FC, useState } from 'react';

interface SliderProps {
    value: number;
    onChange: (value: number) => void;
}

export const Slider: FC<SliderProps> = ({ value, onChange }: SliderProps) => {
    return <div className='w-96'>
        <RCSlider min={3} max={15} value={value} onChange={onChange}></RCSlider>
    </div>
}