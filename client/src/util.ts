import { XorO } from "./types";

/**
 * Creates an array corresponding to the game board, where all initial values are undefined.
 * @param size The length of the array, restricted to a range of values from 3 to 15.
 * @returns An NxN array of arrays.
 */
export const createBoard = (size: number) => {
    const board: (XorO | undefined)[][] = [];

    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
        const row: (XorO | undefined)[] = [];

        for (let columnIndex = 0; columnIndex < size; columnIndex++) {
            row.push(undefined)
        }

        board.push(row);
    }

    return board;
}