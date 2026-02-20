import React, { FC } from "react";
import { XorO } from "../types";
import { Square } from "./Square";

interface BoardProps {
    board: (XorO | undefined)[][];
    onClickSquare: (rowIndex: number, columnIndex: number) => void;
}

export const Board: FC<BoardProps> = ({ board, onClickSquare }: BoardProps) => {
    return <div className={`flex flex-col gap-1`}>
        {board.map((row, rowIndex) => <div className='flex gap-1'>
            {row.map((column, columnIndex) => <Square key={`square-${rowIndex}-${columnIndex}`} value={column} onClickSquare={() => onClickSquare(rowIndex, columnIndex)}></Square>)}
        </div>)}
    </div>
}