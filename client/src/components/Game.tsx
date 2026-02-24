import React, { FC } from 'react';
import { XorO } from '../types';
import { Player } from '../enums';
import { Slider } from './Slider';
import { GameBoard } from './GameBoard';

interface GameProps {
  board: (XorO | undefined)[][];
  boardSize: number;
  winner: XorO | undefined;
  isInProgress: boolean;
  onClickSquare: (rowIndex: number, columnIndex: number) => void;
  onReset: () => void;
  onSliderChange: (value: number) => void;
  onStart: () => void;
}

export const Game: FC<GameProps> = ({
  board,
  boardSize,
  winner,
  isInProgress,
  onClickSquare,
  onReset,
  onSliderChange,
  onStart,
}: GameProps) => {
  return (
    <div className="flex flex-col items-center gap-5 w-[700px]">
      {!isInProgress && (
        <>
          <div className="text-sm">Drag the slider to resize the board</div>
          <Slider value={boardSize} onChange={onSliderChange}></Slider>
          <button
            className="bg-light-green hover:bg-darkest-green hover:text-white text-darkest-green font-bold py-2 px-4 rounded"
            onClick={onStart}
          >
            Start game
          </button>
        </>
      )}

      {winner && (
        <div>
          <div className="flex flex-row justify-center items-center mb-2">{winner} wins</div>
          <button
            className="bg-light-green hover:bg-darkest-green hover:text-white text-darkest-green font-bold py-2 px-4 rounded"
            onClick={onReset}
          >
            Play again
          </button>
        </div>
      )}

      <GameBoard board={board} onClickSquare={onClickSquare}></GameBoard>
    </div>
  );
};
