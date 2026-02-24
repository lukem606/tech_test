import React, { FC } from 'react';
import { XorO } from '../types';
import { Square } from './Square';

interface GameBoardProps {
  board: (XorO | undefined)[][];
  onClickSquare: (rowIndex: number, columnIndex: number) => void;
}

export const GameBoard: FC<GameBoardProps> = ({ board, onClickSquare }: GameBoardProps) => {
  return (
    <div className={`rounded-md flex flex-col gap-1 bg-white p-2 text-black`}>
      {board.map((row, rowIndex) => (
        <div className="flex gap-1">
          {row.map((column, columnIndex) => (
            <Square
              key={`square-${rowIndex}-${columnIndex}`}
              value={column}
              onClickSquare={() => onClickSquare(rowIndex, columnIndex)}
            ></Square>
          ))}
        </div>
      ))}
    </div>
  );
};
