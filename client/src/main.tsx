import React, { useState } from 'react';

import { postGame } from './api/postGame';
import { Game } from './components/Game';
import { Statistics } from './components/Statistics';
import { Player } from './enums';
import { useGameStats } from './hooks/useGameStats';
import { XorO } from './types';
import { createBoard, isWinConditionMet, MIN_BOARD_SIZE } from './util/logic';

export const Main = () => {
  const [boardSize, setBoardSize] = useState<number>(MIN_BOARD_SIZE);
  const [board, setBoard] = useState<(XorO | undefined)[][]>(createBoard(MIN_BOARD_SIZE));
  const [currentPlayer, setCurrentPlayer] = useState<XorO>(Player.X);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);
  const [winner, setWinner] = useState<XorO | undefined>(undefined);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState<Date | undefined>(undefined);

  const { gameStats, refetch } = useGameStats();

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

      await postGame({
        winner: currentPlayer,
        durationSecs: gameDuration,
        totalMoves: moves + 1,
        boardSize,
      });
      await refetch();
      return;
    }

    setCurrentPlayer(currentPlayer === Player.X ? Player.O : Player.X);
  };

  return (
    <div className="min-h-screen bg-dark-green text-white p-10">
      <div className="flex flex-col items-center gap-10">
        <div className="font-bold text-2xl">Tic Tac Toe</div>

        <div className="flex flex-row gap-10">
          <Statistics gameStats={gameStats} />
          <Game
            board={board}
            boardSize={boardSize}
            winner={winner}
            isInProgress={isInProgress}
            onClickSquare={handleClickSquare}
            onReset={handleReset}
            onSliderChange={handleSliderChange}
            onStart={handleStart}
          ></Game>
        </div>
      </div>
    </div>
  );
};
