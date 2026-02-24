import type { Player } from "./enums.js";

export type Game = {
  id: number;
  winner: Player;
  durationSecs: number;
  totalMoves: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
