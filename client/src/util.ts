import { XorO } from './types';

/**
 * Creates an array corresponding to the game board, where all initial values are undefined.
 * @param size The length of the array, restricted to a range of values from 3 to 15.
 * @returns An NxN array of arrays.
 * @example [
 * [undefined, undefined, undefined],
 * [undefined, undefined, undefined],
 * [undefined, undefined, undefined]
 * ]
 */
export const createBoard = (size: number) => {
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

/**
 * Creates an array corresponding to the top-left diagonal's indices.
 * @param size The size of the game board.
 * @returns An array of arrays of integers.
 * @example [[0,0], [1,1], [2,2]]
 */
export const calculateTopLeftDiagonalIndices = (size: number) => {
  const indices: number[][] = [];
  for (let i = 0; i < size; i++) {
    indices.push([i, i]);
  }
  return indices;
};

/**
 * Creates an array corresponding to the top-right diagonal's indices.
 * @param size The size of the game board.
 * @returns An array of arrays of integers.
 * @example [[2,0], [1,1], [0,2]]
 */
export const calculateTopRightDiagonalIndices = (size: number) => {
  const indices: number[][] = [];
  for (let i = 0; i < size; i++) {
    indices.push([i, size - 1 - i]);
  }
  return indices;
};
