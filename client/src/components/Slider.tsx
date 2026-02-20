import RCSlider from 'rc-slider';
import 'rc-slider/assets/index.css';
import React, { FC } from 'react';
import { MAX_BOARD_SIZE, MIN_BOARD_SIZE } from '../util/logic';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const Slider: FC<SliderProps> = ({ value, onChange }: SliderProps) => {
  const handleSliderChange = (nextValue: number | number[]) => {
    const normalizedValue = Array.isArray(nextValue) ? nextValue[0] : nextValue;

    if (typeof normalizedValue !== 'number' || Number.isNaN(normalizedValue)) {
      return;
    }

    onChange(normalizedValue);
  };

  return (
    <div className="w-96">
      <RCSlider
        min={MIN_BOARD_SIZE}
        max={MAX_BOARD_SIZE}
        step={1}
        value={value}
        onChange={handleSliderChange}
      ></RCSlider>
    </div>
  );
};
