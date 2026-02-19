import React, { useState } from 'react';
import { Board } from './components/Board';
import { XorO } from './types';
import { CurrentPlayer } from './enums';

const WIN_THRESHOLD = 3;

export const Main = () => {
  const [board, setBoard] = useState<(XorO | undefined)[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
  ])
  const [currentPlayer, setCurrentPlayer] = useState<XorO>(CurrentPlayer.X);
  const [winner, setWinner] = useState<XorO | undefined>(undefined);

  const handleClickSquare = (rowIndex: number, columnIndex: number): void => {
    if (winner) {
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
    return [board[0][0], board[1][1], board[2][2]].every(element => element === currentPlayer);
  }

  const isTopRightDiagonalCompleted = (rowIndex: number, columnIndex: number): boolean => {
    if (rowIndex + columnIndex !== WIN_THRESHOLD - 1) return false
    return [board[0][2], board[1][1], board[2][0]].every(element => element === currentPlayer);
  }

  const handleReset = (): void => {
    setWinner(undefined);
    setBoard([
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined]
    ]);
    setCurrentPlayer(CurrentPlayer.X);
  }

  return <div className='flex flex-col mt-10 items-center gap-10'>
    <div className='font-bold text-2xl'>Tic Tac Toe</div>

    <Board board={board} onClickSquare={handleClickSquare}></Board>
    {winner && (
      <div>
        <div className="flex flex-row justify-center items-center mb-2">{winner} wins</div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleReset}>Play again</button>
      </div>
    )}
  </div>
}
