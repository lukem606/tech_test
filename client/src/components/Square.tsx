import React, { FC } from 'react';
import { Player } from '../enums';

interface SquareProps {
  value: string | undefined;
  onClickSquare: () => void;
}

export const Square: FC<SquareProps> = ({ value, onClickSquare }: SquareProps) => {
  return (
    <div
      onClick={onClickSquare}
      className="rounded-md border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex"
    >
      {value}
    </div>
  );
};
