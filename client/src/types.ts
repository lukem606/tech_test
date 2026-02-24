export type XorO = 'X' | 'O';

export type GameStats = {
  totalGames: number;
  totalPlayTimeSecs: number;
  averageGameTimeSecs: number;
  averageMovesToWin: number;
  totalWinsX: number;
  totalWinsO: number;
};
