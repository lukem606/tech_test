import { CurrentPlayer } from '../enums';
import { createBoard, isWinConditionMet } from './logic';

describe('logic', () => {
  const BOARD_SIZE = 4;

  describe('createBoard', () => {
    it('should create a board with rows and columns equal to the size parameter', () => {
      const board = createBoard(BOARD_SIZE);

      expect(board.length).toBe(BOARD_SIZE);
      expect(board.every((row) => row.length === BOARD_SIZE)).toBe(true);
      expect(board.flatMap((row) => row).length).toBe(BOARD_SIZE * BOARD_SIZE);
    });

    it('should initialise each element as undefined', () => {
      const board = createBoard(BOARD_SIZE);

      expect(board.flatMap((row) => row).every((element) => element === undefined)).toBe(true);
    });
  });

  describe('isWinConditionMet', () => {
    const player = CurrentPlayer.X;

    it('should return true if a row is completed for current player', () => {
      const board = createBoard(BOARD_SIZE);

      board[0][0] = player;
      board[0][1] = player;
      board[0][2] = player;
      board[0][3] = player;

      const result = isWinConditionMet({ board, player, rowIndex: 0, columnIndex: 3 });

      expect(result).toBe(true);
    });

    it('should return true if a column is completed', () => {
      const board = createBoard(BOARD_SIZE);

      board[0][0] = player;
      board[1][0] = player;
      board[2][0] = player;
      board[3][0] = player;

      const result = isWinConditionMet({ board, player, rowIndex: 3, columnIndex: 0 });

      expect(result).toBe(true);
    });

    it('should return true if the top-left diagonal is completed', () => {
      const board = createBoard(BOARD_SIZE);

      board[0][0] = player;
      board[1][1] = player;
      board[2][2] = player;
      board[3][3] = player;

      const result = isWinConditionMet({ board, player, rowIndex: 3, columnIndex: 3 });

      expect(result).toBe(true);
    });

    it('should return true if the top-right diagonal is completed', () => {
      const board = createBoard(BOARD_SIZE);

      board[0][3] = player;
      board[1][2] = player;
      board[2][1] = player;
      board[3][0] = player;

      const result = isWinConditionMet({ board, player, rowIndex: 0, columnIndex: 3 });

      expect(result).toBe(true);
    });

    it('should return false if row is incomplete', () => {
      const board = createBoard(BOARD_SIZE);

      board[2][0] = player;
      board[2][1] = player;
      board[2][2] = player;

      const result = isWinConditionMet({ board, player, rowIndex: 2, columnIndex: 2 });

      expect(result).toBe(false);
    });

    it('should return false if column is incomplete', () => {
      const board = createBoard(BOARD_SIZE);

      board[0][1] = player;
      board[1][1] = player;
      board[2][1] = player;

      const result = isWinConditionMet({ board, player, rowIndex: 2, columnIndex: 1 });

      expect(result).toBe(false);
    });

    it('should return false if top-left diagonal is incomplete', () => {
      const board = createBoard(BOARD_SIZE);

      board[0][0] = player;
      board[1][1] = player;
      board[2][2] = player;

      const result = isWinConditionMet({ board, player, rowIndex: 2, columnIndex: 2 });

      expect(result).toBe(false);
    });

    it('should return false if top-right diagonal is incomplete', () => {
      const board = createBoard(BOARD_SIZE);

      board[0][3] = player;
      board[1][2] = player;
      board[2][1] = player;

      const result = isWinConditionMet({ board, player, rowIndex: 2, columnIndex: 1 });

      expect(result).toBe(false);
    });

    it('should return false if last move is not on a diagonal, even when some diagonal cells match', () => {
      const board = createBoard(BOARD_SIZE);

      board[0][0] = player;
      board[1][1] = player;
      board[2][2] = player;
      board[0][3] = player;
      board[1][2] = player;
      board[2][1] = player;

      const result = isWinConditionMet({ board, player, rowIndex: 1, columnIndex: 0 });

      expect(result).toBe(false);
    });

    it('should return false if checking for the opposing player (edge case)', () => {
      const board = createBoard(BOARD_SIZE);

      board[0][0] = player;
      board[0][1] = player;
      board[0][2] = player;
      board[0][3] = player;

      const result = isWinConditionMet({
        board,
        player: CurrentPlayer.O,
        rowIndex: 0,
        columnIndex: 3,
      });

      expect(result).toBe(false);
    });
  });
});
