import React, { useState } from 'react';

import { Board } from './components/Board';
import { Slider } from './components/Slider';
import { CurrentPlayer } from './enums';
import { XorO } from './types';
import { createBoard, isWinConditionMet } from './util/logic';

const INITIAL_BOARD_SIZE = 3;

export const Main = () => {
  const [boardSize, setBoardSize] = useState<number>(INITIAL_BOARD_SIZE);
  const [board, setBoard] = useState<(XorO | undefined)[][]>(createBoard(INITIAL_BOARD_SIZE));
  const [currentPlayer, setCurrentPlayer] = useState<XorO>(CurrentPlayer.X);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);
  const [winner, setWinner] = useState<XorO | undefined>(undefined);

  const handleSliderChange = (value: number) => {
    const resizedBoard = createBoard(value);
    setBoard(resizedBoard);
    setBoardSize(value);
  };

  const handleStart = (): void => {
    setIsInProgress(true);
  };

  const handleReset = (): void => {
    setIsInProgress(false);
    setWinner(undefined);
    setBoard(createBoard(board.length));
    setCurrentPlayer(CurrentPlayer.X);
  };

  const handleClickSquare = (rowIndex: number, columnIndex: number): void => {
    if (!isInProgress || winner || board[rowIndex][columnIndex]) {
      return;
    }

    const updatedBoard = board.map((row) => [...row]);
    updatedBoard[rowIndex][columnIndex] = currentPlayer;
    setBoard(updatedBoard);

    if (isWinConditionMet({ board: updatedBoard, player: currentPlayer, rowIndex, columnIndex })) {
      setWinner(currentPlayer);
      return;
    }

    setCurrentPlayer(currentPlayer === CurrentPlayer.X ? CurrentPlayer.O : CurrentPlayer.X);
  };

  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <div className="font-bold text-2xl">Tic Tac Toe</div>

      {!isInProgress && (
        <>
          <div className="text-sm">Drag the slider to resize the board</div>
          <Slider value={boardSize} onChange={handleSliderChange}></Slider>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleStart}
          >
            Start game
          </button>
        </>
      )}

      <Board board={board} onClickSquare={handleClickSquare}></Board>
      {winner && (
        <div>
          <div className="flex flex-row justify-center items-center mb-2">{winner} wins</div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleReset}
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
};
