import React, { useMemo, useState } from 'react';

import { Board } from './components/Board';
import { Slider } from './components/Slider';
import { CurrentPlayer } from './enums';
import { XorO } from './types';
import { calculateTopLeftDiagonalIndices, calculateTopRightDiagonalIndices, createBoard } from './util';

export const Main = () => {
  const [board, setBoard] = useState<(XorO | undefined)[][]>(createBoard(3))
  const [currentPlayer, setCurrentPlayer] = useState<XorO>(CurrentPlayer.X);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);
  const [winner, setWinner] = useState<XorO | undefined>(undefined);

  const topLeftDiagonalIndices = useMemo(() => {
    return calculateTopLeftDiagonalIndices(board.length)
  }, [board.length]);

  const topRightDiagonalIndices = useMemo(() => {
    return calculateTopRightDiagonalIndices(board.length);
  }, [board.length]);

  const handleSliderChange = (value: number) => {
    const resizedBoard = createBoard(value);
    setBoard(resizedBoard);
  }

  const handleStart = (): void => {
    setIsInProgress(true);
  }

  const handleReset = (): void => {
    setIsInProgress(false);
    setWinner(undefined);
    setBoard(createBoard(3));
    setCurrentPlayer(CurrentPlayer.X);
  }

  const handleClickSquare = (rowIndex: number, columnIndex: number): void => {
    if (!isInProgress || winner) {
      return;
    }

    updateBoard(rowIndex, columnIndex);

    if (isWinConditionMet(rowIndex, columnIndex)) {
      setWinner(currentPlayer);
    }

    setCurrentPlayer(currentPlayer === CurrentPlayer.X ? CurrentPlayer.O : CurrentPlayer.X);
  }

  const updateBoard = (rowIndex: number, columnIndex: number): void => {
    const updatedBoard = [...board];
    updatedBoard[rowIndex][columnIndex] = currentPlayer;
    setBoard(updatedBoard);
  }

  const isWinConditionMet = (rowIndex: number, columnIndex: number): boolean => {
    return (
      isRowCompleted(rowIndex) ||
      isColumnCompleted(columnIndex) ||
      isTopLeftDiagonalCompleted(rowIndex, columnIndex) ||
      isTopRightDiagonalCompleted(rowIndex, columnIndex)
    )
  }

  const isRowCompleted = (rowIndex: number): boolean => {
    return board[rowIndex].every(element => {
      return element === currentPlayer
    })
  }

  const isColumnCompleted = (columnIndex: number): boolean => {
    return board.every(row => {
      return row[columnIndex] === currentPlayer
    });
  }

  const isTopLeftDiagonalCompleted = (rowIndex: number, columnIndex: number): boolean => {
    if (rowIndex !== columnIndex) return false;
    return topLeftDiagonalIndices.every(([rowIndex, columnIndex]) => board[rowIndex][columnIndex] === currentPlayer);
  }

  const isTopRightDiagonalCompleted = (rowIndex: number, columnIndex: number): boolean => {
    if (rowIndex + columnIndex !== board.length - 1) return false
    return topRightDiagonalIndices.every(([rowIndex, columnIndex]) => board[rowIndex][columnIndex] === currentPlayer);
  }

  return <div className='flex flex-col mt-10 items-center gap-10'>
    <div className='font-bold text-2xl'>Tic Tac Toe</div>

    {!isInProgress &&
      <>
        <div className='text-sm'>Drag the slider to resize the board</div>
        <Slider onChange={handleSliderChange}></Slider>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleStart}>Start game</button>
      </>
    }

    <Board board={board} onClickSquare={handleClickSquare} className='mb-12'></Board>
    {winner && (
      <div>
        <div className="flex flex-row justify-center items-center mb-2">{winner} wins</div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleReset}>Play again</button>
      </div>
    )}
  </div>
}
