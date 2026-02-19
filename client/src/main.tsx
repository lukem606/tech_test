import React, { useState } from 'react';
import { Board } from './components/Board';
import { XorO } from './types';
import { CurrentPlayer } from './enums';


export const Main = () => {
  const [board, setBoard] = useState<(XorO | undefined)[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
  ])

  const [currentPlayer, setCurrentPlayer] = useState<XorO>(CurrentPlayer.X);

  const handleClickSquare = (rowIndex: number, columnIndex: number): void => {
    const newBoard = [...board];
    newBoard[rowIndex][columnIndex] = currentPlayer;

    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === CurrentPlayer.X ? CurrentPlayer.O : CurrentPlayer.X
    )
  }

  return <div className='flex flex-col mt-10 items-center gap-10'>
    <div className='font-bold text-2xl'>Tic Tac Toe</div>
    <Board board={board} onClickSquare={handleClickSquare}></Board>
  </div>
}
