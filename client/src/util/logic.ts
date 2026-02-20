import { XorO } from '../types';

export const MIN_BOARD_SIZE = 3;
export const MAX_BOARD_SIZE = 15;

export const clampBoardSize = (size: number): number => {
  return Math.min(MAX_BOARD_SIZE, Math.max(MIN_BOARD_SIZE, Math.round(size)));
};

export const createBoard = (size: number) => {
  if (!Number.isInteger(size) || size < MIN_BOARD_SIZE || size > MAX_BOARD_SIZE) {
    throw new RangeError(
      `Board size must be an integer between ${MIN_BOARD_SIZE} and ${MAX_BOARD_SIZE}`
    );
  }

  const board: (XorO | undefined)[][] = [];

  for (let rowIndex = 0; rowIndex < size; rowIndex++) {
    const row: (XorO | undefined)[] = [];

    for (let columnIndex = 0; columnIndex < size; columnIndex++) {
      row.push(undefined);
    }

    board.push(row);
  }

  return board;
};

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

const isRowCompleted = (board: (XorO | undefined)[][], player: XorO, rowIndex: number): boolean => {
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

const calculateTopLeftDiagonalIndices = (size: number) => {
  const indices: number[][] = [];
  for (let i = 0; i < size; i++) {
    indices.push([i, i]);
  }
  return indices;
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

const calculateTopRightDiagonalIndices = (size: number) => {
  const indices: number[][] = [];
  for (let i = 0; i < size; i++) {
    indices.push([i, size - 1 - i]);
  }
  return indices;
};
