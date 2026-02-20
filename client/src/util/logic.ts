import { XorO } from '../types';
import { calculateTopLeftDiagonalIndices, calculateTopRightDiagonalIndices } from '../util';

export const isWinConditionMet = ({
    board,
    player,
    rowIndex,
    columnIndex,
}: {
    board: (XorO | undefined)[][];
    player: XorO;
    rowIndex: number;
    columnIndex: number;
}): boolean => {
    return (
        isRowCompleted(board, player, rowIndex) ||
        isColumnCompleted(board, player, columnIndex) ||
        isTopLeftDiagonalCompleted(board, player, rowIndex, columnIndex) ||
        isTopRightDiagonalCompleted(board, player, rowIndex, columnIndex)
    );
};

const isRowCompleted = (
    board: (XorO | undefined)[][],
    player: XorO,
    rowIndex: number
): boolean => {
    return board[rowIndex].every((element) => {
        return element === player;
    });
};

const isColumnCompleted = (
    board: (XorO | undefined)[][],
    player: XorO,
    columnIndex: number
): boolean => {
    return board.every((row) => {
        return row[columnIndex] === player;
    });
};

const isTopLeftDiagonalCompleted = (
    board: (XorO | undefined)[][],
    player: XorO,
    rowIndex: number,
    columnIndex: number
): boolean => {
    if (rowIndex !== columnIndex) return false;

    const topLeftDiagonalIndices = calculateTopLeftDiagonalIndices(board.length);
    return topLeftDiagonalIndices.every(
        ([rowIndex, columnIndex]) => board[rowIndex][columnIndex] === player
    );
};

const isTopRightDiagonalCompleted = (
    board: (XorO | undefined)[][],
    player: XorO,
    rowIndex: number,
    columnIndex: number
): boolean => {
    if (rowIndex + columnIndex !== board.length - 1) return false;

    const topRightDiagonalIndices = calculateTopRightDiagonalIndices(board.length);
    return topRightDiagonalIndices.every(
        ([rowIndex, columnIndex]) => board[rowIndex][columnIndex] === player
    );
};
