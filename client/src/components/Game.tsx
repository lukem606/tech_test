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
    <div className="flex flex-col mt-10 items-center gap-10">
      {!isInProgress && (
        <>
          <div className="text-sm">Drag the slider to resize the board</div>
          <Slider value={boardSize} onChange={onSliderChange}></Slider>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onStart}
          >
            Start game
          </button>
        </>
      )}

      <GameBoard board={board} onClickSquare={onClickSquare}></GameBoard>

      {winner && (
        <div>
          <div className="flex flex-row justify-center items-center mb-2">{winner} wins</div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onReset}
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
};
