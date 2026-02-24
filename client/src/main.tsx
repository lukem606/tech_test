import React, { useState } from 'react';

import { GameBoard } from './components/GameBoard';
import { Slider } from './components/Slider';
import { Player } from './enums';
import { XorO } from './types';
import { createBoard, isWinConditionMet, MIN_BOARD_SIZE } from './util/logic';
import { Statistics } from './components/Statistics';
import { postGame } from './api/postGame';

export const Main = () => {
  const [boardSize, setBoardSize] = useState<number>(MIN_BOARD_SIZE);
  const [board, setBoard] = useState<(XorO | undefined)[][]>(createBoard(MIN_BOARD_SIZE));
  const [currentPlayer, setCurrentPlayer] = useState<XorO>(Player.X);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);
  const [winner, setWinner] = useState<XorO | undefined>(undefined);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState<Date | undefined>(undefined);

  const handleSliderChange = (value: number) => {
    const resizedBoard = createBoard(value);
    setBoard(resizedBoard);
    setBoardSize(value);
  };

  const handleStart = (): void => {
    setIsInProgress(true);
    setStartTime(new Date());
  };

  const handleReset = (): void => {
    setIsInProgress(false);
    setWinner(undefined);
    setBoard(createBoard(board.length));
    setCurrentPlayer(Player.X);
    setStartTime(undefined);
    setMoves(0);
  };

  const handleClickSquare = async (rowIndex: number, columnIndex: number): Promise<void> => {
    if (!isInProgress || winner || board[rowIndex][columnIndex]) {
      return;
    }

    const updatedBoard = board.map((row) => [...row]);
    updatedBoard[rowIndex][columnIndex] = currentPlayer;
    setBoard(updatedBoard);

    if (isWinConditionMet({ board: updatedBoard, player: currentPlayer, rowIndex, columnIndex })) {
      setWinner(currentPlayer);

      let gameDuration = 0;
      if (startTime) {
        gameDuration = Math.ceil((new Date().getTime() - startTime?.getTime()) / 1000);
      }

      await postGame({ winner: currentPlayer, durationSecs: gameDuration, totalMoves: moves + 1 });
      return;
    }

    setCurrentPlayer(currentPlayer === Player.X ? Player.O : Player.X);
  };

  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <div className="font-bold text-2xl">Tic Tac Toe</div>

      <div className="flex flex-row mt-10 items-center gap-20">
        <div className="flex flex-col mt-10 items-center gap-10">
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

          <GameBoard board={board} onClickSquare={handleClickSquare}></GameBoard>
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

        <div className="flex flex-col mt-10 items-center gap-10">
          <Statistics></Statistics>
        </div>
      </div>
    </div>
  );
};
