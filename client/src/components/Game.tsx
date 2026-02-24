import React, { FC, useState } from 'react';
import { XorO } from '../types';
import { Player } from '../enums';
import { Slider } from './Slider';
import { GameBoard } from './GameBoard';
import { createBoard, isWinConditionMet, MIN_BOARD_SIZE } from '../util/logic';
import { postGame } from '../api/postGame';

interface GameProps {
  onRefetch: () => void;
}

export const Game: FC<GameProps> = ({ onRefetch }: GameProps) => {
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

      await postGame({
        winner: currentPlayer,
        durationSecs: gameDuration,
        totalMoves: moves + 1,
        boardSize,
      });
      onRefetch();
      return;
    }

    setMoves(moves + 1);
    setCurrentPlayer(currentPlayer === Player.X ? Player.O : Player.X);
  };

  return (
    <div className="flex flex-col items-center gap-5 w-[700px]">
      {!isInProgress && (
        <>
          <div className="text-sm">Drag the slider to resize the board</div>
          <Slider value={boardSize} onChange={handleSliderChange}></Slider>
          <button
            className="bg-light-green hover:bg-darkest-green hover:text-white text-darkest-green font-bold py-2 px-4 rounded"
            onClick={handleStart}
          >
            Start game
          </button>
        </>
      )}

      {winner && (
        <div>
          <div className="flex flex-row justify-center items-center mb-2 font-bold text-2xl">
            {winner} wins
          </div>
          <button
            className="bg-light-green hover:bg-darkest-green hover:text-white text-darkest-green font-bold py-2 px-4 rounded"
            onClick={handleReset}
          >
            Play again
          </button>
        </div>
      )}

      <GameBoard board={board} onClickSquare={handleClickSquare}></GameBoard>
    </div>
  );
};
