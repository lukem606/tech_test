import React, { useState } from 'react';
import { Board } from './components/Board';
import { XorO } from './types';


export const Main = () => {
  const [board, setBoard] = useState<(XorO | undefined)[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
  ])

  return <div className='flex flex-col mt-10 items-center gap-10'>
    <div className='font-bold text-2xl'>Tic Tac Toe</div>
    <Board board={board}></Board>
  </div>
}
