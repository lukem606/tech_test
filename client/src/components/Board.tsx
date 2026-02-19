import React from "react";
import { XorO } from "../types";
import { Square } from "./Square";

interface BoardProps {
    board: (XorO | undefined)[][];
}

export const Board = ({ board }: BoardProps) => {
    return <div className='flex flex-col gap-1'>
        {board.map(row => <div className='flex gap-1'>
            {row.map(column => <Square value={column}></Square>)}
        </div>)}
    </div>
}